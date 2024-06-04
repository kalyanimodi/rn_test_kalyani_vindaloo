/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {Color} from './src/utils/Color';
import RootNavigator from './src/routes';

function App(): React.JSX.Element {
  const MyAppTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: Color.PRIMARY,
      background: Color.PRIMARY_BACKGROUND,
      card: Color.PRIMARY,
      text: Color.TEXT_PRIMARY,
    },
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="default" backgroundColor={Color.PRIMARY_DARK} />
      <NavigationContainer theme={MyAppTheme}>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
export default App;
