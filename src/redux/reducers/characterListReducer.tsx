import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';

const {Types, Creators} = createActions({
  getCharacterList: [],
  getCharacterListSuccess: [],
  getCharacterListFailed: [],
});
export const CharacterTypes = Types;
export default Creators;

export interface Charaters {
  characterList: Array<number>;
  loading: boolean;
}

const initialCharaterState: Charaters = {
  characterList: [1, 2, 3, 4],
  loading: false,
};

export const INITIAL_STATE = Immutable(initialCharaterState);

const getCharacterList = (state = INITIAL_STATE, action) => {
  return {...state, loading: true};
};
const getCharacterListSuccess = (state = INITIAL_STATE, action) => {
  return {...state, loading: false};
};
const getCharacterListFailed = (state = INITIAL_STATE, action) => {
  return {...state, loading: true};
};
export const characterListReducer = createReducer(INITIAL_STATE, {
  [Types.GET_CHARACTER_LIST]: getCharacterList,
  [Types.GET_CHARACTER_LIST_SUCCESS]: getCharacterListSuccess,
  [Types.GET_CHARACTER_LIST_FAILED]: getCharacterListFailed,
});
