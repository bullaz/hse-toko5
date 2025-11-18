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

const boxes = new Array(8).fill(null).map((v, i) => i + 1);

type Props = NativeStackScreenProps<RootStackParamList>;

export default function Organise2({ navigation }: Props) {

    const [isChecked, setChecked] = useState(false);

    const theme = useTheme();

    return (
        <>
            <View style={styles.pictoContainer}>
                <StatusBar hidden={false} />
                {boxes.map((i) => (
                    <View key={i} style={styles.single}>
                        <Pressable
                            onPress={() => navigation.navigate('SinglePicto')}
                            style={({ pressed }) => [
                                styles.box,
                                pressed && styles.pressedBox,
                            ]}
                        >
                            {/*<Image source={require('../assets/pictogram/test.jpg')} style={{ width: 100, height: 100 }}></Image>*/}
                            <AnonymousHotSurfaceDanger fill="blue" />
                        </Pressable>
                        <View style={styles.checkboxContainer}> 
                            <Checkbox value={isChecked} onValueChange={setChecked} />
                        </View>
                    </View>
                ))}
            </View>
            <View style={styles.buttonContainer}>
                <View>
                    <Button style={styles.bottomButton}
                        mode="contained"
                        onPress={() => {navigation.navigate('Organise1') }}
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
                        onPress={() => { navigation.navigate('IdentifyRisks') }}
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