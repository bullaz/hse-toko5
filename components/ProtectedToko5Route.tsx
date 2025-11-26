import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useValidity } from "../hooks/useValidity";
import { useCallback } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../context";
import { View } from "react-native";
import styles from "../styles";
import { ActivityIndicator, useTheme } from "react-native-paper";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ProtectedToko5Route: React.FC<{
    toko5Id: string;
    children: React.ReactNode;
}> = ({ toko5Id, children }) => {
    const { validity, validityLoading } = useValidity(toko5Id);
    const navigation = useNavigation<NavigationProp>();
    const theme = useTheme();

    useFocusEffect(
        useCallback(() => {
            if (validity === false) {
                navigation.navigate('Invalide');
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