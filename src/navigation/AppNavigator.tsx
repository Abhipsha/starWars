import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Screens, ScreenNames} from './constants';
import {map} from 'lodash';
const Stack = createStackNavigator();
export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName={ScreenNames.SPLASH}>
        {map(Screens, item => (
          <Stack.Screen
            key={item.screen}
            name={item.screen}
            component={item.component}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
