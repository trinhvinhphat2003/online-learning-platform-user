import React, { useContext, useState } from 'react'
import { ScrollView, TouchableOpacity, View, Image } from 'react-native'
import { Text } from 'react-native'
import TopBackSection from '../../../components/top-back-section'
import { useNavigation } from '@react-navigation/native'
import color from '../../../themes/common/color'
import StudentProfileCourse from '../../../components/student-profile-course'
import { mockCourse } from '../../../mock-data-support/course'

export default function TutorDetailScreen() {
    const navigation = useNavigation()

    const [videoList, setVideoList] = useState(mockCourse)
    const [collectionSelected, setCollectionSelected] = useState(1)


    onTabPressed = (value) => {
        setCollectionSelected(value)
    }
    return (
        <View style={{
            backgroundColor: color.PRIMARY,
            height: "100%"
        }}>
            <TopBackSection headerTxt={"TutorName"} />
            <View style={{
                backgroundColor: "#F5F5F5",
                height: "25%",
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50.,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around"
            }}>

                <View>
                    <Image
                        source={require('../../../../assets/google_logo.jpg')}
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 20,
                            alignSelf: "center",
                            marginVertical: 20
                        }}
                    />
                    <Text style={{
                        fontSize: 22,
                        fontFamily: "outfit-bold",
                        color: "#044244",
                        alignSelf: "center"
                    }}>
                        Ksenia Bator
                    </Text>
                    <Text style={{
                        fontFamily: "outfit-medium",
                        fontSize: 16,
                        color: "#9ca1a2",
                        alignSelf: "center"
                    }}>
                        Kiev, Ukraine
                    </Text>
                </View>

                <View style={{
                    flexDirection: "row",
                    alignSelf: "center",
                    marginTop: 20
                }}>

                    <View style={{ marginHorizontal: 40 }}>
                    <Text style={{
                            fontFamily: "outfit-bold",
                            fontSize: 20,
                            color: "#9ca1a2",
                            alignSelf: "center"
                        }}>
                            Total Course
                        </Text>
                        <Text style={{
                            fontFamily: "outfit-bold",
                            fontSize: 15,
                            color: "#044244",
                            alignSelf: "center"
                        }}>2,107</Text>
                        
                    </View>

                </View>
            </View>

            {/* Collection section */}
            <View style={{
                flexDirection: "row",
                paddingHorizontal: 40,
                paddingTop: 20
            }}>
                <TouchableOpacity
                    onPress={() => {onTabPressed(1)}}
                    style={{
                        borderBottomColor: collectionSelected === 1 ? "#FFF" : "#9ca1a2",
                        borderBottomWidth: 4,
                        paddingVertical: 6,
                    }}
                >
                    <Text style={{
                        fontFamily: "outfit-bold",
                        color: collectionSelected ? "#FFF" : "#9ca1a2"
                    }}>BASIC</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {onTabPressed(2)}}
                    style={{
                        borderBottomColor: collectionSelected === 2 ? "#FFF" : "#9ca1a2",
                        borderBottomWidth: 4,
                        paddingVertical: 6,
                        marginLeft: 30
                    }}
                >
                    <Text style={{
                        fontFamily: "outfit-bold",
                        color: collectionSelected ? "#9ca1a2" : "#FFF"
                    }}>INTERMEDIATE</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {onTabPressed(3)}}
                    style={{
                        borderBottomColor: collectionSelected === 3 ? "#FFF" : "#9ca1a2",
                        borderBottomWidth: 4,
                        paddingVertical: 6,
                        marginLeft: 30
                    }}
                >
                    <Text style={{
                        fontFamily: "outfit-bold",
                        color: collectionSelected ? "#9ca1a2" : "#FFF"
                    }}>EXPERT</Text>
                </TouchableOpacity>
            </View>


            <ScrollView style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 15,
                marginBottom: 15,
                paddingLeft: 3,
                paddingRight: 3
            }}>
                {videoList.map((item, index) => (
                    <StudentProfileCourse
                        index={index}
                        onPress={() => {
                            navigation.navigate("CourseDetail",
                                {
                                    course: item
                                }
                            )
                        }}
                        img={item.image}
                        title={item.title}
                        bg="#fff"
                    />
                ))}

            </ScrollView>
        </View>
    )
}
