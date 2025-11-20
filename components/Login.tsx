import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { Button, Text, useTheme } from "react-native-paper";
import { StatusBar, View } from "react-native";
import styles from "../styles/loginStyle";
import { TextInput } from "react-native-paper";
import { useState } from "react";

type Props = NativeStackScreenProps<RootStackParamList>;

export default function Login({ navigation }: Props) {
    const theme = useTheme();
    const [text, setText] = useState("");
    return (
        <>
            <View style={styles.container}>
                <StatusBar hidden={false} />
                <View style={styles.loginDiv}>
                    <Text variant='titleLarge' style={{ fontWeight: 'bold', color: 'rgba(68, 66, 68, 0.87)' }}>Identifiez-vous</Text>
                    <TextInput
                        left={<TextInput.Icon icon={require('../assets/pictogram/worker-icon.png')} />}
                        label="Nom et prenom"
                        value={text}
                        style={styles.textInput}
                        onChangeText={text => setText(text)}
                        underlineColor='darkgrey'
                    />
                    <TextInput
                        left={<TextInput.Icon icon={require('../assets/pictogram/permis.png')} />}
                        label="ID permis de travail"
                        value={text}
                        style={styles.textInput}
                        onChangeText={text => setText(text)}
                        underlineColor='darkgrey'
                    />
                    <Button style={styles.bottomButton}
                        mode="contained"
                        onPress={() => { navigation.navigate('Organise1') }}
                        contentStyle={{ flexDirection: 'row-reverse' }}
                        labelStyle={{
                            color: theme.colors.secondary, // Manually set to theme contrast color
                            fontSize: 16
                        }}
                    >
                        s'identifier
                    </Button>
                </View>
            </View>
        </>
    )
}