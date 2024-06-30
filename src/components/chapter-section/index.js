import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import color from '../../themes/common/color';
import { useNavigation } from '@react-navigation/native';

export default function ChapterSection({ chapterList, isEnrolled, isTrial }) {
    const navigation = useNavigation()
    return (
        <View style={{
            padding: 10,
            backgroundColor: color.WHITE,
            borderRadius: 15,
            marginTop: 20
        }}>
            <Text style={{
                fontFamily: "outfit-medium",
                fontSize: 22
            }}>
                Chapters
            </Text>
            {/* complete */}
            {/* <TouchableOpacity onPress={() => {
                navigation.navigate("VideoPage",
                    {
                        chapter: {
                            "chapter_id": 1,
                            "course_id": 1,
                            "title": "title",
                            "description": "description",
                            "content_url": "content_url"
                        }
                    }
                )
            }}>
                <View style={styles.complete}>
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10
                    }}>
                        <Ionicons name="checkmark-circle" size={30} color={color.GREEN} />
                        <Text style={{
                            fontFamily: "outfit",
                            fontSize: 21,
                            color: color.GREEN
                        }}>
                            {"item.title"}
                        </Text>
                    </View>
                    <Ionicons name="play-circle" size={30} color={color.GREEN} />

                </View>
            </TouchableOpacity> */}
            {/* complete */}
            {chapterList.map((item, index) => {
                return (
                    item.isCompleted && (isEnrolled || isTrial) ?
                        <TouchableOpacity onPress={() => {
                            if (isEnrolled || isTrial) {
                                navigation.navigate("VideoPage",
                                    {
                                        // chapter: {
                                        //     "chapter_id": 1,
                                        //     "course_id": 1,
                                        //     "title": "title",
                                        //     "description": "description",
                                        //     "content_url": "content_url",
                                        //     isCompleted: true,
                                        //     isCompletable: isEnrolled || isTrial
                                        // }
                                        chapter: {
                                            ...item,
                                            isCompletable: isEnrolled || isTrial
                                        }
                                    }
                                )
                            }
                        }}>
                            <View style={styles.complete}>
                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 10
                                }}>
                                    <Ionicons name="checkmark-circle" size={30} color={color.GREEN} />
                                    <Text style={{
                                        fontFamily: "outfit",
                                        fontSize: 21,
                                        color: color.GREEN
                                    }}>
                                        {"item.title"}
                                    </Text>
                                </View>
                                <Ionicons name="play-circle" size={30} color={color.GREEN} />

                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity key={index} onPress={() => {
                            if (isEnrolled || isTrial) {
                                navigation.navigate("VideoPage",
                                    {
                                        // chapter: {
                                        //     "chapter_id": 1,
                                        //     "course_id": 1,
                                        //     "title": "title",
                                        //     "description": "description",
                                        //     "content_url": "content_url",
                                        //     isCompleted: false,
                                        //     isCompletable: isEnrolled || isTrial
                                        // }
                                        chapter: {
                                            ...item,
                                            isCompletable: isEnrolled || isTrial
                                        }
                                    }
                                )
                            }
                        }}>
                            <View key={index} style={{ ...styles.inComplete, borderColor: isEnrolled || isTrial ? "black" : "gray" }}>
                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 10
                                }}>
                                    <Text style={{
                                        fontFamily: "outfit-medium",
                                        fontSize: 27,
                                        color: isEnrolled || isTrial ? "black" : "gray"
                                    }}>
                                        {index + 1}
                                    </Text>
                                    <Text style={{
                                        fontFamily: "outfit",
                                        fontSize: 21,
                                        color: isEnrolled || isTrial ? "black" : "gray"
                                    }}>
                                        {item.title}
                                    </Text>
                                </View>
                                {isEnrolled || isTrial ?
                                    <Ionicons name="play-circle" size={30} color="black" />
                                    :
                                    <Ionicons name="lock-closed" size={25} color="gray" />
                                }
                            </View>
                        </TouchableOpacity>
                )

            })}
        </View>
    )
}

const styles = StyleSheet.create({
    inComplete: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        padding: 15
    },
    complete: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        padding: 15,
        borderColor: color.GREEN,
        backgroundColor: color.LIGHT_GREEN
    }
})
