import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';

const RetryButton = props => {
  const onPress = props.onPress;
  return (
    <TouchableHighlight
      onPress={onPress}
      style={styles.Wrapper}
      underlayColor="white">
      <View style={styles.Score}>
        <Text style={styles.Text}>{'Retry'}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    top: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Score: {
    width: 210,
    height: 80,
    borderRadius: 15,
    borderColor: '#999999',
    borderWidth: 4,
    margin: 5,
    backgroundColor: '#FAF0E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    fontFamily: 'Cochin',
    fontWeight: 'bold',
    fontSize: 50,
  },
});

export default RetryButton;
