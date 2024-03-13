import { StyleSheet, Text,Pressable, Image, View, ScrollView} from 'react-native'
import React,{useContext, useEffect, useLayoutEffect, useState} from 'react'
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import { Ionicons, AntDesign } from "@expo/vector-icons";
import axios from 'axios';


const ProfileScreen = () => {
  const navigation = useNavigation()
  useLayoutEffect(()=>{
navigation.setOptions({
  headerTitle:"",
  headerStyle:{
    backgroundColor: "white",

  },
  headerLeft:()=>(
   < Image style={{ width: 140, height: 120, resizeMode: "contain", marginLeft:8 }}
   source={require('../assets/logo.jpeg')
   } />
  ),
  headerRight:() =>(
    <View  style={{
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginRight: 12,
    }} >
       <Ionicons name="notifications-outline" size={24} color="black" />

<AntDesign name="search1" size={24} color="black" />

    </View>
  )
})
  },[]);

const[user,setUser]=useState();
const [orders,setOrders] =useState([]);
const [loading,setLoading] = useState(true)

 useEffect (()=>{
  const fetchUserProfile = async () =>{
    try {
      const response = await axios.get(`http://192.168.1.101:8000/profile/${userId}`)
      const {user} = response.data
      setUser(user)
    } catch (error) {
      console.log(error);
    }
  }
  fetchUserProfile();
 },[])
 console.log(user);
  const { userId, setUserId } = useContext(UserType);
  console.log(userId);
  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("AuthToken");
    console.log("auth token cleared");
    navigation.navigate("Login");
  };

  //fetch the order
  useEffect(() =>{
const fetchOredrs = async () =>{
  try {
    const response = await axios.get(`http://192.168.1.101:8000/orders/${userId}`)
    const orders = response.data.orders
    setOrders(orders)
    setLoading(false)
    console.log(orders);
  } catch (error) {
    console.log(error);
  }
}
fetchOredrs();
},[])
 
  return (
  <ScrollView  style={{ padding: 10, flex: 1 }}>
  
    <Text style={{ fontSize: 16, fontWeight: "bold" }}>Welcome {user?.name}</Text>
    <View  style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 12,
        }}>
      <Pressable 
      onPress={()=>navigation.navigate('vieworder')}
       style={{
            padding: 10,
            backgroundColor: "#ffcc66",
            borderRadius: 25,
            flex: 1,
          
          }} >
        <Text  style={{ textAlign: "center" }}>Your Orders</Text>
      </Pressable>
      <Pressable 
      onPress={() => navigation.navigate('account')}
      style={{
            padding: 10,
            backgroundColor: "#ffcc66",
            borderRadius: 25,
            flex: 1,
          }}>
        <Text  style={{ textAlign: "center" }}> Edit Your Account</Text>
      </Pressable>
    </View>
    <View  style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 12,
        }}>
      <Pressable
      onPress={() => navigation.navigate('main')}
      style={{
            padding: 10,
            backgroundColor: "#ffcc66",
            borderRadius: 25,
            flex: 1,
          }}>
        <Text  style={{ textAlign: "center" }}>Buy Again</Text>
      </Pressable>
      <Pressable 
      onPress={logout}
       style={{
            padding: 10,
            backgroundColor: "#ffcc66",
            borderRadius: 25,
            flex: 1,
          }}>
        <Text  style={{ textAlign: "center" }}>Log out</Text>
      </Pressable>
    </View>
  
  </ScrollView>

  )
}

export default ProfileScreen

const styles = StyleSheet.create({})