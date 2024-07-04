import React, { useContext, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import color from '../../themes/common/color';
import { Entypo } from '@expo/vector-icons';

const ChangePasswordModal = ({ visible, onClose }) => {

    const [oldPass, setOldPass] = useState("fdfs");
    const [newPass, setNewPass] = useState("sfdsf");
    const [isHideOldPass, setIsHideOldPass] = useState(false)
    const [isHideNewPass, setIsHideNewPass] = useState(false)

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>

                    <View
                        style={{
                            flexDirection: "column",
                            marginBottom: 6,
                        }}
                    >
                        <Text style={{ fontFamily: "outfit-bold" }}>Old Password</Text>
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
                                value={oldPass}
                                onChangeText={(value) => setOldPass(value)}
                                editable={true}
                                style={{ fontFamily: "outfit-medium" }}
                                secureTextEntry={isHideOldPass}
                            />
                            <TouchableOpacity onPress={() => setIsHideOldPass(!isHideOldPass)} style={{
                                marginRight: 5
                            }}>
                                <Entypo name={isHideOldPass ? "eye-with-line" : "eye"} size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View
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
                                secureTextEntry={isHideNewPass}
                            />
                            <TouchableOpacity onPress={() => setIsHideNewPass(!isHideNewPass)} style={{
                                marginRight: 5
                            }}>
                                <Entypo name={isHideNewPass ? "eye-with-line" : "eye"} size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.cancelButton} onPress={() => {
                        setOldPass("")
                        setNewPass("")
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

export default ChangePasswordModal;