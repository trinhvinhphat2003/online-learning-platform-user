import React, { useCallback, useContext, useState } from 'react'
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native'
import color from '../../themes/common/color'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { apiConfig } from '../../config/api-config'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

const BASE_URL = apiConfig.baseURL

export default function AuthorSection({instructor}) {
    const navigation = useNavigation()
    const { userData, session } = useContext(AuthContext)
    const [tutorLoading, setTutorLoading] = useState(false)
    const [tutorDetail, setTutorDetail] = useState(instructor)
    console.log(JSON.stringify(instructor, undefined, 4));

    const fetchTutor = async () => {
        setTutorLoading(true); // Bắt đầu loading
        try {
            const response = await axios.get(`${BASE_URL}/api/user/getCourseByInstructorId`, {
                headers: {
                    Authorization: `Bearer ${session.token}`,
                },
                params: {
                    id : instructor.user_id
                }
            });

            if (response.data.success) {
                //console.log(JSON.stringify(response.data, undefined, 4));
                setTutorDetail({
                    ...instructor,
                    courses: response.data.courses
                })
            }
            //console.log(JSON.stringify(courses, undefined, 4));
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setTutorLoading(false); // Kết thúc loading
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchTutor()
        }, [])
    )

    return (
        <TouchableOpacity onPress={() => {
            if(!tutorLoading) {
                navigation.navigate("TutorDetail", {
                    tutor: tutorDetail
                })
            }
        }}>
            <View style={{
                padding: 10,
                backgroundColor: color.WHITE,
                borderRadius: 15,
                marginTop: 20
            }}>
                {
                    tutorLoading ?
                    (
                        <ActivityIndicator size="large" color={color.BLACK} style={{ marginTop: 20 }} />
                    )
                    :
                    (
                        <View style={{
                            flexDirection: "row",
                            marginHorizontal: 30,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}>
                            <View style={{
                                flexDirection: "row",
                                display: "flex",
                                alignItems: "center"
                            }}>
                                <Image
                                    source={{ uri: instructor.image_url }}
                                    style={{
                                        height: 50,
                                        width: 50,
                                        borderWidth: 2,
                                        borderColor: "#f58084",
                                        borderRadius: 50,
                                    }}
                                />
                                <View style={{ marginHorizontal: 20 }}>
                                    <Text style={{
                                        color: "#345c74",
                                        fontFamily: "outfit-bold",
                                        fontSize: 18
                                    }}>{instructor.user_name}</Text>
                                    <Text style={{
                                        color: "#f58084",
                                        fontFamily: "outfit-medium",
                                        fontSize: 12
                                    }}>
                                        Author
                                    </Text>
                                </View>
                            </View>
                            <View style={{
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#fff2f2",
                                width: 40,
                                height: 40,
                                borderRadius: 40
                            }}>
                                <Image
                                    source={require('../../../assets/a2.png')}
                                />
                            </View>
                        </View>
                    )
                }

            </View>
        </TouchableOpacity>
    )
}
