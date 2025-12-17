import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DatabaseContext, RootStackParamList, Toko5Json } from "../context";
import { ActivityIndicator, Button, Text, useTheme } from "react-native-paper";
import { KeyboardAvoidingView, StatusBar, View } from "react-native";
import styles from "../styles/loginStyle";
import { TextInput } from "react-native-paper";
import { useContext, useState } from "react";
import NetInfo from '@react-native-community/netinfo';
import axios from "axios";
import { BACKEND_URL } from "../constants/commonConstants";


//////////////////////////wrap every other components with a wrapper component that verify if the toko 5 is valid or not
/////////////////// if it is not valid the wrapper component just navigate to the "please talk with your supervisor" component

type Props = NativeStackScreenProps<RootStackParamList>;

export default function Login({ navigation }: Props) {
    const theme = useTheme();

    ////////qr code test
    // const [permission, requestPermission] = useCameraPermissions();

    ///const isPermissionGranted = Boolean(permission?.granted);
    ////////
    const toko5Repository = useContext(DatabaseContext);
    const [nom, setNom] = useState<string>("");
    const [prenom, setPrenom] = useState<string>("");

    const [text, setText] = useState<string>("");

    const [societe, setSociete] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);

    const checkConnection = async () => {
        const state = await NetInfo.fetch();
        // console.log('Connection type', state.type);
        // console.log('Is connected?', state.isConnected);
        // console.log('Is internet reachable?', state.isInternetReachable);
        // if (state.isInternetReachable) {
        // } else {
        // }
        return state.isInternetReachable;
    };

    const newToko5 = async () => {
        try {
            setLoading(true)
            if (toko5Repository !== null) {
                const toko5 = await toko5Repository.newToko5(nom, prenom);
                console.log(toko5);
                let isInternetReachable = await checkConnection();
                if (isInternetReachable) {
                    let saved = await axios.post(`${BACKEND_URL}/toko5s`, toko5, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                    //console.log(saved.data);
                }
                setLoading(false)
                navigation.navigate('Think', { toko5Id: toko5.toko5Id })
                return
            }
            setLoading(false)
            throw new Error("repository is null");
        } catch (error) {
            console.log("login newToko5 error: ", error);
            setLoading(false);
        }
    }


    return (
        <>
            {/* <StatusBar hidden={false} backgroundColor="black" /> */}
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
                                    Votre nom
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
                                    Votre prenom
                                </Text>
                            }
                            value={prenom}
                            style={styles.textInput}
                            onChangeText={prenom => setPrenom(prenom)}
                            underlineColor='darkgrey'
                        />

                        <TextInput
                            left={<TextInput.Icon icon={require('../assets/pictogram/id.png')} />}
                            label={
                                <Text
                                    style={{ textAlign: "center", color: 'rgba(77, 77, 71, 0.87)' }}
                                    variant="titleMedium"
                                >
                                    ID de votre permis de travail
                                </Text>
                            }
                            value={text}
                            style={styles.textInput}
                            onChangeText={text => setText(text)}
                            underlineColor='darkgrey'
                        />
                        <TextInput
                            left={<TextInput.Icon icon={require('../assets/pictogram/id.png')} />}
                            label={
                                <Text
                                    style={{ textAlign: "center", color: 'rgba(77, 77, 71, 0.87)' }}
                                    variant="titleMedium"
                                >
                                    Societe
                                </Text>
                            }
                            value={societe}
                            style={styles.textInput}
                            onChangeText={text => setSociete(text)}
                            underlineColor='darkgrey'
                        />
                        <Button style={styles.bottomButton}
                            mode="contained"
                            onPress={newToko5}

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