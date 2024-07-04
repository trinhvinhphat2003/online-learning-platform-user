import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react'
import { ActivityIndicator, Alert, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native'
import color from '../../../themes/common/color';
import TopBackSection from '../../../components/top-back-section';
import FeedbackItem from '../../../components/feedback-item';
import { apiConfig } from '../../../config/api-config';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';
import { isLoading } from 'expo-font';

const BASE_URL = apiConfig.baseURL

export default function FeedbackScreen() {
    const params = useRoute().params;
    const [feedbacks, setFeedbacks] = useState([])
    const { userData, session } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [comment, setComment] = useState('');
    const [rate, setRating] = useState(3);
    const [disableFeedback, setDisableFeedback] = useState(false)

    console.log(params.isEnrolled)

    const handleCommentSubmit = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/api/user/addComment`, {
                comment: {
                    course_id: params.courseId,
                    comment,
                    rate,
                    comment_at: Date.now()
                }
            }, {
                headers: {
                    Authorization: `Bearer ${session.token}`,
                },
            });
            // Assuming the API responds with updated feedbacks
            if (response.data.success) {
                fetchFeedbackByCourseId()
                // setComment(''); // Clear comment input after submission
                // setRating(0); // Reset rating after submission
            } else {
                Alert.alert("Error", error.response?.data?.message || "An error occurred. Please try again.");
            }
        } catch (error) {
            Alert.alert("Error", error.response?.data?.message || "An error occurred. Please try again.");
            console.error("Error adding comment:", JSON.stringify(error, undefined, 4));
        }
    };

    const fetchFeedbackByCourseId = async () => {
        setLoading(true); // Bắt đầu loading
        try {
            const response = await axios.get(`${BASE_URL}/api/user/getCommentByCourseId`, {
                headers: {
                    Authorization: `Bearer ${session.token}`,
                },
                params: {
                    course_id: params.courseId
                }
            });
            const feedbacks = response.data.comments ? response.data.comments : []
            for (const fb of feedbacks) {
                if (userData.user_id === fb.user_id) {
                    setDisableFeedback(true)
                }
            }
            setFeedbacks(feedbacks.reverse())
            console.log(JSON.stringify(response.data, undefined, 4))
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false); // Kết thúc loading
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchFeedbackByCourseId()
        }, [])
    )
    return (
        <View style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#F5F5F5",
            flex: 1
        }}>
            {/* back section */}
            <TopBackSection headerTxt={"Feedback"} />
            {
                loading ?
                    (
                        <ActivityIndicator size="large" color={color.BLACK} style={{ marginTop: 20 }} />
                    ) :
                    (
                        <FlatList
                            data={feedbacks}
                            renderItem={(item) => {
                                return (
                                    <FeedbackItem feedback={item} />
                                )
                            }}
                            keyExtractor={(item, index) => index.toString()}
                            style={{
                                width: "100%",
                                height: 300
                            }}
                        />
                    )
            }


            {/* input comement section */}
            {
                disableFeedback || !params.isEnrolled?
                (
                    !params.isEnrolled ?
                    (
                        <View style={{
                            width: "100%",
                            height: 80,
                            backgroundColor: "white",
                            position: "absolute",
                            bottom: 0,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: 10,
                            borderTopWidth: 1,
                            borderColor: "gray"
                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontFamily: "outfit-bold",
                                color: "red",
                                width: "100%",
                                textAlign: "center"
                            }}>
                                You must enrolled to comment
                            </Text>
                        </View>
                    )
                    :
                    (
                        <View style={{
                            width: "100%",
                            height: 80,
                            backgroundColor: "white",
                            position: "absolute",
                            bottom: 0,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: 10,
                            borderTopWidth: 1,
                            borderColor: "gray"
                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontFamily: "outfit-bold",
                                color: "red",
                                width: "100%",
                                textAlign: "center"
                            }}>
                                You have commented on this course
                            </Text>
                        </View>
                    )
                )
                     :
                    (
                        <View style={{
                            position: "absolute",
                            bottom: 0,
                            backgroundColor: "white",
                            borderTopWidth: 1,
                            borderColor: "gray"
                        }}>
                            {/* Star rating section */}
                            <StarRating rating={rate} setRating={setRating} />
                            <View style={{
                                width: "100%",
                                height: 80,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: 10,
                                borderTopWidth: 1,
                                borderColor: "gray"
                            }}>
                                <TextInput placeholder="Type comment here..." style={{
                                    fontSize: 18,
                                    fontFamily: "outfit",
                                    width: "70%",
                                    height: "100%"
                                }}
                                    value={comment}
                                    onChangeText={text => setComment(text)}
                                />
                                <TouchableOpacity style={{
                                    width: "25%",
                                    height: "70%",
                                    backgroundColor: color.PRIMARY,
                                    borderRadius: 15,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                                    onPress={handleCommentSubmit}
                                >
                                    <Text style={{
                                        color: "white",
                                        fontSize: 18,
                                        fontFamily: "outfit-medium",
                                    }}>
                                        Comment
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            
                        </View>

                    )
            }

        </View>
    )
}

const StarRating = ({ rating, setRating }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 10, backgroundColor: color.PRIMARY }}>
            {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                    <Ionicons
                        name={star <= rating ? 'star' : 'star-outline'}
                        size={35}
                        color={"#ffd700"}
                    />
                </TouchableOpacity>
            ))}
        </View>
    );
};
