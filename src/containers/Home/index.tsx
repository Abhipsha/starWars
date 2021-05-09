/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StateType} from '../../redux/reducers';
import {fontFamily, Images} from '../../assets/index';
import {PersonCard} from '../../components/PersonCard';
import {ScreenNames} from '../../navigation/constants';
import {CharacterType, filterCharacters} from '../../utils';
import {CharacterActionTypes} from '../../redux/reducers/charactersReducer';
import {map, pull, uniq} from 'lodash';

export const Home = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeGenderFilters, setActiveGenderFilters] = useState<string[]>([]);
  const [activeSkinColorFilters, setActiveSkinColorFilters] = useState<
    string[]
  >([]);
  const [activeHairColorFilters, setActiveHairColorFilters] = useState<
    string[]
  >([]);

  const filteredCharacterList = useSelector((state: StateType) =>
    filterCharacters(state, {
      genderFilter: activeGenderFilters,
      skinColorFilter: activeSkinColorFilters,
      hairColorFilter: activeHairColorFilters,
    }),
  );
  const characterList = useSelector(
    (state: StateType) => state.character.characterList,
  );

  const loading = useSelector((state: StateType) => state.character.loading);

  const skinColorList = uniq(
    map(characterList, character => character.skin_color),
  );

  const hairColorList = uniq(
    map(characterList, character => character.hair_color),
  );

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const setGenderFilter = (gender: 'male' | 'female') => {
    const genderFilter = activeGenderFilters;
    if (genderFilter.includes(gender)) {
      pull(genderFilter, gender);
    } else {
      genderFilter.push(gender);
    }
    setActiveGenderFilters(genderFilter);
    setShowFilterModal(false);
  };

  const setSkinColorFilter = (skinColor: string) => {
    const skinColorFilter = activeSkinColorFilters;
    if (skinColorFilter.includes(skinColor)) {
      pull(skinColorFilter, skinColor);
    } else {
      skinColorFilter.push(skinColor);
    }
    setActiveSkinColorFilters(skinColorFilter);
    setShowFilterModal(false);
  };

  const setHairColorFilter = (hairColor: string) => {
    const hairColorFilter = activeHairColorFilters;
    if (hairColorFilter.includes(hairColor)) {
      pull(hairColorFilter, hairColor);
    } else {
      hairColorFilter.push(hairColor);
    }
    setActiveHairColorFilters(hairColorFilter);
    setShowFilterModal(false);
  };

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
          <View style={Styles.loaderBackdrop}>
            <ActivityIndicator size="large" color="#FFFA" />
          </View>
        </Modal>
        <SafeAreaView
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Image
              source={Images.logo}
              style={{width: 100, height: 48}}
              resizeMode="contain"
            />
          </View>
          <View style={{flex: 8, width: '90%'}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={filteredCharacterList}
              renderItem={renderPersonCard}
              keyExtractor={item => `${item.url}`}
            />
          </View>
        </SafeAreaView>
        <TouchableOpacity
          onPress={() => {
            setShowFilterModal(true);
          }}
          style={Styles.filterButton}>
          <Ionicons name="filter" style={{fontSize: 30, marginLeft: 3}} />
        </TouchableOpacity>
        <Modal transparent visible={showFilterModal} animationType="slide">
          <View style={Styles.filterbackdrop}>
            <TouchableOpacity
              style={{flex: 1, width: '100%'}}
              onPress={() => setShowFilterModal(false)}
            />
            <View pointerEvents="box-none" style={Styles.filterContainer}>
              <Text style={Styles.filterTitle}>FILTER</Text>
              <Text style={Styles.filterLabel}>GENDER</Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => setGenderFilter('male')}
                  style={[
                    Styles.filterTag,
                    {
                      backgroundColor: activeGenderFilters.includes('male')
                        ? '#FFF'
                        : 'transparent',
                    },
                  ]}>
                  <Text
                    style={[
                      Styles.filterTagText,
                      {
                        color: activeGenderFilters.includes('male')
                          ? '#1a1a1a'
                          : '#FFF',
                      },
                    ]}>
                    MALE
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setGenderFilter('female')}
                  style={[
                    Styles.filterTag,
                    {
                      backgroundColor: activeGenderFilters.includes('female')
                        ? '#FFF'
                        : 'transparent',
                    },
                  ]}>
                  <Text
                    style={[
                      Styles.filterTagText,
                      {
                        color: activeGenderFilters.includes('female')
                          ? '#1a1a1a'
                          : '#FFF',
                      },
                    ]}>
                    FEMALE
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={Styles.filterLabel}>SKIN COLOR</Text>
              <FlatList
                horizontal
                data={skinColorList}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => setSkinColorFilter(item)}
                    style={[
                      Styles.filterTag,
                      {
                        backgroundColor: activeSkinColorFilters.includes(item)
                          ? '#FFF'
                          : 'transparent',
                      },
                    ]}>
                    <Text
                      style={[
                        Styles.filterTagText,
                        {
                          color: activeSkinColorFilters.includes(item)
                            ? '#1a1a1a'
                            : '#FFF',
                        },
                      ]}>
                      {item.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item}
              />
              <Text style={Styles.filterLabel}>HAIR COLOR</Text>
              <FlatList
                horizontal
                data={hairColorList}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => setHairColorFilter(item)}
                    style={[
                      Styles.filterTag,
                      {
                        backgroundColor: activeHairColorFilters.includes(item)
                          ? '#FFF'
                          : 'transparent',
                      },
                    ]}>
                    <Text
                      style={[
                        Styles.filterTagText,
                        {
                          color: activeHairColorFilters.includes(item)
                            ? '#1a1a1a'
                            : '#FFF',
                        },
                      ]}>
                      {item.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item}
              />
            </View>
          </View>
        </Modal>
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
  loaderBackdrop: {
    flex: 1,
    width: '100%',
    backgroundColor: '#1a1a1a80',
    justifyContent: 'center',
  },
  filterTitle: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 24,
    fontFamily: fontFamily.MOONHOUSE,
  },
  filterbackdrop: {
    backgroundColor: '#1a1a1a80',
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  filterContainer: {
    height: 350,
    width: '95%',
    padding: 25,
    backgroundColor: '#707070',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  filterLabel: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: fontFamily.MOONHOUSE,
    marginTop: 10,
  },
  filterButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  filterTag: {
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 20,
    padding: 10,
    margin: 10,
    height: 35,
  },
  filterTagText: {fontFamily: fontFamily.MOONHOUSE, color: '#fff'},
});
