import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Button, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Strings from '../../../utils/Strings';
import {Color} from '../../../utils/Color';
import * as Keychain from 'react-native-keychain';
import CryptoJS from 'react-native-crypto-js';
import Constants from '../../../utils/Constants';
import CustomLoader from '../../../Components';
import Routes from '../../../routes/Route';
import {CommonActions} from '@react-navigation/native';
import styles from './styles';

const Home = props => {
  const {
    setValue,
    handleSubmit,
    control,
    formState: {errors},
  } = useForm();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(true);
    retrieveDetails();
  }, []);

  const retrieveDetails = async () => {
    const cradDetails = await Keychain.getGenericPassword();

    try {
      if (cradDetails) {
        const encryptedData = JSON.parse(cradDetails.password);

        const decryptedCard = CryptoJS.AES.decrypt(
          encryptedData.card,
          Constants.secretKey,
        ).toString(CryptoJS.enc.Utf8);
        const decryptedDate = CryptoJS.AES.decrypt(
          encryptedData.date,
          Constants.secretKey,
        ).toString(CryptoJS.enc.Utf8);
        const decryptedCvv = CryptoJS.AES.decrypt(
          encryptedData.cvv,
          Constants.secretKey,
        ).toString(CryptoJS.enc.Utf8);

        setValue('cardnumber', decryptedCard);
        setValue('expirationdate', decryptedDate);
        setValue('cvv', decryptedCvv);
        setIsLoggedIn(false);
      } else {
        console.log('No credentials stored');
        setIsLoggedIn(false);
      }
    } catch (e) {
      console.log(e);
      setIsLoggedIn(false);
    }
  };

  const onSubmit = async data => {
    const cardNumber = data.cardnumber;
    const date = data.expirationdate;
    const cvv = data.cvv;

    setIsLoggedIn(true);

    try {
      // Encryption
      const encryptedCardNum = CryptoJS.AES.encrypt(
        cardNumber,
        Constants.secretKey,
      ).toString();
      const encryptedDate = CryptoJS.AES.encrypt(
        date,
        Constants.secretKey,
      ).toString();
      const encryptdCvv = CryptoJS.AES.encrypt(
        cvv,
        Constants.secretKey,
      ).toString();

      // Create object with encrypted values
      const encryptedData = {
        card: encryptedCardNum,
        date: encryptedDate,
        cvv: encryptdCvv,
      };

      // Store the encrypted object as a JSON string in Keychain
      await Keychain.setGenericPassword(
        'cardCredentials',
        JSON.stringify(encryptedData),
      );
    } catch (error) {
      console.log(error);
    }
    setIsLoggedIn(false);
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: Routes.Autheticated}],
      }),
    );
  };

  const handleCardNumberChange = (text, onChange) => {
    // Format the text input to add spaces every 4 digits
    const formattedText = text
      .replace(/\s?/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim();
    onChange(formattedText);
  };

  const handleExpiryDateChange = (text, onChange) => {
    const formattedText = text
      .replace(/\s|\//g, '')
      .replace(/(\d{2})(\d{2})/, '$1/$2')
      .trim();
    onChange(formattedText);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleTextStyle}>{Strings.PaymentDetailsTitle}</Text>
      <CustomLoader loading={isLoggedIn} />

      <Text style={styles.label}>{Strings.CardNumber}</Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              placeholder="0000 0000 0000 0000"
              placeholderTextColor={Color.TEXT_PLACEHOLDER}
              onChangeText={text => handleCardNumberChange(text, onChange)}
              value={value}
              keyboardType="numeric"
              maxLength={19} // 16 digits + 3 spaces
            />
            {errors.cardnumber && (
              <Text style={styles.errorLabel}>{Strings.EmptyCardNumber}</Text>
            )}
          </>
        )}
        name="cardnumber"
        rules={{required: true}}
      />
      <Text style={styles.label}>{Strings.ExpiryDate}</Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              placeholder="MM/YY"
              placeholderTextColor="#999"
              onChangeText={text => handleExpiryDateChange(text, onChange)}
              value={value}
              keyboardType="numeric"
              maxLength={5}
            />
            {errors.expirationdate && (
              <Text style={styles.errorLabel}>{Strings.EmptyDate}</Text>
            )}
          </>
        )}
        name="expirationdate"
        rules={{required: true}}
      />
      <Text style={styles.label}>{Strings.cvvNumber}</Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              placeholder="0000"
              placeholderTextColor="#999"
              onChangeText={onChange}
              value={value}
              keyboardType="numeric"
              maxLength={4}
            />
            {errors.cvv && (
              <Text style={styles.errorLabel}>{Strings.EmptyCVV}</Text>
            )}
          </>
        )}
        name="cvv"
        rules={{required: true}}
      />

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonTextStyle}>{Strings.Save}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={() => props.navigation.navigate(Routes.Profile)}>
        <Text style={styles.buttonTextStyle}>{Strings.Profile}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
