import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DatabaseContext, RootStackParamList } from "../context";
import { ActivityIndicator, Button, Icon, IconButton, Text, useTheme } from "react-native-paper";
import { KeyboardAvoidingView, ScrollView, StatusBar, View } from "react-native";
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

    const handleRefresh = () => {

    }


    return (
        <>
            <StatusBar
            // barStyle="dark-content"
            // backgroundColor="#F8F9FA"
            // translucent={false}
            />

            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View
                        style={{
                            // flex: 1,
                            flexWrap: "wrap",
                            flexDirection: "row",
                            justifyContent: 'center',
                            alignItems: "center",
                            alignContent: "center",
                        }}
                    >
                        {/* <Icon
                            source="card-account-details-outline"
                            size={52}
                            color="rgba(56, 56, 56, 0.87)"
                        /> */}

                        {/* <Text
                            style={{ textAlign: "center", paddingLeft: 17, color: 'rgba(0, 0, 0, 0.87)' }}
                            variant="titleMedium"
                        > */}
                        <Text
                            style={{ textAlign: "center", color: "rgba(88, 88, 88, 1)", fontSize: 16 }}
                            variant="titleSmall"
                        >
                            Fenoy ireny  {" "}
                            {"\n"}
                            hahamantarana anao
                            {/* Vous n'avez pas de : {"\n"}- [something...] */}
                        </Text>
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>
                            Nom <Text style={styles.requiredIndicator}>*</Text>
                        </Text>
                        <TextInput
                            left={<TextInput.Icon
                                icon="account"
                                color="#7F8C8D"
                                size={20}
                            />}
                            placeholder="Votre nom"
                            value={nom}
                            style={styles.textInput}
                            onChangeText={nom => setNom(nom)}
                            mode="outlined"
                        // outlineColor="#E8ECF4"
                        // activeOutlineColor="#3498DB"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>
                            Prénom <Text style={styles.requiredIndicator}>*</Text>
                        </Text>
                        <TextInput
                            left={<TextInput.Icon
                                icon="account-outline"
                                color="#7F8C8D"
                                size={20}
                            />}
                            placeholder="Votre prénom"
                            value={prenom}
                            style={styles.textInput}
                            onChangeText={prenom => setPrenom(prenom)}
                            mode="outlined"
                        // outlineColor="#E8ECF4"
                        // activeOutlineColor="#3498DB"
                        />
                    </View>

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
                    <Button
                        mode="contained"
                        onPress={handleLogin}
                        disabled={loading}
                        style={[
                            styles.button,
                            loading && styles.buttonDisabled
                        ]}
                        labelStyle={styles.buttonText}
                        contentStyle={styles.loadingButton}
                    >
                        {loading ? (
                            <>
                                <ActivityIndicator color="#FFFFFF" size="small" />
                            </>
                        ) : (
                            "s'identifier"
                        )}
                    </Button>
                </View>

                <View style={styles.refreshContainer}>
                    <IconButton
                        icon="refresh"
                        size={24}
                        onPress={handleRefresh}
                        iconColor="rgba(16, 81, 165, 1)"
                        style={styles.refreshButton}
                    />
                    <Text style={styles.refreshText}>Actualiser les données</Text>
                </View>
            </ScrollView>
        </>
    )
}