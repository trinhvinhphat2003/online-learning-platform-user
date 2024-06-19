import React from 'react'
import {View,Text,Image,TouchableOpacity} from 'react-native'

export default function Chapters({title,num, duration, percent, color, onPress}){
        return(
           <View
                onPress={onPress}
                style={{
                    flexDirection:"row",
                    padding:20,
                    marginHorizontal:20,
                    borderRadius:20,
                    alignItems:"center",
                }}
           >
               <View style={{
                   backgroundColor:color,
                   paddingVertical:5,
                   paddingHorizontal:10,
                   borderRadius:6
               }}>
                   <Text style={{
                       fontSize:10,
                       fontFamily:"outfit-bold"
                   }}>{num}</Text>
               </View>
               <View>
                   <Text style={{
                       color:"#345c74",
                       fontFamily:"outfit-bold",
                       fontSize:13,
                       paddingLeft:20,
                       width:300
                   }}>
                       {title}
                   </Text>
                   <Text style={{
                       color:"#f58084",
                       fontSize:12,
                       fontFamily:"outfit-medium",
                       paddingLeft:20
                   }}>
                       {duration}
                   </Text>
               </View>
           </View>
        )
}