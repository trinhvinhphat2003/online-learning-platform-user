import React from "react";
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import Icon  from "react-native-vector-icons/MaterialCommunityIcons";
import color from "../../themes/common/color";
import { apiConfig } from "../../config/api-config";

const TextInputContainer = (props) => {
    const { name, icon, placeholder, value, setValue} = props;
    return(
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Icon name={icon} size={30} color={color.PRIMARY} />
            </View>
            <View>
                <Text style={styles.title}>{name}</Text>
                <TextInput onChangeText={(text) => setValue(text)} value={value} style={styles.input} placeholder={placeholder} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: color.WHITE,
        borderRadius: 5,
        marginVertical: 10,
        shadowColor: "#585656",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    iconContainer: { marginRight: 10 },
    title: {
        fontWeight: "bold",
        color: "#212F3C",
        fontFamily: "outfit-bold"
    },
    input: {
        width: Dimensions.get('window').width / 2 + 20,
        height: 30,
        fontFamily: "outfit-medium"
    }
});

export default TextInputContainer;