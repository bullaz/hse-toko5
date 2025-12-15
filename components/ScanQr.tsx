import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DatabaseContext, RootStackParamList } from "../context";
import { View, StyleSheet, Platform, Image, StatusBar, Dimensions, TouchableOpacity, Alert } from "react-native";
import { ActivityIndicator, Button, Dialog, Icon, PaperProvider, Text, useTheme } from "react-native-paper";
//import styles from "../styles";
import { useContext, useEffect, useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { BACKEND_URL } from "../constants/commonConstants";
import globalStyles from "../styles";

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList>;

export default function ScanQr({ navigation }: Props) {

    //     const theme = useTheme();

    //     const toko5Repository = useContext(DatabaseContext);

    //     const [loading, setLoading] = useState(true);

    //     //BELOW to add in the component that will navigate to this qr code 
    //     // const [permission, requestPermission] = useCameraPermissions();

    //     // const isPermissionGranted = Boolean(permission?.granted);
    //     ////////component

    //     useEffect(() => {
    //     }, []);

    //     return (
    //         <>
    //             <StatusBar hidden={false} backgroundColor="black" />
    //             <View style={styleSheet.container}>
    //                 <View>
    //                     <Image source={require('../assets/qr.png')} style={{ width: 270, height: 270 }}></Image>
    //                 </View>
    //                 <SafeAreaView style={styleSheet.container}>

    //                     {Platform.OS === "android" ? <StatusBar hidden /> : null}

    //                     <CameraView
    //                         style={styleSheet.camStyle}
    //                         facing="back"
    //                         barcodeScannerSettings={{
    //                             barcodeTypes: ['qr']
    //                         }}

    //                         onBarcodeScanned={
    //                             ({ data }) => {
    //                                 console.log(data); // here you can get your barcode id or url
    //                             }
    //                         }
    //                     />

    //                 </SafeAreaView>
    //             </View>
    //         </>
    //     );

    // }

    // const styleSheet = StyleSheet.create({
    //     container: {
    //         flex: 1,
    //         flexDirection: 'column',
    //         alignItems: 'center',
    //         justifyContent: 'space-evenly',
    //         paddingTop: 30
    //     },
    //     camStyle: {
    //         position: 'absolute',
    //         width: 290,
    //         height: 300,
    //         borderRadius: 50,
    //     }
    // });
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [torchOn, setTorchOn] = useState(false);
    const [scannedData, setScannedData] = useState<string | null>();
    const [loading, setLoading] = useState<boolean>(true);
    const [toko5State, setToko5State] = useState<string>();

    const [visible, setVisible] = useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => {
        setVisible(false);
        setLoading(true);
    } 

    const theme = useTheme();

    if (!permission) {
        return <View />; // Loading
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <TouchableOpacity style={styles.button} onPress={requestPermission}>
                    <Text style={styles.buttonText}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const handleBarCodeScanned = async ({ data }: { data: string }) => {
        if (!scanned) {
            setVisible(true);
            setScanned(true);
            setScannedData(data);
            try {
                const response = await axios.get(`${BACKEND_URL}/toko5s/toko5/${data}`);
                //console.log('response data:', response.data);
                setToko5State(response.data.etat);
                setLoading(false);
            } catch (error) {
                console.log('error fetching toko5 data:', error);
                //setVisible(false);
            } finally {
                setScanned(false);
            }
            // Alert.alert(
            //     'TOKO 5 scanné',
            //     `Data: ${data}`,
            //     [
            //         {
            //             text: 'Scanner un autre',
            //             onPress: () => {
            //                 setScanned(false);
            //                 setScannedData(null);
            //             },
            //         },
            //         {
            //             text: 'OK',
            //             onPress: () => {
            //                 // Handle the scanned data (e.g., navigate to another screen)
            //                 console.log('data scanné:', data);
            //             },
            //         },
            //     ]
            // );
        }
    };

    const toggleTorch = () => {
        setTorchOn(!torchOn);
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                {/* CameraView WITHOUT children */}
                <CameraView
                    style={StyleSheet.absoluteFillObject}
                    facing="back"
                    onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                    barcodeScannerSettings={{
                        barcodeTypes: ['qr', 'pdf417', 'ean13', 'code128'],
                    }}
                    enableTorch={torchOn}
                />

                {/* Overlay as absolute positioned sibling */}
                <View style={styles.overlay}>
                    {/* Top text */}
                    <View style={styles.topOverlay}>
                        {/* <Text style={styles.instructionText}>Scanner un TOKO 5</Text> */}
                        <Text style={styles.subText}>Positionnez le code QR dans le cadre</Text>
                    </View>

                    {/* Scan frame */}
                    <View style={styles.middleOverlay}>
                        <View style={styles.frameContainer}>

                            <View style={styles.cornerTopLeft} />
                            <View style={styles.cornerTopRight} />
                            <View style={styles.cornerBottomLeft} />
                            <View style={styles.cornerBottomRight} />


                            {/* <View style={styles.scanLine} /> */}
                        </View>
                    </View>

                    {/* Bottom text */}
                    <View style={styles.bottomOverlay}>
                        {scanned && (
                            <Text style={styles.bottomText}>
                                Code scanné! Appuyez pour réessayer
                            </Text>
                        )}
                    </View>

                    {/* Controls */}
                    <View style={styles.controls}>
                        <TouchableOpacity style={styles.controlButton} onPress={toggleTorch}>
                            <Icon
                                source={torchOn ? "flash" : "flash-outline"}
                                size={30}
                                color="white"
                            />
                            <Text style={styles.controlText}>{torchOn ? 'Flash On' : 'Flash Off'}</Text>
                        </TouchableOpacity>

                        {/* {scanned && (
                            <TouchableOpacity
                                style={styles.scanAgainButton}
                                onPress={handleScanAgain}
                            >
                                <Icon name="qrcode-scan" size={30} color="white"/>
                                <Text style={styles.controlText}>Scan Again</Text>
                            </TouchableOpacity>
                        )} */}
                    </View>
                </View>
            </View>

            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>
                    <Text style={{ color: '#444444ff', fontSize: 20, fontWeight: 'bold' }}>
                        {loading ? ("Scan Toko 5...") : ("Scan Toko 5")}
                    </Text>
                </Dialog.Title>
                <Dialog.Content>
                    {loading ? (
                        <ActivityIndicator size="large" color={theme.colors.primary} />
                    ) : (
                        <Text style={{ fontSize: 20 }}>Ce toko5 est {toko5State}</Text>
                    )}
                </Dialog.Content>
                <Dialog.Actions>
                    {loading ? (
                        <Button onPress={hideDialog}>Annuler</Button>
                    ) : (
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Button onPress={hideDialog} labelStyle={{fontSize: 16}}>plus de details</Button>
                            <Button onPress={hideDialog} labelStyle={{fontSize: 16}}>commenter</Button>
                        </View>
                    )}
                </Dialog.Actions>
            </Dialog>
        </PaperProvider >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        position: 'relative',
    },
    camera: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',
    },
    topOverlay: {
        position: 'absolute',
        top: 60,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    instructionText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
        textAlign: 'center',
    },
    subText: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
    },
    middleOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    frameContainer: {
        width: width * 0.7,
        height: width * 0.7,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        backgroundColor: 'transparent',
        position: 'relative',
    },
    cornerTopLeft: {
        position: 'absolute',
        top: -2,
        left: -2,
        width: 40,
        height: 40,
        borderTopWidth: 4,
        borderLeftWidth: 4,
        borderColor: '#ffffffff',
    },
    cornerTopRight: {
        position: 'absolute',
        top: -2,
        right: -2,
        width: 40,
        height: 40,
        borderTopWidth: 4,
        borderRightWidth: 4,
        borderColor: '#ffffffff',
    },
    cornerBottomLeft: {
        position: 'absolute',
        bottom: -2,
        left: -2,
        width: 40,
        height: 40,
        borderBottomWidth: 4,
        borderLeftWidth: 4,
        borderColor: '#ffffffff',
    },
    cornerBottomRight: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        width: 40,
        height: 40,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderColor: '#ffffffff',
    },
    // scanLine: {
    //     height: 2,
    //     width: '100%',
    //     backgroundColor: '#00ff00',
    //     position: 'absolute',
    //     top: '50%',
    //     shadowColor: '#00ff00',
    //     shadowOffset: { width: 0, height: 0 },
    //     shadowOpacity: 1,
    //     shadowRadius: 10,
    // },
    bottomOverlay: {
        position: 'absolute',
        bottom: 150,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    bottomText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 10,
    },
    controls: {
        position: 'absolute',
        bottom: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
    },
    controlButton: {
        alignItems: 'center',
        padding: 10,
    },
    controlText: {
        color: 'white',
        marginTop: 5,
        fontSize: 12,
    },
    scanAgainButton: {
        alignItems: 'center',
        padding: 10,
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
        color: 'white',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#0066cc',
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});