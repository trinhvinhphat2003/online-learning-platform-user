import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react'
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native'
import color from '../../../themes/common/color';
import TopBackSection from '../../../components/top-back-section';
import FeedbackItem from '../../../components/feedback-item';

export default function FeedbackScreen() {
    const params = useRoute().params;
    const [feedbacks, setFeedbacks] = useState(params?.feedbacks)
    return (
        <View style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#F5F5F5",
            flex: 1
        }}>
            {/* back section */}
            <TopBackSection headerTxt={"Feedback"}/>
            <FlatList data={feedbacks} renderItem={(item, index) => {
                return (
                    <FeedbackItem feedback={item} key={index}/>
                )
            }}/>

            {/* input comement section */}
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
                <TextInput placeholder="Type comment here..." style={{
                    fontSize: 18,
                    fontFamily: "outfit",
                    width: "70%",
                    height: "100%"
                }} />
                <TouchableOpacity style={{
                    width: "25%",
                    height: "70%",
                    backgroundColor: color.PRIMARY,
                    borderRadius: 15,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
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
