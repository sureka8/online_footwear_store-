import { StyleSheet, Text, View,Image, ScrollView,TextInput,Pressable,Alert } from 'react-native'
import React, { useContext, useLayoutEffect,useState ,useEffect} from "react";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import axios from 'axios';

const AccountScreen = () => {
    const { userId, setUserId } = useContext(UserType);
  console.log(userId);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "white",
      },
      headerLeft: () => (
        <Image
          style={{
            width: 140,
            height: 120,
            resizeMode: "contain",
            marginLeft: 8,
          }}
          source={require("../assets/logo.jpeg")}
        />
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginRight: 12,
          }}
        >
          <Ionicons name="notifications-outline" size={24} color="black" />

          <AntDesign name="search1" size={24} color="black" />
        </View>
      ),
    });
  }, []);
  const[user,setUser]=useState();
  useEffect (()=>{
    const fetchUserProfile = async () =>{
      try {
        const response = await axios.get(`192.168.1.101:8000/profile/${userId}`)
        const {user} = response.data
        setUser(user)
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserProfile();
   },[])
   console.log(user);
  const addressid = user?.address.slice(0,1)?.map((address) =>address._id
  )
   const [name, setName] = useState("");
   const [mobileNo, setMobileNo] = useState("");
   const [houseNo, setHouseNo] = useState("");
   const [street, setStreet] = useState("");
   const [city, setCity] = useState("");
   const [postalCode, setPostalCode] = useState("");
   //const [addid,setAddid] =useState(addressid)

   const handleUpdate =() =>{
    const updatedUsers ={
      name,
      mobileNo,
      houseNo,
      street,
      city,
      postalCode
    }

    axios.put("http://172.17.24.198:8000/address",{userId,addressid,updatedUsers}).then((response) => {
      Alert.alert("Success","Address added successfully");
      setName('');
      setMobileNo('');
      setHouseNo('');
      setStreet('');
      setCity('');
      setPostalCode('')

      setTimeout(() =>{
      //navigation.goBack();
      },500)

    }).catch((error) =>{
      Alert.alert("error","Address added error");
  console.log("error",error);
   } ) 
  }
  return (
   
 <ScrollView>
  
 <View>
    {user?.address.slice(0,1)?.map((address,index) =>(
        
        <ScrollView style={{ marginTop: 50 }}>
      
        <View style={{ padding: 10 }}>
        
       
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Full Name (first and last name)
            </Text>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholderTextColor={"black"}
              placeholder={address.name}
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
              placeholder={address.mobileNo}
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
              placeholder={address.houseNo}
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
              placeholder={address.street}
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
              placeholder={address.city}
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
              placeholder={address.postalCode}
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
       onPress={handleUpdate}
            style={{
              backgroundColor: "#f85506",
              padding: 19,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>Update</Text>
          </Pressable>
        </View>
      </ScrollView>

    ))}
 </View>
 </ScrollView>
  )
}

export default AccountScreen

const styles = StyleSheet.create({})