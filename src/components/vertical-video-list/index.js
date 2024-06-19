import { useState } from "react";
import { View, Image, StyleSheet, Text, FlatList, Dimensions, TouchableOpacity } from "react-native";
import color from "../../themes/common/color";
import { Ionicons } from "@expo/vector-icons";
import CourseItem from "../course-item";
import { useNavigation } from "@react-navigation/native";
import HorizontalCourseCard from "./horizontal-course-card";

export default function VerticalVideoList({ subHeadingColor, isPrimary, title, hiddenTitle, containerStyle, noSepLine }) {
    const [videoList, setVideoList] = useState([
        {
            id: "1",
            image: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
            title: "hello",
            lessonCount: 5,
            hour: 5,
            description: "description description description description description description description description description v description description",
            chapters: [
                {
                    title: "chapter 1"
                },
                {
                    title: "chapter 2"
                },
                {
                    title: "chapter 3"
                },
                {
                    title: "chapter 4"
                },
                {
                    title: "chapter 4"
                }
                ,
                {
                    title: "chapter 4"
                }
                ,
                {
                    title: "chapter 4"
                }
                ,
                {
                    title: "chapter 4"
                }
                ,
                {
                    title: "chapter 4"
                }
            ]
        },
        {
            id: "2",
            image: "https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045-2.jpg",
            title: "hello huh hho 0ho ouhouh ohoh uohoh ou",
            lessonCount: 5,
            hour: 5,
            description: "description",
            chapters: [
                {
                    title: "chapter 1"
                },
                {
                    title: "chapter 2"
                },
                {
                    title: "chapter 3"
                }
            ]
        },
        {
            id: "3",
            image: "https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045-2.jpg",
            title: "hello ",
            lessonCount: 5,
            hour: 5,
            description: "description",
            chapters: [
                {
                    title: "chapter 1"
                },
                {
                    title: "chapter 2"
                }
            ]
        }
    ])
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
        <View style={{...containerStyle}}>
            {!hiddenTitle && <View style={{
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
                <TouchableOpacity style={{
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
            

            <FlatList
                contentContainerStyle={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20 }}
                data={videoList}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <HorizontalCourseCard course={item} containerStyle={{

                    }}/>
                )}
                ItemSeparatorComponent={() => (
                    renderLineDevider({marginTop: 15, marginBottom: 20})
                )}
            />
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