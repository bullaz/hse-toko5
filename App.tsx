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
import { TranslationProvider, useAppTranslation } from "./contexts/TranslationContext"; // Import useAppTranslation

const Stack = createNativeStackNavigator<RootStackParamList>();

const theme = {
  ...DefaultTheme,
  colors: {
    primary: 'rgba(26, 85, 161, 0.87)', //rgba(26, 85, 161, 0.87)
    secondary: 'white',
  },
};

// Create a component that wraps your navigator to access translation context
function AppNavigator() {
  const { t, language } = useAppTranslation();
  
  // Define screen titles based on language
  const screenTitles = {
    home: t('home.title'),
    recent: t('screenTitles.recent'),
    invalide: t('screenTitles.invalide'),
    scanQr: t('screenTitles.scanQr'),
    login: t('screenTitles.login'),
    loginSup: t('screenTitles.login'),
    think: t('screenTitles.think'),
    singlePicto: t('screenTitles.singlePicto'),
    organise1: t('screenTitles.organise'),
    organise2: t('screenTitles.organise'),
    identifyRisks: t('screenTitles.identifyRisks'),
    controlMeasure: t('screenTitles.controlMeasure'),
    epi: t('screenTitles.epi'),
    fitness: t('screenTitles.fitness'),
    commentaire: t('screenTitles.commentaire'),
    listProblem: t('screenTitles.listProblem'),
  };

  const screenOptions: NativeStackNavigationOptions = {
    headerStyle: {
      backgroundColor: 'rgba(16, 81, 165, 1)',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: screenTitles.home,
          headerBackVisible: false,
          gestureEnabled: false,
          headerRight: () => (
            <Image
              source={require('./assets/stellarix.png')}
              style={{ width: 120, height: 50, marginRight: 15 }}
              resizeMode="contain"
            />
          ),
          headerTitleStyle: {
            color: 'rgb(255, 255, 255)',
            fontSize: 24,
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="Recent"
        component={Recent}
        options={({ navigation }) => ({
          title: screenTitles.recent,
          headerBackVisible: false,
          gestureEnabled: false,
          headerRight: () => (
            <IconButton
              icon="home-circle"
              size={33}
              iconColor="white"
              onPress={() => navigation.navigate('Home')}
            />
          ),
        })}
      />

      <Stack.Screen
        name="Invalide"
        component={Invalide}
        options={({ navigation }) => ({
          title: screenTitles.invalide, 
          headerBackVisible: false, 
          gestureEnabled: false, 
          headerRight: () => (
            <IconButton
              icon="home-circle"
              size={33}
              iconColor="white"
              onPress={() => navigation.navigate('Recent')}
            />
          ),
        })}
      />

      <Stack.Screen
        name="ScanQr"
        component={ScanQr}
        options={{ title: screenTitles.scanQr }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={({ navigation }) => ({
          title: screenTitles.login,
          headerBackVisible: false,
          gestureEnabled: false,
          headerRight: () => (
            <IconButton
              icon="home-circle"
              size={33}
              iconColor="white"
              onPress={() => navigation.navigate('Recent')}
            />
          ),
        })}
      />

      <Stack.Screen
        name="LoginSup"
        component={LoginSup}
         options={({ navigation }) => ({
          title: screenTitles.loginSup, 
          headerBackVisible: false, 
          gestureEnabled: false,
          headerRight: () => (
            <IconButton
              icon="home-circle"
              size={33}
              iconColor="white"
              onPress={() => navigation.navigate('Home')}
            />
          ),
        })}
      />
      
      <Stack.Screen
        name="Think"
        options={({ navigation }) => ({
          title: screenTitles.think, 
          headerBackVisible: false, 
          gestureEnabled: false,
          headerRight: () => (
            <IconButton
              icon="home-circle"
              size={33}
              iconColor="white"
              onPress={() => navigation.navigate('Recent')}
            />
          ),
        })}
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
        options={({ navigation }) => ({
          title: screenTitles.singlePicto, 
          headerBackVisible: true, 
          gestureEnabled: false,
          headerRight: () => (
            <IconButton
              icon="home-circle"
              size={33}
              iconColor="white"
              onPress={() => navigation.navigate('Recent')}
            />
          ),
        })}
      />

      <Stack.Screen
        name="Organise1"
        options={({ navigation }) => ({
          title: screenTitles.organise1, 
          headerBackVisible: false, 
          gestureEnabled: false,
          headerRight: () => (
            <IconButton
              icon="home-circle"
              size={33}
              iconColor="white"
              onPress={() => navigation.navigate('Recent')}
            />
          ),
        })}
      >
        {(props: NativeStackScreenProps<RootStackParamList, 'Organise1'>) => (
          <ProtectedToko5Route toko5Id={props.route.params.toko5Id}>
            <Organise1 {...props} />
          </ProtectedToko5Route>
        )}
      </Stack.Screen>

      <Stack.Screen
        name="Organise2"
        options={({ navigation }) => ({
          title: screenTitles.organise2, 
          headerBackVisible: false, 
          gestureEnabled: false,
          headerRight: () => (
            <IconButton
              icon="home-circle"
              size={33}
              iconColor="white"
              onPress={() => navigation.navigate('Recent')}
            />
          ),
        })}
      >
        {(props: NativeStackScreenProps<RootStackParamList, 'Organise2'>) => (
          <ProtectedToko5Route toko5Id={props.route.params.toko5Id}>
            <Organise2 {...props} />
          </ProtectedToko5Route>
        )}
      </Stack.Screen>

      <Stack.Screen
        name="IdentifyRisks"
        options={({ navigation }) => ({
          title: screenTitles.identifyRisks, 
          headerBackVisible: false, 
          gestureEnabled: false,
          headerRight: () => (
            <IconButton
              icon="home-circle"
              size={33}
              iconColor="white"
              onPress={() => navigation.navigate('Recent')}
            />
          ),
        })}
      >
        {(props: NativeStackScreenProps<RootStackParamList, 'IdentifyRisks'>) => (
          <ProtectedToko5Route toko5Id={props.route.params.toko5Id}>
            <IdentifyRisks {...props} />
          </ProtectedToko5Route>
        )}
      </Stack.Screen>

      <Stack.Screen
        name="ControlMeasure"
        options={({ navigation }) => ({
          title: screenTitles.controlMeasure, 
          gestureEnabled: false,
          headerRight: () => (
            <IconButton
              icon="home-circle"
              size={33}
              iconColor="white"
              onPress={() => navigation.navigate('Recent')}
            />
          ),
        })}
      >
        {(props: NativeStackScreenProps<RootStackParamList, 'ControlMeasure'>) => (
          <ProtectedToko5Route toko5Id={props.route.params.toko5Id}>
            <ControlMeasure {...props} />
          </ProtectedToko5Route>
        )}
      </Stack.Screen>

      <Stack.Screen
        name="Epi"
        options={({ navigation }) => ({
          title: screenTitles.epi, 
          headerBackVisible: false, 
          gestureEnabled: false,
          headerRight: () => (
            <IconButton
              icon="home-circle"
              size={33}
              iconColor="white"
              onPress={() => navigation.navigate('Recent')}
            />
          ),
        })}
      >
        {(props: NativeStackScreenProps<RootStackParamList, 'Epi'>) => (
          <ProtectedToko5Route toko5Id={props.route.params.toko5Id}>
            <Epi {...props} />
          </ProtectedToko5Route>
        )}
      </Stack.Screen>

      <Stack.Screen
        name="Fitness"
        options={({ navigation }) => ({
          title: screenTitles.fitness, 
          headerBackVisible: true, 
          gestureEnabled: false,
          headerRight: () => (
            <IconButton
              icon="home-circle"
              size={33}
              iconColor="white"
              onPress={() => navigation.navigate('Recent')}
            />
          ),
        })}
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
        options={{ 
          title: screenTitles.commentaire, 
          headerBackVisible: true, 
          gestureEnabled: false 
        }}
      />

      <Stack.Screen
        name="ListProblem"
        component={ListProblem}
        options={({ navigation }) => ({
          title: screenTitles.listProblem, 
          headerBackVisible: false, 
          gestureEnabled: false,
          headerRight: () => (
            <IconButton
              icon="home-circle"
              size={33}
              iconColor="white"
              onPress={() => navigation.navigate('Recent')}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [toko5Repository, setToko5Repository] = useState<Toko5Repository | null>(null);
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
    <TranslationProvider>
      <DatabaseContext.Provider value={toko5Repository}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </PaperProvider>
      </DatabaseContext.Provider>
    </TranslationProvider>
  );
}

AppRegistry.registerComponent('toko5', () => App);