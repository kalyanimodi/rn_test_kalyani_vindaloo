import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Home from '../../screens/Authenticated/HomeScreen';
import Routes from '../Route';
import {Color} from '../../utils/Color';
import Profile from '../../screens/Authenticated/ProfileScreen';

const Stack = createStackNavigator();

const Authenticated = () => (
  <Stack.Navigator
    initialRouteName={Routes.Home}
    screenOptions={{headerTitleStyle: {color: Color.WHITE}}}>
    <Stack.Screen name={Routes.Home} component={Home} />
    <Stack.Screen name={Routes.Profile} component={Profile} />
  </Stack.Navigator>
);

export default Authenticated;
