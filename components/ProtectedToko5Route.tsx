import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useValidity } from "../hooks/useValidity";
import { useCallback, useContext } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DatabaseContext, RootStackParamList, Toko5, Toko5Json } from "../context";
import { View } from "react-native";
import styles from "../styles";
import { useTheme } from "react-native-paper";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ProtectedToko5Route: React.FC<{
    toko5Id: string;
    children: React.ReactNode;
}> = ({ toko5Id, children }) => {
    const { validity, validityLoading, attemptNumber } = useValidity(toko5Id);
    const navigation = useNavigation<NavigationProp>();
    const theme = useTheme();
    const toko5Repository = useContext(DatabaseContext);

    useFocusEffect(
        useCallback(() => {
            if (validity === false) {
                navigation.navigate('Invalide',{toko5Id: toko5Id, attemptNumber: attemptNumber});
            }
            return () => {
            };
        }, [validity, navigation])
    );

    // useEffect(() => {
    //     if (isValid === false) {
    //         navigation.navigate('Invalide');
    //     }
    // }, [isValid, navigation]);

    if (validity === null) return null; /// just test what happen

    if (validity === false) return (
        <View style={styles.loadingContainer}>
            {/* <ActivityIndicator size="large" color={theme.colors.primary} /> */}
        </View>
    );


    if (validity) return <>{children}</>;

};