import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer, Persistor} from 'redux-persist';
import createSagaMiddleWare from 'redux-saga';
import {applyMiddleware, createStore, Store} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
export let store: Store;
export let persistor: Persistor;
const config = {
  key: 'root',
  storage: AsyncStorage,
};
export default (rootReducer: any, rootsaga: any) => {
  const persistedReducer = persistReducer(config, rootReducer);
  const sagaMiddleWare = createSagaMiddleWare();
  const enhancer = composeWithDevTools(applyMiddleware(sagaMiddleWare));
  store = createStore(persistedReducer, enhancer);
  persistor = persistStore(store);
  sagaMiddleWare.run(rootsaga);
  return {store, persistor};
};
