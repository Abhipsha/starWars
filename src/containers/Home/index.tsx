import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  FlatList,
} from 'react-native';
// import {useSelector, useDispatch} from 'react-redux';
// import {StateType} from '../../redux/reducers';
import {fontFamily, Images} from '../../assets/index';
import {PersonCard} from '../../components/PersonCard';
import {ScreenNames} from '../../navigation/constants';

// const getCharacters = (page?: number) => {
//   return {tyep: 'GET_CHARACTER', payload: {page}};
// };

export const Home = () => {
  // const redState = useSelector((state: StateType) => ({
  //   character: state.character,
  // }));

  // const dispatch = useDispatch();

  // dispatch(getCharacters(1));
  // console.log('STTATE: ', redState.character);

  const navigation = useNavigation();
  const renderPersonCard = () => {
    return (
      <PersonCard
        name="Luke Skywalker"
        gender="Male"
        skinColor="Fair"
        hairColor="Blond"
        height={170}
        eyeColor="Blue"
        birth="19BBY"
        mass={77}
        onPress={() => {
          navigation.navigate(ScreenNames.SPLASH);
        }}
      />
    );
  };

  return (
    <View style={Styles.container}>
      <ImageBackground source={Images.bg1} style={{flex: 1}} resizeMode="cover">
        <SafeAreaView
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Image
              source={Images.logo}
              style={{width: 100, height: 48}}
              resizeMode="contain"
            />
          </View>
          <View style={{flex: 8}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={[1, 2, 3, 4, 5, 6, 7, 8]}
              renderItem={renderPersonCard}
              keyExtractor={index => `${index}`}
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  buttonStyle: {
    backgroundColor: '#ccc',
    padding: 11,
    borderRadius: 5,
  },
  btnTextStyle: {
    fontFamily: fontFamily.MOONHOUSE,
    fontSize: 20,
  },
});
