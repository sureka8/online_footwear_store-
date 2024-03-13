import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import { UserType } from "../UserContext";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { cleanCart } from "../redux/CartReducer";

const ConfirmationScreen = () => {
  const navigation = useNavigation();
  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" },
  ];
  const { userId, setUserId } = useContext(UserType);
  //console.log(userId);
  const [currentStep, setCurrentStep] = useState(0);
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
  // console.log("address",address);
  const [selectAddress, setSelectAddress] = useState("");
  const [option, setOption] = useState(false);
  const [selectPayent, setSelectPayment] = useState("");

  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  const dispach = useDispatch();

  const handlePlaceOrer = async () => {
    try {
      const orderdata = {
        userId: userId,
        cartItem: cart,
        totalPrice: total,
        shippingAddress: selectAddress,
        paymentMethod: selectPayent,
      };

      const response = await axios.post(
        "http://192.168.1.101:8000/orders",
        orderdata
      );
      if (response.status === 200) {
        navigation.navigate("order");
        dispach(cleanCart());
        console.log("oreder succesfully", response.data.order);
      } else {
        console.log("error creting order", response.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  //online payment
  const pay = async() =>{
    try {
      
    } catch (error) {
      console.log("error",error);
    }
  }
    return (
    <ScrollView style={{ marginTop: 55 }}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            justifyContent: "space-between",
          }}
        >
          {steps?.map((step, index) => (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {index > 0 && (
                <View
                  style={[
                    { flex: 1, height: 2, backgroundColor: "green" },
                    index <= currentStep && { backgroundColor: "green" },
                  ]}
                />
              )}
              <View
                style={[
                  {
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: "#ccc",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  index < currentStep && { backgroundColor: "green" },
                ]}
              >
                {index < currentStep ? (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    &#10003;
                  </Text>
                ) : (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text style={{ textAlign: "center", marginTop: 8 }}>
                {step.title}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {currentStep == 0 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Select Delivery Address
          </Text>
          <Pressable>
            {address.map((item, index) => (
              <Pressable
                style={{
                  borderWidth: 1,
                  borderColor: "#d0d0d0",
                  padding: 10,
                  flexDirection: "row",
                  gap: 5,
                  paddingBottom: 17,
                  marginVertical: 7,
                  alignItems: "center",
                  borderRadius: 7,
                }}
              >
                {selectAddress && selectAddress._id === item?._id ? (
                  <FontAwesome5 name="dot-circle" size={24} color="#f85506" />
                ) : (
                  <Entypo
                    onPress={() => setSelectAddress(item)}
                    name="circle"
                    size={24}
                    color="gray"
                  />
                )}

                <View style={{ marginLeft: 6 }}>
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 3,
                      }}
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
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                        marginTop: 7,
                      }}
                    >
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
                    <View>
                      {selectAddress && selectAddress._id === item?._id && (
                        <Pressable
                          onPress={() => setCurrentStep(1)}
                          style={{
                            backgroundColor: "#f85506",
                            padding: 10,
                            borderRadius: 20,
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 10,
                          }}
                        >
                          <Text style={{ textAlign: "center", color: "white" }}>
                            Deliver to this Address
                          </Text>
                        </Pressable>
                      )}
                    </View>
                  </View>
                </View>
              </Pressable>
            ))}
          </Pressable>
        </View>
      )}

      {currentStep == 1 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            choose your Delivery options
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              padding: 8,
              gap: 7,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            {option ? (
              <FontAwesome5 name="dot-circle" size={24} color="#f85506" />
            ) : (
              <Entypo
                onPress={() => setOption(!option)}
                name="circle"
                size={24}
                color="gray"
              />
            )}

            <Text style={{ flex: 1 }}>
              <Text style={{ color: "green", fontWeight: "500" }}>
                Tomorrow by 10pm
              </Text>
              {""}- Free Deliver with your Prime membership
            </Text>
          </View>
          <Pressable
            onPress={() => setCurrentStep(2)}
            style={{
              backgroundColor: "#ffc72c",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text>Continue</Text>
          </Pressable>
        </View>
      )}
      {currentStep == 2 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Select Your Payment Method
          </Text>
          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              marginTop: 12,
            }}
          >
            {selectPayent == "cash" ? (
              <FontAwesome5 name="dot-circle" size={22} color="#f85506" />
            ) : (
              <Entypo
                onPress={() => setSelectPayment("cash")}
                name="circle"
                size={22}
                color="gray"
              />
            )}
            <Text> Cash on Delivery</Text>
          </View>
          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              marginTop: 12,
            }}
          >
            {selectPayent == "card" ? (
              <FontAwesome5 name="dot-circle" size={22} color="#f85506" />
            ) : (
              <Entypo
                onPress={() => 
                  {setSelectPayment("card")
                  Alert.alert("Master/Visa Card","Online Payement",[
                    {
                      text:"Cancel",
                      onPress:() => console.log("Cancel is pressed")
                    }
                    ,
                    {
                      text:"OK",
                      onPress: ()=>pay()
                    }
                  ])

                }
                }
                name="circle"
                size={22}
                color="gray"
              />
            )}
            <Text>Credit/Debit card</Text>
          </View>
          <Pressable
            onPress={() => setCurrentStep(3)}
            style={{
              backgroundColor: "#ffc72c",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text>Continue</Text>
          </Pressable>
        </View>
      )}
      {currentStep == 3 && selectPayent == "cash" && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Order Now</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <View>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                Save 5% and never run out
              </Text>
              <Text style={{ fontSize: 15, color: "gray", marginTop: 5 }}>
                Turn on auto deliveries
              </Text>
            </View>

            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View>
          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <Text>Shipping to {selectAddress?.name}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>
                Items
              </Text>

              <Text style={{ color: "gray", fontSize: 16 }}>Rs.{total}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>
                Delivery
              </Text>

              <Text style={{ color: "gray", fontSize: 16 }}>Rs.0</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold", color: "gray" }}>
                Order Totel
              </Text>

              <Text
                style={{ color: "#c60c30", fontSize: 17, fontWeight: "bold" }}
              >
                Rs.{total}
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 15, color: "gray" }}>Pay with</Text>
            <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 7 }}>
              Pay on Delivery(Cash)
            </Text>
          </View>
          <Pressable
            onPress={handlePlaceOrer}
            style={{
              backgroundColor: "#FFC72C",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text>Place your order</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({});
