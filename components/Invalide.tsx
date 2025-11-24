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

type Props = NativeStackScreenProps<RootStackParamList>;

export default function Invalide({ navigation }: Props) {
  const [isChecked, setChecked] = useState(false);

  const theme = useTheme();

  const [listQuestion, setListQuestion] = useState<any>([]);

  const toko5Repository = useContext(DatabaseContext);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // const getAllSafetyQuestions = async () => {
    //   try {
    //     setLoading(true);
    //     if (toko5Repository !== null) {
    //       let list = await toko5Repository.getAllCategorieQuestion(
    //         QUESTION_CATEGORIES.SAFETY
    //       );
    //       setListQuestion(list);
    //       //console.log(list)
    //     }
    //   } catch (error) {
    //     console.error(
    //       "Error in the component think while retrieving list of questions ",
    //       error
    //     );
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // getAllSafetyQuestions();
  }, []);

  return (
    <>
      <StatusBar
        hidden={false}
        backgroundColor="black" // Android only barStyle="dark-content"/>
      />
      {loading ? (
        <View style={globalStyles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <View style={styles.container}>

          <View style={{marginTop: 40}}>
            <Image source={require('../assets/pictogram/stop.png')} style={{ width: 240, height: 240 }}></Image>
          </View>


          <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
            <MaterialDesignIcons
              name="lightbulb-on-outline"
              size={30}
              style={{}}
            />
            <Text
              style={{ textAlign: "center", paddingLeft: 17 }}
              variant="titleMedium"
            >
              Veuillez parler avec votre supersiveur car: {"\n"}
              Vous n'avez pas de : {"\n"}
              - [something...]

            </Text>
          </View>
          <View>
            <IconButton
              icon="home"
              size={24}
              iconColor="white"
              onPress={() => navigation.navigate("Recent")}
              style={{
                backgroundColor: "rgba(26, 85, 161, 0.87)",
                width: 70,
                height: 70,
                borderRadius: 100,
                marginBottom: 35,
              }}
            />
            {/* "rgba(105, 146, 200, 0.87)" */}
          </View>
        </View>
      )}
    </>
  );
}
