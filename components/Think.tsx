import { useState } from "react";
import { View, TouchableOpacity, StatusBar, Pressable, Modal, Alert, Image } from "react-native";
import styles from "../styles";
import AnonymousHotSurfaceDanger from "../assets/Anonymous-hot-surface-danger.svg";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import Checkbox from "expo-checkbox";
import { IconButton } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { Button, Text } from "react-native-paper";

const boxes = new Array(3).fill(null).map((v, i) => i + 1);

type Props = NativeStackScreenProps<RootStackParamList>;

export default function Think({ navigation }: Props) {

    const [isChecked, setChecked] = useState(false);

    const theme = useTheme();

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
            <View style={styles.pictoContainer}>
                <StatusBar hidden={false} />
                {boxes.map((i) => (
                    <View key={i} style={styles.single}>
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
                            onPress={() => navigation.navigate('SinglePicto')}
                            style={({ pressed }) => [
                                styles.box,
                                pressed && styles.pressedBox,
                            ]}
                        >
                            <Image source={require('../assets/pictogram/materiel.png')} style={{ width: 100, height: 100 }}></Image> 
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
            <View style={styles.buttonContainer}>
                <View>
                    <Button style={styles.bottomButton}
                        mode="contained"
                        onPress={() => {}}
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