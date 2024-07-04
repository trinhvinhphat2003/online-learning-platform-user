import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Icon from "@expo/vector-icons/Entypo"
import { Ionicons } from '@expo/vector-icons';
import SettingModal from '../../../components/setting-modal';
import { AuthContext } from '../../../context/AuthContext';
import StudentProfileCourse from '../../../components/student-profile-course';
import color from '../../../themes/common/color';
import { mockCourse } from '../../../mock-data-support/course';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'
import { apiConfig } from '../../../config/api-config';
import axios from 'axios';

const BASE_URL = apiConfig.baseURL

function calculatePercentage(part, total) {
    if (total === 0) {
        return '0%'; // Tránh chia cho 0
    }

    const ratio = part / total;
    const percentage = Math.round(ratio * 100); // Làm tròn đến số nguyên gần nhất
    return `${percentage}%`;
}

export default function ProfileScreen() {
    const [videoList, setVideoList] = useState([])
    const navigation = useNavigation()
    const { setIsLogin, userData, session } = useContext(AuthContext)
    const [courseLoading, setCourseLoading] = useState(false)
    const [collectionSelected, setCollectionSelected] = useState(true)
    const [modalVisible, setModalVisible] = useState(false);
    const [courses, setCourses] = useState([])

    const handleEditProfile = () => {
        // Xử lý logic khi người dùng chọn "Edit Profile"
        navigation.navigate('EditProfile');
        setModalVisible(false); // Đóng modal sau khi chọn tùy chọn
    };

    const handleLogOut = () => {
        // Xử lý logic khi người dùng chọn "Log Out"
        console.log('Log Out');
        AsyncStorage.clear()
        setModalVisible(false); // Đóng modal sau khi chọn tùy chọn
        setIsLogin(false)
    };

    useEffect(() => {
        if(collectionSelected) {
            setCourses(videoList.filter((item) => calculatePercentage(item?.courseCompleted?.length, item?.chapters?.length) !== "100%"))
        }
        if(!collectionSelected) {
            setCourses(videoList.filter((item) => calculatePercentage(item?.courseCompleted?.length, item?.chapters?.length) === "100%"))
        }
    }, [collectionSelected, videoList])

    useFocusEffect(
        useCallback(() => {
            //console.log(collectionSelected)
            const fetchData = async () => {
                setCourseLoading(true); // Bắt đầu loading
                try {
                    const response = await axios.get(`${BASE_URL}/api/user/getEnroll`, {
                        headers: {
                            Authorization: `Bearer ${session.token}`,
                        }
                    });

                    let standardlizedData = []

                    if (response.data.success) {
                        //console.log(JSON.stringify(response.data.enrollData, undefined, 4))
                        for(const enrollData of response.data.enrollData) {
                            standardlizedData.push({
                                ...enrollData.course,
                                chapters: enrollData.chapters,
                                courseCompleted: enrollData.courseCompleted,
                                isEnrolled: true
                            })
                        }
                        setVideoList(standardlizedData)
                        console.log(JSON.stringify(standardlizedData, undefined, 4))
                    }

                } catch (error) {
                    console.error("Error fetching data:", error);
                } finally {
                    setCourseLoading(false); // Kết thúc loading
                }
            };

            fetchData();
        }, [])
    )

    onTabPressed = () => {
        setCollectionSelected(!collectionSelected)
    }
    return (
        <View style={{
            backgroundColor: color.PRIMARY,
            height: "100%",
        }}>
            <View style={{
                paddingHorizontal: 40,
                backgroundColor: "#F5F5F5",
                height: "42%",
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50
            }}>
                <View style={{
                    flexDirection: "row",
                    width: "100%",
                    marginTop: 40,
                    justifyContent: "flex-end"
                }}>

                    <View style={{
                        width: "50%",
                        alignItems: "flex-end"
                    }}>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <Ionicons name="settings" size={24} color="black" />
                        </TouchableOpacity>
                        <SettingModal
                            visible={modalVisible}
                            onClose={() => setModalVisible(false)}
                            onEditProfile={handleEditProfile}
                            onLogOut={handleLogOut}
                        />
                    </View>
                </View>

                <Image
                    source={{uri: userData.image_url}}
                    style={{
                        height: 100,
                        width: 100,
                        borderRadius: 20,
                        alignSelf: "center",
                        marginVertical: 20
                    }}
                />
                <Text style={{
                    fontSize: 22,
                    fontFamily: "outfit-bold",
                    color: "#044244",
                    alignSelf: "center"
                }}>
                    {userData.user_name}
                </Text>
                {/* <Text style={{
                    fontFamily: "outfit-medium",
                    fontSize: 16,
                    color: "#9ca1a2",
                    alignSelf: "center"
                }}>
                    Kiev, Ukraine
                </Text> */}


                <View style={{
                    flexDirection: "row",
                    alignSelf: "center",
                    marginTop: 20
                }}>
                    <View>
                        <Text style={{
                            fontFamily: "outfit-bold",
                            fontSize: 15,
                            color: "#044244",
                            alignSelf: "center"
                        }}>280</Text>
                        <Text style={{
                            fontFamily: "outfit-medium",
                            fontSize: 16,
                            color: "#9ca1a2",
                            alignSelf: "center"
                        }}>
                            In Progress
                        </Text>
                    </View>

                    <View style={{ marginHorizontal: 40 }}>
                        <Text style={{
                            fontFamily: "outfit-bold",
                            fontSize: 15,
                            color: "#044244",
                            alignSelf: "center"
                        }}>2,107</Text>
                        <Text style={{
                            fontFamily: "outfit-medium",
                            fontSize: 16,
                            color: "#9ca1a2",
                            alignSelf: "center"
                        }}>
                            Total Course
                        </Text>
                    </View>


                    <View>
                        <Text style={{
                            fontFamily: "outfit-bold",
                            fontSize: 15,
                            color: "#044244",
                            alignSelf: "center"
                        }}>104</Text>
                        <Text style={{
                            fontFamily: "outfit-medium",
                            fontSize: 16,
                            color: "#9ca1a2",
                            alignSelf: "center"
                        }}>
                            Completed
                        </Text>
                    </View>
                </View>
            </View>


            <View style={{
                flexDirection: "row",
                paddingHorizontal: 40,
                paddingTop: 20
            }}>
                <TouchableOpacity
                    onPress={this.onTabPressed}
                    style={{
                        borderBottomColor: collectionSelected ? "#FFF" : "#9ca1a2",
                        borderBottomWidth: 4,
                        paddingVertical: 6,
                    }}
                >
                    <Text style={{
                        fontFamily: "outfit-bold",
                        color: collectionSelected ? "#FFF" : "#9ca1a2"
                    }}>IN PROGRESS</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this.onTabPressed}
                    style={{
                        borderBottomColor: collectionSelected ? "#9ca1a2" : "#FFF",
                        borderBottomWidth: 4,
                        paddingVertical: 6,
                        marginLeft: 30
                    }}
                >
                    <Text style={{
                        fontFamily: "outfit-bold",
                        color: collectionSelected ? "#9ca1a2" : "#FFF"
                    }}>COMPLETED</Text>
                </TouchableOpacity>
            </View>

            {
                courseLoading ?
                (
                    <ActivityIndicator size="large" color={color.BLACK} style={{ marginTop: 20, alignSelf: "center" }} />
                )
                :
                (
                    <ScrollView style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: 15,
                        marginBottom: 15,
                        paddingLeft: 3,
                        paddingRight: 3
                    }}>
                        {courses.map((item, index) => (
                            <StudentProfileCourse
                            index={index}
                            onPress={() => {
                                navigation.push("CourseDetail",
                                    {
                                        course: item,
                                        isInstructor: true
                                    }
                                )
                            }}
                            img={item.image_url}
                            title={item.title}
                            bg="#fff"
                            course={item}
                            />
                        ))}
        
                    </ScrollView>
                )
            }
        </View>
    )
}
