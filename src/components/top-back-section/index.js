import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function TopBackSection({headerTxt}) {
    const navigation = useNavigation()
    return (
        <View style={{
            padding: 20,
            backgroundColor: "white",
            elevation: 3
        }}>
            <TouchableOpacity style={{
                gap: 20,
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
            }} onPress={() => {
                navigation.goBack()
            }}>
                <Ionicons name="arrow-back-circle" size={40} color="black" />
                <Text style={{
                    fontFamily: "outfit-bold",
                    fontSize: 25
                }}>
                    {headerTxt}
                </Text>
            </TouchableOpacity>
        </View>
    )
}
