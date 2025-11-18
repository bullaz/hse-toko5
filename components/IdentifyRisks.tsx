import { useState } from "react";
import { View, TouchableOpacity, StatusBar, Pressable, Modal, Alert, Image } from "react-native";
import styles from "../styles";
import AnonymousHotSurfaceDanger from "../assets/Anonymous-hot-surface-danger.svg";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { Checkbox } from 'react-native-paper';
import { IconButton } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { Button, Text } from "react-native-paper";

const boxes = new Array(10).fill(null).map((v, i) => i + 1);

type Props = NativeStackScreenProps<RootStackParamList>;

export default function IdentifyRisks({ navigation }: Props) {

    const [isChecked, setChecked] = useState(false);

    const theme = useTheme();

    const handleCheckBoxPress = () => {
        const newChecked = !isChecked;
        setChecked(!isChecked);
        if (newChecked){
            navigation.navigate('ControlMeasure')
        }
    };

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
                            <Image source={require('../assets/pictogram/electricity.png')} style={{ width: 100, height: 100 }}></Image>
                        </Pressable>
                        <View style={styles.checkboxContainer}>
                            <Checkbox
                                status={isChecked ? 'checked' : 'unchecked'}
                                onPress={handleCheckBoxPress}
                            />
                        </View>
                    </View>
                ))}
            </View>
            <View style={styles.buttonContainer}>
                <View>
                    <Button style={styles.bottomButton}
                        mode="contained"
                        onPress={() => { navigation.navigate('Organise2') }}
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
                        onPress={() => { navigation.navigate('Epi') }}
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