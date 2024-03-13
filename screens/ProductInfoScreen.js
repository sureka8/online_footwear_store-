import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import { useSelector } from "react-redux";
const ProductInfoScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");
  const height = (width * 100) / 100;

  //add to cart
  const [addedToCart,setAddedToCart] =useState(false)
  const dispatch = useDispatch();
  const addItemToCart =(item)=>{
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(()=>{
setAddedToCart(false)
    },60000)
  }
  const cart =useSelector((state) =>state.cart.cart);
  console.log(cart);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ marginTop: 55, flex: 1, backgroundColor: "white" }}
    >
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
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {route.params.carouselImages?.map((item, index) => (
          <ImageBackground
            key={index}
            source={{ uri: item }}
            style={{ height, width, marginTop: 25, resizeMode: "contain" }}
          >
            <View
              style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "enter",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#C60C30",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: 12,
                  }}
                >
                  72% off
                </Text>
              </View>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "lightgray",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <MaterialCommunityIcons
                  name="share-variant"
                  size={24}
                  color="black"
                />
              </View>
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "lightgray",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginTop: "auto",
                marginLeft: 20,
                marginBottom: 20,
              }}
            >
              <AntDesign name="hearto" size={24} color="black" />
            </View>
          </ImageBackground>
        ))}
      </ScrollView>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>
          {route?.params?.title}
        </Text>
        <Text>{route?.params?.discription}</Text>
        <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 6 }}>
          {route?.params?.price}/=
        </Text>
      </View>
      <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Text>Colour:</Text>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {route?.params?.color}
        </Text>
      </View>
      <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "bold", marginVertical: 5 }}>
          Total Price:{route?.params?.price}
        </Text>
        <Text style={{ color: "#f85506" }}>
          Free Delivery Tommorow by 3 PM.order within 10hrs 30mins
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 5,
            alignItems: "center",
            gap: 5,
          }}
        >
          <Ionicons name="location" size={24} color="black" />
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            Delivery to Sureka-kilinochchi
          </Text>
        </View>
      </View>
      <View>
        <Text
          style={{ color: "green", marginHorizontal: 10, fontWeight: "500" }}
        >
          IN Stock
        </Text>
      </View>
      <Pressable
      onPress={()=>addItemToCart(route?.params.item)}
        style={{
          backgroundColor: "#ffcc66",
          padding: 10,
          alignItems: "center",
          borderRadius: 20,
          justifyContent: "center",
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
        {addedToCart?(
            <View>
                <Text style={{fontSize: 17}}>Added To Cart</Text>
            </View>
        ):(
            <Text>Add to Cart</Text>
        )}
      
      </Pressable>
      <Pressable   style={{
          backgroundColor: "#f85506",
          padding: 10,
          alignItems: "center",
          borderRadius: 20,
          justifyContent: "center",
          marginHorizontal: 10,
          marginVertical: 10,
        }}>
        <Text >Buy Now</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
