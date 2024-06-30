import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function TutorCard({ tutor }) {
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={{
            width: 195,
            backgroundColor: "#4B0082",
            borderRadius: 10,
            elevation: 5
        }} onPress={() => {
            navigation.navigate("TutorDetail", {
                tutor: tutor.item
            })
        }}>
            <View style={{
                width: "100%",
                alignItems: "center",
                paddingVertical: 10
            }}>
                <Image source={{ uri: tutor.item.image_url }} style={{
                    width: 80,
                    height: 80,
                    borderRadius: 99
                }} />
            </View>
            <View style={{
                width: "100%",
                alignItems: "center"
            }}>
                <Text style={{
                    fontFamily: "outfit-bold",
                    color: "white",
                    fontSize: 25
                }} >
                    {tutor.item.user_name}
                </Text>
            </View>
            <View style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                paddingVertical: 8
            }}>
                <Text style={{
                    fontFamily: "outfit-medium",
                    color: "white",
                    fontSize: 16
                }} >
                    {tutor.item.courses.length} Lesson{tutor.item.courses.length > 1 ? "s" : ""}
                </Text>
                <View style={{
                    padding: 10,
                    backgroundColor: "white",
                    borderRadius: 99
                }}>
                    <Ionicons name="book" size={30} color="#4B0082" />
                </View>


            </View>
        </TouchableOpacity>

    )
}
