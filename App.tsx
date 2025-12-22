import {
  AppRegistry,
  Image,
  View,
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions, NativeStackScreenProps } from "@react-navigation/native-stack";
import styles from "./styles";
import { useEffect, useState } from "react";
import Think from "./components/Think";
import SinglePicto from "./components/SinglePicto";
import ControlMeasure from "./components/ControlMeasure";
import { ActivityIndicator, Button, DefaultTheme, Icon, IconButton, PaperProvider, Text } from "react-native-paper";
import Organise1 from "./components/Organise1";
import IdentifyRisks from "./components/IdentifyRisks";
import Organise2 from "./components/Organise2";
import Epi from "./components/Epi";
import Fitness from "./components/Fitness";
import Login from "./components/Login";
import Toko5Repository from "./repository/Toko5Repository";
import { createContext } from "react";
import { SQLiteDatabase } from "expo-sqlite";
import { DatabaseContext, RootStackParamList } from "./context";
import ScanQr from "./components/ScanQr";
import Commentaire from "./components/Commentaire";
import Recent from "./components/Recent";
import Invalide from "./components/Invalide";
import { ProtectedToko5Route } from "./components/ProtectedToko5Route";
import Home from "./components/Home";
import LoginSup from "./components/LoginSup";
import ListProblem from "./components/ListProblem";
import { useNavigation } from '@react-navigation/native';

// console.log('TEST OUTSIDE COMPONENT')

const Stack = createNativeStackNavigator<RootStackParamList>();


const theme = {
  ...DefaultTheme,
  colors: {
    // primary: 'rgba(16, 81, 165, 1)',
    primary: "rgba(26, 85, 161, 0.87)",
    //primary: '',
    secondary: 'white'
  },
};


//export const DatabaseContext = createContext<Toko5Repository | null>(null); ///////////////////////put this in a another file ... this causes circular dependencies that can cause problems



