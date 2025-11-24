import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../context";
import { Button, Text, useTheme } from "react-native-paper";
import { KeyboardAvoidingView, StatusBar, View } from "react-native";
import styles from "../styles/loginStyle";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import { useCameraPermissions } from "expo-camera";


//////////////////////////wrap every other components with a wrapper component that verify if the toko 5 is valid or not
/////////////////// if it is not valid the wrapper component just navigate to the "please talk with your supervisor" component

type Props = NativeStackScreenProps<RootStackParamList>;

export default function Login({ navigation }: Props) {
    const theme = useTheme();
    const [text, setText] = useState("");

    ////////qr code test
    // const [permission, requestPermission] = useCameraPermissions();

    ///const isPermissionGranted = Boolean(permission?.granted);
    ////////

    const [nom, setNom] = useState<string>("");
    const [prenom, setPrenom] = useState<string>("");


    return (
        <>
            <StatusBar hidden={false} backgroundColor="black" />
            <View style={styles.container}>
                <KeyboardAvoidingView>

                    <View style={styles.loginDiv}>
                        {/* <Text variant='titleLarge' style={{ fontWeight: 'bold', color: 'rgba(68, 66, 68, 0.87)' }}>Identifiez-vous</Text> */}
                        <TextInput
                            left={<TextInput.Icon icon={require('../assets/pictogram/worker-icon.png')} />}
                            label={
                                <Text
                                    style={{ textAlign: "center", color: 'rgba(77, 77, 71, 0.87)' }}
                                    variant="titleMedium"
                                >
                                    Nom
                                </Text>
                            }
                            value={text}
                            style={styles.textInput}
                            onChangeText={text => setText(text)}
                            underlineColor='darkgrey'
                        />

                        <TextInput
                            left={<TextInput.Icon icon={require('../assets/pictogram/worker-icon.png')} />}
                            label={
                                <Text
                                    style={{ textAlign: "center", color: 'rgba(77, 77, 71, 0.87)' }}
                                    variant="titleMedium"
                                >
                                    Prenom
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
                                    style={{ textAlign: "center", color: 'rgba(77, 77, 71, 0.87)'}}
                                    variant="titleMedium"
                                >
                                    ID permis de travail
                                </Text>
                            }
                            value={text}
                            style={styles.textInput}
                            onChangeText={text => setText(text)}
                            underlineColor='darkgrey'
                        />
                        <Button style={styles.bottomButton}
                            mode="contained"
                            onPress={() => {
                                navigation.navigate('ScanQr')
                            }}

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
                    </View>

                </KeyboardAvoidingView>
            </View>
        </>
    )
}