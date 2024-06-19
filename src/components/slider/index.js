import { useState } from "react";
import { View, Image, StyleSheet, Text, FlatList, Dimensions } from "react-native";

export default function Slider() {
    const [slider, setSlider] = useState([
        {
            id: "1",
            image: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
        },
        {
            id: "2",
            image: "https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045-2.jpg"
        }
    ])
    return (
        <View style={{marginTop: 10}}>
            <FlatList
                data={slider}
                horizontal={true}
                renderItem={({ item }) => (
                    <View>
                        <Image source={{
                            uri: item.image
                        }} style={styles.itemImage} />
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    itemImage: {
        width: Dimensions.get("screen").width * 0.85,
        height: 150,
        borderRadius: 10,
        marginRight: 15
    }
});