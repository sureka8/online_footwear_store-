import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import ProductInfoScreen from "../screens/ProductInfoScreen";
import SingleProductScreen from "../screens/SingleProductScreen";

import ProfileScreen from "../screens/ProfileScreen";
import AddAddressScreen from "../screens/AddAddressScreen";
import Address from "../screens/Address";
import CardScreen from "../screens/CardScreen";
import ConfirmationScreen from "../screens/ConfirmationScreen";
import OrderScreen from "../screens/OrderScreen";
import ViewOrderScreen from "../screens/ViewOrderScreen";
import AccountScreen from "../screens/AccountScreen";


const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { color: "#f85506" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={24} color="#f85506" />
              ) : (
                <AntDesign name="home" size={24} color="black" />
              ),
          }}
        />
        
           <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarLabelStyle: { color: "#f85506" },
          
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="person" size={24} color="#f85506" />
              ) : (
                <Ionicons name="person-outline" size={24} color="black" />
              ),
          }}
        />
           <Tab.Screen
          name="cart"
          component={CardScreen}
          options={{
            tabBarLabel: "Cart",
            tabBarLabelStyle: { color: "#f85506" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <AntDesign name="shoppingcart" size={24} color="#f85506" />
              ) : (
                <AntDesign name="shoppingcart" size={24} color="black" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="info"
          component={ProductInfoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="singlepage"
          component={SingleProductScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="address"
          component={AddAddressScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="newaddress"
          component={Address}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="confirm"
          component={ConfirmationScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="order"
          component={OrderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="vieworder"
          component={ViewOrderScreen}
          options={{ headerShown: true }}
        />
         <Stack.Screen
          name="account"
          component={AccountScreen}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
