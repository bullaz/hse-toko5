// hooks/useAuth.ts
import { useState, useEffect, useContext, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DatabaseContext, RootStackParamList } from '../context';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const useValidity = (toko5Id: string) => {
  //const { toko5Id } = route.params;
  const navigation = useNavigation<NavigationProp>();
  const [validity, setValidity] = useState<boolean | null>(null);
  const [validityLoading, setValidityLoading] = useState<boolean>(true);
  const toko5Repository = useContext(DatabaseContext);

  const getValidity = async (toko5Id: string): Promise<boolean> => {
    try {
      if (toko5Repository !== null) {
        return await toko5Repository?.getValidityToko5(toko5Id);
      }else{
        throw new Error('toko5repository not initialized');
      }
    } catch (error) {
      console.error('useValidity verifyValidity error:', error);
      return false;
    }
  }

  const verifyValidity = async (toko5Id: string) => {
    try {
      const isValid = await getValidity(toko5Id);
      console.log("USEVALIDITY : new etat in the database :",isValid);
      setValidity(isValid);
      setValidityLoading(false);
      // if (!isValid) {
      //   setValidityLoading(false);
      //   navigation.navigate('Invalide');
      // }else{

      // }
    } catch (error) {
      console.log('error in useValidity verifyValidity', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      verifyValidity(toko5Id);
      return () => {
      };
    }, [toko5Repository, toko5Id])
  );

  // useEffect(() => {
  //   verifyValidity(toko5Id);
  // }, [toko5Repository, route]);

  return {
    validity,
    validityLoading
  };
};