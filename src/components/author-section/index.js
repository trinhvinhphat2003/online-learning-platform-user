import React, { useCallback, useContext } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import color from '../../themes/common/color'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { apiConfig } from '../../config/api-config'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

const BASE_URL = apiConfig.baseURL

export default function AuthorSection({instructorId}) {
    const navigation = useNavigation()
    const { userData, session } = useContext(AuthContext)

    const fetchInstructorById = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/getCourse`, {
                headers: {
                    Authorization: `Bearer ${session.token}`,
                },
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            //fetchInstructorById()
        }, [])
    )

    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate("TutorDetail")
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
                        <View style={{ marginHorizontal: 20 }}>
                            <Text style={{
                                color: "#345c74",
                                fontFamily: "outfit-bold",
                                fontSize: 18
                            }}>Mikolaj Galezioski</Text>
                            <Text style={{
                                color: "#f58084",
                                fontFamily: "outfit-medium",
                                fontSize: 12
                            }}>
                                Author, UI/UX Designer
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
