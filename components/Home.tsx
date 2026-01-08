import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../context";
import { Button, Divider, Icon, PaperProvider, Text, useTheme } from "react-native-paper";
import { Image, ImageBackground, StatusBar, View } from "react-native";
import styles from '../styles/homeStyle';

type Props = NativeStackScreenProps<RootStackParamList>;

export default function Home({ navigation }: Props) {

    const theme = useTheme();

    return (
        <>
            <PaperProvider>
                <StatusBar hidden={false} backgroundColor="black" />
                <View style={styles.container}>

                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignContent: 'center', paddingTop: 20 }}>
                        {/* <ImageBackground
                            source={require('../assets/pictogram/work-safety.png')} // Replace with your image path
                            resizeMode="contain" // or "cover" depending on your preference
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%', // Adjust width as needed
                                height: '100%', // Adjust height as needed
                            }}
                            imageStyle={{
                                // Control the opacity of the image if needed
                                opacity: 0.7,
                                // Position the image to align with "OKO"
                                resizeMode: 'contain',
                            }}
                        >
                            <Text style={{ fontSize: 80, fontStyle: 'italic', fontWeight: 'bold', color: "rgba(24, 82, 158, 0.88)" }}>TOKO 5</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <Text variant="headlineSmall" style={{}}>Protège / Miaro / Protect</Text>
                                <Icon source={require('../assets/pictogram/work-safety2.png')} size={35} color={theme.colors.primary} />
                            </View>
                        </ImageBackground> */}
                        <Image
                            source={require('../assets/pictogram/work-safety.png')} // Replace with your image path
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%', // Adjust width as needed
                                height: 200, // Adjust height as needed
                            }}
                        />
                        <Text style={{ fontSize: 80, fontStyle: 'italic', fontWeight: 'bold', color: "rgba(24, 82, 158, 0.88)" }}>TOKO 5</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                            <Text variant="headlineSmall" style={{ fontWeight: 'bold', color: 'rgba(94, 94, 94, 0.87)' }}>Protège / Miaro / Protect</Text>
                            <Icon source={require('../assets/pictogram/work-safety2.png')} size={25} color={theme.colors.primary} />
                        </View>
                    </View>


                    <View style={{ flex: 1, flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
                        <Button style={styles.bottomButton}
                            mode="elevated"
                            contentStyle={{
                                flexDirection: 'row',
                                backgroundColor: theme.colors.primary
                            }}
                            labelStyle={{
                                color: theme.colors.secondary, // Manually set to theme contrast color
                                fontSize: 16
                            }}
                            onPress={() => { navigation.navigate('Recent') }}
                            //icon="account-hard-hat"
                            icon={({ size, color }) => (
                                <Icon source="account-hard-hat" size={23} color="ghostwhite" />
                            )}
                        >
                            INTERVENANT
                        </Button>
                        <Button style={styles.bottomButton}
                            mode="elevated"
                            contentStyle={{
                                flexDirection: 'row',
                                backgroundColor: theme.colors.primary
                            }}
                            labelStyle={{
                                color: theme.colors.secondary,
                                fontSize: 16
                            }}
                            onPress={() => { navigation.navigate('LoginSup') }}
                            icon={({ size, color }) => (
                                <Icon source="account-supervisor-circle" size={27} color="ghostwhite" />
                            )}
                        >
                            SUPERVISEUR
                        </Button>
                        <Button style={{ borderWidth: 0}}
                                mode="contained"
                                contentStyle={{
                                    flexDirection: 'row-reverse',
                                    backgroundColor: 'white',
                                    // flexDirection: 'row-reverse'
                                }}
                                labelStyle={{
                                    color: "rgba(70, 70, 70, 0.87)",
                                    fontSize: 16
                                }}
                                onPress={() => { navigation.navigate('LoginSup') }}
                                icon={({ size, color }) => (
                                    <Icon source="chevron-down" size={27} color="rgba(70, 70, 70, 0.87)" />
                                )}
                            >
                                Français
                            </Button>
                        {/* <View style={{ flex: 1, flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
                            <Button style={{ borderWidth: 0 }}
                                mode="contained"
                                contentStyle={{
                                    flexDirection: 'row-reverse',
                                    backgroundColor: 'ghostwhite',
                                    // flexDirection: 'row-reverse'
                                }}
                                labelStyle={{
                                    color: theme.colors.secondary,
                                    fontSize: 16
                                }}
                                onPress={() => { navigation.navigate('LoginSup') }}
                                icon={({ size, color }) => (
                                    <Icon source="chevron-down" size={27} color="ghostwhite" />
                                )}
                            >
                                Français
                            </Button>
                        </View> */}
                    </View>
                </View>
            </PaperProvider>
        </>
    )
}