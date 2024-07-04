import { useCallback, useContext, useState } from "react";
import { View, Image, StyleSheet, Text, FlatList, Dimensions, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import color from "../../themes/common/color";
import { Ionicons } from "@expo/vector-icons";
import CourseItem from "../course-item";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import HorizontalCourseCard from "./horizontal-course-card";
import { apiConfig } from "../../config/api-config";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const BASE_URL = apiConfig.baseURL

export default function VerticalVideoList({ subHeadingColor, isPrimary, title, hiddenTitle, containerStyle, noSepLine, courses, navigateTo, scrollableStyle, loading, titleStyle }) {

    const { userData, session } = useContext(AuthContext)
    const [enrolledCourses, setEnrolledCourses] = useState([])

    async function handleIsCourseEnrolled() {
        try {
            const response = await axios.get(`${BASE_URL}/api/user/getEnroll`, {
                headers: {
                    Authorization: `Bearer ${session.token}`,
                }
            });

            if (response.data.success) {
                //console.log(JSON.stringify(response.data, undefined, 4));
                setEnrolledCourses(response.data.enrollData)
            } else {
            }
        } catch (error) {
            Alert.alert("Error", error.response?.data?.message || "An error occurred. Please try again.");
            console.log(JSON.stringify(error, undefined, 4))
        }
    }

    // useFocusEffect(
    //     useCallback(() => {
    //         handleIsCourseEnrolled()
    //     }, [])
    // )

    const renderLineDevider = (style, color) => {
        return (
            <View style={!noSepLine ? {
                width: "100%",
                height: 2,
                backgroundColor: color ? color : '#D3D3D3',
                ...style
            } : {}}>

            </View>
        )
    }

    const navigation = useNavigation()
    return (
        <View style={{ ...containerStyle }}>
            {!hiddenTitle && <View style={{
                paddingHorizontal: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                ...titleStyle
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
            </View>}

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
                            contentContainerStyle={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20 }}
                            data={courses}
                            horizontal={false}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <HorizontalCourseCard enrolledCourses={enrolledCourses} course={item} containerStyle={{

                                }} />
                            )}
                            ItemSeparatorComponent={() => (
                                renderLineDevider({ marginTop: 15, marginBottom: 20 })
                            )}
                            style={scrollableStyle && {
                                ...scrollableStyle
                            }}
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