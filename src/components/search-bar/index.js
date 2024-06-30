import { useState } from "react";
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import color from "../../themes/common/color";

export default function SearchBar({ name, setName, fetchData }) {
    return (
        <View style={styles.searchContainer}>
            <TouchableOpacity onPress={fetchData}>
                <FontAwesome name="search" size={24} color={color.PRIMARY} style={{
                    marginRight: 10
                }} />
            </TouchableOpacity>

            <TextInput placeholder="Search For Courses" style={{
                fontSize: 18,
                fontFamily: "outfit"
            }}
                onChangeText={(text) => setName(text)} // Update name state
                value={name} />
        </View>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: color.WHITE,
        padding: 15,
        borderRadius: 12,
        marginTop: 25,
    }
});