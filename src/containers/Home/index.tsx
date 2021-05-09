import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  FlatList,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {StateType} from '../../redux/reducers';
import {fontFamily, Images} from '../../assets/index';
import {PersonCard} from '../../components/PersonCard';
import {ScreenNames} from '../../navigation/constants';
import {CharacterType} from '../../utils';
import {CharacterActionTypes} from '../../redux/reducers/charactersReducer';

// const getCharacters = (page?: number) => {
//   return {tyep: 'GET_CHARACTER', payload: {page}};
// };

export const Home = () => {
  const characterList = useSelector(
    (state: StateType) => state.character.characterList,
  );
  const loading = useSelector((state: StateType) => state.character.loading);

  const dispatch = useDispatch();

  const navigation = useNavigation();
  const renderPersonCard = ({item}: {item: CharacterType}) => {
    return (
      <PersonCard
        name={item.name}
        gender={item.gender}
        skinColor={item.skin_color}
        hairColor={item.hair_color}
        onPress={() => {
          dispatch({
            type: CharacterActionTypes.GET_CHARACTER_DETAILS,
            character: item,
          });
          navigation.navigate(ScreenNames.DETAILS);
        }}
      />
    );
  };

  return (
    <View style={Styles.container}>
      <ImageBackground source={Images.bg1} style={{flex: 1}} resizeMode="cover">
        <Modal transparent visible={loading}>
          <View
            style={{
              flex: 1,
              width: '100%',
              backgroundColor: '#1a1a1a56',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size="large" color="#FFFA" />
          </View>
        </Modal>
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
          <View style={{flex: 8, width: '90%'}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={characterList}
              renderItem={renderPersonCard}
              keyExtractor={item => `${item.url}`}
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const Styles = StyleSheet.create({
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
