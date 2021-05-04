import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import {useSelector, useDispatch} from 'react-redux';
// import {StateType} from '../../redux/reducers';
import {fontFamily} from '../../assets/index';

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

  return (
    <View style={Styles.container}>
      <TouchableOpacity style={Styles.buttonStyle}>
        <Text style={Styles.btnTextStyle}>Click Me</Text>
      </TouchableOpacity>
    </View>
  );
};

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
