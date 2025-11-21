import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DatabaseContext, RootStackParamList } from "../context";
import { Pressable, View, StyleSheet, Platform, Image } from "react-native";
import { ActivityIndicator, Button, Checkbox, Divider, Text, useTheme } from "react-native-paper";
import styles from "../styles";
import { useContext, useEffect, useState } from "react";
import { QUESTION_CATEGORIES } from "../constants/questionTypes";
import { CameraView, useCameraPermissions } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { imagePathMapping } from "../utils/imagePathMapping";



type Props = NativeStackScreenProps<RootStackParamList>;

export default function ScanQr({ navigation }: Props) {

    const theme = useTheme();

    const toko5Repository = useContext(DatabaseContext);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // const getAllSafetyQuestions = async () => {
        //     try {
        //         setLoading(true);
        //         if (toko5Repository !== null) {
        //             let list = await toko5Repository.getAllCategorieQuestion(QUESTION_CATEGORIES.SAFETY);
        //             setListQuestion(list);
        //             //console.log(list)
        //         }
        //     } catch (error) {
        //         console.error('Error in the component think while retrieving list of questions ', error);
        //     } finally {
        //         setLoading(false);
        //     }
        // };

        // getAllSafetyQuestions();
    }, []);

    return (
        <View style={styleSheet.container}>
            <View>
                <Image source={require('../assets/qr.png')} style={{ width: 270, height: 270 }}></Image>
            </View>
            <SafeAreaView style={styleSheet.container}>

                {Platform.OS === "android" ? <StatusBar hidden /> : null}

                <CameraView
                    style={styleSheet.camStyle}
                    facing="back"
                    barcodeScannerSettings={{
                        barcodeTypes: ['qr']
                    }}

                    onBarcodeScanned={
                        ({ data }) => {
                            console.log(data); // here you can get your barcode id or url
                        }
                    }
                />

            </SafeAreaView>
        </View>
    );

}

const styleSheet = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingTop: 30
    },
    camStyle: {
        position: 'absolute',
        width: 290,
        height: 300,
        borderRadius: 50,
    }
});