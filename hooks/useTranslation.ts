import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { translations, LanguageCode } from '../translations/translations';

const LANGUAGE_STORAGE_KEY = 'app_language';

export function useTranslation() {
  const [language, setLanguage] = useState<LanguageCode>('fr');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLang = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY) as LanguageCode;

      if (savedLang && translations[savedLang]) {
        setLanguage(savedLang);
      } else {
        // Auto-detect device language
        const locales = Localization.getLocales();
        const deviceLang = locales[0]?.languageCode as LanguageCode;
        const defaultLang = translations[deviceLang] ? deviceLang : 'fr';
        setLanguage(defaultLang);
        await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, defaultLang);
      }
    } catch (error) {
      console.error('Error loading language:', error);
      setLanguage('fr');
    } finally {
      setIsReady(true);
    }
  };

  // Change language
  const changeLanguage = useCallback(async (lang: LanguageCode) => {
    try {
      setLanguage(lang);
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  }, []);

  // Translation function with type safety
  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key; // Return key as fallback
      }
    }

    return typeof value === 'string' ? value : key;
  }, [language]);

  return {
    t,
    language,
    changeLanguage,
    isReady,
    availableLanguages: Object.keys(translations) as LanguageCode[]
  };
}