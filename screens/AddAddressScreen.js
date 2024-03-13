import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { UserType } from "../UserContext";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";

const AddAddressScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
 // console.log("userId", userId);
  const [address, setAddress] = useState([]);
  useEffect(() => {
    fecthAddress();
  }, []);

  const fecthAddress = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.101:8000/address/${userId}`
      );
      const { address } = response.data;

      setAddress(address);
    } catch (error) {
      console.log(error);
    }
  };
  //refersh the address when the component comes to the focus is basically when we navigate back
  useFocusEffect(
    useCallback(() =>{
      fecthAddress()
    },[])
  )
  //console.log("address",address);
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 50 }}>
      <View
        style={{
          backgroundColor: "#f85506",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          height: 80,
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 8,
            height: 35,
            flex: 1,
          }}
        >
          <AntDesign
            name="search1"
            size={22}
            color="black"
            style={{ paddingLeft: 10 }}
          />
          <TextInput placeholder="Search Items" />
        </Pressable>
        <Feather name="mic" size={24} color="white" />
      </View>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Your Address</Text>
        <Pressable
          onPress={() => navigation.navigate("newaddress")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            borderColor: "#ffcc66",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingVertical: 7,
            paddingHorizontal: 5,
          }}
        >
          <Text>Add a new Address</Text>
          <MaterialIcons name="arrow-right" size={24} color="#f85506" />
        </Pressable>
        <Pressable>
          {address.map((item, index) => (
            <Pressable
              style={{
                borderWidth: 1,
                borderColor: "#D0D0D0",
                padding: 10,
                flexDirection: "column",
                //alignItems: "center",
                gap: 5,
                marginVertical: 10,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  {item.name}
                </Text>
                <Entypo name="location-pin" size={24} color="red" />
              </View>
              <Text style={{ fontSize: 15, color: "#181818" }}>
                {item.houseNo}
              </Text>
              <Text style={{ fontSize: 15, color: "#181818" }}>
                {item.street}
              </Text>
              <Text style={{ fontSize: 15, color: "#181818" }}>
                {item.city}
              </Text>
              <Text style={{ fontSize: 15, color: "#181818" }}>
                Phone No:{item.mobileNo}
              </Text>
              <Text style={{ fontSize: 15, color: "#181818" }}>
                Postal Code:{item.postalCode}
              </Text>
              <View style={{flexDirection:'row',alignItems:'center',gap:10,marginTop:7}}>
                <Pressable
                  style={{
                    backgroundColor: "#fififi",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#d0d0d0",
                  }}
                >
                  <Text>Edit</Text>
                </Pressable>
                <Pressable
                  style={{
                    backgroundColor: "#fififi",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#d0d0d0",
                  }}
                >
                  <Text>Remove</Text>
                </Pressable>
                <Pressable
                  style={{
                    backgroundColor: "#fififi",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#d0d0d0",
                  }}
                >
                  <Text>Set as Default</Text>
                </Pressable>
              </View>
            </Pressable>
          ))}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({});
