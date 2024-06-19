import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import color from '../../../themes/common/color'
import SearchBar from '../../../components/search-bar'
import VerticalVideoList from '../../../components/vertical-video-list'

export default function CourseScreen() {
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
                <SearchBar />
            </View>

            <View style={{
                backgroundColor: "#F5F5F5",
                padding: 0,
                width: "100%"
            }}>
                <View style={{
                    marginTop: -280
                }}>
                    {/* Category section */}
                    <View style={{
                        paddingHorizontal: 20
                    }}>
                        <Text style={{
                            fontFamily: "outfit-bold",
                            fontSize: 25,
                            color: "white"
                        }}>
                            Categories
                        </Text>
                    </View>

                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 10,
                        marginTop: 10,
                        paddingHorizontal: 20
                    }}>
                        <TouchableOpacity style={{
                            padding: 10,
                            backgroundColor: "white",
                            color: "black",
                            borderRadius: 10,
                            flex: 1
                        }} >
                            <Text style={{
                                fontFamily: "outfit-medium",
                                fontSize: 20,
                                textAlign: "center"
                            }}>
                                Basic
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            padding: 10,
                            backgroundColor: "white",
                            color: "black",
                            borderRadius: 10,
                            flex: 1.5
                        }} >
                            <Text style={{
                                fontFamily: "outfit-medium",
                                fontSize: 20,
                                textAlign: "center"
                            }}>
                                Intermidiate
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            padding: 10,
                            backgroundColor: "white",
                            color: "black",
                            borderRadius: 10,
                            flex: 1
                        }} >
                            <Text style={{
                                fontFamily: "outfit-medium",
                                fontSize: 20,
                                textAlign: "center"
                            }}>
                                Advanced
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        paddingHorizontal: 20,
                        marginTop: 20
                    }}>
                        <Text style={{
                            fontFamily: "outfit-bold",
                            fontSize: 25,
                            color: "white"
                        }}>
                            Tutors
                        </Text>
                    </View>
                    
                    <VerticalVideoList subHeadingColor={color.WHITE} title={"Popular Course"} isPrimary={false} hiddenTitle={true} containerStyle={{
                        marginTop: 10
                    }} noSepLine={true}/>
                </View>
            </View>
        </View>
    )
}
