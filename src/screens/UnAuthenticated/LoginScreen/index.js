import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Button, Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Strings from '../../../utils/Strings';
import Routes from '../../../routes/Route';
import * as Keychain from 'react-native-keychain';
import CryptoJS from 'react-native-crypto-js';
import {CommonActions} from '@react-navigation/native';

const Login = props => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm();

  const onSubmit = async data => {
    console.log(data);
    const email = data.email;
    const pass = data.password;

    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: Routes.Autheticated}],
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleTextStyle}>{Strings.LoginTitle}</Text>

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
        <Text style={styles.buttonTextStyle}>{Strings.Login}</Text>
      </TouchableOpacity>

      <View style={styles.bottomContainer}>
        <Text style={styles.signupLabel}>{Strings.DontHaveAccount}</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate(Routes.Signup)}>
          <Text
            style={[
              styles.signupLabel,
              {fontWeight: '500'},
            ]}>{` ${Strings.SignupTitle}`}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
