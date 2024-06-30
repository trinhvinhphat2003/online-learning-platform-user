import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Alert, BackHandler, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import DetailSection from '../../../components/detail-section';
import ChapterSection from '../../../components/chapter-section';
import AuthorSection from '../../../components/author-section';
import FeedbackSection from '../../../components/feedback-section';
import TopBackSection from '../../../components/top-back-section';
import { apiConfig } from '../../../config/api-config';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import color from '../../../themes/common/color';
import WebView from 'react-native-webview';
import Toast from 'react-native-toast-message';

const BASE_URL = apiConfig.baseURL

export default function CourseDetailScreen() {
    const navigation = useNavigation()
    const { course, isInstructor } = useRoute().params;
    const { userData, session } = useContext(AuthContext)
    const [courseDetail, setCourseDetail] = useState(course)
    const [standardizedChapters, setStandardizedChapters] = useState([])
    const [isEnrolled, setIsEnrolled] = useState(course.isEnrolled)
    const [loading, setLoading] = useState(false)
    const [webViewVisible, setWebViewVisible] = useState(false);
    const [sdkUrl, setSdkUrl] = useState("https://www.google.com/");

    const handleSdkReturn = (url) => {
        if (url.includes('vnp_TransactionStatus=00')) {
            console.log('Transaction successful');
            setWebViewVisible(false);
            //ToastAndroid.show('Quay lại từ SDK thành công', ToastAndroid.SHORT);
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Enrolled successfully!',
            });
        } else if (url.includes('vnp_TransactionStatus=02')) {
            Alert.alert("Cancel transaction", "You have cancel transaction");
            console.log('Transaction Cancel');
            setWebViewVisible(false);
        }
    };

    const fetchCompletedChapter = async () => {
        setLoading(true); // Bắt đầu loading
        try {
            const response = await axios.get(`${BASE_URL}/api/getCompleteChapter`, {
                headers: {
                    Authorization: `Bearer ${session.token}`,
                },
                params: {
                    course_id: courseDetail.course_id
                }
            });
            // await setUserData(response.data.result.user)
            // await setSession(response.data.result.session)
            // await login()
            let standardizedChapters = []
            if (response.data.success) {

                const completedChapters = response.data.chapterCompleted

                for (const chapter of courseDetail.chapters) {
                    let isCompleted = false;
                    for (const completedChapter of completedChapters) {
                        if (chapter.chapter_id === completedChapter.chapter_id) {
                            isCompleted = true;
                        }
                    }

                    standardizedChapters.push({
                        ...chapter,
                        isCompleted: isCompleted
                    })
                }

            } else {
                for (const chapter of courseDetail.chapters) {
                    standardizedChapters.push({
                        ...chapter,
                        isCompleted: false
                    })
                }
            }
            setStandardizedChapters(standardizedChapters)
            console.log(JSON.stringify(standardizedChapters, undefined, 4));
        } catch (error) {
            Alert.alert("Error", error.response?.data?.message || "An error occurred. Please try again.");
            console.log(JSON.stringify(error, undefined, 4))
        } finally {
            setLoading(false); // Kết thúc loading
        }
    };

    async function handleIsCourseEnrolled() {
        try {
            const response = await axios.get(`${BASE_URL}/api/getEnroll`, {
                headers: {
                    Authorization: `Bearer ${session.token}`,
                }
            });

            if (response.data.success) {
                console.log(JSON.stringify(response.data.enrollData, undefined, 4));
                for (const item of response.data.enrollData) {
                    if (courseDetail.course_id === item.course_id) {
                        setIsEnrolled(true)
                    }
                }
            } else {
            }
        } catch (error) {
            Alert.alert("Error", error.response?.data?.message || "An error occurred. Please try again.");
            console.log(JSON.stringify(error, undefined, 4))
        }
    }

    useFocusEffect(
        useCallback(() => {
            // handleIsCourseEnrolled()
            fetchCompletedChapter()
        }, [])
    )

    useEffect(() => {
        const backAction = () => {
            //ToastAndroid.show('Quay lại từ SDK thành công', ToastAndroid.SHORT);
            Alert.alert("Cancel transaction", "You have cancel transaction");
            if (webViewVisible) {
                setWebViewVisible(false);
                return true; // prevent default behavior (exit the app)
            }
            return false; // let the default behavior happen
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, [webViewVisible]);

    return webViewVisible ? (
        <WebView
            source={{ uri: sdkUrl }}
            onNavigationStateChange={(event) => handleSdkReturn(event.url)}
            style={{
                // position: "absolute",
                height: "100%",
                width: '100%',
            }}
        />
    )
        :
        (
            <View style={{
                width: "100%",
                height: "100%",
                //position: "relative"
            }}>
                {/* back section */}
                <TopBackSection headerTxt={"Course Detail"} />
                <ScrollView scrollEventThrottle={16} bounces={false} style={{
                    width: "100%",
                    height: "100%"
                }}>
                    <View style={{
                        width: "100%",
                        height: "100%",
                        padding: 20,
                        backgroundColor: "#F5F5F5"
                    }}>
                        <DetailSection course={courseDetail} isEnrolled={isEnrolled} setIsEnrolled={setIsEnrolled} setWebViewVisible={setWebViewVisible} setSdkUrl={setSdkUrl} />
                        {
                            !isInstructor && <AuthorSection instructorId={courseDetail.instructor_id} />
                        }

                        <FeedbackSection courseId={courseDetail.course_id} isEnrolled={isEnrolled} isTrial={course.is_trial} />

                        {
                            loading ? (
                                <ActivityIndicator size="large" color={color.BLACK} style={{ marginTop: 20 }} />
                            ) :
                                (
                                    <ChapterSection chapterList={standardizedChapters} isEnrolled={isEnrolled} isTrial={courseDetail.is_trial} />
                                )
                        }
                    </View>
                </ScrollView>
            </View>

        )
}
