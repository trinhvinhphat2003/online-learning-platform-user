import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native'
import { Text } from 'react-native'
import TopBackSection from '../../../components/top-back-section'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import color from '../../../themes/common/color'
import StudentProfileCourse from '../../../components/student-profile-course'
import { mockCourse } from '../../../mock-data-support/course'
import TutorProfileCourse from '../../../components/tutor-profile-course'
import { apiConfig } from '../../../config/api-config'
import { AuthContext } from '../../../context/AuthContext'
import axios from 'axios'

const BASE_URL = apiConfig.baseURL

export default function TutorDetailScreen() {

    const { userData, session } = useContext(AuthContext)
    const navigation = useNavigation()
    const {tutor} = useRoute().params;
    const [courses, setCourses] = useState(tutor.courses)
    //console.log(JSON.stringify(tutor, undefined, 4))
    //console.log(JSON.stringify(courses, undefined, 4))
    //const [videoList, setVideoList] = useState(mockCourse)
    const [collectionSelected, setCollectionSelected] = useState(1)
    const [courseLoading, setCourseLoading] = useState(false)
    const [enrollData, setEnrollData] = useState([])

    useEffect(() => {
        let standardlizedData = []
        for (const courseRes of tutor.courses) {
            let check = false;
            for (const enroll of enrollData) {
                if (courseRes.course_id === enroll.course_id) {
                    standardlizedData.push({
                        ...courseRes,
                        isEnrolled: true
                    })
                    check = true;
                    break;
                }
            }
            if (check === false) {
                standardlizedData.push({
                    ...courseRes,
                    isEnrolled: false
                })
            }
        }
        //console.log(JSON.stringify(standardlizedData, undefined, 4))
        if(collectionSelected === 1) {
            setCourses(standardlizedData.filter((item) => item.category === "basic"))
        }
        if(collectionSelected === 2) {
            setCourses(standardlizedData.filter((item) => item.category === "intermediate"))
        }
        if(collectionSelected === 3) {
            setCourses(standardlizedData.filter((item) => item.category === "advance"))
        }
    }, [collectionSelected, enrollData])

    useFocusEffect(
        useCallback(() => {
            //console.log(collectionSelected)
            const fetchData = async () => {
                setCourseLoading(true); // Bắt đầu loading
                try {
                    const response2 = await axios.get(`${BASE_URL}/api/user/getEnroll`, {
                        headers: {
                            Authorization: `Bearer ${session.token}`,
                        }
                    });

                    let standardlizedData = []

                    if (response2.data.success) {
                        setEnrollData(response2?.data?.enrollData)
                        // for (const courseRes of tutor.courses) {
                        //     let check = false;
                        //     for (const enroll of response2?.data?.enrollData) {
                        //         if (courseRes.course_id === enroll.course_id) {
                        //             standardlizedData.push({
                        //                 ...courseRes,
                        //                 isEnrolled: true
                        //             })
                        //             check = true;
                        //             break;
                        //         }
                        //     }
                        //     if (check === false) {
                        //         standardlizedData.push({
                        //             ...courseRes,
                        //             isEnrolled: false
                        //         })
                        //     }
                        // }
                        // //console.log(JSON.stringify(standardlizedData, undefined, 4))
                        // console.log(collectionSelected)
                        // if(collectionSelected === 1) {
                        //     setCourses(standardlizedData.filter((item) => item.category === "basic"))
                        // }
                        // if(collectionSelected === 2) {
                        //     setCourses(standardlizedData.filter((item) => item.category === "intermediate"))
                        // }
                        // if(collectionSelected === 3) {
                        //     setCourses(standardlizedData.filter((item) => item.category === "advance"))
                        // }
                        //setCourses(standardlizedData)
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


    onTabPressed = async (value) => {
        console.log("value: " + value)
        await setCollectionSelected(value)
    }
    return (
        <View style={{
            backgroundColor: color.PRIMARY,
            height: "100%"
        }}>
            <TopBackSection headerTxt={"TutorName"} />
            <View style={{
                backgroundColor: "#F5F5F5",
                height: "25%",
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50.,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around"
            }}>

                <View>
                    <Image
                        source={{uri: tutor.image_url}}
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
                        {tutor.user_name}
                    </Text>
                    {/* <Text style={{
                        fontFamily: "outfit-medium",
                        fontSize: 16,
                        color: "#9ca1a2",
                        alignSelf: "center"
                    }}>
                        Kiev, Ukraine
                    </Text> */}
                </View>

                <View style={{
                    flexDirection: "row",
                    alignSelf: "center",
                    marginTop: 20
                }}>

                    <View style={{ marginHorizontal: 40 }}>
                    <Text style={{
                            fontFamily: "outfit-bold",
                            fontSize: 20,
                            color: "#9ca1a2",
                            alignSelf: "center"
                        }}>
                            Total Course
                        </Text>
                        <Text style={{
                            fontFamily: "outfit-bold",
                            fontSize: 15,
                            color: "#044244",
                            alignSelf: "center"
                        }}>{tutor.courses ? tutor.courses.length : 0}</Text>
                        
                    </View>

                </View>
            </View>

            {/* Collection section */}
            <View style={{
                flexDirection: "row",
                paddingHorizontal: 40,
                paddingTop: 20
            }}>
                <TouchableOpacity
                    onPress={() => {onTabPressed(1)}}
                    style={{
                        borderBottomColor: collectionSelected === 1 ? "#FFF" : "#9ca1a2",
                        borderBottomWidth: 4,
                        paddingVertical: 6,
                    }}
                >
                    <Text style={{
                        fontFamily: "outfit-bold",
                        color: collectionSelected === 1 ? "#FFF" : "#9ca1a2"
                    }}>BASIC</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {onTabPressed(2)}}
                    style={{
                        borderBottomColor: collectionSelected === 2 ? "#FFF" : "#9ca1a2",
                        borderBottomWidth: 4,
                        paddingVertical: 6,
                        marginLeft: 30
                    }}
                >
                    <Text style={{
                        fontFamily: "outfit-bold",
                        color: collectionSelected === 2 ? "#FFF" : "#9ca1a2"
                    }}>INTERMEDIATE</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {onTabPressed(3)}}
                    style={{
                        borderBottomColor: collectionSelected === 3 ? "#FFF" : "#9ca1a2",
                        borderBottomWidth: 4,
                        paddingVertical: 6,
                        marginLeft: 30
                    }}
                >
                    <Text style={{
                        fontFamily: "outfit-bold",
                        color: collectionSelected === 3 ? "#FFF" : "#9ca1a2"
                    }}>ADVANCE</Text>
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
                            <TutorProfileCourse
                                index={index}
                                key={index}
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
