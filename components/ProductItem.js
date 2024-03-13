import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import { useNavigation } from "@react-navigation/native";

const ProductItem = ({ item }) => {
 const navigation = useNavigation();
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };
  
  return (
    
    <Pressable style={{ marginHorizontal: 20, marginVertical: 15 }} 
    onPress={() =>
      navigation.navigate("singlepage", {
        id: item._id,
        title: item.title,
        discription: item.description,
        price: item?.price,
        carouselImages: item.images,
       
        item: item,
      })
    }
     >
        <View style={{backgroundColor:'white', borderRadius:5}}>  
        <Image
        source={{ uri: item.images[0] }}
        style={{
          width: 150,
          height: 150,
          borderRadius: 5,
          resizeMode: "contain",
        }}
      />
      <Text numberOfLines={1} style={{ marginTop: 10, width: 150 }}>
        {item.title}
      </Text>
      <View>
        <Text style={{ fontSize: 15, fontWeight: "bold" , marginLeft:10,color:'#f85506'}}>Rs.{item.price}</Text>
      </View>
        </View>
        <Pressable
        onPress={() => addItemToCart(item)}
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        {addedToCart ? (
          <View>
            <Text>Added to Cart</Text>
          </View>
        ) : (
          <Text>Add to Cart</Text>
        )}
      </Pressable>
     
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
