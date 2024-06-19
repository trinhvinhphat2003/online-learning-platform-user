import { useState } from "react";
import { View, Image, StyleSheet, Text, FlatList, Dimensions, TouchableOpacity } from "react-native";
import color from "../../themes/common/color";
import { Ionicons } from "@expo/vector-icons";
import CourseItem from "../course-item";
import { useNavigation } from "@react-navigation/native";
import { mockCourse } from "../../mock-data-support/course";

export default function VideoCourseList({ subHeadingColor, isPrimary, title }) {
    const [videoList, setVideoList] = useState(mockCourse)

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
            </View>

            <FlatList
                contentContainerStyle={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 3, paddingRight: 3 }}
                data={videoList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{
                        marginLeft: 10,
                        marginRight: 10
                    }} onPress={() => {
                        navigation.navigate("CourseDetail",
                            {
                                course: item
                            }
                        );
                    }}>
                        <CourseItem item={item} />
                    </TouchableOpacity>
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