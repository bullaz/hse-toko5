import {
  AppRegistry,
  View,
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import styles from "./styles";
import { useEffect, useState } from "react";
import Think from "./components/Think";
import SinglePicto from "./components/SinglePicto";
import ControlMeasure from "./components/ControlMeasure";
import { DefaultTheme, PaperProvider, Text } from "react-native-paper";
import Organise1 from "./components/Organise1";
import IdentifyRisks from "./components/IdentifyRisks";
import Organise2 from "./components/Organise2";
import Epi from "./components/Epi";
import Fitness from "./components/Fitness";
import Login from "./components/Login";
import Toko5Repository from "./repository/Toko5Repository";
import { createContext } from "react";
import { SQLiteDatabase } from "expo-sqlite";


export type RootStackParamList = {
  Login: undefined;
  Think: undefined;
  SinglePicto: undefined;
  Organise1: undefined;
  Organise2: undefined;
  IdentifyRisks: undefined;
  ControlMeasure: undefined;
  Epi: undefined;
  Fitness: undefined;
};

// console.log('TEST OUTSIDE COMPONENT')

const Stack = createNativeStackNavigator<RootStackParamList>();


const theme = {
  ...DefaultTheme,
  colors: {
    primary: '#2322F0',
    secondary: 'white'
  },
};


export const DatabaseContext = createContext<Toko5Repository | null>(null);

export default function App() {

  const [toko5Repository, setToko5Repository] = useState<Toko5Repository | null>(null);

  const screenOptions: NativeStackNavigationOptions = {
    headerStyle: {
      backgroundColor: '#2322F0',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    const initializeDB = async () => {
      try {
        const repo = new Toko5Repository();
        await repo.init();
        setToko5Repository(repo);
        setDbInitialized(true);
        console.log('Database initialized successfully');
      } catch (error) {
        console.error('Database initialization failed:', error);
      }
    };

    initializeDB();
  }, []);

  if (!dbInitialized || !toko5Repository) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading..</Text>
      </View>
    );
  }


  return (
    <DatabaseContext.Provider value={toko5Repository}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ title: "IDENTIFICATION" }}
            />
            <Stack.Screen
              name="Think"
              component={Think}
              options={{ title: 'Penser' }}
            />
            <Stack.Screen
              name="SinglePicto"
              component={SinglePicto}
              options={{ title: 'description du pictogramme' }}
            />
            <Stack.Screen
              name="Organise1"
              component={Organise1}
              options={{ title: 'Organiser' }}
            />
            <Stack.Screen
              name="Organise2"
              component={Organise2}
              options={{ title: 'Organiser' }}
            />
            <Stack.Screen
              name="IdentifyRisks"
              component={IdentifyRisks}
              options={{ title: 'Identifier les dangers' }}
            />
            <Stack.Screen
              name="ControlMeasure"
              component={ControlMeasure}
              options={{ title: 'Prendre des mesures' }}
            />
            <Stack.Screen
              name="Epi"
              component={Epi}
              options={{ title: 'EPI / PPE' }}
            />
            <Stack.Screen
              name="Fitness"
              component={Fitness}
              options={{ title: 'Mon état actuel' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </DatabaseContext.Provider>
  );
}

AppRegistry.registerComponent('toko5', () => App)
