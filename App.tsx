
import React, { useCallback, useState } from 'react';
import { Animated, SafeAreaView, StyleSheet, View } from 'react-native';


import {
  GestureHandlerRootView
} from 'react-native-gesture-handler';
import Logger from './src/components/Logger';
import NewScale from './src/components/NewScale';
import NewSlider from './src/components/NewSlider';
import { scale } from './src/utils/scale';

const maxScale = 110

export default () => {

  const [amount, setAmount] = useState(10)
  const [scaleArr] = useState(scale(maxScale).reverse().map(item => ({ val: item, animation: new Animated.Value(0) })))


  let stylearr = scaleArr.map((item) => {
    if (item.val % 10 == 0)
      return ({
        rstyle: {
          transform: [
            {
              scale: item.animation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.2],
                extrapolate: 'clamp'
              })
            },],
          color: item.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ["white", "#AFFFA2"],
            extrapolate: 'clamp'
          })
        }
      })
    else if (item.val % 2 == 0) return ({
      rstyle: {
        transform: [
          {
            scale: item.animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1.2],
              extrapolate: 'clamp'
            })
          }
        ],
        color: item.animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["black", "#AFFFA2"],
          extrapolate: 'clamp'
        })
      }
    })
    else return ({
      rstyle: {
        transform: [
          {
            scale: item.animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1.2]
            })
          }
        ],
        color: item.animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["black", "#AFFFA2"]
        }),
        fontSize: item.animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 10]
        }),
      }
    })
  })



  const getIndi = (index:number) => {

    let indi;
    let element;
    if (index <= 0) {
      indi = 100;
      element = scaleArr[indi]
    }
    else if (index >= 100) {
      indi = 0
      element = scaleArr[indi]
    }
    else {
      indi = (100 - index) - 1
      element = scaleArr[indi]
    }
    return { indi, element }
  }
  let lastIndi = 101

  const onEnd = useCallback((i:number) => {
    const { indi, element } = getIndi(i)



    if (lastIndi > indi)
      scaleArr.slice(indi + 2, 101).forEach((item, index) => {
        Animated.timing(item.animation, {
          toValue: 0,
          duration: 1,
          useNativeDriver: false
        }).start()
      })
    else
      scaleArr.slice(0, indi - 1).forEach((item, index) => {
        Animated.timing(item.animation, {
          toValue: 0,
          duration: 1,
          useNativeDriver: false
        }).start()

      })

    lastIndi = indi

    if (element)
      setAmount(element.val)


  }
    , [])
  const upadteAnimation = (index: number) => {


    const { indi, element } = getIndi(index)

    if (element && element.animation) {
      Animated.timing(element.animation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false
      }).start()
    }

  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1E1E1E" }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.innerContainer}>
          <NewScale scaleArr={scaleArr} stylearr={stylearr} />
          <NewSlider  upadteAnimation={upadteAnimation} onEnd={onEnd} />
          <Logger amount={amount} />
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer:{ height: 700, 
            backgroundColor: "#1E1E1E", 
            marginTop: 50, 
            flexDirection: "row",
             justifyContent: "space-between" }
});