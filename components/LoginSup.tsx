import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DatabaseContext, RootStackParamList } from "../context";
import { ActivityIndicator, Button, Text, useTheme } from "react-native-paper";
import { KeyboardAvoidingView, StatusBar, View } from "react-native";
import styles from "../styles/loginStyle";
import { TextInput } from "react-native-paper";
import { useContext, useState } from "react";
import { useCameraPermissions } from "expo-camera";
import * as SecureStore from 'expo-secure-store';


//////////////////////////wrap every other components with a wrapper component that verify if the toko 5 is valid or not
/////////////////// if it is not valid the wrapper component just navigate to the "please talk with your supervisor" component

type Props = NativeStackScreenProps<RootStackParamList>;

export default function LoginSup({ navigation }: Props) {
    const theme = useTheme();

    ////////qr code test
    // const [permission, requestPermission] = useCameraPermissions();

    ///const isPermissionGranted = Boolean(permission?.granted);
    ////////
    const toko5Repository = useContext(DatabaseContext);
    const [nom, setNom] = useState<string>("");
    const [prenom, setPrenom] = useState<string>("");

    const [text, setText] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async () => {
        setLoading(true); //doesn't work maybe (react batching state updates)
        await SecureStore.setItemAsync("nomSuperviseur", nom);
        await SecureStore.setItemAsync("prenomSuperviseur", prenom);
        setLoading(false);
        navigation.navigate('ScanQr');
    }


    return (
        <>
            <StatusBar hidden={false} backgroundColor="black" />
            <View style={styles.container}>
                <KeyboardAvoidingView>

                    <View style={styles.loginDiv}>
                        {/* <Text variant='titleLarge' style={{ fontWeight: 'bold', color: 'rgba(68, 66, 68, 0.87)' }}>Identifiez-vous</Text> */}
                        <TextInput
                            left={<TextInput.Icon icon={require('../assets/pictogram/worker.png')} />}
                            label={
                                <Text
                                    style={{ textAlign: "center", color: 'rgba(77, 77, 71, 0.87)' }}
                                    variant="titleMedium"
                                >
                                    Nom
                                </Text>
                            }
                            value={nom}
                            style={styles.textInput}
                            onChangeText={nom => setNom(nom)}
                            underlineColor='darkgrey'
                        />

                        <TextInput
                            left={<TextInput.Icon icon={require('../assets/pictogram/worker.png')} />}
                            label={
                                <Text
                                    style={{ textAlign: "center", color: 'rgba(77, 77, 71, 0.87)' }}
                                    variant="titleMedium"
                                >
                                    Prenom
                                </Text>
                            }
                            value={prenom}
                            style={styles.textInput}
                            onChangeText={prenom => setPrenom(prenom)}
                            underlineColor='darkgrey'
                        />

                        {/* <TextInput
                            left={<TextInput.Icon icon={require('../assets/pictogram/id.png')} />}
                            label={
                                <Text
                                    style={{ textAlign: "center", color: 'rgba(77, 77, 71, 0.87)' }}
                                    variant="titleMedium"
                                >
                                    ID
                                </Text>
                            }
                            value={text}
                            style={styles.textInput}
                            onChangeText={text => setText(text)}
                            underlineColor='darkgrey'
                        /> */}
                        <Button style={styles.bottomButton}
                            mode="contained"
                            onPress={async ()=>{await handleLogin()}}

                            //test qr
                            //onPress = {requestPermission}
                            //onPress = {() => {navigation.navigate('ScanQr')}}

                            contentStyle={{ flexDirection: 'row-reverse' }}
                            labelStyle={{
                                color: theme.colors.secondary, // Manually set to theme contrast color
                                fontSize: 16
                            }}
                        >
                            s'identifier
                        </Button>
                        {loading && (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color={theme.colors.primary} />
                            </View>)}
                    </View>

                </KeyboardAvoidingView>
            </View>
        </>
    )
}