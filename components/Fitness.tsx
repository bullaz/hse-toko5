import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DatabaseContext, Reponse, RootStackParamList } from "../context";
import { Image, View } from "react-native";
import { ActivityIndicator, Button, Divider, Modal, PaperProvider, Portal, Text, useTheme } from "react-native-paper";
import styles from "../styles";
import { useCallback, useContext, useState } from "react";
import { QUESTION_CATEGORIES } from "../constants/questionTypes";
import { useFocusEffect } from "@react-navigation/native";
import { getAllData } from "../utils/commonFunctions";
import Checkbox from "expo-checkbox";
import { StatusBar } from "expo-status-bar";



type Props = NativeStackScreenProps<RootStackParamList, 'Fitness'>;

export default function Fitness({ navigation, route }: Props) {

    const { toko5Id } = route.params;

    const theme = useTheme();

    const [listQuestion, setListQuestion] = useState<any>([]);

    const toko5Repository = useContext(DatabaseContext);

    const [loading, setLoading] = useState(true);

    const [visible, setVisible] = useState(false);

    const [listReponse, setListReponse] = useState<Record<number, Reponse>>({});

    const [saveLoading, setSaveLoading] = useState<boolean>(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const getData = async () => {
        try {
            setLoading(true);
            const data = await getAllData(toko5Repository, QUESTION_CATEGORIES.SAFETY, toko5Id, false, false);
            setListQuestion(data?.listQuestion);
            setListReponse(data?.listReponse);

        } catch (error) {
            console.log('error in getAllDAta organise1', error);
        } finally {
            setLoading(false);
        }
    }

    const saveAllReponse = async () => {
        try {
            setSaveLoading(true);
            if (toko5Repository !== null) {
                await toko5Repository.insertListReponse(Object.values(listReponse));
            } else {
                throw new Error('toko5Repository not initialized');
            }
        } catch (error) {
            console.log('error in saveAllReponse Organise1', error);
        } finally {
            setSaveLoading(false);
        }
    }

    const updateListReponse = (question_id: number, valeur: boolean) => {
        let list: Record<number, Reponse> = JSON.parse(JSON.stringify(listReponse));
        list[question_id].valeur = valeur;
        setListReponse(list);
    }


    const handleFinishToko5 = async () => {
        setSaveLoading(true);
        try {
            if (toko5Repository !== null) {
                await saveAllReponse();
                const isValid = await toko5Repository.getValidityToko5(toko5Id);
                if (isValid) {
                    //const etat = toko
                    await toko5Repository.validateToko5(toko5Id);
                    setVisible(true);
                } else {
                    navigation.navigate('Invalide');
                }
            } else {
                throw new Error('toko5repository not initialized');
            }
        } catch (error) {
            console.error('handleFinishToko5 error:', error);
            return false;
        }
        finally {
            setSaveLoading(false);
        }
    }

    // useEffect(() => {
    //     getAllRequiredOrganiseQuestions();
    // }, []);

    useFocusEffect(
        useCallback(() => {
            getData();
            return () => {
            };
        }, [])
    );

    return (

        <>
            <StatusBar hidden={false} backgroundColor="black" />
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                </View>
            ) : (
                <PaperProvider>
                    <Portal>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            padding: 20
                        }}>
                            {listQuestion.map((question: any, index: number) => (
                                <View style={{ gap: 10 }} key={question.question_id}>
                                    <Text style={{ textAlign: 'center', }} variant="titleMedium">{question.nom}</Text>
                                    <View style={styles.checkboxContainer}>
                                        <Checkbox
                                            value={listReponse[question.question_id].valeur} onValueChange={() => { updateListReponse(question.question_id, !listReponse[question.question_id].valeur) }}
                                        />
                                    </View>
                                    <Divider style={{ height: '0.5%', backgroundColor: 'black' }} />
                                </View>
                            ))}

                            <Button style={{
                                width: 220,
                                borderRadius: 5,
                                backgroundColor: theme.colors.primary
                            }}
                                mode="contained"
                                onPress={handleFinishToko5}
                                icon="check-circle-outline"
                                contentStyle={{ flexDirection: 'row-reverse' }}
                                labelStyle={{
                                    color: theme.colors.secondary, // Manually set to theme contrast color
                                    fontSize: 16
                                }}
                            >

                                J'ai fini mon toko5
                            </Button>

                            {/* {saveLoading && (
                                <View style={styles.loadingContainer}>
                                    <ActivityIndicator size="small" color={theme.colors.primary} />
                                </View>
                            )} */}


                            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalStyle}>
                                <View style={{
                                    flex: 1,
                                    flexWrap: 'wrap',
                                    flexDirection: 'column',
                                    justifyContent: 'space-around',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    gap: 20
                                }}>
                                    <View>
                                        <Image source={require('../assets/pictogram/success.png')} style={{ width: 150, height: 150 }}></Image>
                                    </View>

                                    <Text
                                        style={{ textAlign: "center" }}
                                        variant="titleMedium"
                                    >
                                        Merci d'avoir pris le temps de finir votre toko5 !!!
                                    </Text>

                                    <Button style={{
                                        width: "75%",
                                        borderRadius: 5,
                                        backgroundColor: "rgba(26, 85, 161, 0.87)"
                                    }}
                                        mode="contained"
                                        icon="home"
                                        onPress={() => {
                                            navigation.navigate('Recent')
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
                                        revenir a l'accueil
                                    </Button>

                                </View>
                            </Modal>

                        </View>
                    </Portal>
                </PaperProvider>
            )}
        </>
    )
}