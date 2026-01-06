import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DatabaseContext, RootStackParamList, Toko5Json } from "../context";
import { ActivityIndicator, Button, Icon, IconButton, PaperProvider, Text, useTheme } from "react-native-paper";
import { KeyboardAvoidingView, StatusBar, View } from "react-native";
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
        try {
            setLoading(true)
            if (toko5Repository !== null) {
                if (task && societe) {
                    const toko5 = await toko5Repository.newToko5(nom, prenom, task, societe);
                    console.log(toko5);
                    let isInternetReachable = await checkConnection();
                    if (isInternetReachable) {
                        let saved = axios.post(`${BACKEND_URL}/toko5s`, toko5, {
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        });
                    }
                    setLoading(false)
                    navigation.navigate('Think', { toko5Id: toko5.toko5Id })
                    return
                }
            }
            setLoading(false)
            throw new Error("repository is null");
        } catch (error) {
            console.log("login newToko5 error: ", error);
            setLoading(false);
        }
    }

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
                        {/* <TextInput
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
                        /> */}

                        <Dropdown
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
                        />

                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={listTask}
                            renderLeftIcon={renderSocieteLeftIcon}
                            search
                            maxHeight={230}
                            labelField="label"
                            valueField="value"
                            placeholder={"tâche"}
                            searchPlaceholder="Rechercher..."
                            value={value}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setTask(item.value);
                                setIsFocus(false);
                            }}
                        // renderLeftIcon={() => (
                        //     // <AntDesign
                        //     //     style={styles.icon}
                        //     //     color={isFocus ? 'blue' : 'black'}
                        //     //     name="Safety"
                        //     //     size={20}
                        //     // />
                        // )}
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
                <View style={{
                    marginTop: 10
                }}>
                    <IconButton
                        icon="refresh"
                        size={24}
                        onPress={() => { handleRefresh() }}
                        style={{ borderWidth: 1 }}
                    //style={{backgroundColor: 'rgba(230, 241, 255, 1) '}}
                    />
                    {/* <Text
                      style={{
                        textAlign: "center",
                      }}
                      variant="titleMedium"
                    >
                      recharger
                    </Text> */}
                </View>
            </View>
        </>
    )
}