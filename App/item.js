import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {getColor, getHorizontalBound, getVerticalBound} from './colors';

const Item = props => {
  const pos = props.pos;
  const value = props.value;
  const offset = props.offset;
  const itemList = props.itemList;
  const top = Math.floor(pos / 4) * 80;
  const left = (pos % 4) * 80;
  const [leftBound, rightBound] = getHorizontalBound(pos,itemList)
  const [upBound, downBound] = getVerticalBound(pos,itemList)

  console.log(leftBound, rightBound)
  const animatedStyles = useAnimatedStyle(() => {
    return {
      top: top,
      left: left,
      transform: [{translateX: Math.min(rightBound, Math.max(offset.x, leftBound))},
        {translateY: Math.min(downBound, Math.max(offset.y, upBound))}],
    };
  });

  

  return (
    <Animated.View
      style={[styles.Item, animatedStyles, {backgroundColor: getColor(value)}]}>
      <Text style={styles.Text}>{value}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  Item: {
    width: 70,
    height: 70,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    borderRadius: 9,
  },
  Text: {
    fontSize: 28,
    fontFamily: 'Cochin',
    fontWeight: 'bold',
  },
});

export default Item;
