import React, { useEffect, useState } from 'react';
import { View } from 'react-native'
import { PanGestureHandler , PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated , {event, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import { cusor as Cursor, down as Down, upward as Up} from '../../assets';


type NewSlider = {
    upadteAnimation?: (x:number)=>void;
    onEnd?: (x:number)=>void;
  };

const NewSlider:React.FC<NewSlider> =({upadteAnimation,onEnd}) => {

    const range = 564
    const max = 572

    const translateY = useSharedValue(648);

    const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent,ContextType>({
        onStart:(event, context) => {
              context.translateY = translateY.value
              const item = Math.round(((640 - translateY.value)/648)*100+10)
              runOnJS(upadteAnimation)(item-10)
          },
        onActive:(event,context)=>{
                     translateY.value = event.translationY + context.translateY;
                     const index = Math.round(((640 - translateY.value)/648)*100)
                    //  console.log("index",index)
                     runOnJS(upadteAnimation)(index)
                     
        },
        onEnd:(event)=>{
            if(translateY.value>648)
                    translateY.value = 640
            else if(translateY.value<0)
                    translateY.value = -8
                    const index = Math.round(((640 - translateY.value)/648)*100)
                    runOnJS(onEnd)(index)
        }
    })

    const rstyle = useAnimatedStyle(()=>{
            return {
                transform:[
                    {
                        translateY:translateY.value
                    }
                ]
            };
    });

    return (
        <View style={{marginTop:15}}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
                <Animated.View style={[{alignItems:"center",height:36,width:20},rstyle]}>
                   <Up/>
                   <Cursor height={25}/>
                   <Down/>
                </Animated.View>    
            </PanGestureHandler>
            </View> 
    );
}

export default NewSlider;