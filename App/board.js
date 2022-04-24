import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import Item from './item'; // Item components
import Updater from './move'; //Functions for merging rows/columns and generate new item.
import RetryButton from './retryButton';
//TODO
//限制滑动范围

const updater = new Updater(0);
// const initList = updater.generateRandom(new Array(16).fill(0));
const initList = [4, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
const Board = props => {
  let win = false
  const setScore = props.setScore;
  const [itemList, setItemList] = useState(initList);
  const [offset, setOffset] = useState({x: 0, y: 0});
  const [ignore, setIgnore] = useState({})
  const [direction, setDirection] = useState(0); //0:水平，1:垂直

  const gesture = Gesture.Pan()
    .onStart(e => {
      setDirection(Math.abs(e.translationX) > Math.abs(e.translationY) ? 0 : 1);
    })
    .onChange(e => {
      setOffset({
        x: direction ? 0 : e.changeX + offset.x,
        y: direction ? e.changeY + offset.y : 0,
      });
    })
    .onEnd(() => {
      if(Math.abs(offset.x+offset.y)<40){
        setOffset({x: 0, y: 0});
        return
      }
      const newList = updater.generateRandom(direction
        ? offset.y > 0
            ? updater.moveDown(itemList)
            : updater.moveUp(itemList)
          
        : offset.x > 0
            ? updater.moveRight(itemList)
            : updater.moveLeft(itemList),
          );
      setOffset({x: 0, y: 0});
      if (!newList) {
        Alert.alert('You lose!\n Score ' + updater.score);
        updater.resetScore();
      }
      setItemList(newList ? newList : updater.generateRandom(new Array(16).fill(0)));
      setScore(newList ? updater.score : 0);
    })
    .onFinalize(()=>{
      setTimeout(()=>setIgnore({}), 400) //Force the component to update after 400ms
    })
  const onRetry = () => {
    updater.resetScore();
    setItemList(updater.generateRandom(new Array(16).fill(0)));
    setScore(0);
  };

  useEffect(()=>{
    // setItemList([])
  })

  return (
    <View>
      <GestureDetector gesture={gesture}>
        <View style={styles.container}>
          <View style={styles.baseBoard}>
            {[0, 1, 2, 3].map(value => (
              <View key={value} style={styles.line}>
                {[0, 1, 2, 3].map(value2 => (
                  <View key={value2} style={styles.backgroundItems} />
                ))}
              </View>
            ))}
            <View style={styles.Items}>
              {itemList.map((item, index) =>
                item ? (
                  <Item key={index} pos={index} value={item} offset={offset} itemList={itemList} />
                ) : null,
              )}
            </View>
          </View>
        </View>
      </GestureDetector>
      <RetryButton onPress={onRetry} />
    </View>
  );
};

const styles = StyleSheet.create({
  Items:{
    // backgroundColor:'#FF0000',
    width: 320,
    height: 320,
    position:'absolute',
    // opacity:0,
    marginTop: -5,

  },
  baseBoard: {
    width: 320,
    height: 320,
    backgroundColor: '#dddddd',
    flexDirection: 'column',
    justifyContent: 'space-around',
    margin: 5,
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundItems: {
    width: 70,
    height: 70,
    backgroundColor: '#aaaaaa',
    borderRadius: 9,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 320,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'column',
  },
});

export default Board;
