
import { View, Image, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import color from "../../themes/common/color";
import SearchBar from "../search-bar";
import CoinContainer from "./coin-container";
import { useNavigation } from "@react-navigation/native";

export default function Header({userData}) {
    const navigation = useNavigation()
    return (
        <View style={{
            padding: 20,
        }}>
            <View style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center"
                }}>
                    <Image source={{
                        uri: userData.image_url
                    }} style={{
                        width: 50,
                        height: 50,
                        borderRadius: 99
                    }} />
                    <View>
                        <Text style={{
                            color: color.WHITE,
                            fontFamily: "outfit"
                        }}>
                            Welcome,
                        </Text>
                        <Text style={{
                            color: color.WHITE,
                            fontSize: 20,
                            fontFamily: "outfit"
                        }}>
                            {userData.user_name}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity onPress={() => {
                    navigation.navigate("MoreCoin")
                }}>
                    <CoinContainer />
                </TouchableOpacity>

            </View>

            {/* <View>
                <SearchBar />
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
});