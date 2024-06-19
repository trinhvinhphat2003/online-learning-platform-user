import React from 'react'
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native'
import color from '../../themes/common/color'
import { Ionicons } from '@expo/vector-icons'
import OptionItem from './option-item'

export default function DetailSection({ course }) {
    return (
        <View style={{
            backgroundColor: color.WHITE,
            borderRadius: 15,
            padding: 10
        }}>
            <Image source={{ uri: course.image }} style={{
                width: Dimensions.get("screen").width * 0.9,
                height: 190,
                borderRadius: 15
            }} />
            <View style={{
                padding: 10
            }}>
                <Text style={{
                    fontSize: 22,
                    fontFamily: "outfit-medium"
                }}>
                    {course.title}
                </Text>
                <View>
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 10
                    }}>
                        <OptionItem icon={"book-outline"} text={course.lessonCount + " Lessions"} />
                        <OptionItem icon={"book-outline"} text={course.hour + " Hours"} />
                    </View>
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 10
                    }}>
                        <OptionItem icon={"person-circle-outline"} text={"Trinh VInh Phat"} />
                        <OptionItem icon={"cellular-outline"} text={"Basic"} />
                    </View>
                </View>

                <View>
                    <Text style={{
                        fontSize: 20,
                        fontFamily: "outfit-medium"
                    }}>
                        Description
                    </Text>
                    <Text style={{
                        fontFamily: "outfit",
                        color: "gray",
                        lineHeight: 25
                    }}>
                        {course.description}
                    </Text>
                </View>
                <View style={{
                    marginTop: 15
                }}>
                    <TouchableOpacity style={{
                        padding: 20,
                        backgroundColor: color.PRIMARY,
                        borderRadius: 15
                    }}>
                        <Text style={{
                            fontFamily: "outfit",
                            textAlign: "center",
                            color: color.WHITE,
                            fontSize: 17
                        }}>
                            Buy This Course 17$
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}
