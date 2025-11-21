import { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, StatusBar, Pressable, Modal, Alert, Image } from "react-native";
import styles from "../styles";
import AnonymousHotSurfaceDanger from "../assets/Anonymous-hot-surface-danger.svg";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DatabaseContext, RootStackParamList } from "../context";
import { ActivityIndicator, Checkbox, MD3Colors } from 'react-native-paper';
import { IconButton } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { Button, Text } from "react-native-paper";
import { QUESTION_CATEGORIES } from "../constants/questionTypes";
import { imagePathMapping } from "../utils/imagePathMapping";


////one time from epi press that top button to go back here the buttons precedent and suivant was right below those pictograms not at the end of the screen ... FIND WHY

const boxes = new Array(10).fill(null).map((v, i) => i + 1);

type Props = NativeStackScreenProps<RootStackParamList>;

export default function IdentifyRisks({ navigation }: Props) {

    const [isChecked, setChecked] = useState(false);

    const theme = useTheme();

    const handleCheckBoxPress = () => {
        const newChecked = !isChecked;
        setChecked(!isChecked);
        if (newChecked) {
            navigation.navigate('ControlMeasure')
        }
    };

    const [listQuestion, setListQuestion] = useState<any>([]);

    const toko5Repository = useContext(DatabaseContext);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAllThinkQuestions = async () => {
            try {
                setLoading(true);
                if (toko5Repository !== null) {
                    let list = await toko5Repository.getAllCategorieQuestion(QUESTION_CATEGORIES.RISKS);
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
                    {listQuestion.map((question: any, index: string) => (
                        <View key={question.question_id} style={styles.single}>
                            <Pressable
                                onPress={() => navigation.navigate('SinglePicto', { question: question })}
                                style={({ pressed }) => [
                                    styles.box,
                                    pressed && styles.pressedBox,
                                ]}
                            >
                                <Image source={imagePathMapping(question.pictogramme)} style={{ width: 80, height: 80 }}></Image>
                            </Pressable>

                            {(question.nom !== 'autre') ?
                                (
                                    <View style={styles.checkboxContainer}>
                                        <Checkbox
                                            status={isChecked ? 'checked' : 'unchecked'}
                                            onPress={handleCheckBoxPress}
                                        />
                                    </View>
                                ) : (
                                    <View style={styles.checkboxContainer}>
                                        <Checkbox
                                            status={isChecked ? 'checked' : 'unchecked'}
                                            onPress={handleCheckBoxPress}
                                        />
                                    </View>
                                )}
                        </View>
                    ))}
                </View>
            )}
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