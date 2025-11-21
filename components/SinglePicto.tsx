import { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, StatusBar, Pressable, Modal, Button, Alert, Image, Platform } from "react-native";
import styles from "../styles";
import AnonymousHotSurfaceDanger from "../assets/Anonymous-hot-surface-danger.svg";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DatabaseContext, RootStackParamList } from "../context";
import { Text, useTheme } from "react-native-paper";
import { imagePathMapping } from "../utils/imagePathMapping";

type Props = NativeStackScreenProps<RootStackParamList, 'SinglePicto'>;

export default function SinglePicto({ navigation, route }: Props) {

    const { question } = route.params;

    const theme = useTheme();

    const toko5Repository = useContext(DatabaseContext);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // const getAllThinkQuestions = async () => {
        //     try {
        //         setLoading(true);
        //         if (toko5Repository !== null) {
        //             let list = await toko5Repository.getAllCategorieQuestion(QUESTION_CATEGORIES.EPI);
        //             setListQuestion(list);
        //             //console.log(list)
        //         }
        //     } catch (error) {
        //         console.error('Error in the component while retrieving the questions ', error);
        //     } finally {
        //         setLoading(false);
        //     }
        // };

        // getAllThinkQuestions();
    }, []);

    return (
        <>
            <StatusBar hidden={false} />
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center', // Changed from 'flex-start'
                    gap: 40,
                    backgroundColor: 'ghostwhite',
                    ...Platform.select({
                        ios: { paddingTop: 40 },
                        android: { paddingTop: StatusBar.currentHeight }
                    }),
                }}
            >
                <View>
                    <Image source={imagePathMapping(question.pictogramme)} style={{ width: 150, height: 150 }}></Image>
                </View>
                <View>
                    <Text variant="displaySmall">[Description]</Text>
                </View>
            </View>
        </>
    );
}