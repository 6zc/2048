/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import Board from './App/board';
import ScoreBoard from './App/scoreBoard';

const App = () => {
  const [score, setScore] = useState(0);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <ScoreBoard score={score} />
      <View style={styles.boardWrapper}>
        <Board setScore={setScore} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  boardWrapper: {
    height: 330,
    borderRadius: 10,
    top: 90,
    backgroundColor: '#dddddd',
  },
});

export default App;
