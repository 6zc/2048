import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const ScoreBoard = props => {
  const score = props.score
  return (
    <View style={styles.Wrapper}>
      <Text style={styles.Title}>{'Score'}</Text>
      <View style={styles.Score}>
        <Text style={styles.Text}>{score}</Text>
      </View>
    </View>
    
  )
}

const styles = StyleSheet.create({
  Title:{
    fontFamily: "Cochin",
    fontWeight: "bold",
    fontSize:40
  },
  Wrapper:{
    top:40,
    alignItems:'center',
    justifyContent:'center',
  },
  Score:{
    width:210,
    height:80,
    borderRadius:15,
    borderColor:'#999999',
    borderWidth:4,
    margin:5,
    backgroundColor:'#FAF0E6',
    alignItems:'center',
    justifyContent:'center',
  },
  Text:{
    fontFamily: "Cochin",
    fontWeight: "bold",
    fontSize:50
  }
});

export default ScoreBoard;