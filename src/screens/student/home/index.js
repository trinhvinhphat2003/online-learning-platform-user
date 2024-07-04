import { View, StyleSheet, Text, ActivityIndicator, FlatList } from "react-native";
import Header from "../../../components/Header";
import color from "../../../themes/common/color";
import VideoCourseList from "../../../components/video-course-list";
import VerticalVideoList from "../../../components/vertical-video-list";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { apiConfig } from "../../../config/api-config";
import axios from "axios";
import HorizontialTutorList from "../../../components/horizontial-tutor-list";

const BASE_URL = apiConfig.baseURL

export default function HomeScreen() {

    const { userData, session } = useContext(AuthContext)
    const [courses, setCourses] = useState({ data: [], time: Date.now() })
    const [courseLoading, setCourseLoading] = useState(false)
    const [tutorLoading, setTutorLoading] = useState(false)
    const [tutors, setTutors] = useState([])

    const fetchTutor = async () => {
        setTutorLoading(true); // Bắt đầu loading
        try {
            const response = await axios.get(`${BASE_URL}/api/user/getInstructors`, {
                headers: {
                    Authorization: `Bearer ${session.token}`,
                },
            });

            if (response.data.success) {
                setTutors(response.data.instructorList)
                console.log(JSON.stringify(response.data.instructorList, undefined, 4));
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setTutorLoading(false); // Kết thúc loading
        }
    }

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                setCourseLoading(true); // Bắt đầu loading
                try {
                    const response = await axios.get(`${BASE_URL}/api/user/getCourse`, {
                        headers: {
                            Authorization: `Bearer ${session.token}`,
                        },
                    });
                    const response2 = await axios.get(`${BASE_URL}/api/user/getEnroll`, {
                        headers: {
                            Authorization: `Bearer ${session.token}`,
                        }
                    });

                    let standardlizedData = []

                    if (response2.data.success) {
                        for (const courseRes of response.data.courses) {
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
                            if (check === false) {
                                standardlizedData.push({
                                    ...courseRes,
                                    isEnrolled: false
                                })
                            }
                        }

                        await setCourses({ data: standardlizedData, time: Date.now() })
                    } else {
                        await setCourses({ data: response.data.courses, time: Date.now() })
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                } finally {
                    setCourseLoading(false); // Kết thúc loading
                }
            };

            fetchData();
            fetchTutor();
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

    const renderHeader = () => {
        return (
            <View style={{
                backgroundColor: color.PRIMARY,
                width: "100%",
                height: 300,
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30
            }}>
                <Header userData={userData} />
            </View>
        );
    }

    const renderContent = () => {
        return (
            <View style={{
                backgroundColor: "#F5F5F5",
                paddingTop: 0,
                width: "100%"
            }}>
                <View style={{
                    marginTop: -185
                }}>
                    <VideoCourseList loading={courseLoading} navigateTo={"course"} subHeadingColor={color.WHITE} isPrimary={false} title={"Trial Courses"} courses={courses?.data?.filter((item) => item.is_trial)} />
                </View>
                {renderLineDevider({ marginTop: 30, marginBottom: 10 })}
                <HorizontialTutorList loading={courseLoading} navigateTo={"tutor"} subHeadingColor={color.BLACK} isPrimary={true} title={"Most Contribution Tutor"} tutors={tutors?.sort((a, b) => b.courses?.length - a.courses?.length).slice(0, 5)} />
                <VerticalVideoList titleStyle={{ marginBottom: 10, paddingHorizontal: 0 }} containerStyle={{ paddingHorizontal: 20 }} loading={courseLoading} navigateTo={"course"} subHeadingColor={color.BLACK} title={"New Courses"} isPrimary={true} courses={courses?.data?.filter(item => !item.is_trial).slice(0, 5)} />
            </View>
        );
    }

    return (
        <FlatList
            data={[]}
            ListHeaderComponent={renderHeader}
            ListEmptyComponent={renderContent}
        />
    );
}

const styles = StyleSheet.create({
});
