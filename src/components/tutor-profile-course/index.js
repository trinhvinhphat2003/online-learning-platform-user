import React from 'react'
import { Text, TouchableOpacity, View, Image } from 'react-native'
import { Feather } from '@expo/vector-icons';
import color from '../../themes/common/color';


export default function TutorProfileCourse({ img, title, bg, onPress, course, index }) {

    return (
        <TouchableOpacity
            onPress={onPress}
            key={index}
            style={{
                flexDirection: "row",
                backgroundColor: bg,
                padding: 20,
                marginHorizontal: 20,
                borderRadius: 20,
                alignItems: "center",
                marginTop: 10,
                elevation: 3,
                justifyContent: "space-between"
            }}
        >
            <View style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 0
            }}>
                <Image
                    source={{ uri: img }}
                    style={{ width: 50, height: 50, borderRadius: 10 }}
                />

                <View>
                    <Text style={{
                        color: "#345c74",
                        fontFamily: "outfit-bold",
                        fontSize: 16,
                        paddingHorizontal: 20,
                        width: 240
                    }}>{title}
                    </Text>
                    <Text style={{
                        color: "#f58084",
                        fontFamily: "outfit-medium",
                        fontSize: 12,
                        paddingHorizontal: 20
                    }}>
                        {course.hour} hours, {course.chapters.length} chapters, {course.category}
                    </Text>
                </View>
            </View>

            {
                !course.isEnrolled && !course.is_trial ?
                (
                    <Feather name="play-circle" size={45} color={color.PRIMARY} />
                )
                :
                (
                    course.is_trial && !course.isEnrolled ?
                    (
                        <Text style={{
                            fontFamily: "outfit-bold",
                            fontSize: 20,
                            color: "green"
                        }}>TRIAL</Text>
                    )
                    :
                    (
                        course.isEnrolled ?
                        (
                            <Feather name="play-circle" size={45} color={color.GREEN} />
                        )
                        :
                        (
                            <Feather name="play-circle" size={45} color={color.PRIMARY} />
                        )
                    )
                    
                )
            }
            

        </TouchableOpacity>
    )
}

function formatCurrency(amount) {
    // Chuyển đổi số nguyên thành chuỗi và định dạng lại với dấu chấm
    const formattedAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    // Thêm đơn vị tiền tệ "VND" vào cuối chuỗi
    return `${formattedAmount} VND`;
}