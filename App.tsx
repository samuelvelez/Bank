/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { Navigator } from './src/navigator/Navigator';
import { NavigationContainer } from '@react-navigation/native';



function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}


export default App;
