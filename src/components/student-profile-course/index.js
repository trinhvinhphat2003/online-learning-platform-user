import React from 'react'
import { Text, TouchableOpacity, View, Image } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons';
import color from '../../themes/common/color';

export default function StudentProfileCourse({ img, title, bg, onPress, course, index }) {

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
                    <View style={{
                        width: "100%",
                        height: 10,
                        backgroundColor: "white",
                        borderRadius: 99,
                        borderWidth: 3,
                        borderColor: color.PRIMARY,
                        marginLeft: 10
                    }}>
                        <View style={{
                            width: calculatePercentage(course?.courseCompleted?.length, course?.chapters?.length),
                            height: "100%",
                            backgroundColor: color.GREEN
                        }}>

                        </View>
                    </View>
                </View>
            </View>

            {
                !course.isEnrolled ?
                    (
                        <Feather name="play-circle" size={45} color={color.PRIMARY} />
                    )
                    :
                    (
                        course.isEnrolled ?
                            (
                                calculatePercentage(course?.courseCompleted?.length, course?.chapters?.length) === "100%" ?
                                    (
                                        <Ionicons name="checkmark-circle" size={45} color={color.GREEN} />
                                    )
                                    :
                                    (
                                        <Feather name="play-circle" size={45} color={color.GREEN} />
                                    )

                            )
                            :
                            (
                                <Feather name="play-circle" size={45} color={color.PRIMARY} />
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

function calculatePercentage(part, total) {
    if (total === 0) {
        return '0%'; // Tránh chia cho 0
    }

    const ratio = part / total;
    const percentage = Math.round(ratio * 100); // Làm tròn đến số nguyên gần nhất
    return `${percentage}%`;
}