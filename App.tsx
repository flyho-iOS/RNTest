/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  StyleSheet,
  View,
} from 'react-native';

import { DataManager } from './manager/manager';

function App(): React.JSX.Element {

  const dataManager = DataManager.getInstance();

  useEffect(() => {
    dataManager.getData();
  }, []);

  const onClear = () => {
    dataManager.clearCache();
    dataManager.getData();
  };

  return (
    <View style={styles.container}>
      <Button
        title={'clear cache'}
        color="#000"
        onPress={onClear}
      />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default App;
