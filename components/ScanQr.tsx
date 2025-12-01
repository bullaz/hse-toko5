import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DatabaseContext, RootStackParamList } from "../context";
import { View, StyleSheet, Platform, Image, StatusBar } from "react-native";
import { useTheme } from "react-native-paper";
//import styles from "../styles";
import { useContext, useEffect, useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";



type Props = NativeStackScreenProps<RootStackParamList>;

export default function ScanQr({ navigation }: Props) {

    const theme = useTheme();

    const toko5Repository = useContext(DatabaseContext);

    const [loading, setLoading] = useState(true);

    //BELOW to add in the component that will navigate to this qr code 
    // const [permission, requestPermission] = useCameraPermissions();

    // const isPermissionGranted = Boolean(permission?.granted);
    ////////component

    useEffect(() => {
    }, []);

    return (
        <>
            <StatusBar hidden={false} backgroundColor="black" />
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
        </>
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