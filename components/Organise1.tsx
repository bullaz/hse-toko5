import { useCallback, useContext, useState } from "react";
import { View, StatusBar, Pressable, Image } from "react-native";
import styles from "../styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DatabaseContext, Reponse, RootStackParamList } from "../context";
import Checkbox from "expo-checkbox";
import { ActivityIndicator } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { Button } from "react-native-paper";
import { QUESTION_CATEGORIES } from "../constants/questionTypes";
import { imagePathMapping } from "../utils/imagePathMapping";
import { useFocusEffect } from "@react-navigation/native";
import { getAllData } from "../utils/commonFunctions";

type Props = NativeStackScreenProps<RootStackParamList, 'Organise1'>;

export default function Organise1({ navigation, route }: Props) {

    const { toko5Id } = route.params;

    const theme = useTheme();

    const [listQuestion, setListQuestion] = useState<any>([]);

    const toko5Repository = useContext(DatabaseContext);

    const [loading, setLoading] = useState(true);

    const [listReponse, setListReponse] = useState<Record<number, Reponse>>({});

    const [saveLoading, setSaveLoading] = useState<boolean>(false);

    // const getAllRequiredOrganiseQuestions = async () => {
    //     try {
    //         setLoading(true);
    //         if (toko5Repository !== null) {
    //             let list = await toko5Repository.getAllRequiredOrganise();
    //             setListQuestion(list);
    //             //console.log(list)
    //         }
    //     } catch (error) {
    //         console.error('Error in the component organise1 while retrieving list of questions ', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const getData = async () => {
        try {
            setLoading(true);
            const data = await getAllData(toko5Repository, QUESTION_CATEGORIES.ORGANISE, toko5Id, true, true);
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
                    {listQuestion.map((question: any, index: number) => (
                        <View key={question.question_id} style={styles.single}>
                            <Pressable
                                onPress={() => navigation.navigate('SinglePicto', { question: question })}
                                style={({ pressed }) => [
                                    styles.box,
                                    pressed && styles.pressedBox,
                                ]}
                            >
                                <Image source={imagePathMapping(question.pictogramme)} style={{ width: 90, height: 90 }}></Image>
                            </Pressable>
                            <View style={styles.checkboxContainer}>
                                <Checkbox value={listReponse[question.question_id].valeur} onValueChange={() => { updateListReponse(question.question_id, !listReponse[question.question_id].valeur) }} />
                            </View>
                        </View>
                    ))}
                </View>
            )}
            <View style={styles.buttonContainer}>
                <View>
                    <Button style={styles.bottomButton}
                        mode="contained"
                        onPress={async () => { await saveAllReponse(); navigation.navigate('Think', { toko5Id: toko5Id }) }}
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
                        onPress={async () => { await saveAllReponse(); navigation.navigate('Organise2', { toko5Id: toko5Id }) }}
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
            </View >
        </>
    );
}