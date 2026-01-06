import { useCallback, useContext, useState } from "react";
import { View, StatusBar, Pressable, Image, ScrollView } from "react-native";
import styles from "../styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DatabaseContext, Reponse, RootStackParamList } from "../context";
//import Checkbox from "expo-checkbox";
import { ActivityIndicator, Checkbox, Icon, Text } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { Button } from "react-native-paper";
import { QUESTION_CATEGORIES } from "../constants/questionTypes";
import { imagePathMapping } from "../utils/imagePathMapping";
import { useFocusEffect } from "@react-navigation/native";
import { getAllData } from "../utils/commonFunctions";
import { updateOrAddToko5 } from "../services/ApiService";

type Props = NativeStackScreenProps<RootStackParamList, 'Organise2'>;

export default function Organise2({ navigation, route }: Props) {

    const { toko5Id } = route.params;

    const [isChecked, setChecked] = useState(false);

    const theme = useTheme();

    const [listQuestion, setListQuestion] = useState<any>([]);

    const toko5Repository = useContext(DatabaseContext);

    const [loading, setLoading] = useState(true);

    const [listReponse, setListReponse] = useState<Record<number, Reponse>>({});

    const [saveLoading, setSaveLoading] = useState<boolean>(false);

    const getData = async () => {
        try {
            setLoading(true);
            const data = await getAllData(toko5Repository, QUESTION_CATEGORIES.ORGANISE, toko5Id, true, false);
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
                await updateOrAddToko5(toko5Id, toko5Repository, true, Object.values(listReponse));
                await toko5Repository.updateToko5Saved(toko5Id, true);
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
                <View style={{
                    flex: 1,
                    flexWrap: "wrap",
                    flexDirection: "column",
                    alignItems: "center",
                    alignContent: "center",
                    gap: 15,
                    width: "100%",
                    backgroundColor: "ghostwhite"
                    // alignContent: "center",
                }}>
                    <View
                        style={{
                            marginTop: 40,
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
                            style={{ textAlign: "center", paddingLeft: 17 }}
                            variant="titleMedium"
                        >
                            Description-lorem ipsum {" "}
                            {"\n"}
                            Description lorem ipsum
                            {/* Vous n'avez pas de : {"\n"}- [something...] */}
                        </Text>
                    </View>
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        style={{
                            width: '100%',
                            maxHeight: '80%',
                            alignSelf: 'center',
                            backgroundColor: 'ghostwhite',
                        }}
                        persistentScrollbar={true}
                    >
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
                                        <Checkbox
                                            status={listReponse[question.question_id].valeur ? 'checked' : 'unchecked'}
                                            onPress={() => { updateListReponse(question.question_id, !listReponse[question.question_id].valeur) }}
                                        />
                                    </View>
                                    <View>
                                        <Text variant="titleMedium" style={{ textAlign: 'center' }}>{question.nom}</Text>
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
                        onPress={async () => { await saveAllReponse(); navigation.navigate('Organise1', { toko5Id: toko5Id }); }}
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
                        onPress={async () => { await saveAllReponse(); navigation.navigate('IdentifyRisks', { toko5Id: toko5Id }); }}
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