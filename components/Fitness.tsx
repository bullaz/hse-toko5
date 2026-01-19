import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DatabaseContext, Question, Reponse, RootStackParamList } from "../context";
import { Image, View } from "react-native";
import { ActivityIndicator, Button, Checkbox, Divider, Modal, PaperProvider, Portal, Text, useTheme } from "react-native-paper";
import styles from "../styles";
import { useCallback, useContext, useState } from "react";
import { QUESTION_CATEGORIES } from "../constants/questionTypes";
import { useFocusEffect } from "@react-navigation/native";
import { getAllData } from "../utils/commonFunctions";
//import Checkbox from "expo-checkbox";
import { StatusBar } from "expo-status-bar";
import { updateOrAddToko5 } from "../services/ApiService";
import { useAppTranslation } from "../contexts/TranslationContext";
// import { useValidity } from "../hooks/useValidity";



type Props = NativeStackScreenProps<RootStackParamList, 'Fitness'>;

export default function Fitness({ navigation, route }: Props) {

    const {t} = useAppTranslation();

    const { toko5Id } = route.params;

    const theme = useTheme();

    const [listQuestion, setListQuestion] = useState<Question[]>([]);

    const toko5Repository = useContext(DatabaseContext);

    const [loading, setLoading] = useState(true);

    const [visible, setVisible] = useState<boolean>(false);

    const [listReponse, setListReponse] = useState<Record<number, Reponse>>({});

    const [saveLoading, setSaveLoading] = useState<boolean>(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const getData = async () => {
        try {
            if (!toko5Repository) {
                throw new Error('toko5Repository not initialized');
            }
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
                await toko5Repository.updateToko5Saved(toko5Id, false);
                updateOrAddToko5(toko5Id, toko5Repository, true, Object.values(listReponse));
                //await toko5Repository.updateToko5Saved(toko5Id, true);
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
                    updateOrAddToko5(toko5Id, toko5Repository, true, Object.values(listReponse), true);
                    setVisible(true);
                } else {
                    updateOrAddToko5(toko5Id, toko5Repository, true, Object.values(listReponse));
                    const attemptNumber = await toko5Repository.getAttemptNumberToko5(toko5Id);
                    navigation.navigate('Invalide',{toko5Id: toko5Id, attemptNumber: attemptNumber});
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
                            {listQuestion.map((question: Question, index: number) => (
                                <View style={{ gap: 10 }} key={question.question_id}>
                                    <Text style={{ textAlign: 'center', }} variant="titleMedium">{t(question.text_id+".description")}</Text>
                                    <View style={styles.checkboxContainer}>
                                        {/* <Checkbox
                                            value={listReponse[question.question_id].valeur} onValueChange={() => { updateListReponse(question.question_id, !listReponse[question.question_id].valeur) }}
                                        /> */}
                                        <Checkbox
                                            status={listReponse[question.question_id].valeur ? 'checked' : 'unchecked'}
                                            onPress={() => { updateListReponse(question.question_id, !listReponse[question.question_id].valeur) }}
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

                                {t("fitness.finish")}
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
                                        {t("fitness.merci")}
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
                                       {t("fitness.backHome")}
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