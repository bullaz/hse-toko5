import { useState } from "react";
import { View, Text, TouchableOpacity, StatusBar, Pressable, Modal, Button } from "react-native";
import styles from "../styles";
import AnonymousHotSurfaceDanger from "../assets/Anonymous-hot-surface-danger.svg";

const boxes = new Array(10).fill(null).map((v, i) => i + 1);

export default function Think() {

    const [modalVisible, setModalVisible] = useState(false);

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
    );

    return (
        <>
            <>
                <View style={styles.pictoContainer}>
                    <StatusBar hidden={false} />
                    {boxes.map((i) => (
                        <View key={i}>
                            <Pressable
                                onPress={toggleModal}
                                style={({ pressed }) => [
                                    styles.box,
                                    pressed && styles.pressedBox,
                                ]}
                            >
                                <AnonymousHotSurfaceDanger fill="blue" />
                            </Pressable>
                            <Modal animationType="fade" transparent={true} visible={modalVisible}>{modalContent}</Modal>
                        </View>
                    ))}
                </View>
                <View style={styles.buttonContainer}>
                    <View>
                        <Button
                            title="précédent"
                            color="#6200ee" // Optional: customize button color
                            accessibilityLabel="Learn more about this button"
                        />
                    </View>
                    <View>
                        <Button
                            title="suivant"
                            color="#6200ee" // Optional: customize button color
                            accessibilityLabel="Learn more about this button"
                        />
                    </View>
                </View>
            </>
        </>
    );
}