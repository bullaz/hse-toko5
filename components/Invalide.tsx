import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DatabaseContext, RootStackParamList } from "../context";
import { Image, ScrollView, StatusBar, View } from "react-native";
import {
  ActivityIndicator,
  Divider,
  Icon,
  IconButton,
  Text,
  useTheme,
} from "react-native-paper";
import globalStyles from "../styles";
import styles from "../styles/recentStyle";
import { useContext, useEffect, useState } from "react";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { resolveToko5 } from "../services/ApiService";
import { ETAT } from "../constants/commonConstants";

type Props = NativeStackScreenProps<RootStackParamList, 'Invalide'>;

export default function Invalide({ navigation, route }: Props) {

  const { toko5Id, attemptNumber } = route.params;

  const theme = useTheme();

  const toko5Repository = useContext(DatabaseContext);

  const [loading, setLoading] = useState(false);

  const tryAgain = async (toko5Id: string) => {
    if (toko5Repository) {
      await toko5Repository?.resolveProblemListReponse(toko5Id);
      await toko5Repository.updateStateToko5(toko5Id, ETAT.ongoing);
      await resolveToko5(toko5Id);
      navigation.navigate('Think', { toko5Id: toko5Id });
    } else {
      throw new Error("internal error: repository: toko5repository is null");
    }
  }

  if (attemptNumber === null) {
    // You could return a loading state or handle it differently
    // return (
    //   // <View style={globalStyles.loadingContainer}>
    //   //   <ActivityIndicator size="large" color={theme.colors.primary} />
    //   // </View>
    // );
    navigation.navigate('Recent');
  } else {
    return (
      <>
        <StatusBar hidden={false} backgroundColor="black" />
        {/* <StatusBar
        hidden={false}
        backgroundColor="black" // Android only barStyle="dark-content"/>
      /> */}
        {loading ? (
          <View style={globalStyles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </View>
        ) : (
          <View style={styles.container}>

            <View>
              <Image source={require('../assets/pictogram/stop2.png')} style={{ width: 240, height: 240 }}></Image>
            </View>


            <ScrollView
              keyboardShouldPersistTaps="handled"
              style={{
                width: '100%',
                maxHeight: '80%',
                alignSelf: 'center',
                backgroundColor: 'white'
              }}
              persistentScrollbar={true}
            >
              <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignContent: 'center', gap: 10 }}>
                {/* <MaterialDesignIcons
              name="lightbulb-on-outline"
              size={30}
              style={{}}
            /> */}
                <Icon
                  source={require('../assets/pictogram/bulb.png')}
                  size={45}
                />
                <Text style={{ textAlign: "center" }}
                  variant="titleMedium">
                  Votre Toko 5 est invalide
                </Text>

                {attemptNumber > 0 && (
                  <>
                    <Text variant="titleMedium" style={{ textAlign: "center", paddingLeft: 17 }}>
                      En cas d'erreur de manipulation, vous pouvez encore reessayer en appuyant sur le bouton ci-dessous
                    </Text>
                    <IconButton
                      icon="restart"
                      size={24}
                      iconColor="white"
                      onPress={() => { tryAgain(toko5Id) }}
                      style={{
                        backgroundColor: "rgba(33, 93, 172, 0.87)",
                      }}
                    //style={{backgroundColor: 'rgba(230, 241, 255, 1) '}}
                    />
                    {/* <Text
                      style={{
                        textAlign: "center",
                      }}
                      variant="titleMedium"
                    >
                      recharger
                    </Text> */}
                  </>
                )}


                <Text
                  style={{ textAlign: "center" }}
                  variant="titleMedium"
                >
                  {attemptNumber > 0 && (
                    <>
                      {"\n"}
                      Sinon
                      {"\n"}
                    </>
                  )}
                  Veuillez parler avec votre supersiveur{"\n"}
                  {/* Vous n'avez pas de : {"\n"}
              - [something...] */}

                </Text>
              </View>
            </ScrollView>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
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
              {/* <Divider/> */}
              <IconButton
                      icon="restart"
                      size={50}
                      iconColor="white"
                      onPress={() => { tryAgain(toko5Id) }}
                      style={{
                        backgroundColor: "rgba(33, 93, 172, 0.87)",
                      }}
                    //style={{backgroundColor: 'rgba(230, 241, 255, 1) '}}
                    />
              {/* "rgba(105, 146, 200, 0.87)" */}
            </View>
          </View>
        )}
      </>
    );
  }
}
