import React, { useCallback, useContext, useState } from 'react'
import { Alert, ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import color from '../../../themes/common/color';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { apiConfig } from '../../../config/api-config';
import { AuthContext } from '../../../context/AuthContext';

const BASE_URL = apiConfig.baseURL

export default function HorizontalCourseCard({ containerStyle, course, enrolledCourses }) {
    const navigation = useNavigation()
    //const [isEnrolled, setIsEnrolled] = useState(course.isEnrolled)

    async function handleIsCourseEnrolled() {
        //console.log(JSON.stringify(enrolledCourses, undefined, 4));
        for (const item of enrolledCourses) {
            if (course.course_id === item.course_id) {
                setIsEnrolled(true)
            }
        }
    }

    // useFocusEffect(
    //     useCallback(() => {
    //         handleIsCourseEnrolled()
    //     }, [])
    // )

    return (
        <TouchableOpacity style={{
            display: "flex",
            flexDirection: 'row',
            marginBottom: 20,
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
            ...containerStyle
        }} onPress={() => {
            navigation.navigate("CourseDetail",
                {
                    course: course
                }
            );
        }}>
            <ImageBackground source={{ uri: course.image_url }} resizeMode='cover' style={{
                width: 130,
                height: 130
            }} imageStyle={{
                borderRadius: 10
            }} />
            <View style={{
                display: 'flex',
                flex: 1,
                marginLeft: 10,
                justifyContent: "space-between",
            }}>
                <Text style={{
                    fontSize: 18,
                    fontFamily: "outfit-bold"
                }}>
                    {course.title}
                </Text>

                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 10,
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>

                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5
                    }}>
                        <MaterialCommunityIcons name="clock-edit-outline" size={24} color="black" />
                        <Text style={{
                            fontSize: 14,
                            fontFamily: "outfit-medium",

                        }}>
                            {course.hour} Hours
                        </Text>
                    </View>
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5
                    }}>
                        <AntDesign name="bars" size={24} color="black" />
                        <Text style={{
                            fontSize: 14,
                            fontFamily: "outfit-medium",

                        }}>
                            {course.chapters.length} {course.chapters.length > 1 ? " Chapters" : " Chapter"}
                        </Text>
                    </View>

                </View>

                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 10,
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>

                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5
                    }}>
                        <Text style={{
                            fontSize: 14,
                            fontFamily: "outfit-medium",

                        }}>
                            By Trinh Vinh Phat
                        </Text>
                    </View>
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5
                    }}>
                        <Ionicons name={"cellular-outline"} size={18} color={color.BLACK} />
                        <Text style={{
                            fontSize: 14,
                            fontFamily: "outfit-medium",

                        }}>
                            {course.category}
                        </Text>
                    </View>

                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                    justifyContent: "flex-start"
                }}>
                    {course.is_trial ?
                        <Text style={{
                            fontFamily: "outfit-bold",
                            fontSize: 20,
                            color: "green"
                        }}>
                            TRIAL
                        </Text>
                        :
                        <Text style={{
                            fontSize: 25,
                            fontFamily: "outfit-bold",
                            color: course.isEnrolled ? "green" : color.PRIMARY
                        }}>
                            {course.isEnrolled ? "ENROLLED" : course.price}
                        </Text>
                    }

                </View>
            </View>
        </TouchableOpacity>
    )
}
