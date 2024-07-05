import React, { useContext, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import color from '../../themes/common/color';
import { Entypo } from '@expo/vector-icons';
import { apiConfig } from '../../config/api-config';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';

const BASE_URL = apiConfig.baseURL

const ResetPasswordModal = ({ visible, onClose }) => {

    const [email, setEmail] = useState("trinhvinhphat123@gmail.com");
    const [token, setToken] = useState("");
    const [newPass, setNewPass] = useState("");
    const { userData, session } = useContext(AuthContext)
    const [changePassLoading, setChangePassLoading] = useState(false)
    const [selection, setSelection] = useState(true)

    const handleEnterResetToken = async () => {
        setChangePassLoading(true); // Bắt đầu loading
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/changePasswordWithResetToken`,
                {
                    token: token,
                    email: email,
                    password: newPass
                },
                {
                    headers: {
                        Authorization: `Bearer ${session.token}`,
                    },
                });

            if (response.data.success) {
                console.log(JSON.stringify(response.data, undefined, 4));
                onClose()
                // open pass token modal
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Reset Password successfully!',
                });
            } else {
                console.log(JSON.stringify(response.data, undefined, 4));
                //Alert.alert("Error", response.data.message);
            }
        } catch (error) {
            // const response = error.response?.data
            // if(response) {
            //     let errStr = ""
            //     for(const error of response.errors) {
            //         if(error.path[1] === "oldPassword") {
            //             errStr += "Old Password: ";
            //             errStr += error.message;
            //         } else {
            //             errStr += "New Password: ";
            //             errStr += error.message;
            //         }
            //         errStr += "\n"
            //     }
            //     Alert.alert("Error", errStr);
            // }
            console.error("Error fetching data:", JSON.stringify(error.response.data, undefined, 4));
        } finally {
            setChangePassLoading(false); // Kết thúc loading
        }
    }

    const handleChangePass = async () => {
        setChangePassLoading(true); // Bắt đầu loading
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/forgetPassword`,
                {
                    email: email
                },
                {
                    headers: {
                        Authorization: `Bearer ${session.token}`,
                    },
                });

            if (response.data.success) {
                console.log(JSON.stringify(response.data, undefined, 4));
                setSelection(false)
                // Toast.show({
                //     type: 'success',
                //     text1: 'Success',
                //     text2: 'Send Reset Password Request successfully!',
                // });
            } else {
                console.log(JSON.stringify(response.data, undefined, 4));
                Alert.alert("Error", response.data.error);
            }
        } catch (error) {
            // const response = error.response?.data
            // if(response) {
            //     let errStr = ""
            //     for(const error of response.errors) {
            //         if(error.path[1] === "oldPassword") {
            //             errStr += "Old Password: ";
            //             errStr += error.message;
            //         } else {
            //             errStr += "New Password: ";
            //             errStr += error.message;
            //         }
            //         errStr += "\n"
            //     }
            //     Alert.alert("Error", errStr);
            // }
            console.error("Error fetching data:", JSON.stringify(error.response.data, undefined, 4));
        } finally {
            setChangePassLoading(false); // Kết thúc loading
        }
    }

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>

                    {selection ?
                        (
                            <>
                                <View
                                    style={{
                                        flexDirection: "column",
                                        marginBottom: 6,
                                    }}
                                >
                                    <Text style={{ fontFamily: "outfit-bold" }}>Email</Text>
                                    <View
                                        style={{
                                            height: 44,
                                            width: "100%",
                                            borderColor: color.secondaryGray,
                                            borderWidth: 1,
                                            borderRadius: 4,
                                            marginVertical: 6,
                                            justifyContent: "center",
                                            paddingLeft: 8,
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}
                                    >
                                        <TextInput
                                            value={email}
                                            onChangeText={(value) => setEmail(value)}
                                            editable={true}
                                            style={{ fontFamily: "outfit-medium" }}
                                        />
                                    </View>
                                </View>
                                <TouchableOpacity style={{
                                    paddingVertical: 15,
                                    marginTop: 10,
                                    backgroundColor: color.PRIMARY,
                                    borderRadius: 5,
                                }} onPress={handleChangePass}>
                                    {
                                        changePassLoading ?
                                            (
                                                <ActivityIndicator size="large" color={color.BLACK} style={{ marginTop: 20, alignSelf: "center" }} />
                                            )
                                            :
                                            (
                                                <Text style={{
                                                    fontSize: 18,
                                                    textAlign: 'center',
                                                    color: 'white',
                                                }}>Get Reset Token</Text>
                                            )
                                    }
                                </TouchableOpacity>
                            </>
                        )
                        :
                        (
                            <>
                                <View
                                    style={{
                                        flexDirection: "column",
                                        marginBottom: 6,
                                    }}
                                >
                                    <Text style={{ fontFamily: "outfit-bold" }}>Token</Text>
                                    <View
                                        style={{
                                            height: 44,
                                            width: "100%",
                                            borderColor: color.secondaryGray,
                                            borderWidth: 1,
                                            borderRadius: 4,
                                            marginVertical: 6,
                                            justifyContent: "center",
                                            paddingLeft: 8,
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}
                                    >
                                        <TextInput
                                            value={token}
                                            onChangeText={(value) => setToken(value)}
                                            editable={true}
                                            style={{ fontFamily: "outfit-medium" }}
                                        />
                                    </View>
                                </View><View
                                    style={{
                                        flexDirection: "column",
                                        marginBottom: 6,
                                    }}
                                >
                                    <Text style={{ fontFamily: "outfit-bold" }}>New Password</Text>
                                    <View
                                        style={{
                                            height: 44,
                                            width: "100%",
                                            borderColor: color.secondaryGray,
                                            borderWidth: 1,
                                            borderRadius: 4,
                                            marginVertical: 6,
                                            justifyContent: "center",
                                            paddingLeft: 8,
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}
                                    >
                                        <TextInput
                                            value={newPass}
                                            onChangeText={(value) => setNewPass(value)}
                                            editable={true}
                                            style={{ fontFamily: "outfit-medium" }}
                                        />
                                    </View>
                                </View>
                                <TouchableOpacity style={{
                                    paddingVertical: 15,
                                    marginTop: 10,
                                    backgroundColor: color.PRIMARY,
                                    borderRadius: 5,
                                }} onPress={handleEnterResetToken}>
                                    {
                                        changePassLoading ?
                                            (
                                                <ActivityIndicator size="large" color={color.BLACK} style={{ marginTop: 20, alignSelf: "center" }} />
                                            )
                                            :
                                            (
                                                <Text style={{
                                                    fontSize: 18,
                                                    textAlign: 'center',
                                                    color: 'white',
                                                }}>Enter Reset Token</Text>
                                            )
                                    }
                                </TouchableOpacity>
                            </>

                        )
                    }



                    <TouchableOpacity style={styles.cancelButton} onPress={() => {
                        //setEmail("")
                        setSelection(true)
                        onClose()
                    }}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    option: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    optionText: {
        fontSize: 18,
        textAlign: 'center',
    },
    cancelButton: {
        paddingVertical: 15,
        marginTop: 10,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    cancelButtonText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
    },
});

export default ResetPasswordModal;