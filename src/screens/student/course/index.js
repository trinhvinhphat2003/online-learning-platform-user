import React, { useCallback, useContext, useState } from 'react'
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import color from '../../../themes/common/color'
import SearchBar from '../../../components/search-bar'
import VerticalVideoList from '../../../components/vertical-video-list'
import { AuthContext } from '../../../context/AuthContext'
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
import { apiConfig } from '../../../config/api-config'

const BASE_URL = apiConfig.baseURL

export default function CourseScreen() {

    const { userData, session } = useContext(AuthContext)
    const [courses, setCourses] = useState({data: [], time: Date.now()})
    const [category, setCategory] = useState("")
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        setLoading(true); // Bắt đầu loading
        try {
            const response = await axios.get(`${BASE_URL}/api/getCourse`, {
                headers: {
                    Authorization: `Bearer ${session.token}`,
                },
                params: {
                    category: category === "" ? undefined : category,
                    name: name === "" ? undefined : name
                }
            });
            // await setCourses({data: [], time: Date.now()})
            // await setCourses({data: response.data.courses, time: Date.now()})

            const response2 = await axios.get(`${BASE_URL}/api/getEnroll`, {
                headers: {
                    Authorization: `Bearer ${session.token}`,
                }
            });

            let standardlizedData = []

            if(response2.data.success && response.data.success) {
                //console.log(JSON.stringify(response.data, undefined, 4));
                const courseToHandle = response.data.courses.filter((item) => !item.is_trial)
                console.log(JSON.stringify(courseToHandle, undefined, 4));
                for(const courseRes of courseToHandle) {
                    let check = false;
                    for (const enroll of response2?.data?.enrollData) {
                        if (courseRes.course_id === enroll.course_id) {
                            standardlizedData.push({
                                ...courseRes,
                                isEnrolled: true
                            })
                            check = true;
                            break;
                        }
                    }
                    if(check === false) {
                        standardlizedData.push({
                            ...courseRes,
                            isEnrolled: false
                        })
                    }
                }

                await setCourses({data: standardlizedData, time: Date.now()})
                //console.log(JSON.stringify(standardlizedData, undefined, 4));
            } else {
                console.log("hello")
                await setCourses({data: response.data.courses, time: Date.now()})
            }

            // console.log(JSON.stringify(courses, undefined, 4));
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false); // Kết thúc loading
        }
    };
    useFocusEffect(
        useCallback(() => {
        
            fetchData();
            // console.log(JSON.stringify(userData, undefined, 4))
        }, [category])
    )

    return (
        <View style={{
            width: "100%",
            height: "100%"
        }}>
            <View style={{
                backgroundColor: color.PRIMARY,
                width: "100%",
                height: 400,
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
                padding: 20
            }}>
                <SearchBar name={name} setName={setName} fetchData={fetchData}/>
            </View>

            <View style={{
                backgroundColor: "#F5F5F5",
                padding: 0,
                width: "100%"
            }}>
                <View style={{
                    marginTop: -280
                }}>
                    {/* Category section */}
                    <View style={{
                        paddingHorizontal: 20
                    }}>
                        <Text style={{
                            fontFamily: "outfit-bold",
                            fontSize: 25,
                            color: "white"
                        }}>
                            Categories
                        </Text>
                    </View>

                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 10,
                        marginTop: 10,
                        paddingHorizontal: 20
                    }}>
                        <TouchableOpacity
                            onPress={async () => {
                                if(category === "basic") {
                                    await setCategory("")
                                } else {
                                    await setCategory("basic")
                                }
                            }}
                        style={{
                            padding: 10,
                            backgroundColor: category === "basic" ? "white" : "gray",
                            color: "black",
                            borderRadius: 10,
                            flex: 1
                        }} >
                            <Text style={{
                                fontFamily: "outfit-medium",
                                fontSize: 20,
                                textAlign: "center"
                            }}>
                                Basic
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={async () => {
                                if(category === "intermidiate") {
                                    await setCategory("")
                                } else {
                                    await setCategory("intermidiate")
                                }
                            }}
                        style={{
                            padding: 10,
                            backgroundColor: category === "intermidiate" ? "white" : "gray",
                            color: "black",
                            borderRadius: 10,
                            flex: 1.5
                        }} >
                            <Text style={{
                                fontFamily: "outfit-medium",
                                fontSize: 20,
                                textAlign: "center"
                            }}>
                                Intermidiate
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={async () => {
                                if(category === "advance") {
                                    await setCategory("")
                                } else {
                                    await setCategory("advance")
                                }
                            }}
                        style={{
                            padding: 10,
                            backgroundColor: category === "advance" ? "white" : "gray",
                            color: "black",
                            borderRadius: 10,
                            flex: 1
                        }} >
                            <Text style={{
                                fontFamily: "outfit-medium",
                                fontSize: 20,
                                textAlign: "center"
                            }}>
                                Advanced
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        paddingHorizontal: 20,
                        marginTop: 20
                    }}>
                        <Text style={{
                            fontFamily: "outfit-bold",
                            fontSize: 25,
                            color: "white"
                        }}>
                            Courses
                        </Text>
                    </View>
                    {/* <VerticalVideoList navigateTo={"course"} subHeadingColor={color.BLACK} title={"Courses"} isPrimary={false} hiddenTitle={true} courses={courses.data} containerStyle={{
                        marginTop: 10
                    }} noSepLine={true} scrollableStyle={{
                        width: "100%",
                        height: 590
                    }} /> */}
                    {loading ? (
                        <ActivityIndicator size="large" color={color.BLACK} style={{ marginTop: 20 }} />
                    ) : (
                        <VerticalVideoList 
                            navigateTo={"course"} 
                            subHeadingColor={color.BLACK} 
                            title={"Courses"} 
                            isPrimary={false} 
                            hiddenTitle={true} 
                            courses={courses.data} 
                            containerStyle={{ marginTop: 10 }} 
                            noSepLine={true} 
                            scrollableStyle={{ width: "100%", height: 590 }} 
                            loading={false}
                        />
                    )}
                    
                    {/* <VerticalVideoList subHeadingColor={color.WHITE} title={"Popular Course"} isPrimary={false} hiddenTitle={true} containerStyle={{
                        marginTop: 10
                    }} noSepLine={true}/> */}
                </View>
            </View>
        </View>
    )
}
