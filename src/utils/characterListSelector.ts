import {filter} from 'lodash';
import {StateType} from '../redux/reducers';
import {CharacterType} from './types';

export const filterCharacters = (
  state: StateType,
  filters: {
    genderFilter: string[];
    skinColorFilter: string[];
    hairColorFilter: string[];
  },
) => {
  const {characterList} = state.character;
  const filteredList: CharacterType[] = filter(characterList, character => {
    let isGenderMatch = filters.genderFilter.length === 0;
    let isSkinColorMatch = filters.skinColorFilter.length === 0;
    let isHairColorMatch = filters.hairColorFilter.length === 0;
    if (filters.genderFilter.includes(character.gender)) {
      isGenderMatch = true;
    }
    if (filters.skinColorFilter.includes(character.skin_color)) {
      isSkinColorMatch = true;
    }
    if (filters.hairColorFilter.includes(character.hair_color)) {
      isHairColorMatch = true;
    }
    return isGenderMatch && isHairColorMatch && isSkinColorMatch;
  });
  return filteredList;
};
