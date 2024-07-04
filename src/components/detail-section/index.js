import React, { useCallback, useContext, useState } from 'react'
import { Alert, Dimensions, Image, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import color from '../../themes/common/color'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import OptionItem from './option-item'
import { apiConfig } from '../../config/api-config'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import { useFocusEffect } from '@react-navigation/native'
import WebView from 'react-native-webview'
import { buildVNPayURL } from '../../utils/WebViewUtil'

const BASE_URL = apiConfig.baseURL

export default function DetailSection({ course, isEnrolled, setIsEnrolled, setWebViewVisible, setSdkUrl }) {
    const { userData, session } = useContext(AuthContext)
    const [starts, setStars] = useState(0)

    const fetchFeedbackByCourseId = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/user/getCommentByCourseId`, {
                headers: {
                    Authorization: `Bearer ${session.token}`,
                },
                params: {
                    course_id: course.course_id
                }
            });
            const feedbacks = response.data.comments ? response.data.comments : []
            let avarageStar = 0;
            for (const fb of feedbacks) {
                avarageStar += fb.rate
            }
            setStars(avarageStar / feedbacks.length)
            // console.log(JSON.stringify(response.data, undefined, 4))
            // console.log(feedbacks.length)
            // console.log(avarageStar)
            // console.log(avarageStar / feedbacks.length)
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchFeedbackByCourseId()
        }, [])
    )

    const renderStars = (rating) => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FontAwesome
                    key={i}
                    name={i <= rating ? "star" : "star-o"}
                    size={30}
                    color="#ffd700" // Gold color for filled stars
                />
            );
        }
        return stars;
    };

    const handleEnrollCourse = async () => {
        //setIsEnrolled(!isEnrolled)

        if (!isEnrolled) {
            // setWebViewVisible(true);
            // setSdkUrl(buildVNPayURL(course.price))

            try {
                const response = await axios.post(`${BASE_URL}/api/user/addEnroll`,
                    {
                        enrollment: {
                            course_id: course.course_id,
                            enrolled_at: Date.now(),
                            price: course.price,
                            instructor_id: course.instructor_id
                        }
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${session.token}`,
                        }
                    }
                );
                if (response.data.success) {
                    setIsEnrolled(!isEnrolled)
                    console.log(JSON.stringify(response.data, undefined, 4))
                }
            } catch (error) {
                Alert.alert("Error", error.response?.data?.message || "An error occurred. Please try again.");
                console.log(JSON.stringify(error, undefined, 4))
            }
        }
    }

    return (
        <View style={{
            backgroundColor: color.WHITE,
            borderRadius: 15,
            padding: 10
        }}>
            <Image source={{ uri: course.image_url }} style={{
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
                        <OptionItem icon={"book-outline"} text={course.chapters?.length + ` Chapter${course.chapters?.length > 1 ? "s" : ""}`} />
                        <OptionItem icon={"book-outline"} text={course.hour + " Hours"} />
                    </View>
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 10
                    }}>
                        <OptionItem icon={"person-circle-outline"} text={course.instructor?.user_name} />
                        <OptionItem icon={"cellular-outline"} text={course.category} />
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
                    marginTop: 0,
                }}>
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        alignSelf: "center"
                    }}>
                        {renderStars(starts)}
                    </View>

                </View>
                <View style={{
                    marginTop: 15
                }}>
                    <TouchableOpacity
                        onPress={handleEnrollCourse}
                        style={{
                            padding: 20,
                            backgroundColor: isEnrolled ? color.GREEN : color.PRIMARY,
                            borderRadius: 15
                        }}>
                        <Text style={{
                            fontFamily: "outfit",
                            textAlign: "center",
                            color: color.WHITE,
                            fontSize: 17
                        }}>
                            {isEnrolled ? "You enrolled this course" : "Buy This Course: " + (course.is_trial ? "FREE" : formatCurrency(course.price))}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

function formatCurrency(amount) {
    // Chuyển đổi số nguyên thành chuỗi và định dạng lại với dấu chấm
    const formattedAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    // Thêm đơn vị tiền tệ "VND" vào cuối chuỗi
    return `${formattedAmount} VND`;
}
