import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import React, { useEffect, useState, useCallback, useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";

import { BottomModal, ModalContent, SlideAnimation } from "react-native-modals";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { decode, encode } from "base-64";

const HomeScreen = () => {
  const list = [
    {
      id: "0",
      image: "https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg",
      name: "Home",
    },
    {
      id: "1",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg",
      name: "Deals",
    },
    {
      id: "3",
      image:
        "https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg",
      name: "Electronics",
    },
    {
      id: "4",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg",
      name: "Mobiles",
    },
    {
      id: "5",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/music.jpg",
      name: "Music",
    },
    {
      id: "6",
      image: "https://m.media-amazon.com/images/I/51dZ19miAbL._AC_SY350_.jpg",
      name: "Fashion",
    },
  ];
  const images = [
    "https://cdn.grabon.in/gograbon/images/merchant/1662021162670.jpg",
    "https://images.summitmedia-digital.com/spotph/images/2023/03/03/80fa5741-ae16-4173-a039-2dbb6847a695-1677825077.jpeg",
    "https://d168jcr2cillca.cloudfront.net/uploadimages/coupons/9921-Puma_Offers_Coupons_2.jpg",
  ];
  const product = [
    {
      _id: "1",
      name: "Men White shose",
      image:
        "https://media.istockphoto.com/id/1324847242/photo/pair-of-white-leather-trainers-on-white-background.jpg?s=1024x1024&w=is&k=20&c=paCekjw8iHTIKD4jpPXPdZY60gtOgbXV3pO9k1OTASo=",
      price: 2500,
      countInStock: 10,
      rating: 4,
      numRevies: 5,
    },
    {
      _id: "2",
      name: "Men Casual shose",
      image:
        "https://media.gettyimages.com/id/171224469/photo/canvas-shoes.jpg?s=2048x2048&w=gi&k=20&c=pSVFKgIg1L9B1O7_Wj84NYDSbJ2wEKqLMIdkm0PMwdM=",
      price: 2000,
      countInStock: 5,
      rating: 3,
      numRevies: 6,
    },
    {
      _id: "3",
      name: "Old brown boots",
      image:
        "https://media.gettyimages.com/id/154918134/photo/old-brown-boots-isolated-on-white-background.jpg?s=2048x2048&w=gi&k=20&c=G51juqo9p13UL6B2l5691LvI-zHQFRci2k_pjgpKrLw=",
      price: 3000,
      countInStock: 3,
      rating: 5,
      numRevies: 4,
    },
    {
      _id: "4",
      name: "Suede Leather's Shoes",
      image:
        "https://media.gettyimages.com/id/185063401/photo/suede-leathers-shoes.jpg?s=2048x2048&w=gi&k=20&c=UR9dtfh6NmJzlHzGCE0_N7uoCdDW57PaOx5VF3UU37o=",
      price: 2800,
      countInStock: 7,
      rating: 4,
      numRevies: 6,
    },
    {
      _id: "5",
      name: "High Res Football Boots",
      image:
        "https://media.gettyimages.com/id/182780951/photo/gold-football-boots.jpg?s=2048x2048&w=gi&k=20&c=-fuhP6iJ3--dT944Ygv61w-LUxSlmdEYGdiHtYD5pBE=",
      price: 4000,
      countInStock: 6,
      rating: 4,
      numRevies: 3,
    },
    {
      _id: "6",
      name: "Black Sneakers",
      image:
        "https://media.gettyimages.com/id/157434344/photo/black-sneakers.jpg?s=2048x2048&w=gi&k=20&c=lQjjZ7jMexdHCBNFUtozKzH-f1_HGmzRS-8kCTZmAHo=",
      price: 4500,
      countInStock: 8,
      rating: 4,
      numRevies: 3,
    },
  ];
  const deals = [
    {
      _id: "20",
      title: "Party Slippers for Women - India ",
      description: "Top class party ",
      oldprice: 4500,
      price: 1260,
      offer: "72% off",
      image:
        "https://hasmath-next-ecommerce.s3.amazonaws.com/1693378457098.webp",
      images: [
        "https://hasmath-next-ecommerce.s3.amazonaws.com/1693378457098.webp",
        "https://hasmath-next-ecommerce.s3.amazonaws.com/1693378465645.jpeg",
        "https://hasmath-next-ecommerce.s3.amazonaws.com/1693378471974.webp",
        "https://hasmath-next-ecommerce.s3.amazonaws.com/1693378481106.webp",
        "https://hasmath-next-ecommerce.s3.amazonaws.com/1694278610555.jpeg",
      ],

      Colour: "pink",
    },
    {
      _id: "30",
      title: "BATA Mens Wedding Shoe",
      description: "Newly Arrived",
      oldprice: 7500,
      price: 3000,
      offer: "60% off",
      image:
        "https://hasmath-next-ecommerce.s3.amazonaws.com/1693378279944.webp",
      images: [
        "https://hasmath-next-ecommerce.s3.amazonaws.com/1693378273530.webp",
        "https://hasmath-next-ecommerce.s3.amazonaws.com/1693378279944.webp",
        "https://hasmath-next-ecommerce.s3.amazonaws.com/1693378286428.webp",
      ],
      Colour: "Black",
    },
    {
      id: "40",
      title: "Nike Boots ",
      description:
        "Nike soccer boots blend tech, style, and athlete endorsements. From Flyknit fit to dynamic collars, they enhance performance and individuality.",
      oldprice: 7000,
      price: 2940,
      offer: "52% off",
      image:
        "https://hasmath-next-ecommerce.s3.amazonaws.com/1693369162566.jpeg",
      carouselImages: [
        "https://hasmath-next-ecommerce.s3.amazonaws.com/1693368703436.jpeg",
        "https://hasmath-next-ecommerce.s3.amazonaws.com/1693368819279.jpeg",
        "https://hasmath-next-ecommerce.s3.amazonaws.com/1693369162566.jpeg",
      ],
      Colour: "Black",
    },
    {
      id: "50",
      title: "Hara Boot",
      description: "Newly Arrived Import",
      oldprice: 8500,
      price: 4930,
      offer: "42% off",
      image:
        "https://hasmath-next-ecommerce.s3.amazonaws.com/1693378032388.jpeg",
      carouselImages: [
        "https://hasmath-next-ecommerce.s3.amazonaws.com/1693378024651.jpeg",
        "https://hasmath-next-ecommerce.s3.amazonaws.com/1693378032388.jpeg",
        "https://hasmath-next-ecommerce.s3.amazonaws.com/1693378038845.jpeg",
      ],
      Colour: "White",
    },
  ];
  const navigation = useNavigation();
  const [products, setProducts] = useState();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("64b4c07685f68032e1e60de7");
  /* useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.1.101:8000/category");
        setProducts(response.data);
      } catch (error) {
        console.log("error message", error);
      }
    };
  

   fetchData(); 
  },[]); */
  const [item, setItem] = useState([
    { label: "School Boys Shoe", value: "64b455ff80ee2f89b46afe2f" },
    {
      label: "Women Party Slippers",
      value: "64b4563680ee2f89b46afe32",
    },
    { label: "Mens Wedding Shoe", value: "64b4b81db644832da98a4937" },
    {
      label: "Football Boots",
      value: "64b4c07685f68032e1e60de7",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.1.101:8000/product");
        setProducts(response.data);
      } catch (error) {
        console.log("error message", error);
      }
    };

    fetchData();
  }, []);

  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  if (!global.btoa) {
    global.btoa = encode;
  }

  if (!global.atob) {
    global.atob = decode;
  }

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

  useEffect(() => {
    if (userId) {
      fecthAddress();
    }
  }, [userId, modalVisible]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("AuthToken");
        // console.log("token1",token);
        if (token !== null) {
          const decode = jwtDecode(token);
          const userId = decode.userId;
          setUserId(userId);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchUser();
  }, []);
  const { userId, setUserId } = useContext(UserType);
  //console.log("home userid",userId);
  const [address, setAddress] = useState([]);
  const [selectAddress,setSelectAddress]=useState("");
 // console.log(selectAddress);

  //console.log("address",address);
  return (
    <>
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === "android" ? 40 : 0,
          flex: 1,
          backgroundColor: "#f2f2f2",
        }}
      >
        <ScrollView>
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
          <Pressable
            onPress={() => setModalVisible(!modalVisible)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              padding: 10,
              backgroundColor: "#ffcc66",
            }}
          >
            <EvilIcons name="location" size={24} color="black" />
            <Pressable>
             {selectAddress?(
              <Text>
                Delivery to {selectAddress.name} - {selectAddress.street}
              </Text>
             ):(
              <Text style={{fontSize:13,fontWeight:'500'}}>
                Add a Address
              </Text>
             )}
            </Pressable>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </Pressable>
           
          <SliderBox
            images={images}
            autoPlay
            circleLoop
            dotColor={"#13274f"}
            inactiveDotColour="#90A4AE"
            ImageComponentStyle={{ with: "100%" }}
          />

          <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
            Trending Deals of the Week
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              padding: 5,
            }}
          >
            {product.map((products) => (
              <Pressable
                style={{
                  width: "47%",
                  backgroundColor: "white",
                  borderRadius: 5,
                  paddingTop: 3,
                  marginTop: 5,
                  paddingBottom: 5,
                  marginRight: 5,
                  marginLeft: 5,
                  marginBottom: 5,
                }}
              >
                <Image
                  source={{ uri: products.image }}
                  style={{
                    width: 140,
                    height: 140,
                    resizeMode: "contain",
                    alignItems: "center",
                  }}
                />
                <Text style={{ textAlign: "center", color: "#f85506" }}>
                  Rs.{products.price}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "500",
                  }}
                >
                  {products.name}
                </Text>
              </Pressable>
            ))}
          </View>
          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          />
          <Text
            style={{
              padding: 10,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Today Deals
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {deals.map((item, index) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("info", {
                    id: item._id,
                    title: item.title,
                    discription: item.description,
                    price: item?.price,
                    carouselImages: item.images,
                    color: item.Colour,
                    oldprice: item?.oldprice,
                    item: item,
                  })
                }
                style={{
                  marginVertical: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: 150,
                    height: 150,
                    resizeMode: "cover",
                    marginRight: 10,
                    borderRadius: 5,
                    marginLeft: 5,
                  }}
                />
                <View
                  style={{
                    backgroundColor: "#990000",
                    paddingVertical: 5,
                    width: 130,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 13,
                      fontWeight: "bold",
                    }}
                  >
                    Up to {item?.offer}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          />
          <View
            style={{
              marginHorizontal: 10,
              marginTop: 20,
              width: "45%",
              marginBottom: open ? 50 : 15,
            }}
          >
            <DropDownPicker
              style={{
                borderColor: "#f85506",
                height: 25,
                marginBottom: open ? 120 : 15,
              }}
              open={open}
              value={category} //genderValue
              items={item}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItem}
              placeholder="choose category"
              placeholderStyle={styles.placeholderStyles}
              onOpen={onGenderOpen}
              // onChangeValue={onChange}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {products
              ?.filter((item) => item.category === category)
              .map((item, index) => (
                <ProductItem item={item} key={index} />
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>
      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 400 }}>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "400" }}>
              choose Your Location
            </Text>
            <Text style={{ marginTop: 5, fontSize: 16, color: "gray" }}>
              Select A Delivery Location to see Product availabilty and Delivery
              Option
            </Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {address.map((item, index) => (
              <Pressable
              onPress={()=>setSelectAddress(item)}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: "#ffcc66",
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                  marginRight: 15,
                  marginTop:10,
                  borderRadius:10,
                  backgroundColor:selectAddress===item?'#fbceb1':'white'

                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                >
                  <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                    {item.name}
                  </Text>
                  <Entypo name="location-pin" size={24} color="red" />
                </View>
                <Text numberOfLines={1} style={{width:130,fontSize:13,textAlign:'center'}}>{item.houseNo}</Text>
                <Text numberOfLines={1} style={{width:130,fontSize:13,textAlign:'center'}}>{item.street}</Text>
                <Text numberOfLines={1} style={{width:130,fontSize:13,textAlign:'center'}}>{item.city}</Text>
              </Pressable>
            ))}
            <Pressable
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("address");
              }}
              style={{
                width: 140,
                height: 140,
                borderColor: "#ffcc66",
                marginTop: 10,
                borderWidth: 1,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#f85506",
                  fontWeight: "500",
                }}
              >
                Add an Address or Pick up point
              </Text>
            </Pressable>
          </ScrollView>
          <View style={{ flexDirection: "column", gap: 7, marginBottom: 30 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Entypo name="location-pin" size={22} color="#f85506" />
              <Text style={{ color: "#f85506", fontWeight: "400" }}>
                Enter a postCode
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Ionicons name="locate-sharp" size={22} color="#f85506" />
              <Text style={{ color: "#f85506", fontWeight: "400" }}>
                Use My current location
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <AntDesign name="earth" size={22} color="#f85506" />
              <Text style={{ color: "#f85506", fontWeight: "400" }}>
                Delivery out side Srilanka
              </Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
