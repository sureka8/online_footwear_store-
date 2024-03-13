import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ImageBackground,
  Dimensions,
} from "react-native";
import React ,{ useState }from "react";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer";


const SingleProductScreen = () => {
  const route = useRoute();
  const { width } = Dimensions.get("window");
  const height = (width * 100) / 100;

  const [addedToCart,setAddedToCart]=useState();
  const dispatch = useDispatch();
  const addItemToCart=(item) =>{
setAddedToCart(true);
dispatch(addToCart(item));
setTimeout(()=>{
  setAddedToCart(false)
},6000)
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
        {route.params.carouselImages.map((item, index) => (
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
            </View>
          </ImageBackground>
        ))}
       
      </ScrollView>
      <View style={{ padding: 10,height:180,width:'90%',backgroundColor:'#f2f2f2',marginLeft:17,borderRadius:8 }} >
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            {route?.params?.title}
          </Text>
          <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1,margin:10 }} />
          <Text>{route?.params?.discription}</Text>
          <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 ,margin:10}} />
          <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 6 }}>
           Rs. {route?.params?.price}
          </Text>
        </View>
        <Pressable
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
        <Text>Buy Now</Text>
      </Pressable>
        <Pressable 
        onPress={()=>addItemToCart(route?.params.item)}
          style={{
          backgroundColor: "#f85506",
          padding: 10,
          alignItems: "center",
          borderRadius: 20,
          justifyContent: "center",
          marginHorizontal: 10,
          marginVertical: 10,
        }}>
       {addedToCart?(
            <View>
                <Text style={{fontSize: 17}}>Added To Cart</Text>
            </View>
        ):(
            <Text>Add to Cart</Text>
        )}
      </Pressable>
    </ScrollView>
  );
};

export default SingleProductScreen;

const styles = StyleSheet.create({});
