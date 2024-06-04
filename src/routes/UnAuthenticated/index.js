import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Home from '../../screens/Authenticated/HomeScreen';
import Routes from '../Route';
import Login from '../../screens/UnAuthenticated/LoginScreen';
import Signup from '../../screens/UnAuthenticated/SignupScreen';
import Payment from '../../screens/UnAuthenticated/PaymentScreen';
import {Color} from '../../utils/Color';

const Stack = createStackNavigator();

const UnAuthenticated = () => (
  <Stack.Navigator
    initialRouteName={Routes.Home}
    screenOptions={{headerTitleStyle: {color: Color.WHITE}}}>
    <Stack.Screen name={Routes.Login} component={Login} />
    <Stack.Screen name={Routes.Signup} component={Signup} />
    <Stack.Screen name={Routes.PaymentDetails} component={Payment} />
  </Stack.Navigator>
);

export default UnAuthenticated;
