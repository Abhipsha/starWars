import {all} from 'redux-saga/effects';
import {charactersSaga} from './charactersSaga';
export default function* root(): any {
  return yield all([charactersSaga()]);
}
