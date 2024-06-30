import { useNavigation } from '@react-navigation/native'
import React, { useContext, useState } from 'react'
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Icon from "@expo/vector-icons/Entypo"
import { Ionicons } from '@expo/vector-icons';
import SettingModal from '../../../components/setting-modal';
import { AuthContext } from '../../../context/AuthContext';
import StudentProfileCourse from '../../../components/student-profile-course';
import color from '../../../themes/common/color';
import { mockCourse } from '../../../mock-data-support/course';

export default function ProfileScreen() {
    const [videoList, setVideoList] = useState(mockCourse)
    const navigation = useNavigation()
    const { setIsLogin, userData } = useContext(AuthContext)

    const [collectionSelected, setCollectionSelected] = useState(true)
    const [modalVisible, setModalVisible] = useState(false);

    const handleEditProfile = () => {
        // Xử lý logic khi người dùng chọn "Edit Profile"
        navigation.navigate('EditProfile');
        setModalVisible(false); // Đóng modal sau khi chọn tùy chọn
    };

    const handleLogOut = () => {
        // Xử lý logic khi người dùng chọn "Log Out"
        console.log('Log Out');
        setModalVisible(false); // Đóng modal sau khi chọn tùy chọn
        setIsLogin(false)
    };

    onTabPressed = () => {
        setCollectionSelected(!collectionSelected)
    }
    return (
        <View style={{
            backgroundColor: color.PRIMARY,
            height: "100%",
        }}>
            <View style={{
                paddingHorizontal: 40,
                backgroundColor: "#F5F5F5",
                height: "42%",
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50
            }}>
                <View style={{
                    flexDirection: "row",
                    width: "100%",
                    marginTop: 40,
                    justifyContent: "flex-end"
                }}>

                    <View style={{
                        width: "50%",
                        alignItems: "flex-end"
                    }}>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <Ionicons name="settings" size={24} color="black" />
                        </TouchableOpacity>
                        <SettingModal
                            visible={modalVisible}
                            onClose={() => setModalVisible(false)}
                            onEditProfile={handleEditProfile}
                            onLogOut={handleLogOut}
                        />
                    </View>
                </View>

                <Image
                    source={{uri: userData.image_url}}
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
                    {userData.user_name}
                </Text>
                {/* <Text style={{
                    fontFamily: "outfit-medium",
                    fontSize: 16,
                    color: "#9ca1a2",
                    alignSelf: "center"
                }}>
                    Kiev, Ukraine
                </Text> */}


                <View style={{
                    flexDirection: "row",
                    alignSelf: "center",
                    marginTop: 20
                }}>
                    <View>
                        <Text style={{
                            fontFamily: "outfit-bold",
                            fontSize: 15,
                            color: "#044244",
                            alignSelf: "center"
                        }}>280</Text>
                        <Text style={{
                            fontFamily: "outfit-medium",
                            fontSize: 16,
                            color: "#9ca1a2",
                            alignSelf: "center"
                        }}>
                            In Progress
                        </Text>
                    </View>

                    <View style={{ marginHorizontal: 40 }}>
                        <Text style={{
                            fontFamily: "outfit-bold",
                            fontSize: 15,
                            color: "#044244",
                            alignSelf: "center"
                        }}>2,107</Text>
                        <Text style={{
                            fontFamily: "outfit-medium",
                            fontSize: 16,
                            color: "#9ca1a2",
                            alignSelf: "center"
                        }}>
                            Total Course
                        </Text>
                    </View>


                    <View>
                        <Text style={{
                            fontFamily: "outfit-bold",
                            fontSize: 15,
                            color: "#044244",
                            alignSelf: "center"
                        }}>104</Text>
                        <Text style={{
                            fontFamily: "outfit-medium",
                            fontSize: 16,
                            color: "#9ca1a2",
                            alignSelf: "center"
                        }}>
                            Completed
                        </Text>
                    </View>
                </View>
            </View>


            <View style={{
                flexDirection: "row",
                paddingHorizontal: 40,
                paddingTop: 20
            }}>
                <TouchableOpacity
                    onPress={this.onTabPressed}
                    style={{
                        borderBottomColor: collectionSelected ? "#FFF" : "#9ca1a2",
                        borderBottomWidth: 4,
                        paddingVertical: 6,
                    }}
                >
                    <Text style={{
                        fontFamily: "outfit-bold",
                        color: collectionSelected ? "#FFF" : "#9ca1a2"
                    }}>IN PROGRESS</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this.onTabPressed}
                    style={{
                        borderBottomColor: collectionSelected ? "#9ca1a2" : "#FFF",
                        borderBottomWidth: 4,
                        paddingVertical: 6,
                        marginLeft: 30
                    }}
                >
                    <Text style={{
                        fontFamily: "outfit-bold",
                        color: collectionSelected ? "#9ca1a2" : "#FFF"
                    }}>COMPLETED</Text>
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
                        key={index}
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
