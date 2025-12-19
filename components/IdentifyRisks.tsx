import { useCallback, useContext, useState } from "react";
import { View, StatusBar, Pressable, Image } from "react-native";
import styles from "../styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DatabaseContext, Reponse, RootStackParamList } from "../context";
import { ActivityIndicator, Checkbox } from 'react-native-paper';
import { useTheme } from "react-native-paper";
import { Button } from "react-native-paper";
import { QUESTION_CATEGORIES } from "../constants/questionTypes";
import { imagePathMapping } from "../utils/imagePathMapping";
import { useFocusEffect } from "@react-navigation/native";
import { getAllData } from "../utils/commonFunctions";
import { addMesureControle, updateOrAddToko5 } from "../services/ApiService";


////one time from epi press that top button to go back here the buttons precedent and suivant was right below those pictograms not at the end of the screen ... FIND WHY

const boxes = new Array(10).fill(null).map((v, i) => i + 1);

type Props = NativeStackScreenProps<RootStackParamList, 'IdentifyRisks'>;

export default function IdentifyRisks({ navigation, route }: Props) {

    const { toko5Id } = route.params;

    const [isChecked, setChecked] = useState(false);

    const theme = useTheme();

    const [listQuestion, setListQuestion] = useState<any>([]);

    const toko5Repository = useContext(DatabaseContext);

    const [loading, setLoading] = useState(true);

    const [listReponse, setListReponse] = useState<Record<number, Reponse>>({});

    const [saveLoading, setSaveLoading] = useState<boolean>(false);


    // useEffect(() => {
    //     const getAllThinkQuestions = async () => {
    //         try {
    //             setLoading(true);
    //             if (toko5Repository !== null) {
    //                 let list = await toko5Repository.getAllCategorieQuestion(QUESTION_CATEGORIES.RISKS);
    //                 setListQuestion(list);
    //                 //console.log(list)
    //             }
    //         } catch (error) {
    //             console.error('Error in the component think while retrieving list of questions ', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     getAllThinkQuestions();
    // }, []);

    const getData = async () => {
        try {
            setLoading(true);
            const data = await getAllData(toko5Repository, QUESTION_CATEGORIES.RISKS, toko5Id, false, false);
            setListQuestion(data?.listQuestion);
            setListReponse(data?.listReponse);

        } catch (error) {
            console.log('error in getAllDAta risks', error);
        } finally {
            setLoading(false);
        }
    }

    const saveAllReponse = async (list: Record<number, Reponse> | null) => {
        try {
            //console.log('list before saving all',listReponse);
            setSaveLoading(true);
            if (toko5Repository !== null) {
                if (list === null) {
                    await toko5Repository.insertListReponse(Object.values(listReponse));
                    await toko5Repository.updateToko5Saved(toko5Id, false);
                    await updateOrAddToko5(toko5Id, toko5Repository, true, Object.values(listReponse));
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
        //console.log('checkbox pressed',list[question_id]);
    }

    const handleCheckBoxPress = async (questionId: number, valeur: boolean) => {
        setSaveLoading(true);
        let listValiny = updateListReponse(questionId, valeur);
        await saveAllReponse(listValiny);
        let test = await toko5Repository?.getAllReponseToko5Categorie(toko5Id, QUESTION_CATEGORIES.RISKS);
        //console.log('list reponse after checkbox', test);
        if (valeur) {
            // insert in controlMeasure;
            console.log('test');
            await addMesureControle(toko5Repository,toko5Id,questionId,'');
            navigation.navigate('ControlMeasure', { toko5Id: toko5Id, questionId: questionId });

        } else {
            // delete from measureControl
            // stop using that ? syntax xD 
            //add delete from question
            await toko5Repository?.deleteFromControlMeasure(toko5Id, questionId);
        }
        setSaveLoading(false);
    };

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
                <View style={styles.pictoContainer}>
                    {/* <StatusBar hidden={false} /> */}
                    {listQuestion.map((question: any, index: string) => (
                        <View key={question.question_id} style={styles.single}>
                            <Pressable
                                onPress={() => navigation.navigate('SinglePicto', { question: question })}
                                style={({ pressed }) => [
                                    styles.box,
                                    pressed && styles.pressedBox,
                                ]}
                            >
                                <Image source={imagePathMapping(question.pictogramme)} style={{ width: 80, height: 80 }}></Image>
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
                        </View>
                    ))}
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
                        précédent
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
                        suivant
                    </Button>
                </View>
            </View>
        </>
    );
}