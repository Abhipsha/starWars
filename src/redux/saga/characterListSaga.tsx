import {call, fork, takeLatest, put} from 'redux-saga/effects';
import {CharacterListActions, CharacterTypes} from '../reducers';
import {store} from '../reducers/createStore';

function* characterList() {
  try {
  } catch (error) {}
}
function* characterListListner() {
  yield takeLatest(CharacterTypes.CHARACTER_LIST, characterList);
}

export function* characterListSaga() {
  yield fork(characterListListner);
}
