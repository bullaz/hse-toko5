import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../context";
import { Button, Checkbox, Divider, Icon, PaperProvider, Text, useTheme } from "react-native-paper";
import { Image, ImageBackground, StatusBar, View, SafeAreaView } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import styles from '../styles/homeStyle';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef } from "react";
import { useAppTranslation } from '../contexts/TranslationContext';
import { LanguageCode } from "../translations/translations";

type Props = NativeStackScreenProps<RootStackParamList>;

export default function Home({ navigation }: Props) {

    const theme = useTheme();

    const { t, language, changeLanguage } = useAppTranslation();

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // Snap points for the bottom sheet
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleLanguageSelect = useCallback((selectedLanguage: LanguageCode) => {
        changeLanguage(selectedLanguage);
        bottomSheetModalRef.current?.dismiss();
    }, [changeLanguage]);

    // Get current language display name
    const getCurrentLanguageName = useCallback(() => {
        switch (language) {
            case 'fr': return t('common.french');
            case 'en': return t('common.english');
            case 'mg': return t('common.malagasy');
            default: return t('common.french');
        }
    }, [language, t]);

    return (
        <>
            <PaperProvider>
                <GestureHandlerRootView style={styles.container}>
                    <BottomSheetModalProvider>
                        <StatusBar hidden={false} backgroundColor="black" />
                        <SafeAreaProvider style={{ flex: 1 }}>
                            <View style={{ flex: 1 }}>
                                {/* Top content */}
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 20, marginTop:15 }}>
                                    <Image
                                        source={require('../assets/pictogram/work-safety.png')}
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '100%',
                                            height: 200,
                                        }}
                                    />
                                    <Text style={{ fontSize: 80, fontStyle: 'italic', fontWeight: 'bold', textAlign: 'center', color: "rgba(24, 82, 158, 0.88)" }}>{t("common.appName")}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                        <Text variant="headlineSmall" style={{ color: 'rgba(94, 94, 94, 0.87)',fontFamily:'sans-serif-medium' }}>Protège / Miaro / Protect</Text>
                                        <Icon source={require('../assets/pictogram/take5.png')} size={25} color={theme.colors.primary} />
                                    </View>
                                </View>

                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
                                    <Button
                                        style={styles.bottomButton}
                                        mode="elevated"
                                        contentStyle={{
                                            flexDirection: 'row',
                                            backgroundColor: theme.colors.primary
                                        }}
                                        labelStyle={{
                                            color: theme.colors.secondary,
                                            fontSize: 16
                                        }}
                                        onPress={() => { navigation.navigate('Recent') }}
                                        icon={({ size, color }) => (
                                            <Icon source="account-hard-hat" size={23} color="ghostwhite" />
                                        )}
                                    >
                                        {t('home.worker')}
                                    </Button>
                                    <Button
                                        style={styles.bottomButton}
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
                                        {t('home.supervisor')}
                                    </Button>
                                </View>

                                <View style={{
                                    paddingHorizontal: 20,
                                    paddingBottom: 20,
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    marginBottom: 20
                                }}>
                                    <Button
                                        style={{
                                            borderWidth: 0,
                                            width: '100%',
                                            marginTop: 10,
                                        }}
                                        mode="text"
                                        contentStyle={{
                                            flexDirection: 'row-reverse',
                                        }}
                                        labelStyle={{
                                            color: "rgba(70, 70, 70, 0.87)",
                                            fontSize: 16,
                                            textDecorationLine: 'underline'
                                        }}
                                        onPress={handlePresentModalPress}
                                        icon={({ size, color }) => (
                                            <Icon source="chevron-down" size={27} color="rgba(70, 70, 70, 0.87)" />
                                        )}
                                    >
                                        {getCurrentLanguageName()}
                                    </Button>
                                </View>
                            </View>
                        </SafeAreaProvider>

                        <BottomSheetModal
                            ref={bottomSheetModalRef}
                            index={1}
                            snapPoints={snapPoints}
                            enablePanDownToClose
                            backgroundStyle={{backgroundColor: 'ghostwhite',borderWidth:0.5}}                            
                        >
                            <BottomSheetView style={{
                                flex: 1,
                                paddingHorizontal: 20,
                                paddingBottom: 20,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'

                            }}>
                                <Text style={{
                                    fontSize: 20,
                                    marginBottom: 20
                                }}
                                >
                                    {t('home.selectLanguage')}
                                </Text>
                                <View style={{ width: '100%', borderRadius: 10, display: 'flex', flexDirection: 'column', gap: 5, borderWidth: 0.5, padding: 5 }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ marginLeft: 10, fontSize: 15, fontWeight: 'light' }} onPress={() => handleLanguageSelect('mg')}>
                                            {t('common.malagasy')}
                                        </Text>
                                        <View style={styles.checkboxContainer}>
                                            <Checkbox
                                                status={language === 'mg' ? 'checked' : 'unchecked'}
                                                onPress={() => handleLanguageSelect('mg')}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ marginLeft: 10, fontSize: 15, fontWeight: 'light'}} onPress={() => handleLanguageSelect('fr')}>
                                            {t('common.french')}
                                        </Text>
                                        <View style={styles.checkboxContainer}>
                                            <Checkbox
                                                status={language === 'fr' ? 'checked' : 'unchecked'}
                                                onPress={() => handleLanguageSelect('fr')}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ marginLeft: 10, fontSize: 15, fontWeight: 'light' }} onPress={() => handleLanguageSelect('en')}>
                                            {t('common.english')}
                                        </Text>
                                        <View style={styles.checkboxContainer}>
                                            <Checkbox
                                                status={language === 'en' ? 'checked' : 'unchecked'}
                                                onPress={() => handleLanguageSelect('en')}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </BottomSheetView>
                        </BottomSheetModal>
                    </BottomSheetModalProvider>
                </GestureHandlerRootView>
            </PaperProvider>
        </>
    )
}