import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

import Main from './src/Main';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <Main />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;
