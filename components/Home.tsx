import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../context";
import { Button, Text, useTheme } from "react-native-paper";
import { StatusBar, View } from "react-native";
import styles from '../styles/homeStyle';

type Props = NativeStackScreenProps<RootStackParamList>;

export default function Home({ navigation }: Props) {

    const theme = useTheme();

    return (
        <>
            <StatusBar hidden={false} backgroundColor="black" />
            <View style={styles.container}>

                <View style={{ flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                    <Text style={{fontSize:80,fontStyle: 'italic', fontWeight: 'bold', color: '#4d4848ff'}}>TOKO 5</Text>
                    <Text variant="headlineSmall">Protège / Miaro / Protect</Text>
                </View>


                <View style={{ flex:1, flexDirection: 'column', width: '100%',justifyContent: 'center', alignItems: 'center', gap: 20 }}>
                    <Button style={styles.bottomButton}
                        mode="contained"
                        contentStyle={{ flexDirection: 'row-reverse' }}
                        labelStyle={{
                            color: theme.colors.secondary, // Manually set to theme contrast color
                            fontSize: 16
                        }}
                        onPress={() => { navigation.navigate('Recent')}}
                    >
                        CONTRACTANT
                    </Button>
                    <Button style={styles.bottomButton}
                        mode="contained"
                        contentStyle={{ flexDirection: 'row-reverse' }}
                        labelStyle={{
                            color: theme.colors.secondary, // Manually set to theme contrast color
                            fontSize: 16
                        }}
                        onPress={() => { navigation.navigate('LoginSup')}}
                    >
                        SUPERVISEUR
                    </Button>
                </View>
            </View>
        </>
    )
}