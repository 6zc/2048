import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Alert
} from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Item from './item' // Item components
import Updater from './move' //Functions for merging rows/columns and generate new item.
import RetryButton from './retryButton';
//TODO
//限制滑动范围

const Board = props => {
  const initList = Updater.generateRandom(new Array(16).fill(0))
  const setScore = props.setScore
  const [itemList, setItemList] = useState(initList)
  const [offset, setOffset] = useState({x:0,y:0})
  const [direction, setDirection] = useState(0) //0:水平，1:垂直
  // setScore(Updater.getScore())
  const gesture = Gesture.Pan()
    .onStart((e) => {
      setDirection(Math.abs(e.translationX) > Math.abs(e.translationY) ? 0:1)
    })
    .onChange((e) => {  
      setOffset({
        x: direction ? 0 : e.changeX + offset.x,
        y: direction ? e.changeY + offset.y : 0,
      });
    })
    .onEnd(() => {
      direction ? 
      setItemList(offset.y>0 ? Updater.moveDown(itemList):Updater.moveUp(itemList)) :
      setItemList(offset.x>0 ? Updater.moveRight(itemList):Updater.moveLeft(itemList))
      setOffset({x:0,y:0})
      setScore(Updater.getScore())
      const newList = Updater.generateRandom(itemList)
      if(!newList){
        Alert.alert('You lose!\n Score '+ Updater.getScore())
        Updater.onFailing()
        setItemList(Updater.generateRandom(new Array(16).fill(0)))
        setScore(Updater.score)
      }else{
        setItemList(newList)
      }
    });
  const onRetry = () => {
    Updater.onFailing()
    setItemList(Updater.generateRandom(new Array(16).fill(0)))
    setScore(Updater.getScore())
  }

  return (
    <View>
      <GestureDetector gesture={gesture}>
        <View style={styles.container}>
          <View style={styles.baseBoard}>
          {
            [0,1,2,3].map( value =>
              <View key={value} style={styles.line}>
                {[0,1,2,3].map( value => <View key={value} style={styles.backgroundItems}></View>)}
              </View>
            )
          }
          {
            itemList.map( (item, index) =>
              item ? <Item key={index} pos={index} value={item} offset={offset}/> : null
            )
          }
          </View>
        </View>
      </GestureDetector>
      <RetryButton onPress={onRetry}></RetryButton>
    </View>
  )
}

const styles = StyleSheet.create({
  baseBoard:{
    width:320,
    height:320,
    backgroundColor:'#dddddd',
    flexDirection:'column',
    justifyContent:'space-around',
    margin:5,
    position:'relative',
    overflow: 'hidden'
  },
  backgroundItems:{
    width:70,
    height:70,
    backgroundColor:'#aaaaaa',
    borderRadius:9
  },
  line:{
    flexDirection:'row',
    justifyContent:'space-around',
    width:320
  },
  container:{
    alignItems:'center',
    flexDirection:'column'
  }
});

export default Board;
