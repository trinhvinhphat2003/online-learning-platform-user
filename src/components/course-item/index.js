import { useState } from "react";
import { View, Image, StyleSheet, Text, FlatList, Dimensions } from "react-native";
import color from "../../themes/common/color";
import { Ionicons } from "@expo/vector-icons";

export default function CourseItem({ item }) {
    return (
        <View style={{
            backgroundColor: color.WHITE,
            padding: 10,
            borderRadius: 15,
            elevation: 3
        }}>
            <Image source={{
                uri: item.image
            }} style={styles.itemImage} />
            <View style={{
                padding: 7,
                width: 210
            }}>
                <Text style={{
                    fontFamily: "outfit-medium",
                    fontSize: 17
                }} numberOfLines={1}>{item.title}</Text>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>

                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        marginTop: 5
                    }}>
                        <Ionicons name="book-outline" size={18} color={color.BLACK} />
                        <Text style={{
                            fontFamily: "outfit"
                        }}>{item.lessonCount} Lessions</Text>
                    </View>

                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        marginTop: 5
                    }}>
                        <Ionicons name="time-outline" size={18} color={color.BLACK} />
                        <Text style={{
                            fontFamily: "outfit",
                        }}>{item.hour} Hours</Text>
                    </View>

                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    itemImage: {
        width: 210,
        height: 120,
        borderRadius: 15
    }
});