import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DatabaseContext, RootStackParamList } from "../context";
import { View } from "react-native";
import { ActivityIndicator, Button, Checkbox, Divider, Text, useTheme } from "react-native-paper";
import styles from "../styles";
import { useContext, useEffect, useState } from "react";
import { QUESTION_CATEGORIES } from "../constants/questionTypes";



type Props = NativeStackScreenProps<RootStackParamList>;

export default function Fitness({ navigation }: Props) {

    const [isChecked, setChecked] = useState(false);

    const theme = useTheme();

    const [listQuestion, setListQuestion] = useState<any>([]);

    const toko5Repository = useContext(DatabaseContext);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAllSafetyQuestions = async () => {
            try {
                setLoading(true);
                if (toko5Repository !== null) {
                    let list = await toko5Repository.getAllCategorieQuestion(QUESTION_CATEGORIES.SAFETY);
                    setListQuestion(list);
                    //console.log(list)
                }
            } catch (error) {
                console.error('Error in the component think while retrieving list of questions ', error);
            } finally {
                setLoading(false);
            }
        };

        getAllSafetyQuestions();
    }, []);

    return (

        <>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                </View>
            ) : (
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    padding: 20
                }}>
                    {listQuestion.map((question: any, index: number) => (
                        <View style={{ gap: 10 }} key={question.question_id}>
                            <Text style={{ textAlign: 'center', }} variant="titleMedium">{question.nom}</Text>
                            <View style={styles.checkboxContainer}>
                                <Checkbox
                                    status={isChecked ? 'checked' : 'unchecked'}
                                    onPress={() => { }}
                                />
                            </View>
                            <Divider style={{height:'0.5%', backgroundColor: 'black'}}/>
                        </View>
                    ))}
                </View>)}
        </>
    )
}