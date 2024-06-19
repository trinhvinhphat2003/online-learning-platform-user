import { View, Image, StyleSheet, Text, Pressable, TouchableOpacity, TextInput, Alert } from "react-native";
import color from "../../../themes/common/color";
const backgroundImage = require("../../../../assets/login-background.png")
import { AntDesign } from '@expo/vector-icons';
import googleLogo from '../../../../assets/google_logo.jpg'
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import TextInputContainer from "../../../components/text-input-container";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { apiConfig } from "../../../config/api-config";
import Toast from "react-native-toast-message";

const BASE_URL = apiConfig.baseURL

export default function SignupScreen() {
    const { setIsLogin } = useContext(AuthContext)
    const navigation = useNavigation()
    const [username, setUsername] = useState("trinhvinhphat")
    const [email, setEmail] = useState("trinhvinhphat123@gmail.com")
    const [password, setPassword] = useState("1122334455")

    const validateInput = () => {
        if (!email || !password || !username) {
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

    const handleSignup = async () => {
        if (!validateInput()) return;

        try {
            const response = await axios.post(`${BASE_URL}/api/auth/register`, {
                user_name: username,
                email,
                password
            });

            if (response.status === 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Signup Successful',
                    text2: 'Welcome to Drawing Hub!',
                });
                navigation.navigate("Login")
                // Navigate to another screen if needed
            }
        } catch (error) {
            Alert.alert("Signup Error", "An unexpected error occurred.");
            console.log(JSON.stringify(error, undefined, 4))
        }
    };

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
                    REGISTER
                </Text>

                <View>
                    <TextInputContainer icon="account-check" name="Username" placeholder="Please enter username" value={username} setValue={setUsername} />
                    <TextInputContainer icon="email-outline" name="E-Mail" placeholder="Please enter email" value={email} setValue={setEmail} />
                    <TextInputContainer icon="lock-outline" name="Password" placeholder="Please enter a password" value={password} setValue={setPassword} />
                </View>

                <TouchableOpacity
                    onPress={handleSignup}
                    // onPress={() => {
                    //     setIsLogin(true)
                    // }}
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
                        Join Our Community
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    navigation.navigate("Login")
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
                                    style={{
                                        transform: [{ rotate: '180deg' }]
                                    }}
                                />
                            </View>
                            <View style={{ marginHorizontal: 0 }}>
                                <Text placeholder="Feedback Here" disable style={{
                                    fontSize: 18,
                                    fontFamily: "outfit",
                                    color: color.PRIMARY
                                }} >
                                    Back To Login
                                </Text>
                            </View>

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