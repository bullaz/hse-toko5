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
import { QUESTION_CATEGORIES } from "../constants/questionTypes";
import { imagePathMapping } from "../utils/imagePathMapping";

type Props = NativeStackScreenProps<RootStackParamList>;

export default function Organise1({ navigation }: Props) {

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
                    let list = await toko5Repository.getAllRequiredOrganise();
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

    return (
        <>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                </View>
            ) : (
                <View style={styles.pictoContainer}>
                    <StatusBar hidden={false} />
                    {listQuestion.map((question: any, index: number) => (
                        <View key={question.question_id} style={styles.single}>
                            <Pressable
                                onPress={() => navigation.navigate('SinglePicto',{question: question})}
                                style={({ pressed }) => [
                                    styles.box,
                                    pressed && styles.pressedBox,
                                ]}
                            >
                                <Image source={imagePathMapping(question.pictogramme)} style={{ width: 80, height: 80 }}></Image>
                            </Pressable>
                            <View style={styles.checkboxContainer}>
                                <Checkbox value={isChecked} onValueChange={setChecked} />
                            </View>
                        </View>
                    ))}
                </View>
            )}
            <View style={styles.buttonContainer}>
                <View>
                    <Button style={styles.bottomButton}
                        mode="contained"
                        onPress={() => { navigation.navigate('Think') }}
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
                        onPress={() => { navigation.navigate('Organise2') }}
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