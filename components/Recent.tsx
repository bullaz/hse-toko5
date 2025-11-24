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

export default function Recent({ navigation }: Props) {
  const [isChecked, setChecked] = useState(false);

  const theme = useTheme();

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

          {listToko5.length > 0 ?

            <View style={{
              marginTop: 30,
              flex: 1,
              flexDirection: 'column',
              alignContent: 'center',
              gap: 14
            }}>
              {listToko5.map((toko5: any, index: number) => (

                // make sure that pressable doesn't change height or width when the name is too long.. It should only show part of it in that case

                <Pressable style={styles.toko5}>
                  <Text
                    style={{ textAlign: "center", paddingLeft: 17 }}
                    variant="titleMedium"
                  >
                    toko5 de {toko5.prenom} {"\n"}
                    {toko5.date_heure.split(" ")[0]}
                  </Text>
                  <View
                    style={{ flexDirection: "row", justifyContent: "flex-start" }}
                  >
                    <IconButton
                      icon="trash-can-outline"
                      size={24}
                      onPress={() => setChecked(!isChecked)}
                    />
                    <IconButton
                      icon="qrcode"
                      size={24}
                      onPress={() => setChecked(!isChecked)}
                    />

                    {toko5.etat === ETAT.valide && (
                      <IconButton
                        disabled={true}
                        icon="check"
                        iconColor="green"
                        size={24}
                      />
                    )}

                    {toko5.etat === ETAT.invalide && (
                      <IconButton
                        disabled={true}
                        icon="close"
                        iconColor="red"
                        size={24}
                      />
                    )}

                    {toko5.etat === ETAT.ongoing && (
                      <IconButton
                        disabled={true}
                        icon="spinner"
                        // or use that image in the pictogram folder
                        iconColor="green"
                        size={24}
                      />
                    )}

                  </View>
                </Pressable>
              ))}
            </View> :

            <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
              <MaterialDesignIcons
                name="lightbulb-on-outline"
                size={30}
                style={{}}
              />
              <Text
                style={{ textAlign: "center", padding: 10 }}
                variant="titleMedium"
              >
                Vous n'avez pas de toko5 {"\n"}
                Veuillez presser le bouton en dessous pour en initier un!
              </Text>
            </View>}




          {/* <View style={{
            marginTop:30,
            flex:1,
            flexDirection: 'column',
            alignContent: 'center',
            gap:14
          }}>
            <Pressable style={styles.toko5}>
              <Text
                style={{ textAlign: "center", paddingLeft: 17 }}
                variant="titleMedium"
              >
                toko5 de jean {"\n"}
                23/01/25
              </Text>
              <View
                style={{ flexDirection: "row", justifyContent: "flex-start" }}
              >
                <IconButton
                  icon="trash-can-outline"
                  size={24}
                  onPress={() => setChecked(!isChecked)}
                />
                <IconButton
                  icon="qrcode"
                  size={24}
                  onPress={() => setChecked(!isChecked)}
                />
                <IconButton
                  icon="close"
                  iconColor="red"
                  size={24}
                  onPress={() => setChecked(!isChecked)}
                />
              </View>
            </Pressable>

            <Pressable style={styles.toko5}>
              <Text
                style={{ textAlign: "center", paddingLeft: 17 }}
                variant="titleMedium"
              >
                toko5 de jean {"\n"}
                23/01/25
              </Text>
              <View
                style={{ flexDirection: "row", justifyContent: "flex-start" }}
              >
                <IconButton
                  icon="trash-can-outline"
                  size={24}
                  onPress={() => setChecked(!isChecked)}
                />
                <IconButton
                  icon="qrcode"
                  size={24}
                  onPress={() => setChecked(!isChecked)}
                />
                <IconButton
                  icon="close"
                  iconColor="red"
                  size={24}
                  onPress={() => setChecked(!isChecked)}
                />
              </View>
            </Pressable>

            <Pressable style={styles.toko5}>
              <Text
                style={{ textAlign: "center", paddingLeft: 17 }}
                variant="titleMedium"
              >
                toko5 de jean {"\n"}
                23/01/25
              </Text>
              <View
                style={{ flexDirection: "row", justifyContent: "flex-start" }}
              >
                <IconButton
                  icon="trash-can-outline"
                  size={24}
                  onPress={() => setChecked(!isChecked)}
                />
                <IconButton
                  icon="qrcode"
                  size={24}
                  onPress={() => setChecked(!isChecked)}
                />
                <IconButton
                  icon="close"
                  iconColor="red"
                  size={24}
                  onPress={() => setChecked(!isChecked)}
                />
              </View>
            </Pressable>

            <Pressable style={styles.toko5}>
              <Text
                style={{ textAlign: "center", paddingLeft: 17 }}
                variant="titleMedium"
              >
                toko5 de jean {"\n"}
                23/01/25
              </Text>
              <View
                style={{ flexDirection: "row", justifyContent: "flex-start" }}
              >
                <IconButton
                  icon="trash-can-outline"
                  size={24}
                  onPress={() => setChecked(!isChecked)}
                />
                <IconButton
                  icon="qrcode"
                  size={24}
                  onPress={() => setChecked(!isChecked)}
                />
                <IconButton
                  icon="close"
                  iconColor="red"
                  size={24}
                  onPress={() => setChecked(!isChecked)}
                />
              </View>
            </Pressable>

            <Pressable style={styles.toko5}>
              <Text
                style={{ textAlign: "center", paddingLeft: 17 }}
                variant="titleMedium"
              >
                toko5 de jean{"\n"}
                23/01/25
              </Text>
              <View
                style={{ flexDirection: "row", justifyContent: "flex-start" }}
              >
                <IconButton
                  icon="trash-can-outline"
                  size={24}
                  onPress={() => setChecked(!isChecked)}
                />
                <IconButton
                  icon="qrcode"
                  size={24}
                  onPress={() => setChecked(!isChecked)}
                />
                <IconButton
                  icon="close"
                  iconColor="red"
                  size={24}
                  onPress={() => setChecked(!isChecked)}
                />
              </View>
            </Pressable>
          </View> */}

          <View>
            <IconButton
              icon="plus"
              size={24}
              iconColor="white"
              onPress={() => navigation.navigate("Login")}
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
