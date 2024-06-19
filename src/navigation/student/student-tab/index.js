import { useState } from "react";
import { View, Image, StyleSheet, FlatList, Dimensions } from "react-native";
import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import HomeScreenStack from "../home-screen-stack";
import TutorScreen from "../../../screens/student/tutor";
import ProfileScreen from "../../../screens/student/profile";
import ProfileScreenStack from "../profile-screen-stack";
import HomeScreen from "../../../screens/student/home";
import CourseScreen from "../../../screens/student/course";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import color from "../../../themes/common/color";
import CourseScreenStack from "../course-screen-stack";
import { useNavigation } from "@react-navigation/native";

const Tab = createMaterialBottomTabNavigator();
export default function StudentTabs() {

    const [isTabBarVisible, setIsTabBarVisible] = React.useState(false);
    // const navigation = useNavigation()

    // React.useEffect(() => {
    //     navigation.setOptions({
    //       tabBarStyle: {
    //         display: "none"
    //       }
    //     });
    //     return () => navigation.setOptions({
    //       tabBarStyle: undefined
    //     });
    //   }, [navigation]);
    return (
        <Tab.Navigator initialRouteName="home"
            tabBarOptions={{
            }}
            sceneAnimationEnabled={true}
            activeColor={color.PRIMARY}
            inactiveColor="gray"
            barStyle={{ backgroundColor: 'white' }}
            shifting={true}
        >
            <Tab.Screen name="home" component={HomeScreen} options={{ title: 'Home', tabBarIcon: () => { return (<Entypo name="home" size={24} color="black" />) } }} />
            <Tab.Screen name="course" component={CourseScreen} options={{ title: 'Course', tabBarIcon: () => { return (<AntDesign name="book" size={24} color="black" />) } }} />
            <Tab.Screen name="tutor" component={TutorScreen} options={{ title: 'Tutor', tabBarIcon: () => { return (<Fontisto name="person" size={24} color="black" />) } }} />
            <Tab.Screen name="profile" component={ProfileScreen} options={{ title: 'Profile', tabBarIcon: () => { return (<AntDesign name="profile" size={24} color="black" />) } }} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({

});