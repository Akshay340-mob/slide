import React, { useEffect, useState } from 'react'
import { View ,Text, Animated, StyleSheet} from 'react-native'
import { scale } from '../utils/scale'

type NewScale={
    scaleArr?:any
    stylearr?:any
}

const NewScale:React.FC<NewScale>= ({scaleArr,stylearr}) => {

    return (
        <View style={styles.container}>
            
            {scaleArr.map((item:any,index:number)=>{

                if(item.val%10 == 0) return (
                <View key={item.val} style={styles.edgeContainer}>
                    <Animated.Text 
                    style={[{color:'white',fontSize:14},stylearr[index]?.rstyle||{}]}>{item.val}</Animated.Text>
                    <Animated.View style={styles.mainScale}/>
                </View>)
                else if(item.val%2 ==0) return (<View key={item.val}
                    style={styles.edgeContainer}>
                    <Animated.Text style={[{fontSize:6},stylearr[index].rstyle]}>{item.val}</Animated.Text>
                    <Animated.View style={[styles.mainScale,{width:15}]}/>
                </View>)
               else  return(<Animated.Text key={item.val} style={[{fontSize:0,marginLeft:10},stylearr[index].rstyle]}>{item.val}</Animated.Text>)
            })}
        </View>
    );
}

const styles=StyleSheet.create({
    container:{flex:1,
                    marginTop:15,
                        marginLeft:20},

    edgeContainer:{flexDirection:"row",
                        alignItems:"center",
                            justifyContent:"space-between",
                                marginVertical:0},

    mainScale:{width:30,height:2,backgroundColor:"#FFFFFF"}                            
})

export default NewScale;