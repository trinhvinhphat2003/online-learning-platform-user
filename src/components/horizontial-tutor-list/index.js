import { useState } from "react";
import { View, Image, StyleSheet, Text, FlatList, Dimensions, TouchableOpacity, ActivityIndicator } from "react-native";
import color from "../../themes/common/color";
import { Ionicons } from "@expo/vector-icons";
import CourseItem from "../course-item";
import { useNavigation } from "@react-navigation/native";
import { mockCourse } from "../../mock-data-support/course";
import { mockTutos } from "../../mock-data-support/tutors";
import TutorCard from "../tutor-card";

export default function HorizontialTutorList({ subHeadingColor, isPrimary, title, tutors, navigateTo, loading }) {

    const navigation = useNavigation()
    return (
        <View style={{}}>
            <View style={{
                paddingHorizontal: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row"
            }}>
                <Text style={{
                    fontFamily: "outfit-bold",
                    fontSize: 24,
                    color: subHeadingColor
                }}>{title}</Text>
                <TouchableOpacity 
                onPress={() => {
                    navigation.navigate(navigateTo)
                }}
                style={{
                    width: 80,
                    backgroundColor: isPrimary ? color.PRIMARY : "white",
                    padding: 10,
                    borderRadius: 30
                }}>
                    <Text style={{
                        fontFamily: "outfit-bold",
                        color: isPrimary ? "white" : "black"
                    }}>
                        See More
                    </Text>
                </TouchableOpacity>
            </View>

            {
                loading ?
                    (
                        <View style={{
                            height: 230,
                            width: "100%"
                        }}>
                            <ActivityIndicator size="large" color={color.BLACK} style={{ marginTop: 20, alignSelf: "center" }} />
                        </View>
                    )
                    :
                    (
                        <FlatList
                            contentContainerStyle={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 3, paddingRight: 3 }}
                            data={tutors}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <View style={{
                                    paddingHorizontal: 10
                                }}>
                                    <TutorCard tutor={{item: item}}/>
                                </View>
                                
                            )}
                        />
                    )
            }
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