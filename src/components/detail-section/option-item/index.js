import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, View } from 'react-native'
import color from '../../../themes/common/color'

export default function OptionItem({icon, text}) {
  return (
    <View style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginTop: 5
    }}>
    <Ionicons name={icon} size={18} color={color.BLACK} />
        <Text style={{
            fontFamily: "outfit"
        }}>{text}</Text>
    </View>
  )
}
