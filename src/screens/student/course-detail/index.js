import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import DetailSection from '../../../components/detail-section';
import ChapterSection from '../../../components/chapter-section';
import AuthorSection from '../../../components/author-section';
import FeedbackSection from '../../../components/feedback-section';
import TopBackSection from '../../../components/top-back-section';

export default function CourseDetailScreen() {
    const navigation = useNavigation()
    const params = useRoute().params;
    return (
        <View style={{
            width: "100%",
            height: "100%"
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
                    <DetailSection course={params.course} />
                    <AuthorSection />
                    <FeedbackSection />
                    <ChapterSection chapterList={params.course.chapters} />
                </View>
            </ScrollView>
        </View>

    )
}
