import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Button,
  Pressable,
  TouchableOpacity,
  Modal,
} from "react-native";
import styles from "./styles";
import AnonymousHotSurfaceDanger from "./assets/Anonymous-hot-surface-danger.svg";
import { useState } from "react";

const boxes = new Array(10).fill(null).map((v, i) => i + 1);

export default function App() {
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
            <Modal animationType="slide" transparent={true} visible={modalVisible}>{modalContent}</Modal>
          </View>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <View>
          <Button
            title="précédent"
            color="#841584" // Optional: customize button color
            accessibilityLabel="Learn more about this button"
          />
        </View>
        <View>
          <Button
            title="suivant"
            color="#841584" // Optional: customize button color
            accessibilityLabel="Learn more about this button"
          />
        </View>
      </View>
    </>
  );
}
