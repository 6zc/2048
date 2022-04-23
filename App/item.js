import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
} from 'react-native-reanimated';
import getColor from './colors';


const Item = props => {
  const value = props.value
  const pos = parseInt(props.pos)
  const offset = props.offset
  const animatedStyles = useAnimatedStyle(() => {
    return {
      top:Math.floor(pos/4)*80,
      left:(pos%4)*80,
      transform: [
        { translateX: offset.x },
        { translateY: offset.y },
      ],
    };
  });

  return (
    <Animated.View style={[styles.Item, animatedStyles, {backgroundColor:getColor(value)}]}>
      <Text style={styles.Text}>{value}</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  Item:{
    width:70,
    height:70,
    margin:5,
    top:160,
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    borderRadius:9
  },
  Text:{
    fontSize:28,
    fontFamily: "Cochin",
    fontWeight: "bold",
  }
});

export default Item;
