import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Routes from './Route';
import UnAuthenticated from './UnAuthenticated';
import Authenticated from './Autheticated';

const Stack = createStackNavigator();

const RootNavigator = () => (
  <Stack.Navigator
    initialRouteName={Routes.Login}
    screenOptions={{headerShown: false}}>
    <Stack.Screen name={Routes.UnAutheticated} component={UnAuthenticated} />
    <Stack.Screen name={Routes.Autheticated} component={Authenticated} />
  </Stack.Navigator>
);

export default RootNavigator;
