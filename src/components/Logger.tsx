import React from 'react';
import { View , Text , StyleSheet} from 'react-native'
import { Info , Edit } from '../../assets';

type Label={
    title?:string,
    type?:string,
    style?:any
}


type Value={
    data?:number | string,
    type?:string,
    style?:any
}

type Logger={
    amount?:number
}

const Label:React.FC<Label>=({title,type,style})=>{
        return(<View style={styles.lable}>
            <Text style={[styles.title,style]}>{title}</Text>
            {type=="tenure"?<Info style={styles.iconStyle}/>:type == "amount"?<Edit style={styles.iconStyle}/>:null}
        </View>)
}

const Value:React.FC<Value>=({data,style,type})=>{
        return(<Text style={[styles.value,style]}>{data}</Text>)
}



const Logger:React.FC<Logger> = ({amount}) => {
    return (
        <View style={{flex:1,alignItems:"flex-start",justifyContent:"center",marginLeft:50}}>
                <Label title="Loan Tenure" type = "tenure"/>
                <Value data="6 Months"/>

                <View style={{marginVertical:100}}>
                    <Label title="Loan Amount" type = "amount"/>
                    <Value data={amount?`₹ ${amount*10000}`:"₹ 10000"} style={{color:"#AFFFA2"}}/>
                </View>

                <View style={styles.lable}>
                    <Label title="EMI"/><Label title=' @18% p.a.' style={{color:"#FFFFFF"}}/>
                </View>
                <Value data= "₹ 2953"/>

        </View>
    );
}

const styles =  StyleSheet.create({
    title:{
        fontSize:18,
        color:"#909090"
    },
    value:{
        fontSize:22,
        color:"#FFFFFF"
    },
    lable:{
        flexDirection:'row',
        alignItems:"center",
    },
    iconStyle:{
        marginLeft:10
    }

})

export default Logger;