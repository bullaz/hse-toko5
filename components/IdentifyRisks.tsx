import { useCallback, useContext, useEffect, useState } from "react";
import { View, StatusBar, Pressable, Image, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import styles from "../styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DatabaseContext, Question, Reponse, RootStackParamList } from "../context";
import { ActivityIndicator, Checkbox, Icon, Modal, PaperProvider, Portal, Text, TextInput } from 'react-native-paper';
import { useTheme } from "react-native-paper";
import { Button } from "react-native-paper";
import { QUESTION_CATEGORIES } from "../constants/questionTypes";
import { imagePathMapping } from "../utils/imagePathMapping";
import { useFocusEffect } from "@react-navigation/native";
import { getAllData } from "../utils/commonFunctions";
import { addMesureControle, updateOrAddToko5 } from "../services/ApiService";
import { useAppTranslation } from "../contexts/TranslationContext";

////one time from epi press that top button to go back here the buttons precedent and suivant was right below those pictograms not at the end of the screen ... FIND WHY

const boxes = new Array(10).fill(null).map((v, i) => i + 1);

type Props = NativeStackScreenProps<RootStackParamList, 'IdentifyRisks'>;

export default function IdentifyRisks({ navigation, route }: Props) {

    const { t } = useAppTranslation();

    const { toko5Id } = route.params;

    const [isChecked, setChecked] = useState(false);

    const theme = useTheme();

    const [listQuestion, setListQuestion] = useState<Question[]>([]);

    const toko5Repository = useContext(DatabaseContext);

    const [loading, setLoading] = useState(true);

    const [listReponse, setListReponse] = useState<Record<number, Reponse>>({});

    const [saveLoading, setSaveLoading] = useState<boolean>(false);

    const [mesureLoading, setMesureLoading] = useState<boolean>(false);

    const [visible, setVisible] = useState(false);

    const hideModal = () => {
        Keyboard.dismiss();
        setVisible(false);
        setCurrentMesureText('');
        if(!mesureState){
            console.log('no mesure added');
            // uncheck the box
            // delete from reponse list
            // delete from controle mesure
            // we need to find which question it is
            if(currentQuestionId !== undefined){
                updateListReponse(currentQuestionId, false);
                //toko5Repository?.deleteFromControlMeasure(toko5Id, currentQuestionId);
            }
        }
    }

    const [mesureState, setMesureState] = useState<boolean>(false);

    const [currentMesureText, setCurrentMesureText] = useState<string>('');

    const [currentQuestionId, setCurrentQuestionId] = useState<number>();

    const openMesureModal = async (questionId: any) => {
        setCurrentQuestionId(questionId);
        setVisible(true);
        setMesureState(false);
    };

    //maybe add loading state here
    const addMesure = async () => {
        setMesureLoading(true);
        if (currentQuestionId !== undefined) {
            // await toko5Repository?.insertIntoControlMeasure(toko5Id,currentQuestionId,currentMesureText,false);
            await addMesureControle(toko5Repository, toko5Id, currentQuestionId, currentMesureText);
            setVisible(false);
        }
        setMesureState(true);
        setMesureLoading(false);
        setCurrentMesureText('');
    }

    const getData = async () => {
        try {
            if (toko5Repository) {
                setLoading(true);
                const data = await getAllData(toko5Repository, QUESTION_CATEGORIES.RISKS, toko5Id, false, false);
                setListQuestion(data.listQuestion);
                setListReponse(data.listReponse);
            }
            throw new Error('toko5Repository not initialized');
        } catch (error) {
            console.log('error in getAllDAta risks', error);
        } finally {
            setLoading(false);
        }
    }

    const saveAllReponse = async (list: Record<number, Reponse> | null) => {
        console.log('save');
        try {
            setSaveLoading(true);
            if (toko5Repository !== null) {
                if (list === null) {
                    await toko5Repository.insertListReponse(Object.values(listReponse));
                    await toko5Repository.updateToko5Saved(toko5Id, false);
                    // await updateOrAddToko5(toko5Id, toko5Repository, true, Object.values(listReponse));
                    updateOrAddToko5(toko5Id, toko5Repository, true, Object.values(listReponse));
                    await toko5Repository.updateToko5Saved(toko5Id, true);
                } else {
                    await toko5Repository.insertListReponse(Object.values(list));
                }
            } else {
                throw new Error('toko5Repository not initialized');
            }
        } catch (error) {
            console.log('error in saveAllReponse Organise1', error);
        } finally {
            setSaveLoading(false);
        }
    }

    const updateListReponse = (question_id: number, valeur: boolean): Record<number, Reponse> => {
        let list: Record<number, Reponse> = JSON.parse(JSON.stringify(listReponse));
        list[question_id].valeur = valeur;
        setListReponse(list);
        return list;
    }

    const handleCheckBoxPress = async (questionId: number, valeur: boolean) => {
        setSaveLoading(true);
        let listValiny = updateListReponse(questionId, valeur);
        await saveAllReponse(listValiny);
        if (valeur) {
            openMesureModal(questionId);
        } else {
            // delete from measureControl
            // stop using that ? syntax xD 
            //add delete from question
            await toko5Repository?.deleteFromControlMeasure(toko5Id, questionId);
        }
        setSaveLoading(false);
    };

    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setIsKeyboardVisible(true);
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setIsKeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    useFocusEffect(
        useCallback(() => {
            getData();
            return () => {
            };
        }, [])
    );


    return (
        <>
            <PaperProvider>
                <Portal>
                    <StatusBar hidden={false} backgroundColor="black" />
                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color={theme.colors.primary} />
                        </View>
                    ) : (
                        <View style={{
                            flex: 1,
                            flexWrap: "wrap",
                            flexDirection: "column",
                            alignItems: "center",
                            alignContent: "center",
                            gap: 15,
                            width: "100%",
                            backgroundColor: "white"
                            // alignContent: "center",
                        }}>
                            {/* <View
                        style={{
                            display: 'flex',
                            flexWrap: "wrap",
                            flexDirection: "row",
                            justifyContent: 'center',
                            alignItems: "center",
                            alignContent: "center",
                        }}>
                    </View> */}
                            <View
                                style={{
                                    marginTop: 25,
                                    // flex: 1,
                                    flexWrap: "wrap",
                                    flexDirection: "row",
                                    justifyContent: 'center',
                                    alignItems: "center",
                                    // alignContent: "center",
                                }}
                            >
                                <Icon
                                    source={require('../assets/pictogram/bulb.png')}
                                    size={40}
                                />
                                <Text
                                    style={{ textAlign: "center", paddingLeft: 17, flexBasis: '70%' }}
                                    variant="titleMedium"
                                >
                                    {t("identifyRisks.description")}
                                </Text>
                            </View>
                            <Button style={styles.controlButton}
                                mode="contained"
                                contentStyle={{
                                    flexDirection: 'row',
                                }}
                                labelStyle={{
                                    color: theme.colors.secondary, // Manually set to theme contrast color
                                    fontSize: 16
                                }}
                                onPress={() => { navigation.navigate('ControlMeasure', { toko5Id: toko5Id }) }}
                                //icon="account-hard-hat"
                                icon={({ size, color }) => (
                                    <Icon source="account-hard-hat" size={23} color="ghostwhite" />
                                )}
                            >
                                {t("identifyRisks.controlMeasure")}
                            </Button>
                            <ScrollView
                                keyboardShouldPersistTaps="handled"
                                style={styles.scrollView}
                                // contentContainerStyle={{
                                //     flexGrow: 1,
                                //     flexDirection: 'column',
                                //     alignItems: 'center',
                                //     alignContent: 'center',
                                //     gap: 15,
                                //     paddingBottom: 10,
                                // }}
                                persistentScrollbar={true}
                            >

                                <View style={styles.pictoContainer}>
                                    {/* <StatusBar hidden={false} /> */}
                                    {listQuestion.map((question: Question) => (
                                        <View key={question.question_id} style={styles.single}>
                                            <Pressable
                                                onPress={() => navigation.navigate('SinglePicto', { question: question })}
                                                style={({ pressed }) => [
                                                    styles.box,
                                                    pressed && styles.pressedBox,
                                                ]}
                                            >
                                                <Image source={imagePathMapping(question.pictogramme)} style={{ width: 75, height: 75 }}></Image>
                                            </Pressable>

                                            {(question.nom !== 'autre') ?
                                                (
                                                    <View style={styles.checkboxContainer}>
                                                        <Checkbox
                                                            status={listReponse[question.question_id].valeur ? 'checked' : 'unchecked'}
                                                            onPress={async () => { await handleCheckBoxPress(question.question_id, !(listReponse[question.question_id].valeur)) }}
                                                        //{() => { updateListReponse(question.question_id, !listReponse[question.question_id].valeur) }}
                                                        />
                                                    </View>
                                                ) : (
                                                    <View style={styles.checkboxContainer}>
                                                        <Checkbox
                                                            status='unchecked'
                                                            onPress={async () => { await handleCheckBoxPress(question.question_id, true) }}
                                                        />
                                                    </View>
                                                )}
                                            <View>
                                                <Text variant="titleMedium" style={{ textAlign: 'center' }}>{t(question.text_id + ".nom")}</Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </ScrollView>
                        </View>
                    )}
                    <View style={styles.buttonContainer}>
                        <View>
                            <Button style={styles.bottomButton}
                                mode="contained"
                                onPress={async () => { await saveAllReponse(null); navigation.navigate('Organise2', { toko5Id: toko5Id }); }}
                                icon="arrow-left"
                                labelStyle={{
                                    color: theme.colors.secondary, // Manually set to theme contrast color
                                    fontSize: 16
                                }}
                            >
                                {t("navigationButton.previous")}
                            </Button>
                        </View>
                        {saveLoading && (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="small" color={theme.colors.primary} />
                            </View>
                        )}
                        <View>
                            <Button style={styles.bottomButton}
                                mode="contained"
                                onPress={async () => { await saveAllReponse(null); navigation.navigate('Epi', { toko5Id: toko5Id }); }}
                                icon="arrow-right"
                                contentStyle={{ flexDirection: 'row-reverse' }}
                                labelStyle={{
                                    color: theme.colors.secondary, // Manually set to theme contrast color
                                    fontSize: 16
                                }}
                            >
                                {t("navigationButton.next")}
                            </Button>
                        </View>
                    </View>
                    {/* mesure a prendre modal */}
                    {/* HOW TO MAKE THIS SHIT REACT PROPERLY WHEN THE KEYBOARD SHOWS */}
                    <Modal
                        visible={visible}
                        onDismiss={hideModal}
                        contentContainerStyle={[
                            styles.modalStyle,
                            {
                                marginTop: Platform.OS === 'ios' ? 20 : 0,
                                marginBottom: Platform.OS === 'ios' ? 20 : 0,
                                // Adjust height based on keyboard visibility
                                maxHeight: isKeyboardVisible ? '70%' : '50%',
                                // Center horizontally
                                left: 0,
                                right: 0,
                                marginLeft: 'auto',
                                marginRight: 'auto',
                            }
                        ]}
                    >
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            style={{ width: '100%', height: '100%' }}
                        >
                            <View style={{
                                flex: 1,
                                flexWrap: 'wrap',
                                flexDirection: 'column',
                                alignContent: 'center',
                                alignItems: 'center',
                                paddingTop: 15,
                                paddingBottom: 5,
                                justifyContent: 'space-around',
                                width: '100%'
                            }}>
                                <TextInput
                                    multiline={true}
                                    left={<TextInput.Icon icon="pen" />}
                                    label={
                                        <Text
                                            style={{
                                                textAlign: "center",
                                                color: 'rgba(77, 77, 71, 0.87)',
                                                textAlignVertical: 'top'
                                            }}
                                            variant="titleMedium"
                                        >
                                            {t("controlMeasure.mesureToTake")}
                                        </Text>
                                    }
                                    value={currentMesureText}
                                    style={{
                                        width: "95%",
                                        height: "60%",
                                        backgroundColor: 'rgba(234, 235, 232, 0.87)'
                                    }}
                                    onChangeText={(newValue) => {
                                        setCurrentMesureText(newValue);
                                    }}
                                    underlineColor='darkgrey'
                                />

                                <Button
                                    style={{
                                        width: "95%",
                                        borderRadius: 5,
                                        backgroundColor: "rgba(26, 85, 161, 0.87)"
                                    }}
                                    mode="contained"
                                    onPress={addMesure}
                                    contentStyle={{ flexDirection: 'row-reverse' }}
                                    labelStyle={{
                                        color: theme.colors.secondary,
                                        fontSize: 18
                                    }}
                                >
                                    {mesureLoading ? (
                                        <>
                                            <ActivityIndicator color="#FFFFFF" size="small" />
                                        </>
                                    ) : (
                                        t("controlMeasure.valider")
                                    )}
                                </Button>
                            </View>
                        </KeyboardAvoidingView>
                    </Modal>
                </Portal>
            </PaperProvider>
        </>
    );
}