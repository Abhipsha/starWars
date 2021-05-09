import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {Animated, SafeAreaView} from 'react-native';
import {useDispatch} from 'react-redux';
import {Images} from '../../assets';
import {ScreenNames} from '../../navigation/constants';
export const Splash = () => {
  const [logoScaleX] = useState(new Animated.Value(0));
  const [logoScaleY] = useState(new Animated.Value(0));
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type: 'GET_CHARACTER_LIST'});
    Animated.parallel([
      Animated.timing(logoScaleX, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(logoScaleY, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate(ScreenNames.HOME);
    });
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
      }}>
      <Animated.Image
        source={Images.logo}
        style={{
          width: 250,
          height: 120,
          transform: [{scaleX: logoScaleX}, {scaleY: logoScaleY}],
        }}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
};
