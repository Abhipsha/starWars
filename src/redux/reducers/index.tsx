import {combineReducers} from 'redux';
import configureStore from './createStore';
import CharacterListActions, {
  charactersReducer,
  CharacterTypes,
  Charaters,
} from './charactersReducer';
import rootSaga from '../saga/index';

export default () => {
  const appReducer = combineReducers({
    character: charactersReducer,
  });
  const rootReducer = (state: any, action: any) => {
    return appReducer(state, action);
  };
  return configureStore(rootReducer, rootSaga);
};
export {CharacterTypes};
export {CharacterListActions};

export interface StateType {
  character: Charaters;
}
