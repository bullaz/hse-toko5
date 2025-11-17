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
import SinglePicto from "./components/SinglePicto";
import ControlMeasure from "./components/controlMeasure";
export type RootStackParamList = {
  Think: undefined;
  SinglePicto: undefined;
  ControlMeasure: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  const screenOptions: NativeStackNavigationOptions = {
    headerStyle: {
      backgroundColor: '#2322F0',
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
          name="Think" 
          component={Think}
          options={{ title: 'Penser / Diniho / Think' }}
        />
        <Stack.Screen 
          name="ControlMeasure" 
          component={ControlMeasure}
          options={{ title: 'Prendre des mesures de controle' }}
        />
        <Stack.Screen 
          name="SinglePicto" 
          component={SinglePicto}
          options={{ title: 'pictogramme representant .....' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
