/////there is a visual problem during the first second when we still retrieving the list question : the two buttons go bellow the end of the screen.. only part of it is visible and then after we get the data the buttons are placed on the right place



///////////////////// WHY IS EXPO CRASHING EACH TIME I ENTER THAT COMPONENTS EVER SINCE I IMPLEMENTED THAT IMAGE MAPPING 


import { useCallback, useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, StatusBar, Pressable, Modal, Alert, Image } from "react-native";
import styles from "../styles";
import AnonymousHotSurfaceDanger from "../assets/Anonymous-hot-surface-danger.svg";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DatabaseContext, Question, ReponseInterfaceView, Reponse, RootStackParamList } from "../context";
import Checkbox from "expo-checkbox";
import { ActivityIndicator, IconButton } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { Button, Text } from "react-native-paper";
import Toko5Repository from "../repository/Toko5Repository";
import { imagePathMapping } from "../utils/imagePathMapping";
import { QUESTION_CATEGORIES } from "../constants/questionTypes";
import { useFocusEffect } from "@react-navigation/native";
import { BackHandler } from 'react-native';
import { useValidity } from "../hooks/useValidity";


type Props = NativeStackScreenProps<RootStackParamList, 'Think'>;

export default function Think({ navigation, route }: Props) {

    const { toko5Id } = route.params;

    //const {validity, validityLoading}: {validity: boolean | null, validityLoading: boolean} = useValidity(route);

    const theme = useTheme();

    const [listQuestion, setListQuestion] = useState<any>([]);

    const toko5Repository = useContext(DatabaseContext);

    const [loading, setLoading] = useState(true);

    const [listReponse, setListReponse] = useState<Record<number, ReponseInterfaceView>>({});

    const [saveLoading, setSaveLoading] = useState<boolean>(false);

    //const isLoading = loading || validityLoading;

    const getAllThinkData = async () => {
        try {
            setLoading(true);
            if (toko5Repository !== null) {
                let list = await toko5Repository.getAllCategorieQuestion(QUESTION_CATEGORIES.THINK);
                setListQuestion(list);
                // find a cleaner way to achieve this .. I think this is too dirty ... maybe
                let listAnswer = await toko5Repository.getAllReponseToko5Categorie(toko5Id, QUESTION_CATEGORIES.THINK);
                //console.log('saved list answer', listAnswer);
                if (listAnswer.length > 0) {
                    let listRep: Record<number, ReponseInterfaceView> = {};

                    for (let answer of listAnswer as Reponse[]) {
                        //console.log('conversion individual of the database answer to reponse',answer);
                        let x: ReponseInterfaceView = {
                            toko5_id: toko5Id,
                            question_id: answer.question_id,
                            valeur: Boolean(answer.valeur),
                            pressed: true
                        };
                        listRep[answer.question_id] = x;
                    }
                    setListReponse(listRep);
                } else {
                    let listRep: Record<number, ReponseInterfaceView> = {};
                    for (let question of list as Question[]) {
                        //console.log('question',question);
                        let reponse: ReponseInterfaceView = {
                            toko5_id: toko5Id,
                            question_id: question.question_id,
                            valeur: false,
                            pressed: false
                        };
                        //console.log('reponse',reponse);
                        listRep[question.question_id] = reponse;
                    }
                    //console.log('listRep',listRep);
                    setListReponse(listRep)

                    //console.log(listRep)
                }
            }
        } catch (error) {
            console.error('Error in the component think while retrieving list of questions ', error);
        } finally {
            setLoading(false);
        }
    };

    const saveAllReponse = async () => {
        try {
            setSaveLoading(true);
            //console.log(Object.values(listReponse));
            if (toko5Repository !== null) {
                //console.log('Think saveAllReponse toko5Repository not null');
                await toko5Repository.insertListReponse(Object.values(listReponse));
                //console.log('here2');
            }else{
                throw new Error('toko5Repository not initialized saveAllReponse function!')
            }
        } catch (error) {
            console.log('error in saveAllReponse think here',error);
        }finally{
            setSaveLoading(false);
        }
    }

    const updateListReponse = (question_id: number, valeur: boolean) => {
        let list: Record<number, ReponseInterfaceView> = JSON.parse(JSON.stringify(listReponse));
        list[question_id].valeur = valeur;
        list[question_id].pressed = !(list[question_id].pressed);
        setListReponse(list);
        //console.log(list[question_id].question_id,'valeur',list[question_id].valeur);
        //console.log(list[question_id].question_id,'valeur',list[question_id].valeur,'pressed',list[question_id].pressed);
    }

    // does this happen 2 times in the first mounting if i use both useEffect and useFocusEffect or not .. Should I use only useFocusEffect ??!!
    // useEffect(() => {
    //     getAllThinkQuestions();
    // }, []);


    useFocusEffect(
        useCallback(() => {
            getAllThinkData();
            return () => {
            };
        }, [])
    );

    ///just test 
    // if (validity === false) {
    //     return null;
    // }

    return (
        <>
            <StatusBar hidden={false} />
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                </View>
            ) : (
                <View style={styles.pictoContainer}>
                    {listQuestion.map((question: any, i: number) => (
                        <View key={question.question_id} style={styles.single}>
                            <Pressable
                                onPress={() => navigation.navigate('SinglePicto', { question: question })}
                                style={({ pressed }) => [
                                    styles.box,
                                    pressed && styles.pressedBox,
                                ]}
                            >
                                <Image source={imagePathMapping(question.pictogramme)} style={{ width: 70, height: 70 }}></Image>
                            </Pressable>
                            <View style={styles.checkboxContainer}>

                                {/* {<Text>X.{i}.V</Text>} 
                            <Checkbox value={isChecked} onValueChange={setChecked} />*/}

                                {!(listReponse[question.question_id].pressed) && (
                                    <>
                                        <IconButton
                                            icon="close"
                                            iconColor={theme.colors.outline}
                                            size={24}
                                            onPress={() => updateListReponse(question.question_id, false)}
                                        />
                                        <IconButton
                                            icon="checkbox-marked-outline"
                                            iconColor={theme.colors.outline}
                                            size={24}
                                            onPress={() => updateListReponse(question.question_id, true)}
                                        />
                                    </>
                                )}

                                {(listReponse[question.question_id].pressed) && listReponse[question.question_id].valeur && (
                                    <>
                                        <IconButton
                                            icon="checkbox-marked-outline"
                                            iconColor='green'
                                            size={24}
                                            onPress={() => updateListReponse(question.question_id, false)}
                                        />
                                    </>
                                )}

                                {(listReponse[question.question_id].pressed) && !(listReponse[question.question_id].valeur) && (
                                    <>
                                        <IconButton
                                            icon="close"
                                            iconColor='red'
                                            size={24}
                                            onPress={() => updateListReponse(question.question_id, false)}
                                        />
                                    </>
                                )}



                            </View>
                        </View>
                    ))}
                </View>
            )}





            <View style={styles.buttonContainer}>
                <View>
                    <Button style={styles.bottomButton}
                        mode="contained"
                        onPress={async () => {navigation.navigate('Recent')}}
                        icon="home"
                        labelStyle={{
                            color: theme.colors.secondary, // Manually set to theme contrast color
                            fontSize: 16
                        }}
                    >
                        Accueil
                    </Button>
                </View>


                {saveLoading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="small" color={theme.colors.primary} />
                    </View>
                )}

                < View >
                    <Button style={styles.bottomButton}
                        mode="contained"
                        onPress={async () => { await saveAllReponse(); navigation.navigate('Organise1',{toko5Id: toko5Id})}}
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