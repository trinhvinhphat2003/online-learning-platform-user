import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
  StyleSheet,
} from "react-native";
import React, { useContext, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { useNavigation } from '@react-navigation/native';
import color from "../../../themes/common/color";
import TopBackSection from "../../../components/top-back-section";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { apiConfig } from "../../../config/api-config";
import Toast from "react-native-toast-message";

const BASE_URL = apiConfig.baseURL

export default function EditProfile() {
  const { userData, session, setUserData } = useContext(AuthContext)
  const navigation = useNavigation()
  const [selectedImage, setSelectedImage] = useState(userData.image_url);
  const [name, setName] = useState(userData.user_name);
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState("randompassword");
  const [imageDetail, setImageDetail] = useState(null)
  //const [country, setCountry] = useState("Nigeria");

  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(new Date(userData.date_of_birth)),
    "YYYY-MM-DD"
  );
  const [selectedStartDate, setSelectedStartDate] = useState(userData.date_of_birth ? userData.date_of_birth : "2023-12-12");
  const [startedDate, setStartedDate] = useState(userData.date_of_birth);

  const handleSaveChange = async () => {
    const updateData = {
      user_name: name,
      email: email,
      date_of_birth: selectedStartDate,
      image_url: userData.image_url
    }

    if (imageDetail !== null) {
      const localUri = imageDetail.assets[0].uri;
      const filename = imageDetail.assets[0].fileName || localUri.split('/').pop();
      const type = imageDetail.assets[0].mimeType || 'image/jpeg';

      const fileData = { uri: localUri, name: filename, type }

      const formData = new FormData();
      formData.append('file', fileData);
      console.log(JSON.stringify(fileData, undefined, 4))

      const baseImageUrl = "https://1st-store.uk/files/";

      try {
        const response = await axios.post('https://1st-store.uk/files/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        const data = response.data;
        console.log(JSON.stringify(data, undefined, 4))
        if(data.success) {
          updateData.image_url=baseImageUrl + data.filename
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    try {
      const response = await axios.put(`${BASE_URL}/api/user/updateCustomerProfile`, 
        {
          userData: updateData
        },
        {
          headers: {
              Authorization: `Bearer ${session.token}`,
          },
      });

      console.log(JSON.stringify(response.data, undefined, 4))

      if (response.data.success) {
        setUserData({
          ...userData,
          user_name: updateData.user_name,
          image_url: updateData.image_url,
          date_of_birth: updateData.date_of_birth
        })
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Edit profile successfully!',
      });
      }
  } catch (error) {
      console.error("Error fetching data:", error);
  }



    // console.log(JSON.stringify(updateData, undefined, 4))
    // console.log(JSON.stringify(imageDetail, undefined, 4))

  }

  const handleChangeStartDate = (propDate) => {
    setStartedDate(propDate);
  };

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    setImageDetail(result);

    //console.log(result);

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  function renderDatePicker() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={openStartDatePicker}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: color.PRIMARY,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              padding: 35,
              width: "90%",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <DatePicker
              mode="calendar"
              current={selectedStartDate.replace(/-/g, '/')}
              minimumDate={startDate}
              selected={selectedStartDate.replace(/-/g, '/')}
              onDateChanged={handleChangeStartDate}
              onSelectedChange={(date) => setSelectedStartDate(date.replace(/\//g, '-'))}
              options={{
                backgroundColor: color.PRIMARY,
                textHeaderColor: "#469ab6",
                textDefaultColor: color.WHITE,
                selectedTextColor: color.WHITE,
                mainColor: "#469ab6",
                textSecondaryColor: color.WHITE,
                borderColor: "rgba(122,146,165,0.1)",
              }}
            />

            <TouchableOpacity onPress={handleOnPressStartDate}>
              <Text style={{ fontFamily: "outfit", color: color.WHITE }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
  return (
    <View >
      <TopBackSection headerTxt={"Profile"} />

      <ScrollView style={{
        padding: 20
      }}>
        <View
          style={{
            alignItems: "center",
            marginVertical: 22,
          }}
        >
          <TouchableOpacity onPress={handleImageSelection}>
            <Image
              source={{ uri: selectedImage }}
              style={{
                height: 170,
                width: 170,
                borderRadius: 85,
                borderWidth: 2,
                borderColor: color.PRIMARY,
              }}
            />

            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 10,
                zIndex: 9999,
              }}
            >
              <MaterialIcons
                name="photo-camera"
                size={32}
                color={color.PRIMARY}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ fontFamily: "outfit-bold", }}>Name</Text>
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
              }}
            >
              <TextInput
                value={name}
                onChangeText={(value) => setName(value)}
                editable={true}
                style={{ fontFamily: "outfit-medium" }}
              />
            </View>
          </View>

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
              }}
            >
              <TextInput
                value={email}
                onChangeText={(value) => setEmail(value)}
                editable={false}
                style={{ fontFamily: "outfit-medium" }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ fontFamily: "outfit-bold" }}>Password</Text>
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
              }}
            >
              <TextInput
                value={password}
                onChangeText={(value) => setPassword(value)}
                editable={false}
                secureTextEntry
                style={{ fontFamily: "outfit-medium" }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ fontFamily: "outfit-bold" }}>Date or Birth</Text>
            <TouchableOpacity
              onPress={handleOnPressStartDate}
              style={{
                height: 44,
                width: "100%",
                borderColor: color.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <Text style={{ fontFamily: "outfit-medium" }}>{selectedStartDate}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <View
          style={{
            flexDirection: "column",
            marginBottom: 6,
          }}
        >
          <Text style={{ fontFamily: "outfit-bold" }}>Country</Text>
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
            }}
          >
            <TextInput
              value={country}
              onChangeText={(value) => setCountry(value)}
              editable={true}
            />
          </View>
        </View> */}

        <TouchableOpacity
          style={{
            backgroundColor: color.PRIMARY,
            height: 44,
            borderRadius: 6,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 45
          }}
          onPress={handleSaveChange}
        >
          <Text
            style={{
              fontFamily: "outfit-bold",
              color: color.WHITE,
            }}
          >
            Save Change
          </Text>
        </TouchableOpacity>

        {renderDatePicker()}
      </ScrollView>
    </View>
  )
}
const style = StyleSheet.create({
})