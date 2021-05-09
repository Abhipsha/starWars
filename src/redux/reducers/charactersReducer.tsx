import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {CharacterType} from '../../utils';

const {Types, Creators} = createActions({
  getCharacterList: [],
  getCharacterListSuccess: ['characterList'],
  getCharacterListFailed: [],
  getCharacterDetails: ['character'],
  getCharacterDetailsSuccess: ['characterDetail'],
});
export const CharacterActionTypes = Types;
export default Creators;

export interface Charaters {
  characterList: CharacterType[];
  characterDetail?: CharacterType;
  loading: boolean;
}

const initialCharaterState: Charaters = {
  characterList: [],
  characterDetail: undefined,
  loading: false,
};

export const INITIAL_STATE = Immutable(initialCharaterState);

const getCharacterList = (state = INITIAL_STATE) => {
  return {...state, loading: true};
};
const getCharacterListSuccess = (state = INITIAL_STATE, action: any) => {
  return {...state, loading: false, characterList: action.characterList};
};
const getCharacterListFailed = (state = INITIAL_STATE) => {
  return {...state, loading: true};
};
const getCharacterDetails = (state = INITIAL_STATE) => {
  return {...state, loading: true, characterDetail: undefined};
};
const getCharacterDetailsSuccess = (state = INITIAL_STATE, action: any) => {
  return {...state, loading: false, characterDetail: action.characterDetail};
};
export const charactersReducer = createReducer(INITIAL_STATE, {
  [Types.GET_CHARACTER_LIST]: getCharacterList,
  [Types.GET_CHARACTER_LIST_SUCCESS]: getCharacterListSuccess,
  [Types.GET_CHARACTER_LIST_FAILED]: getCharacterListFailed,
  [Types.GET_CHARACTER_DETAILS]: getCharacterDetails,
  [Types.GET_CHARACTER_DETAILS_SUCCESS]: getCharacterDetailsSuccess,
});
