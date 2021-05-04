import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {AppNavigator} from './src/navigation/AppNavigator';
import {PersistGate} from 'redux-persist/integration/react';
import createStore from './src/redux/reducers/index';
import {Provider} from 'react-redux';

const App = () => {
  const {store, persistor} = createStore();
  const [appStore, setAppStore] = useState(store);
  const [appPersistor, setAppPersistor] = useState(persistor);
  return (
    <Provider store={appStore}>
      <PersistGate persistor={appPersistor}>
        <SafeAreaView style={{flex: 1}}>
          <AppNavigator />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};
export default App;
