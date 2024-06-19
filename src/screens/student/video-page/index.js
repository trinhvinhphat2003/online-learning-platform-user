import React, { useRef } from 'react'
import { View, StyleSheet, Image, StatusBar, Dimensions, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Video } from 'expo-av'

import Chapters from '../../../components/chapter';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import TopBackSection from '../../../components/top-back-section';
import { ExoPlayer } from 'react-native-exoplayer';
// import Video from 'react-native-video';


const { width, height } = Dimensions.get("window");


export default function VideoPage() {
    const playerRef = useRef(null);
    const navigation = useNavigation()
    return (
        <View style={style.container}>
            <TopBackSection headerTxt={"Chapter 1"}/>
            <StatusBar backgroundColor="#f58084" />
            <Video
                // source={require('../../../../assets/videos/maintro.mp4')}
                source={{uri: "https://1st-store.uk/files/1718303772331-pi5.mp4", type: "mp4"}}
                rate={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay={true}
                isLooping={false}
                useNativeControls
                style={style.video}
            />
            {/* <ExoPlayer
        ref={playerRef}
        style={style.video}
        source="https://customer-am50zbf6pttb0f9y.cloudflarestream.com/1b1fbc869db44290b87e9f24095c98bd/manifest/video.m3u8"
        resizeMode="contain"
        onReady={() => setLoading(false)}
        controls={true}
      /> */}
            <Chapters
                color="#fde6e6"
                percent={25}
                duration="2 hours, 20 minutes"
                title="Introduction 8unb8 bn8b 8ybyby  bb8u nbuybuybybyubuhiy "
                num={1}
            />

            <ScrollView style={{
                height: 350
            }}>
                <Text style={{
                    fontFamily: "outfit-medium",
                    textAlign: "justify",
                    color: "#345c74",
                    paddingLeft: 42,
                    paddingRight: 35,
                    lineHeight: 30
                }}>
                    User experiance (UX) design is the process design teams use to create
                    products that provide meaningful and relevant experiances to users. This
                    involves the design of the entire process of acquiring and integrating
                    the product, including aspects of branding, design, usability and function.
                    "User Experience Design" is often used interchangeably with
                    terms such as "User Interfase Design" and "usability". However, while
                    usability and user interfase (UI) design are important aspects of UX
                    design, they are subsets of it - UX design covers a vast array of other
                    areas, too. A UX designer is concerned with the entire process of
                    acquiring and integrating a product,... buyb buyb ububuy bububu u
                    nnoino nuono njonno onjonjnj
                    mipommi miomi miomiomi
                </Text>
            </ScrollView>
            <TouchableOpacity style={{
                flexDirection: "row",
                paddingVertical: 5,
                backgroundColor: "#f58084",
                marginHorizontal: 40,
                paddingVertical: 15,
                alignItems: "center",
                borderRadius: 10,
                justifyContent: "center",
                marginTop: 20,
                marginBottom: 10
            }}>
                <Text style={{
                    color: "#FFF",
                    fontFamily: "outfit-bold",
                    fontSize: 15,
                    textAlign: "center"
                }}>
                    MARK AS COMPLETE
                </Text>
                {/* <Image source={require('../../../../assets/videos/maintro.mp4')}/> */}
            </TouchableOpacity>
        </View>
    )
}
const style = StyleSheet.create({
    video: {
        width: width,
        height: height / 3
    },
    container: {
        backgroundColor: "#fff",
        justifyContent: "center",
        height: "100%",
    }
})