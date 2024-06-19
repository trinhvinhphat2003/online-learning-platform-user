import React from 'react'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import color from '../../../themes/common/color';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HorizontalCourseCard({ containerStyle, course }) {
    const navigation = useNavigation()
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
            <ImageBackground source={{ uri: course.image }} resizeMode='cover' style={{
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
                            2h 30m
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
                            2 Lesson
                        </Text>
                    </View>

                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                    justifyContent: "space-between"
                }}>
                    <Text style={{
                        fontSize: 25,
                        fontFamily: "outfit-bold",
                        color: color.PRIMARY
                    }}>
                        75.000
                    </Text>
                    <Text style={{
                        fontSize: 14,
                        fontFamily: "outfit-medium",

                    }}>
                        By Trinh Vinh Phat
                    </Text>
                    
            </View>
            </View>
        </TouchableOpacity>
    )
}
