import { useState } from "react";
import { View, Image, StyleSheet, Text, TextInput } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import color from "../../themes/common/color";

export default function SearchBar() {
    return (
        <View style={styles.searchContainer}>
            <FontAwesome name="search" size={24} color={color.PRIMARY} style={{
                marginRight: 10
            }}/>
            <TextInput placeholder="Search For Courses" style={{
                fontSize: 18,
                fontFamily: "outfit"
            }}/>
        </View>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        display: "flex",
        flexDirection: "row",
        backgroundColor:  color.WHITE,
        padding: 15,
        borderRadius: 12,
        marginTop: 25,
    }
});