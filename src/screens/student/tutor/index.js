import React, { useCallback, useContext, useState } from 'react'
import { ActivityIndicator, FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import color from '../../../themes/common/color'
import SearchBar from '../../../components/search-bar'
import { mockTutos } from '../../../mock-data-support/tutors'
import TutorCard from '../../../components/tutor-card'
import { apiConfig } from '../../../config/api-config'
import axios from 'axios'
import { AuthContext } from '../../../context/AuthContext'
import { useFocusEffect } from '@react-navigation/native'

const BASE_URL = apiConfig.baseURL

export default function TutorScreen() {

    const [tutorLoading, setTutorLoading] = useState(false)
    const [tutors, setTutors] = useState([])
    const { userData, session } = useContext(AuthContext)
    const [name, setName] = useState("")

    const fetchTutor = async () => {
        setTutorLoading(true); // Bắt đầu loading
        try {
            const response = await axios.get(`${BASE_URL}/api/getInstructors`, {
                headers: {
                    Authorization: `Bearer ${session.token}`,
                },
                params: {
                    name: name === "" ? undefined : name
                }
            });

            if (response.data.success) {
                setTutors(response.data.instructorList)
                console.log(JSON.stringify(response.data.instructorList, undefined, 4));
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
                <SearchBar name={name} setName={setName} fetchData={fetchTutor} />
            </View>

            <View style={{
                backgroundColor: "#F5F5F5",
                padding: 0,
                width: "100%"
            }}>
                <View style={{
                    marginTop: -280,
                    paddingHorizontal: 20
                }}>

                    {/* <VerticalVideoList subHeadingColor={color.WHITE} title={"Popular Course"} isPrimary={false} hiddenTitle={true} containerStyle={{
                  marginTop: 40
              }} noSepLine={true}/> */}

                    {/* Tutor section */}
                    <View style={{
                        marginBottom: 10
                    }}>
                        <Text style={{
                            fontFamily: "outfit-bold",
                            fontSize: 25,
                            color: "white"
                        }}>
                            Tutors
                        </Text>
                    </View>

                    {
                        tutorLoading ?
                            (
                                <ActivityIndicator size="large" color={color.BLACK} style={{ marginTop: 20 }} />
                            )
                            :
                            (
                                < FlatList
                                    numColumns={2}
                                    data={tutors}
                                    scrollEnabled
                                    renderItem={(item, index) => {
                                        return (
                                            <TutorCard tutor={item} key={index} />
                                        )
                                    }}
                                    columnWrapperStyle={{
                                        justifyContent: "space-between",
                                        gap: 10
                                    }}
                                    ItemSeparatorComponent={() => {
                                        return (
                                            <View style={{
                                                height: 18,
                                                backgroundColor: "transparent"
                                            }} />
                                        )
                                    }}
                                    style={{
                                        width: "100%",
                                        height: 670
                                    }}
                                />
                            )
                    }

                </View>
            </View>
        </View>
    )
}