export default function App() {

  const [toko5Repository, setToko5Repository] = useState<Toko5Repository | null>(null);

  const screenOptions: NativeStackNavigationOptions = {
    headerStyle: {
      backgroundColor: 'rgba(16, 81, 165, 1)',
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }


  return (
    <DatabaseContext.Provider value={toko5Repository}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title: "TOKO 5", headerBackVisible: false, gestureEnabled: false,
                headerRight: () => (
                  <Image
                    source={require('./assets/stellarix.png')} // or {uri: 'https://...'}
                    style={{ width: 120, height: 50, marginRight: 15 }}
                    resizeMode="contain"
                  />
                ),
                headerTitleStyle: {
                  color: 'rgb(255, 255, 255)', // Change to your desired color
                  fontSize: 24,     // Change to your desired font size
                  fontWeight: 'bold', // Optional: change font weight
                  fontFamily: 'YourCustomFont', // Optional: custom font
                },
              }}
            />

            <Stack.Screen
              name="Recent"
              component={Recent}
              options={({ navigation }) => ({ // Use function to get navigation prop
                title: 'TOKO 5 RECENT(S)',
                headerBackVisible: false,
                gestureEnabled: false,
                headerRight: () => (
                  <IconButton
                    icon="home"
                    size={30}
                    iconColor="white"
                    onPress={() => navigation.navigate('Home')} // Navigate to Home
                  />
                ),
              })}
            />

            <Stack.Screen
              name="Invalide"
              component={Invalide}
              options={{ title: 'TOKO 5 INVALIDE', headerBackVisible: false, gestureEnabled: false }}
            />

            <Stack.Screen
              name="ScanQr"
              component={ScanQr}
              options={{ title: 'SCANNER UN TOKO 5' }}
            />

            <Stack.Screen
              name="Login"
              component={Login}
              options={{ title: "IDENTIFICATION", headerBackVisible: false, gestureEnabled: false}}
            />

            <Stack.Screen
              name="LoginSup"
              component={LoginSup}
              options={{ title: "IDENTIFICATION", headerBackVisible: false, gestureEnabled: false}}
            />
            <Stack.Screen
              name="Think"
              options={{ title: 'PENSER', headerBackVisible: false, gestureEnabled: false }}
            >
              {(props: NativeStackScreenProps<RootStackParamList, 'Think'>) => (
                <ProtectedToko5Route toko5Id={props.route.params.toko5Id}>
                  <Think {...props} />
                </ProtectedToko5Route>
              )}
            </Stack.Screen>
            <Stack.Screen
              name="SinglePicto"
              component={SinglePicto}
              options={{ title: 'description du pictogramme' }}
            />

            <Stack.Screen
              name="Organise1"
              options={{ title: 'ORGANISER', headerBackVisible: false, gestureEnabled: false }}
            >
              {(props: NativeStackScreenProps<RootStackParamList, 'Organise1'>) => (
                <ProtectedToko5Route toko5Id={props.route.params.toko5Id}>
                  <Organise1 {...props} />
                </ProtectedToko5Route>
              )}
            </Stack.Screen>


            <Stack.Screen
              name="Organise2"
              options={{ title: 'ORGANISER', headerBackVisible: false, gestureEnabled: false }}
            >
              {(props: NativeStackScreenProps<RootStackParamList, 'Organise2'>) => (
                <ProtectedToko5Route toko5Id={props.route.params.toko5Id}>
                  <Organise2 {...props} />
                </ProtectedToko5Route>
              )}
            </Stack.Screen>

            <Stack.Screen
              name="IdentifyRisks"
              options={{ title: 'IDENTIFIER LES DANGERS', headerBackVisible: false, gestureEnabled: false }}
            >
              {(props: NativeStackScreenProps<RootStackParamList, 'IdentifyRisks'>) => (
                <ProtectedToko5Route toko5Id={props.route.params.toko5Id}>
                  <IdentifyRisks {...props} />
                </ProtectedToko5Route>
              )}
            </Stack.Screen>

            <Stack.Screen
              name="ControlMeasure"
              options={{ title: 'PRENDRE DES MESURES', gestureEnabled: false }}
            >
              {(props: NativeStackScreenProps<RootStackParamList, 'ControlMeasure'>) => (
                <ProtectedToko5Route toko5Id={props.route.params.toko5Id}>
                  <ControlMeasure {...props} />
                </ProtectedToko5Route>
              )}
            </Stack.Screen>


            <Stack.Screen
              name="Epi"
              options={{ title: 'EPI / PPE', headerBackVisible: false, gestureEnabled: false }}
            >
              {(props: NativeStackScreenProps<RootStackParamList, 'Epi'>) => (
                <ProtectedToko5Route toko5Id={props.route.params.toko5Id}>
                  <Epi {...props} />
                </ProtectedToko5Route>
              )}
            </Stack.Screen>


            <Stack.Screen
              name="Fitness"
              options={{ title: 'MON ETAT', gestureEnabled: false }}
            >
              {(props: NativeStackScreenProps<RootStackParamList, 'Fitness'>) => (
                <ProtectedToko5Route toko5Id={props.route.params.toko5Id}>
                  <Fitness {...props} />
                </ProtectedToko5Route>
              )}
            </Stack.Screen>

            <Stack.Screen
              name="Commentaire"
              component={Commentaire}
              options={{ title: 'COMMENTAIRES', headerBackVisible: true, gestureEnabled: false }}
            />

            <Stack.Screen
              name="ListProblem"
              component={ListProblem}
              options={{ title: 'TOKO 5 INFORMATIONS', headerBackVisible: true, gestureEnabled: false }}
            />

          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </DatabaseContext.Provider>
  );
}

AppRegistry.registerComponent('toko5', () => App)



//   < Stack.Screen
// name = "Recent"
// options = {{ title: 'toko5 recent(s)', headerBackVisible: false }}
//             >
//   {() => (
//     <AuthGuard>
//       <Recent />
//     </AuthGuard>
//   )}
//             </Stack.Screen >

//   <Stack.Screen
//     name="Invalide"
//     options={{ title: 'Votre toko5 est invalide', headerBackVisible: false }}
//   >
//     {() => (
//       <AuthGuard>
//         <Invalide />
//       </AuthGuard>
//     )}
//   </Stack.Screen>
