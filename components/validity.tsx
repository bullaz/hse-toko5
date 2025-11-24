import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DatabaseContext, RootStackParamList } from "../context";
import { Image, Platform, Pressable, StatusBar, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Checkbox,
  Divider,
  IconButton,
  Text,
  useTheme,
} from "react-native-paper";
import globalStyles from "../styles";
import styles from "../styles/recentStyle";
import { useContext, useEffect, useState } from "react";
import { QUESTION_CATEGORIES } from "../constants/questionTypes";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { ETAT } from "../constants/commonConstants";

type Props = NativeStackScreenProps<RootStackParamList>;

export default function Validity({ navigation }: Props) {

  const [listToko5, setListToko5] = useState<any[]>([]);

  const toko5Repository = useContext(DatabaseContext);

  const [loading, setLoading] = useState(false);

  const getAllToko5 = async () => {
    try {
      setLoading(true);
      if (toko5Repository !== null) {
        let list = await toko5Repository.getAllToko5()
        setListToko5(list);
        //console.log(list)
      } else {
        throw new Error('no repository')
      }
    } catch (error) {
      console.error(
        "Error in the component think while retrieving list of toko5 ",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllToko5();
  }, []);

  return (
    <>
    
    </>
  );
}
