import { ScrollView, StyleSheet, Text, View, Image,Pressable } from "react-native";
import React, { useContext, useLayoutEffect,useState } from "react";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useEffect } from "react";
import axios from 'axios';

const ViewOrderScreen = () => {
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
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOredrs = async () => {
      try {
        const response = await axios.get(`http://192.168.1.101:8000/orders/${userId}`)
        const orders = response.data.orders
        setOrders(orders)
        setLoading(false)
        console.log(orders);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOredrs();
  }, []);
  return (
  <ScrollView style={{ padding: 10, flex: 1,marginTop:12 }}>
    <Text style={{fontSize:16,fontWeight:'bold'}}>Your Orders History</Text>
<ScrollView vertical  showsVerticalScrollIndicator={false}>
        {loading ? (
          <Text>Loading...</Text>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <Pressable
              style={{
                backgroundColor:'white',
                marginTop: 20,
                padding: 15,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#d0d0d0",
                marginHorizontal: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              key={order._id}
            >
              {/* Render the order information here */}
              {order.product.slice(0, 1)?.map((product) => (
                <View>
                <View style={{ marginVertical: 10 }} key={product._id}>
                  <Image
                    source={{ uri: product.image }}
                    style={{ width: 100, height: 100, resizeMode: "contain" }}
                  />
                </View>
              
             
                </View>
              ))}
                <View style={{
                  backgroundColor:'#eeeee4',
                  padding:15,
                  borderRadius:5
                }}>
                  <Text style={{textAlign:"center",fontSize:15,fontWeight:'500'}}>Total Purches Amount:{order.totalPrice}</Text>
                  </View>
            </Pressable>
          ))
        ) : (
          <Text>No orders found</Text>
        )}
      </ScrollView>
  </ScrollView>
  )
};

export default ViewOrderScreen;

const styles = StyleSheet.create({});
