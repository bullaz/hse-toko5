import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DatabaseContext, RootStackParamList, Toko5Json } from "../context";
import { ActivityIndicator, Button, Icon, IconButton, PaperProvider, Text, useTheme } from "react-native-paper";
import { KeyboardAvoidingView, ScrollView, StatusBar, View } from "react-native";
import styles from "../styles/loginStyle";
import { TextInput } from "react-native-paper";
import { useCallback, useContext, useState } from "react";
import NetInfo from '@react-native-community/netinfo';
import axios from "axios";
import { BACKEND_URL } from "../constants/commonConstants";
import { Dropdown } from 'react-native-element-dropdown'; import { Societe, Task } from "../types/domain";
import { useFocusEffect } from "@react-navigation/native";
;
// import AntDesign from '@expo/vector-icons/AntDesign';


type Props = NativeStackScreenProps<RootStackParamList>;

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];

export default function Login({ navigation }: Props) {

    // Form state
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        permisId: "",
        societe: undefined as Societe | undefined,
        task: undefined as Task | undefined
    });

    const [dropdownFocus, setDropdownFocus] = useState({ societe: false, task: false });

    // Updated form handling
    const handleInputChange = (field: keyof typeof formData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Validate form before submission
    const validateForm = () => {
        const errors = [];
        if (!formData.nom.trim()) errors.push("Nom est requis");
        if (!formData.prenom.trim()) errors.push("Prénom est requis");
        if (!formData.societe) errors.push("Société est requise");
        if (!formData.task) errors.push("Tâche est requise");
        return errors;
    };

    const renderSocieteLeftIcon = () => {
        return (
            <IconButton
                icon="office-building"
                size={24}
                onPress={() => { handleRefresh() }}
                style={{ borderWidth: 0 }}
            //style={{backgroundColor: 'rgba(230, 241, 255, 1) '}}
            />
        );
    };

    const renderTaskLeftIcon = () => {
        return (
            <IconButton
                icon="office-building"
                size={24}
                onPress={() => { handleRefresh() }}
                style={{ borderWidth: 0 }}
            //style={{backgroundColor: 'rgba(230, 241, 255, 1) '}}
            />
        );
    };

    const [gender, setGender] = useState<string>();

    const theme = useTheme();

    ////////qr code test
    // const [permission, requestPermission] = useCameraPermissions();

    ///const isPermissionGranted = Boolean(permission?.granted);
    ////////
    const toko5Repository = useContext(DatabaseContext);
    const [nom, setNom] = useState<string>("");
    const [prenom, setPrenom] = useState<string>("");

    const [text, setText] = useState<string>("");

    const [societe, setSociete] = useState<Societe>();

    const [loading, setLoading] = useState<boolean>(false);

    const [initLoading, setInitLoading] = useState<boolean>(true);

    const [listSociete, setListSociete] = useState<{ label: string; value: Societe; }[]>([]);
    const [listTask, setListTask] = useState<{ label: string; value: Task; }[]>([]);

    const [task, setTask] = useState<Task>();

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

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const init = async () => {
        if (toko5Repository !== null) {
            const societes = await toko5Repository.getAllSociete();
            const tasks = await toko5Repository.getAllTask();
            let dataSociete = [];
            let dataTask = [];
            for (let societe of societes) {
                dataSociete.push({
                    label: societe.nom,
                    value: societe
                })
            }
            setListSociete(dataSociete);
            for (let task of tasks) {
                dataTask.push({
                    label: task.nom,
                    value: task
                })
            }
            setListTask(dataTask);
        } else {
            throw new Error("internal error: repository toko5repository is null");
        }
        setInitLoading(false);
    }

    const newToko5 = async () => {
        const errors = validateForm();
        if (errors.length > 0) {
            // Show errors to user
            alert(errors.join('\n'));
            return;
        }

        try {
            setLoading(true);
            if (toko5Repository !== null && formData.task && formData.societe) {
                const toko5 = await toko5Repository.newToko5(
                    formData.nom,
                    formData.prenom,
                    formData.task,
                    formData.societe
                );

                const isInternetReachable = await checkConnection();
                if (isInternetReachable) {
                    await axios.post(`${BACKEND_URL}/toko5s`, toko5, {
                        headers: { 'Content-Type': 'application/json' }
                    });
                }

                navigation.navigate('Think', { toko5Id: toko5.toko5Id });
            }
        } catch (error) {
            console.error("Login error: ", error);
            alert("Erreur lors de la connexion. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };


    const handleRefresh = () => {

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
                {/* Header */}
                <View style={styles.header}>
                    {/* <Text style={styles.title}>Veuillez vous identifier</Text> */}
                    {/* <Text style={styles.subtitle}>
                        Veuillez vous identifier pour continuer
                    </Text> */}
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
                        <Icon
                            source="card-account-details-outline"
                            size={52}
                            color="rgba(56, 56, 56, 0.87)"
                        />
                        <Text
                            style={{ textAlign: "center", paddingLeft: 17, color: 'rgba(0, 0, 0, 0.87)' }}
                            variant="titleMedium"
                        >
                            Fenoy ireny  {" "}
                            {"\n"}
                            hahamantarana anao
                            {/* Vous n'avez pas de : {"\n"}- [something...] */}
                        </Text>
                    </View>
                </View>

                {/* Form Card */}
                <View style={styles.card}>
                    {/* Name Row */}
                    {/* <View style={styles.inputRow}>
                        <View style={styles.halfInput}>
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
                                value={formData.nom}
                                style={styles.textInput}
                                onChangeText={(value) => handleInputChange('nom', value)}
                                mode="outlined"
                                outlineColor="#E8ECF4"
                                activeOutlineColor="#3498DB"
                            />
                        </View>

                        <View style={styles.halfInput}>
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
                                value={formData.prenom}
                                style={styles.textInput}
                                onChangeText={(value) => handleInputChange('prenom', value)}
                                mode="outlined"
                                outlineColor="#E8ECF4"
                                activeOutlineColor="#3498DB"
                            />
                        </View>
                    </View> */}

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
                            value={formData.nom}
                            style={styles.textInput}
                            onChangeText={(value) => handleInputChange('nom', value)}
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
                            value={formData.prenom}
                            style={styles.textInput}
                            onChangeText={(value) => handleInputChange('prenom', value)}
                            mode="outlined"
                        // outlineColor="#E8ECF4"
                        // activeOutlineColor="#3498DB"
                        />
                    </View>

                    {/* Optional Fields */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Email (optionnel)</Text>
                        <TextInput
                            left={<TextInput.Icon icon="email" color="#7F8C8D" />}
                            placeholder="email@exemple.com"
                            value={formData.email}
                            style={styles.textInput}
                            onChangeText={(value) => handleInputChange('email', value)}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            mode="outlined"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Téléphone (optionnel)</Text>
                        <TextInput
                            left={<TextInput.Icon icon="phone" color="#7F8C8D" />}
                            placeholder="+261 34 56 789 90"
                            value={formData.telephone}
                            style={styles.textInput}
                            onChangeText={(value) => handleInputChange('telephone', value)}
                            keyboardType="phone-pad"
                            mode="outlined"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>ID Permis de travail</Text>
                        <TextInput
                            left={<TextInput.Icon icon="card-account-details" color="#7F8C8D" />}
                            placeholder="ID-XXXX-XXXX"
                            value={formData.permisId}
                            style={styles.textInput}
                            onChangeText={(value) => handleInputChange('permisId', value)}
                            mode="outlined"
                        />
                    </View>

                    {/* Required Dropdowns */}
                    <View style={styles.dropdownContainer}>
                        <Text style={styles.inputLabel}>
                            Société <Text style={styles.requiredIndicator}>*</Text>
                        </Text>
                        <Dropdown
                            style={[
                                styles.dropdown,
                                dropdownFocus.societe && styles.dropdownFocus
                            ]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={listSociete}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={"    "+"Sélectionner une société"}
                            searchPlaceholder="Rechercher..."
                            value={formData.societe}
                            onFocus={() => setDropdownFocus(prev => ({ ...prev, societe: true }))}
                            onBlur={() => setDropdownFocus(prev => ({ ...prev, societe: false }))}
                            onChange={item => handleInputChange('societe', item.value)}
                            renderLeftIcon={() => (
                                <Icon
                                    source="office-building"
                                    size={20}
                                    color={dropdownFocus.societe ? "rgba(26, 85, 161, 0.87)" : "#7F8C8D"}
                                // style={styles.dropdownIcon}
                                />
                            )}
                        />
                        {/* <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={listSociete}
                            search
                            maxHeight={230}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Société' : 'Société'}
                            searchPlaceholder="Rechercher..."
                            value={value}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setSociete(item.value);
                                setIsFocus(false);
                            }}
                            renderLeftIcon={renderSocieteLeftIcon}
                        /> */}

                    </View>

                    <View style={styles.dropdownContainer}>
                        <Text style={styles.inputLabel}>
                            Tâche <Text style={styles.requiredIndicator}>*</Text>
                        </Text>
                        <Dropdown
                            style={[
                                styles.dropdown,
                                dropdownFocus.task && styles.dropdownFocus
                            ]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={listTask}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={"    "+"Sélectionner une tâche"}
                            searchPlaceholder="Rechercher..."
                            value={formData.task}
                            onFocus={() => setDropdownFocus(prev => ({ ...prev, task: true }))}
                            onBlur={() => setDropdownFocus(prev => ({ ...prev, task: false }))}
                            onChange={item => handleInputChange('task', item.value)}
                            renderLeftIcon={() => (
                                <Icon
                                    source="clipboard-list"
                                    size={20}
                                    color={dropdownFocus.task ? "rgba(26, 85, 161, 0.87)" : "#7F8C8D"}
                                // style={styles.dropdownIcon}
                                />
                            )}
                        />
                    </View>

                    {/* Submit Button */}
                    <Button
                        mode="contained"
                        onPress={newToko5}
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

                {/* Refresh Button */}
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
    );
}