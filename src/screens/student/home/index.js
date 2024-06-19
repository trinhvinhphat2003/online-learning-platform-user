
import { View, Image, StyleSheet, Text, ScrollView } from "react-native";
import Header from "../../../components/Header";
import color from "../../../themes/common/color";
import VideoCourseList from "../../../components/video-course-list";
import VerticalVideoList from "../../../components/vertical-video-list";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

export default function HomeScreen() {

    const { userData } = useContext(AuthContext)

    useFocusEffect(
        useCallback(() => {
            // console.log(JSON.stringify(userData, undefined, 4))
        }, [])
    )

    const renderLineDevider = (style, color) => {
        return (
            <View style={{
                width: "100%",
                height: 2,
                backgroundColor: color ? color : '#D3D3D3',
                ...style
            }}>
                
            </View>
        )
    }
    return (
        <ScrollView scrollEventThrottle={16} bounces={false} style={{
            width: "100%",
            height: "100%"
        }}>
            <View style={{
                backgroundColor: color.PRIMARY,
                width: "100%",
                height: 300,
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30
            }}>
                <Header userData={userData} />
            </View>
            
            <View style={{
                backgroundColor: "#F5F5F5",
                paddingTop: 0,
                width: "100%"
            }}>
                <View style={{
                    marginTop: -185
                }}>
                    <VideoCourseList subHeadingColor={color.WHITE} isPrimary={false} title={"Trial Video Free"} />
                </View>
                {renderLineDevider({marginTop: 30, marginBottom: 10})}
                <VideoCourseList subHeadingColor={color.BLACK} isPrimary={true} title={"Popular Tutor"}/>
                <VerticalVideoList subHeadingColor={color.BLACK} title={"Popular Course"} isPrimary={true}/>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
});