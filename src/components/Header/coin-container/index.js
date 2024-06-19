import React from 'react'
import { Image, Text, View } from 'react-native'
import coinLogo from '../../../../assets/coin.png';
import color from '../../../themes/common/color';

export default function CoinContainer() {
    return (
        <View style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 5
        }}>
            <View style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                alignItems: "center"
            }}>
                <Image source={coinLogo} style={{
                    width: 35,
                    height: 35,
                    borderRadius: 99
                }} />
                <Text style={{
                    color: color.WHITE,
                    fontSize: 20,
                    fontFamily: "outfit"
                }}>
                    3598
                </Text>
            </View>
            <Text style={{
                fontFamily: "outfit-bold",
                color: color.WHITE,
                fontSize: 20
            }}>
                More Coin
            </Text>
        </View>
    )
}
