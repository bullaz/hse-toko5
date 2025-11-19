import { useState } from "react";
import { View, TouchableOpacity, StatusBar, Pressable, Modal, Alert, Image } from "react-native";
import styles from "../styles/epiStyle";
import AnonymousHotSurfaceDanger from "../assets/Anonymous-hot-surface-danger.svg";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import Checkbox from "expo-checkbox";
import { IconButton } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { Button, Text } from "react-native-paper";
import globalStyles from "../styles"

const boxes = new Array(7).fill(null).map((v, i) => i + 1);

type Props = NativeStackScreenProps<RootStackParamList>;

export default function Epi({ navigation }: Props) {

    const [isChecked, setChecked] = useState(false);

    const theme = useTheme();

    return (
        <>
            <View style={styles.container}>
                <StatusBar hidden={false} />
                {boxes.map((i) => (
                    <View key={i} style={styles.singleEpi}>
                        <Pressable
                            onPress={() => navigation.navigate('SinglePicto')}
                            style={({ pressed }) => [
                                styles.box,
                                pressed && styles.pressedBox,
                            ]}
                        >
                            <Image source={require('../assets/pictogram/epi/mask.png')} style={{ width: 100, height: 100 }}></Image>
                        </Pressable>
                        <View style={styles.checkboxContainer}> 
                            <Checkbox value={isChecked} onValueChange={setChecked} />
                        </View>
                    </View>
                ))}
            </View>
            <View style={styles.buttonContainer}>
                <View>
                    <Button style={globalStyles.bottomButton}
                        mode="contained"
                        onPress={() => { navigation.navigate('IdentifyRisks')}}
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
                    <Button style={globalStyles.bottomButton}
                        mode="contained"
                        onPress={() => {navigation.navigate('Fitness') }}
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