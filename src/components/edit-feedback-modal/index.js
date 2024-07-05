import React, { useContext, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import color from '../../themes/common/color';
import { Entypo } from '@expo/vector-icons';
import { apiConfig } from '../../config/api-config';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import { StarRating } from '../../screens/student/feedback';

const BASE_URL = apiConfig.baseURL

const EditFeedBackModal = ({ visible, onClose, feedback, fetchFeedbackByCourseId }) => {
    //console.log(JSON.stringify(feedback, undefined, 4))
    const [comment, setComment] = useState(feedback.comment);
    const { userData, session } = useContext(AuthContext)
    const [changePassLoading, setChangePassLoading] = useState(false)
    const [selection, setSelection] = useState(true)
    const [rate, setRating] = useState(feedback.rate);

    const handleDeleteFeedback = async () => {
        setChangePassLoading(true); // Bắt đầu loading
        try {
            const response = await axios.delete(`${BASE_URL}/api/user/deleteComment`,
                {
                    comment_id: feedback.comment_id
                },
                {
                    headers: {
                        Authorization: `Bearer ${session.token}`,
                    },
                });

            if (response.data.success) {
                onClose()
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Delete feedback successfully!',
                });
                fetchFeedbackByCourseId()
            } else {
                console.log(JSON.stringify(response.data, undefined, 4));
                console.log(feedback.comment_id)
                console.log(`Bearer ${session.token}`)
                //Alert.alert("Error", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching data:", JSON.stringify(error.response.data, undefined, 4));
            console.log(feedback.comment_id)
            Toast.show({
                type: 'error',
                text1: 'Failed',
                text2: 'Failed to Delete feedback!',
            });
        } finally {
            setChangePassLoading(false); // Kết thúc loading
        }
    }

    const handleEditFeedback = async () => {
        setChangePassLoading(true); // Bắt đầu loading
        try {
            const response = await axios.put(`${BASE_URL}/api/user/editComment`,
                {
                    comment: {
                        comment_id: feedback.comment_id,
                        comment: comment,
                        rate: rate
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${session.token}`,
                    },
                });

            if (response.data.success) {
                onClose()
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Edit feedback successfully!',
                });
                fetchFeedbackByCourseId()
            } else {
                console.log(JSON.stringify(response.data, undefined, 4));
                console.log(feedback.comment_id)
                console.log(`Bearer ${session.token}`)
                //Alert.alert("Error", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching data:", JSON.stringify(error.response.data, undefined, 4));
            console.log(feedback.comment_id)
            Toast.show({
                type: 'error',
                text1: 'Failed',
                text2: 'Failed to Edit feedback!',
            });
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
                                <TouchableOpacity style={{
                                    paddingVertical: 15,
                                    marginTop: 10,
                                    backgroundColor: color.PRIMARY,
                                    borderRadius: 5,
                                }} onPress={handleDeleteFeedback}>
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
                                                }}>Delete Feedback</Text>
                                            )
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    paddingVertical: 15,
                                    marginTop: 10,
                                    backgroundColor: color.PRIMARY,
                                    borderRadius: 5,
                                }} onPress={() => { setSelection(false) }}>
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
                                                }}>Edit Feedback</Text>
                                            )
                                    }
                                </TouchableOpacity>
                            </>
                        )
                        :
                        (
                            <>
                                <View>
                                    <StarRating rating={rate} setRating={setRating} />
                                </View>
                                <View
                                    style={{
                                        flexDirection: "column",
                                        marginBottom: 6,
                                        marginTop: 6
                                    }}
                                >
                                    <Text style={{ fontFamily: "outfit-bold" }}>Comment</Text>
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
                                            value={comment}
                                            onChangeText={(value) => setComment(value)}
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
                                }} onPress={handleEditFeedback}>
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
                                                }}>Save Change</Text>
                                            )
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    paddingVertical: 15,
                                    marginTop: 10,
                                    backgroundColor: color.PRIMARY,
                                    borderRadius: 5,
                                }} onPress={() => {
                                    setSelection(true)
                                    setComment(feedback.comment)
                                    setRating(feedback.rate)
                                }}>
                                    <Text style={{
                                        fontSize: 18,
                                        textAlign: 'center',
                                        color: 'white',
                                    }}>Back</Text>
                                </TouchableOpacity>
                            </>

                        )
                    }



                    <TouchableOpacity style={styles.cancelButton} onPress={() => {
                        //setEmail("")
                        setSelection(true)
                        setComment(feedback.comment)
                        setRating(feedback.rate)
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

export default EditFeedBackModal;