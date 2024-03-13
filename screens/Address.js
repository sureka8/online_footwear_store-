import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { UserType } from "../UserContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {jwtDecode} from "jwt-decode"
import { decode, encode } from 'base-64';

const Address = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const{userId,setUserId}= useContext(UserType);

  if (!global.btoa) {
    global.btoa = encode;
  }
  
  if (!global.atob) {
    global.atob = decode;
  }

  useEffect(() =>{
    const fetchUser = async () =>{
      try {
        const token = await AsyncStorage.getItem('AuthToken')
       // console.log("token1",token);
        if(token !== null) {
          const decode = jwtDecode(token);
          const userId = decode.userId;
          setUserId(userId)
    
        }
      } catch(e) {
        console.log(e);
      }
    }
    fetchUser()
  },[])


  const handleAddAdress =() =>{
    const address ={
      name,
      mobileNo,
      houseNo,
      street,
      city,
      postalCode
    }

    axios.post("http://192.168.1.101:8000/address",{userId,address}).then((response) => {
      Alert.alert("Success","Address added successfully");
      setName('');
      setMobileNo('');
      setHouseNo('');
      setStreet('');
      setCity('');
      setPostalCode('')

      setTimeout(() =>{
      navigation.goBack();
      },500)

    }).catch((error) =>{
      Alert.alert("error","Address added error");
  console.log("error",error);
   } ) 
  }
  return (
    <ScrollView style={{ marginTop: 50 }}>
      <View style={{ height: 50, backgroundColor: "#f85506" }} />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          Add a new Address
        </Text>
      
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Full Name (first and last name)
          </Text>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholderTextColor={"black"}
            placeholder="Enter Your Name"
            style={{
              padding: 10,
              borderColor: "#ffcc66",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Mobile No</Text>
          <TextInput
            value={mobileNo}
            onChangeText={(text) => setMobileNo(text)}
            placeholderTextColor={"black"}
            placeholder="Mobile No"
            style={{
              padding: 10,
              borderColor: "#ffcc66",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Flat,House No,Building,Company
          </Text>
          <TextInput
            value={houseNo}
            onChangeText={(text) => setHouseNo(text)}
            placeholderTextColor={"black"}
            placeholder=""
            style={{
              padding: 10,
              borderColor: "#ffcc66",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Area,Street,sector,village
          </Text>
          <TextInput
            value={street}
            onChangeText={(text) => setStreet(text)}
            placeholderTextColor={"black"}
            placeholder=""
            style={{
              padding: 10,
              borderColor: "#ffcc66",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>City</Text>
          <TextInput
            value={city}
            onChangeText={(text) => setCity(text)}
            placeholderTextColor={"black"}
            placeholder=""
            style={{
              padding: 10,
              borderColor: "#ffcc66",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Postal Code</Text>
          <TextInput
            value={postalCode}
            onChangeText={(text) => setPostalCode(text)}
            placeholderTextColor={"black"}
            placeholder="Enter postalcode"
            style={{
              padding: 10,
              borderColor: "#ffcc66",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <Pressable
        onPress={handleAddAdress}
          style={{
            backgroundColor: "#f85506",
            padding: 19,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>Add Address</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Address;

const styles = StyleSheet.create({});
