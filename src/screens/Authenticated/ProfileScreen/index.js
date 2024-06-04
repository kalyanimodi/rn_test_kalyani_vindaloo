import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Button, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Strings from '../../../utils/Strings';
import Routes from '../../../routes/Route';
import * as Keychain from 'react-native-keychain';
import CryptoJS from 'react-native-crypto-js';
import styles from './styles';
import Constants from '../../../utils/Constants';
import CustomLoader from '../../../Components';

const Profile = props => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
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

        const decryptedUsername = CryptoJS.AES.decrypt(
          encryptedData.username,
          Constants.secretKey,
        ).toString(CryptoJS.enc.Utf8);
        const decryptedEmail = CryptoJS.AES.decrypt(
          encryptedData.email,
          Constants.secretKey,
        ).toString(CryptoJS.enc.Utf8);
        const decryptedPass = CryptoJS.AES.decrypt(
          encryptedData.password,
          Constants.secretKey,
        ).toString(CryptoJS.enc.Utf8);

        console.log(decryptedUsername);
        setValue('username', decryptedUsername);
        setValue('email', decryptedEmail);
        setValue('password', decryptedPass);
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
    const userName = data.username;
    const email = data.email;
    const pass = data.password;

    setIsLoggedIn(true);

    try {
      // Encryption
      const encryptedUserName = CryptoJS.AES.encrypt(
        userName,
        Constants.secretKey,
      ).toString();
      const encryptedEmail = CryptoJS.AES.encrypt(
        email,
        Constants.secretKey,
      ).toString();
      const encryptedPass = CryptoJS.AES.encrypt(
        pass,
        Constants.secretKey,
      ).toString();

      // Create object with encrypted values
      const encryptedData = {
        username: encryptedUserName,
        email: encryptedEmail,
        password: encryptedPass,
      };

      // Store the encrypted object as a JSON string in Keychain
      await Keychain.setGenericPassword(
        'userCredentials',
        JSON.stringify(encryptedData),
      );
    } catch (error) {
      console.log(error);
    }
    setIsLoggedIn(false);
    props.navigation.pop();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleTextStyle}>{Strings.CreateAccount}</Text>
      <CustomLoader loading={isLoggedIn} />
      <Text style={styles.label}>{Strings.Username}</Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
            {errors.username && (
              <Text style={styles.errorLabel}>{Strings.EmptyUsername}</Text>
            )}
          </>
        )}
        name="username"
        rules={{required: true}}
      />
      <Text style={styles.label}>{Strings.Email}</Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
            {errors.email && (
              <Text style={styles.errorLabel}>{Strings.EmptyEmail}</Text>
            )}
          </>
        )}
        name="email"
        rules={{required: true}}
      />
      <Text style={styles.label}>{Strings.Password}</Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
            {errors.password && (
              <Text style={styles.errorLabel}>{Strings.EmptyPassword}</Text>
            )}
          </>
        )}
        name="password"
        rules={{required: true}}
      />

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonTextStyle}>{Strings.Back}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
