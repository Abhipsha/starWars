import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {fontFamily} from '../../assets';

interface PersonCardProps {
  name: string;
  gender: string;
  skinColor: string;
  hairColor: string;
  onPress?: () => void;
}

export const PersonCard = ({
  name,
  gender,
  skinColor,
  hairColor,
  onPress,
}: PersonCardProps) => {
  return (
    <TouchableOpacity style={Styles.cardView} onPress={onPress}>
      <Text style={Styles.titleLabel}>{name.toUpperCase()}</Text>
      <View style={Styles.propertyView}>
        <Text style={Styles.propertyLabel}>{gender.toUpperCase()}</Text>
        <Text style={Styles.propertyLabel}>{skinColor.toUpperCase()}</Text>
        <Text style={Styles.propertyLabel}>{hairColor.toUpperCase()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  cardView: {
    backgroundColor: '#6060604D',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 20,
    marginVertical: 10,
    width: '100%',
  },
  propertyView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  propertyLabel: {
    fontFamily: fontFamily.MOONHOUSE,
    color: '#FFF',
    fontSize: 14,
    marginVertical: 5,
    marginRight: 15,
  },
  titleLabel: {
    fontFamily: fontFamily.MOONHOUSE,
    color: '#FFF',
    fontSize: 22,
    marginBottom: 10,
  },
});
