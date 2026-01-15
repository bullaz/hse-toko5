import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DatabaseContext, RootStackParamList } from "../context";
import { ActivityIndicator, Button, Icon, IconButton, Text, useTheme } from "react-native-paper";
import { KeyboardAvoidingView, ScrollView, StatusBar, View } from "react-native";
import styles from "../styles/loginStyle";
import { TextInput } from "react-native-paper";
import { useCallback, useContext, useState } from "react";
import { useCameraPermissions } from "expo-camera";
import * as SecureStore from 'expo-secure-store';
import { Poste } from "../types/domain";
import { useFocusEffect } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import { useAppTranslation } from "../contexts/TranslationContext";


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

    const {t} = useAppTranslation();

    const [poste, setPoste] = useState<Poste>();

    const handleLogin = async () => {
        setLoading(true); //doesn't work maybe (react batching state updates)
        await SecureStore.setItemAsync("nomSuperviseur", nom);
        await SecureStore.setItemAsync("prenomSuperviseur", prenom);
        setLoading(false);
        navigation.navigate('ScanQr');
    }

    const [dropdownFocus, setDropdownFocus] = useState<boolean>(false);

    const handleRefresh = () => {

    }

    const [initLoading, setInitLoading] = useState<boolean>(true);

    const [posteData, setPosteData] = useState<{ label: string; value: Poste; }[]>([]);

    const init = async () => {
        if (toko5Repository !== null) {
            const postes = await toko5Repository.getAllPoste();
            let dataPoste = [];
            for (let poste of postes) {
                dataPoste.push({
                    label: "         " + poste.nom,
                    value: poste
                })
            }
            setPosteData(dataPoste);
        } else {
            throw new Error("internal error: repository toko5repository is null");
        }
        setInitLoading(false);
    }

    useFocusEffect(
        useCallback(() => {
            init();
            return () => {
            };
        }, [])
    );


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
                        <Text
                            style={{ textAlign: "center", color: "rgba(88, 88, 88, 1)", fontSize: 16 }}
                            variant="titleSmall"
                        >
                            {t("identification.description1")}  {" "}
                            {"\n"}
                            {t("identification.description2")}
                        </Text>
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>
                            {t("identification.nom")}<Text style={styles.requiredIndicator}>*</Text>
                        </Text>
                        <TextInput
                            left={<TextInput.Icon
                                icon="account"
                                color="#7F8C8D"
                                size={20}
                            />}
                            placeholder={t("identification.nomLabel")}
                            value={nom}
                            style={styles.textInput}
                            onChangeText={nom => setNom(nom)}
                            mode="outlined"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>
                            {t("identification.prenomLabel")} <Text style={styles.requiredIndicator}>*</Text>
                        </Text>
                        <TextInput
                            left={<TextInput.Icon
                                icon="account-outline"
                                color="#7F8C8D"
                                size={20}
                            />}
                            placeholder={t("identification.nomLabel")}
                            value={prenom}
                            style={styles.textInput}
                            onChangeText={prenom => setPrenom(prenom)}
                            mode="outlined"
                        />
                    </View>

                    <View style={styles.dropdownContainer}>
                        <Text style={styles.inputLabel}>
                            {t("identification.poste")} <Text style={styles.requiredIndicator}>*</Text>
                        </Text>
                        <Dropdown
                            style={[
                                styles.dropdown,
                                dropdownFocus && styles.dropdownFocus
                            ]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={posteData}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={"          " + t("identification.posteLabel")}
                            searchPlaceholder="Rechercher..."
                            onFocus={() => setDropdownFocus(true)}
                            onBlur={() => setDropdownFocus(false)}
                            onChange={item => setPoste(item.value)}
                            renderLeftIcon={() => (
                                <Icon
                                    source="clipboard-list"
                                    size={20}
                                    color={dropdownFocus ? "rgba(26, 85, 161, 0.87)" : "#7F8C8D"}
                                />
                            )}
                        />
                    </View>

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