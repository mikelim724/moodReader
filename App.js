import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Camera from './components/camera.js'
import LoginNav from './components/navigation'
import {Provider} from 'react-redux'
import store from './components/redux/index'

export default function App() {
  return (
    <Provider store={store}>
       { /* <Camera /> */}
      <LoginNav />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
