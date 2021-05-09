import {map} from 'lodash';
import React, {useState} from 'react';
import {
  View,
  ImageBackground,
  SafeAreaView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import {useSelector} from 'react-redux';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {fontFamily, Images} from '../../assets';
import {StateType} from '../../redux/reducers';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';

interface DetailsProps {}

export const Details = () => {
  const navigation = useNavigation();
  const characterDetails = useSelector(
    (state: StateType) => state.character.characterDetail,
  );
  const [detailScale] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(detailScale, {
      toValue: characterDetails !== undefined ? 1 : 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [characterDetails]);
  return (
    <View style={Styles.container}>
      <ImageBackground source={Images.bg2} style={{flex: 1}} resizeMode="cover">
        <SafeAreaView
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{flex: 3, padding: 25}}>
              <Ionicon
                name="caret-back"
                style={{color: '#FFF', fontSize: 32}}
              />
            </TouchableOpacity>
            <View style={{flex: 7}}>
              <Image
                source={Images.logo}
                style={{width: 100, height: 48}}
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={{flex: 8, width: '90%', justifyContent: 'flex-start'}}>
            {characterDetails && (
              <Animated.ScrollView
                style={[Styles.cardView, {transform: [{scaleY: detailScale}]}]}>
                <Text style={Styles.titleLabel}>
                  {characterDetails.name.toUpperCase()}
                </Text>
                <View
                  style={[
                    Styles.propertyView,
                    {justifyContent: 'space-between'},
                  ]}>
                  <Text style={Styles.propertyLabel}>
                    {characterDetails.gender.toUpperCase()}
                  </Text>
                  <Text style={Styles.propertyLabel}>
                    {characterDetails.skin_color.toUpperCase()}
                  </Text>
                  <Text style={Styles.propertyLabel}>
                    {characterDetails.hair_color.toUpperCase()}
                  </Text>
                </View>
                <View style={Styles.propertyView}>
                  <Text style={Styles.propertyLabel}>
                    {`eye color: ${characterDetails.eye_color}`.toUpperCase()}
                  </Text>
                  <Text style={Styles.propertyLabel}>
                    {`birth: ${characterDetails.birth_year}`.toUpperCase()}
                  </Text>
                </View>
                <View style={Styles.propertyView}>
                  <Text style={Styles.propertyLabel}>
                    {`Height: ${characterDetails.height}`.toUpperCase()}
                  </Text>
                  <Text style={Styles.propertyLabel}>
                    {`mass: ${characterDetails.mass}`.toUpperCase()}
                  </Text>
                </View>
                <View style={[Styles.propertyView, {flexDirection: 'column'}]}>
                  <Text style={Styles.propertyLabel}>
                    {`homeworld: ${characterDetails.homeworld}`.toUpperCase()}
                  </Text>
                </View>
                {characterDetails.species.length > 0 && (
                  <View style={[Styles.propertyView, {marginTop: 15}]}>
                    <Text style={Styles.propertyLabel}>
                      {'species: '.toUpperCase()}
                    </Text>
                    <View>
                      {map(characterDetails.species, item => (
                        <Text key={item} style={Styles.propertyLabel}>
                          {item.toUpperCase()}
                        </Text>
                      ))}
                    </View>
                  </View>
                )}
                {characterDetails.films.length > 0 && (
                  <View style={[Styles.propertyView, {marginTop: 15}]}>
                    <Text style={Styles.propertyLabel}>
                      {'films: '.toUpperCase()}
                    </Text>
                    <View>
                      {map(characterDetails.films, item => (
                        <Text key={item} style={Styles.propertyLabel}>
                          {item.toUpperCase()}
                        </Text>
                      ))}
                    </View>
                  </View>
                )}
                {characterDetails.vehicles.length > 0 && (
                  <View style={[Styles.propertyView, {marginVertical: 5}]}>
                    <Text style={Styles.propertyLabel}>
                      {'vehicles: '.toUpperCase()}
                    </Text>
                    <View>
                      {map(characterDetails.vehicles, item => (
                        <Text key={item} style={Styles.propertyLabel}>
                          {item.toUpperCase()}
                        </Text>
                      ))}
                    </View>
                  </View>
                )}
                {characterDetails.starships.length > 0 && (
                  <View style={[Styles.propertyView, {marginVertical: 5}]}>
                    <Text style={Styles.propertyLabel}>
                      {'Starships: '.toUpperCase()}
                    </Text>
                    <View>
                      {map(characterDetails.starships, item => (
                        <Text key={item} style={Styles.propertyLabel}>
                          {item.toUpperCase()}
                        </Text>
                      ))}
                    </View>
                  </View>
                )}
              </Animated.ScrollView>
            )}
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
  cardView: {
    backgroundColor: '#50505099',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 20,
    width: '100%',
  },
  propertyView: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  propertyLabel: {
    // fontFamily: fontFamily.MOONHOUSE,
    color: '#FFF',
    fontSize: 16,
    marginVertical: 5,
    marginRight: 15,
  },
  titleLabel: {
    fontFamily: fontFamily.MOONHOUSE,
    color: '#FFF',
    fontSize: 34,
    marginBottom: 10,
  },
});
