import React from 'react'
import { Text, TouchableOpacity, View, Image } from 'react-native'
import { Feather } from '@expo/vector-icons';


export default function StudentProfileCourse({ img, title, bg, onPress }) {

    return (
        <TouchableOpacity
            onPress={onPress}

            style={{
                flexDirection: "row",
                backgroundColor: bg,
                padding: 20,
                marginHorizontal: 20,
                borderRadius: 20,
                alignItems: "center",
                marginTop: 10,
                elevation: 3,
                justifyContent: "space-between"
            }}
        >
            <View style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 0
            }}>
                <Image
                    source={{ uri: img }}
                    style={{ width: 50, height: 50, borderRadius: 10 }}
                />

                <View>
                    <Text style={{
                        color: "#345c74",
                        fontFamily: "outfit-bold",
                        fontSize: 13,
                        paddingHorizontal: 20,
                        width: 240
                    }}>{title}
                    </Text>
                    <Text style={{
                        color: "#f58084",
                        fontFamily: "outfit-medium",
                        fontSize: 12,
                        paddingHorizontal: 20
                    }}>
                        10 hours, 19 lessons
                    </Text>
                </View>
            </View>

            <Feather name="play-circle" size={45} color="#345c74" />

        </TouchableOpacity>
    )
}