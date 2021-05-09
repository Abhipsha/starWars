import {call, fork, takeLatest, put} from 'redux-saga/effects';
import {characterService} from '../../services';
import {CharacterType} from '../../utils';
import {CharacterActionTypes} from '../reducers/charactersReducer';

function* getCharacterList(): any {
  try {
    const charList = yield call(characterService.getAllStarwarsPeople);
    yield put({
      type: CharacterActionTypes.GET_CHARACTER_LIST_SUCCESS,
      characterList: charList,
    });
  } catch (error) {}
}

function* getCharacterDetails(action: {
  type: string;
  character: CharacterType;
}): any {
  try {
    const {character} = action;
    const filmList = yield call(
      characterService.getCharacterFilms,
      character.films,
    );
    const specieList = yield call(
      characterService.getCharacterSpecies,
      character.species,
    );
    const starshipList = yield call(
      characterService.getCharacterStartships,
      character.starships,
    );
    const vehicleList = yield call(
      characterService.getCharacterVehicles,
      character.vehicles,
    );

    const homeworld = yield call(
      characterService.getCharacterHomeworld,
      character.homeworld,
    );

    const characterDetail: CharacterType = {
      ...character,
      homeworld,
      films: filmList,
      species: specieList,
      starships: starshipList,
      vehicles: vehicleList,
    };

    yield put({
      type: CharacterActionTypes.GET_CHARACTER_DETAILS_SUCCESS,
      characterDetail,
    });
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
  }
}

function* getCharacterListListner() {
  yield takeLatest(CharacterActionTypes.GET_CHARACTER_LIST, getCharacterList);
}

function* getCharacterDetailsListener() {
  yield takeLatest(
    CharacterActionTypes.GET_CHARACTER_DETAILS,
    getCharacterDetails,
  );
}

export function* charactersSaga() {
  yield fork(getCharacterListListner);
  yield fork(getCharacterDetailsListener);
}
