import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Button, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Strings from '../../../utils/Strings';
import styles from './styles';
import Routes from '../../../routes/Route';
import * as Keychain from 'react-native-keychain';
import CryptoJS from 'react-native-crypto-js';
import Constants from '../../../utils/Constants';
import CustomLoader from '../../../Components';

const Signup = props => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onSubmit = async data => {
    const username = data.username;
    const email = data.email;
    const pass = data.password;

    console.log(data);

    setIsLoggedIn(true);

    try {
      // Encryption
      const encryptedUsername = CryptoJS.AES.encrypt(
        username,
        Constants.secretKey,
      ).toString();
      const encryptedEmail = CryptoJS.AES.encrypt(
        email,
        Constants.secretKey,
      ).toString();
      const encryptdPass = CryptoJS.AES.encrypt(
        pass,
        Constants.secretKey,
      ).toString();

      // Create object with encrypted values
      const encryptedData = {
        username: encryptedUsername,
        email: encryptedEmail,
        password: encryptdPass,
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
    props.navigation.navigate(Routes.PaymentDetails);
  };

  return (
    <View style={styles.container}>
      <CustomLoader loading={isLoggedIn} />
      <Text style={styles.titleTextStyle}>{Strings.CreateAccount}</Text>

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
              secureTextEntry
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
        <Text style={styles.buttonTextStyle}>{Strings.SignupTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;
