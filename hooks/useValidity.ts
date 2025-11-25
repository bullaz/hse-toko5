// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../context';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const useValidity = () => {
  const navigation = useNavigation<NavigationProp>();
  const [validity, setValidity] = useState<boolean | null>(null);

  const validateJWT = async (): Promise<boolean> => {
    try {
      // Replace this with your actual JWT validation logic
      // Example: check token in AsyncStorage, verify expiry, etc.
      const token = await getTokenFromStorage();
      
      if (!token) {
        return false;
      }

      // Verify token validity (you might want to call an API or decode JWT)
      const isValid = await verifyToken(token);
      return isValid;
      
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  };

  const getTokenFromStorage = async (): Promise<string | null> => {
    // Implement your token retrieval logic
    // Example using expo-secure-store:
    // return await SecureStore.getItemAsync('userToken');
    return null; // Replace with actual implementation
  };

  const verifyToken = async (token: string): Promise<boolean> => {
    // Implement your token verification logic
    // This could be decoding JWT and checking expiry, or calling an API
    try {
      // Example: decode and check expiry
      // const decoded = jwtDecode(token);
      // return decoded.exp > Date.now() / 1000;
      return true; // Replace with actual verification
    } catch {
      return false;
    }
  };

  const checkAuthentication = async () => {
    const isValid = await validateJWT();
    if (!isValid) {
      navigation.navigate('Login');
    }
    setValidity(isValid);
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  return { 
    validity, 
    checkAuthentication,
    validateJWT 
  };
};