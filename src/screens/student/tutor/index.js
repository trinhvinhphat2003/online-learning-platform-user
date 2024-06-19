import React, { useState } from 'react'
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import color from '../../../themes/common/color'
import SearchBar from '../../../components/search-bar'
import { mockTutos } from '../../../mock-data-support/tutors'
import TutorCard from '../../../components/tutor-card'

export default function TutorScreen() {

    const [tutors, setTutors] = useState(mockTutos)

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

                    {/* List Tutor Section */}
                    <FlatList 
                        numColumns={2}
                        data={tutors}
                        scrollEnabled
                        renderItem={(item, index) => {
                            return (
                                <TutorCard tutor={item} key={index}/>
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
                            height: 690
                        }}
                    />

                </View>
            </View>
        </View>
    )
}
