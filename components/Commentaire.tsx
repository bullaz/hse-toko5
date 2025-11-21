import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DatabaseContext, RootStackParamList } from "../context";
import { View } from "react-native";
import { ActivityIndicator, Button, Checkbox, Divider, Text, useTheme } from "react-native-paper";
import styles from "../styles";
import { useContext, useEffect, useState } from "react";
import { QUESTION_CATEGORIES } from "../constants/questionTypes";



type Props = NativeStackScreenProps<RootStackParamList>;

export default function Commentaire({ navigation }: Props) {

    const theme = useTheme();

    const toko5Repository = useContext(DatabaseContext);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
                </View>)}
        </>
    )
}