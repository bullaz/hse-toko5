import { useState } from "react";
import { View, Text, TouchableOpacity, StatusBar, Pressable, Modal, Button, Alert } from "react-native";
import styles from "../styles";
import AnonymousHotSurfaceDanger from "../assets/Anonymous-hot-surface-danger.svg";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import Checkbox from "expo-checkbox";

const boxes = new Array(10).fill(null).map((v, i) => i + 1);

type Props = NativeStackScreenProps<RootStackParamList>;

export default function Think({ navigation }: Props) {

    const [isChecked, setChecked] = useState(false);

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
                            <AnonymousHotSurfaceDanger fill="blue" />
                        </Pressable>
                        <View style={styles.checkboxContainer}>
                            {/* {<Text>X.{i}.V</Text>} */}
                            <Checkbox value={isChecked} onValueChange={setChecked} />
                        </View>
                    </View>
                ))}
            </View>
            <View style={styles.buttonContainer}>
                <View>
                    <Button
                        title="précédent"
                        color="#2322F0" // Optional: customize button color
                        accessibilityLabel="Learn more about this button"
                    />
                </View>
                <View>
                    <Button
                        title="suivant"
                        color="#2322F0" // Optional: customize button color
                        accessibilityLabel="Learn more about this button"
                    />
                </View>
            </View>
        </>
    );
}