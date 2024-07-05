import { View, Image, StyleSheet, Text, Pressable, TouchableOpacity, TextInput, Alert } from "react-native";
import color from "../../../themes/common/color";
const backgroundImage = require("../../../../assets/login-background.png")
import { AntDesign } from '@expo/vector-icons';
import googleLogo from '../../../../assets/google_logo.jpg'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import TextInputContainer from "../../../components/text-input-container";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import axios from "axios";
import { apiConfig } from "../../../config/api-config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ResetPasswordModal from "../../../components/reset-password-modal";

const BASE_URL = apiConfig.baseURL

export default function LoginScreen() {
    const { setIsLogin, setUserData, userData, setSession, session, login } = useContext(AuthContext)
    const navigation = useNavigation()
    const [email, setEmail] = useState("trinhvinhphat123@gmail.com")
    const [password, setPassword] = useState("1122334455")
    const [modalVisible, setModalVisible] = useState(false);

    const validateInput = () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter both email and password.");
            return false;
        }
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert("Error", "Please enter a valid email.");
            return false;
        }
        return true;
    };

    const handleLogin = async () => {
        if (!validateInput()) return;

        console.log(`${BASE_URL}/api/auth/login`)
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/login`, {
                email: email,
                password: password,
            });

            if (response.data.success) {
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Logged in successfully!',
                });
                //console.log(JSON.stringify(response.data, undefined, 4))
                // await setUserData(response.data.result.user)
                // await setSession(response.data.result.session)
                await login(response.data.result.user, response.data.result.session)
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Login failed',
                    text2: 'Unknow user',
                });
            }
        } catch (error) {
            Alert.alert("Error", error.response?.data?.message || "An error occurred. Please try again.");
            console.log(JSON.stringify(error, undefined, 4))
        }
    };

    // useEffect(() => {
    //     const checkUserSession = async () => {
    //         const userDataAsync = await AsyncStorage.getItem('userData');
    //         const sessionAsync = await AsyncStorage.getItem('session');
    //         if (userData !== null && sessionAsync !== null) {
    //           const sessionAfterParse = JSON.parse(sessionAsync);
    //           const userDataAfterParse = JSON.parse(userDataAsync);
    //           const currentTime = new Date().getTime();
    //           console.log(session.time > currentTime)
    //           if (session.time > currentTime) {
    //             console.log("gello")
    //             await setUserData(userDataAfterParse);
    //             await setToken(sessionAfterParse);
    //             await login()
    //           }
    //         }
    //         console.log("Async")
    //         console.log(JSON.stringify(JSON.parse(userDataAsync), undefined, 4))
    //         console.log(JSON.stringify(JSON.parse(sessionAsync), undefined, 4))
    //       };

    //       checkUserSession();
    // }, [])

    // const handleLogin = async () => {
    //     console.log(`${BASE_URL}/api/auth/login`)
    //     try {
    //         console.log(`test1`)
    //         const response = await axios.post(`https://capyventure.eastasia.cloudapp.azure.com/auth/login/password`, {
    //             email: "admin2@gmail.com"
    //         }).then((response) => {
    //             console.log(JSON.stringify(response, undefined, 4))
    //             return response
    //         }).catch((error) => {
    //             console.log(JSON.stringify(error, undefined, 4))
    //         })

    //     } catch (error) {
    //         Alert.alert("Error", error.response?.data?.message || "An error occurred. Please try again.");
    //         console.log(JSON.stringify(error, undefined, 4))
    //     }
    //     console.log(`test1`)
    // };

    return (
        <View style={styles.loginContainer}>
            <Image source={backgroundImage} style={styles.displayImage} />
            <View style={styles.formContainer}>
                <Text style={styles.displayTxt}>
                    DRAWING HUB
                </Text>
                <Text style={{
                    textAlign: "center",
                    fontSize: 20,
                    color: color.LIGHT_PRIMARY,
                    fontFamily: "outfit",
                    marginTop: 0
                }}>
                    Your Ultimate Drawing Learning Hub
                </Text>

                <Text style={{
                    textAlign: "center",
                    fontSize: 25,
                    color: color.WHITE,
                    fontFamily: "outfit-bold",
                    marginTop: 15
                }}>
                    LOGIN
                </Text>

                <View>
                    <TextInputContainer icon="email-outline" name="E-Mail" placeholder="Please enter email" value={email} setValue={setEmail} />
                    <TextInputContainer icon="lock-outline" name="Password" placeholder="Please enter a password" value={password} setValue={setPassword} />
                </View>

                <TouchableOpacity
                    // onPress={() => {
                    //     Toast.show({
                    //         type: 'success',
                    //         text1: 'Success',
                    //         text2: 'Logged in successfully!'
                    //     });
                    //     setIsLogin(true)
                    // }}
                    onPress={handleLogin}
                    style={{
                        backgroundColor: color.WHITE,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        padding: 10,
                        borderRadius: 99,
                        marginTop: 25,
                        alignItems: "center",
                        gap: 10
                    }}>
                    {/* <Image source={googleLogo} style={{
                        width: 40,
                        height: 40
                    }} /> */}
                    <Text style={{
                        fontSize: 20,
                        color: color.PRIMARY,
                        fontFamily: "outfit-bold"
                    }}>
                        Sign In To Our Community
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    navigation.navigate("Signup")
                }} style={{
                    alignSelf: "center",
                    marginTop: 10
                }}>
                    <View style={{
                        padding: 10,
                        backgroundColor: color.WHITE,
                        borderRadius: 15,
                        marginTop: 20,
                        width: 250
                    }}>
                        <View style={{
                            flexDirection: "row",
                            marginHorizontal: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around"
                        }}>
                            <View style={{ marginHorizontal: 0 }}>
                                <Text placeholder="Feedback Here" disable style={{
                                    fontSize: 18,
                                    fontFamily: "outfit",
                                    color: color.PRIMARY
                                }} >
                                    Sign Up Here
                                </Text>
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
                                    source={require('../../../../assets/a2.png')}
                                />
                            </View>
                        </View>

                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    setModalVisible(true)
                }} style={{
                    alignSelf: "center",
                    marginTop: 0
                }}>
                    <View style={{
                        padding: 10,
                        backgroundColor: color.WHITE,
                        borderRadius: 15,
                        marginTop: 20,
                        width: 250
                    }}>
                        <View style={{
                            flexDirection: "row",
                            marginHorizontal: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around"
                        }}>
                            <View style={{ marginHorizontal: 0 }}>
                                <Text placeholder="Feedback Here" disable style={{
                                    fontSize: 18,
                                    fontFamily: "outfit",
                                    color: color.PRIMARY
                                }} >
                                    Reset Password
                                </Text>
                            </View>
                            <ResetPasswordModal
                                visible={modalVisible}
                                onClose={() => setModalVisible(false)}
                            // onEditProfile={handleEditProfile}
                            // onLogOut={handleLogOut}
                            />
                        </View>

                    </View>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    loginContainer: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "100%"
    },
    formContainer: {
        backgroundColor: color.PRIMARY,
        height: 1000,
        width: "100%",
        padding: 20,
        marginTop: -100,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50
    },
    displayImage: {
        width: "100%",
        height: 400
    },
    displayTxt: {
        textAlign: "center",
        fontSize: 35,
        fontFamily: "outfit-bold",
        color: color.WHITE,
        marginTop: 10
    },
    googleLoginButtonContainer: {
        backgroundColor: color.primary,
        padding: 10,
        margin: 30,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    }
});