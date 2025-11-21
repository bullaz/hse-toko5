/////there is a visual problem during the first second when we still retrieving the list question : the two buttons go bellow the end of the screen.. only part of it is visible and then after we get the data the buttons are placed on the right place



///////////////////// WHY IS EXPO CRASHING EACH TIME I ENTER THAT COMPONENTS EVER SINCE I IMPLEMENTED THAT IMAGE MAPPING 


import { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, StatusBar, Pressable, Modal, Alert, Image } from "react-native";
import styles from "../styles";
import AnonymousHotSurfaceDanger from "../assets/Anonymous-hot-surface-danger.svg";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DatabaseContext, RootStackParamList } from "../context";
import Checkbox from "expo-checkbox";
import { ActivityIndicator, IconButton } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { Button, Text } from "react-native-paper";
import Toko5Repository from "../repository/Toko5Repository";
import { imagePathMapping } from "../utils/imagePathMapping";
import { QUESTION_CATEGORIES } from "../constants/questionTypes";

const boxes = new Array(3).fill(null).map((v, i) => i + 1);

type Props = NativeStackScreenProps<RootStackParamList>;

export default function Think({ navigation }: Props) {

    const [isChecked, setChecked] = useState(false);

    const theme = useTheme();

    const [listQuestion, setListQuestion] = useState<any>([]);

    const toko5Repository = useContext(DatabaseContext);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAllThinkQuestions = async () => {
            try {
                setLoading(true);
                if (toko5Repository !== null) {
                    let list = await toko5Repository.getAllCategorieQuestion(QUESTION_CATEGORIES.THINK);
                    setListQuestion(list);
                    //console.log(list)
                }
            } catch (error) {
                console.error('Error in the component think while retrieving list of questions ', error);
            } finally {
                setLoading(false);
            }
        };

        getAllThinkQuestions();
    }, []);

    /*const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const modalContent = (
        <View style={styles.modalContainer}>
            <View >
                <Text>This is a Modal</Text>
                <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                    <Text>fermer</Text>
                </TouchableOpacity>
            </View>
        </View>
    ); */

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
                                {/* <Modal
                                animationType="fade"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    Alert.alert('Modal has been closed.');
                                    setModalVisible(!modalVisible);
                                }}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Text style={styles.modalText}>Hello World!</Text>
                                        <Pressable
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={() => setModalVisible(!modalVisible)}>
                                            <Text style={styles.textStyle}>Hide Modal</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </Modal> */}
                                <Pressable
                                    onPress={() => navigation.navigate('SinglePicto',{question: question})}
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
                                    <IconButton
                                        //icon={isChecked ? "close" : "checkbox-blank-outline"}
                                        icon="close"
                                        iconColor={isChecked ? 'red' : theme.colors.outline}
                                        size={24}
                                        onPress={() => setChecked(!isChecked)}
                                    />
                                    <IconButton
                                        icon={isChecked ? "checkbox-marked-outline" : "checkbox-blank-outline"}
                                        iconColor={isChecked ? 'green' : theme.colors.outline}
                                        size={24}
                                        onPress={() => setChecked(!isChecked)}
                                    />
                                </View>
                            </View>
                        ))}
                    </View>
                )}





                <View style={styles.buttonContainer}>
                    <View>
                        <Button style={styles.bottomButton}
                            mode="contained"
                            onPress={() => { }}
                            icon="arrow-left"
                            labelStyle={{
                                color: theme.colors.secondary, // Manually set to theme contrast color
                                fontSize: 16
                            }}
                        >
                            précédent
                        </Button>
                    </View>
                    <View>
                        <Button style={styles.bottomButton}
                            mode="contained"
                            onPress={() => { navigation.navigate('Organise1') }}
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