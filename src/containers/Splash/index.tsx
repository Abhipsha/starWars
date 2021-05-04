import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
export const Splash = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity style={{backgroundColor: 'red'}}>
        <Text>Click Me</Text>
      </TouchableOpacity>
    </View>
  );
};
