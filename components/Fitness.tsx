import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DatabaseContext, RootStackParamList } from "../context";
import { Image, View } from "react-native";
import { ActivityIndicator, Button, Checkbox, Divider, Modal, PaperProvider, Portal, Text, useTheme } from "react-native-paper";
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

    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

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
                <PaperProvider>
                    <Portal>
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
                                    <Divider style={{ height: '0.5%', backgroundColor: 'black' }} />
                                </View>
                            ))}

                            <Button style={{
                                width: 220,
                                borderRadius: 5,
                                backgroundColor: theme.colors.primary
                            }}
                                mode="contained"
                                onPress={showModal}
                                icon="check-circle-outline"
                                contentStyle={{ flexDirection: 'row-reverse' }}
                                labelStyle={{
                                    color: theme.colors.secondary, // Manually set to theme contrast color
                                    fontSize: 16
                                }}
                            >

                                J'ai fini mon toko5
                            </Button>


                            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalStyle}>
                                <View style={{
                                    flex: 1,
                                    flexWrap: 'wrap',
                                    flexDirection: 'column',
                                    justifyContent: 'space-around',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    gap: 20
                                }}>
                                    <View>
                                        <Image source={require('../assets/pictogram/success.png')} style={{ width: 150, height: 150 }}></Image>
                                    </View>

                                    <Text
                                        style={{ textAlign: "center"}}
                                        variant="titleMedium"
                                    >
                                        Merci d'avoir pris le temps de finir votre toko5 !!!
                                    </Text>

                                    <Button style={{
                                        width: "75%",
                                        borderRadius: 5,
                                        backgroundColor: "rgba(26, 85, 161, 0.87)"
                                    }}
                                        mode="contained"
                                        icon="home"
                                        onPress={() => {
                                            navigation.navigate('Recent')
                                        }}

                                        //test qr
                                        //onPress = {requestPermission}
                                        //onPress = {() => {navigation.navigate('ScanQr')}}

                                        contentStyle={{ flexDirection: 'row-reverse' }}
                                        labelStyle={{
                                            color: theme.colors.secondary, // Manually set to theme contrast color
                                            fontSize: 16
                                        }}
                                    >
                                        revenir a l'accueil
                                    </Button>

                                </View>
                            </Modal>

                        </View>
                    </Portal>
                </PaperProvider>
            )}
        </>
    )
}