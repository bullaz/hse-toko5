import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Button,
  Pressable,
  TouchableOpacity,
  Modal,
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import styles from "./styles";
import { useState } from "react";
import Think from "./components/Think";
export type RootStackParamList = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  const screenOptions: NativeStackNavigationOptions = {
    headerStyle: {
      backgroundColor: '#6200ee',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen 
          name="Home" 
          component={Think}
          options={{ title: 'Penser / Diniho / Think' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
