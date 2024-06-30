import React, { useContext } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome } from 'react-native-vector-icons';
import { AuthContext } from '../../context/AuthContext';

function timeDifferent(milliseconds) {
    const now = new Date();
    const past = new Date(milliseconds);
    const diffInSeconds = Math.floor((now - past) / 1000);

    const secondsInMinute = 60;
    const secondsInHour = secondsInMinute * 60;
    const secondsInDay = secondsInHour * 24;
    const secondsInMonth = secondsInDay * 30;
    const secondsInYear = secondsInDay * 365;

    let difference, unit;

    if (diffInSeconds < secondsInMinute) {
        difference = diffInSeconds;
        unit = 'giây';
    } else if (diffInSeconds < secondsInHour) {
        difference = Math.floor(diffInSeconds / secondsInMinute);
        unit = 'phút';
    } else if (diffInSeconds < secondsInDay) {
        difference = Math.floor(diffInSeconds / secondsInHour);
        unit = 'giờ';
    } else if (diffInSeconds < secondsInMonth) {
        difference = Math.floor(diffInSeconds / secondsInDay);
        unit = 'ngày';
    } else if (diffInSeconds < secondsInYear) {
        difference = Math.floor(diffInSeconds / secondsInMonth);
        unit = 'tháng';
    } else {
        difference = Math.floor(diffInSeconds / secondsInYear);
        unit = 'năm';
    }

    return `${difference} ${unit} trước`;
}

const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <FontAwesome
                key={i}
                name={i <= rating ? "star" : "star-o"}
                size={20}
                color="#ffd700" // Gold color for filled stars
            />
        );
    }
    return stars;
};

export default function FeedbackItem({ feedback }) {
    const { userData, session } = useContext(AuthContext)
    return (
        <View style={{
            width: "90%",
            backgroundColor: "white",
            alignSelf: "center",
            marginTop: 20,
            padding: 20
        }}>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",

                }}>
                    <Image source={{ uri: feedback.item?.userData?.image_url ? feedback.item.userData.image_url : "https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045-2.jpg" }} style={{
                        width: 40,
                        height: 40,
                        borderRadius: 99
                    }} />
                    <View style={{
                        marginLeft: 10
                    }}>
                        <Text style={{
                            fontSize: 17,
                            fontFamily: "outfit-medium",
                            color: feedback.item.user_id === userData.user_id ? "red" : "black"
                        }}>
                            {/* {feedback.item.userName } */}
                            {feedback.item?.userData?.user_name ? feedback.item.userData.user_name : "user"} {feedback.item.user_id === userData.user_id && "(you)"}
                        </Text>
                        <Text style={{
                            fontSize: 12,
                            fontFamily: "outfit-medium",
                            color: "gray"
                        }}>
                            {timeDifferent(feedback.item.comment_at)}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <SimpleLineIcons name="options-vertical" size={18} color="black" />
                </TouchableOpacity>
            </View>

            <Text style={{
                fontSize: 17,
                fontFamily: "outfit-bold",
                marginTop: 10
            }}>
                {feedback.item.comment}
            </Text>

            <Text style={{
                fontSize: 17,
                fontFamily: "outfit-bold",
                marginTop: 10
            }}>
                {renderStars(feedback.item.rate)}
            </Text>

        </View>
    )
}
