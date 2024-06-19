import React from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import color from '../../themes/common/color'
import { useNavigation } from '@react-navigation/native'
import { mockFeedback } from '../../mock-data-support/feedback'

export default function FeedbackSection() {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate("FeedBack", {
                feedbacks: mockFeedback
            })
        }}>
            <View style={{
                padding: 10,
                backgroundColor: color.WHITE,
                borderRadius: 15,
                marginTop: 20
            }}>
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
                        <View style={{
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            <Image
                                source={{ uri: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" }}
                                style={{
                                    height: 50,
                                    width: 50,
                                    borderWidth: 2,
                                    borderColor: "#f58084",
                                    borderRadius: 50,
                                }}
                            />
                        </View>
                        <View style={{ marginHorizontal: 20 }}>
                            <Text placeholder="Feedback Here" disable style={{
                                fontSize: 18,
                                fontFamily: "outfit",
                                color: "gray"
                            }} >
                                Feedback Here
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

            </View>
        </TouchableOpacity>
    )
}
