///// VERIFY WHY SOMETIMES THE PADDING ON THAT HEADER ON THAT RECENT COMPONENT IS LARGER THAN OTHERS AND SOMETIMES THE PADDING IS NORMAL XD XD XD XD XD


import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DatabaseContext, RootStackParamList, Toko5 } from "../context";
import { Pressable, ScrollView, StatusBar, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  IconButton,
  Modal,
  PaperProvider,
  Portal,
  Text,
  useTheme,
} from "react-native-paper";
import globalStyles from "../styles";
import styles from "../styles/recentStyle";
import { useCallback, useContext, useState } from "react";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { ETAT } from "../constants/commonConstants";
import { useFocusEffect } from "@react-navigation/native";
import QRCode from 'react-native-qrcode-svg';


type Props = NativeStackScreenProps<RootStackParamList>;

// const inProgressImage = ({ color, size}:({ color:number, size: string})) => (
//   <Image
//     source={require('./assets/pictogram/en_cours.png')}
//     style={{ tintColor: color, width: size, height: size }}
//   />
// );

export default function Recent({ navigation }: Props) {
  const [isChecked, setChecked] = useState(false);

  const theme = useTheme();

  const [listToko5, setListToko5] = useState<any>([]);

  const toko5Repository = useContext(DatabaseContext);

  const [loading, setLoading] = useState(false);

  const [deleteVisible, setDeleteVisible] = useState(false);

  const [currentDeleteId, setCurrentDeleteId] = useState<string>("");

  const showDeleteModal = () => setDeleteVisible(true);
  const hideDeleteModal = () => setDeleteVisible(false);

  const [codeVisible, setCodeVisible] = useState(false);

  const [currentCodeId, setCurrentCodeId] = useState<string>("");

  const showCodeModal = () => setCodeVisible(true);
  const hideCodeModal = () => setCodeVisible(false);

  const handleDeleteToko5 = async () => {
    if (toko5Repository !== null) {
      await toko5Repository.deleteFromToko5(currentDeleteId);

      //don't use this.. just delete from the list
      //await getAllToko5();

      let newList = structuredClone(listToko5);
      newList.delete(currentDeleteId);
      setListToko5(newList);
      setDeleteVisible(false);
    } else {
      //console.log('toko5repository null');
      throw new Error('toko5repository null recent handledeletetoko5');
    }
  };

  const getAllToko5 = async () => {
    try {
      setLoading(true);
      if (toko5Repository !== null) {
        let list = await toko5Repository.getAllToko5()
      
        let mapToko5 = new Map();

        for (let toko5 of list as Toko5[]) {
          mapToko5.set(toko5.toko5_id, toko5);
        }

        setListToko5(mapToko5);
        
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

  useFocusEffect(
    useCallback(() => {
      // This will run every time the screen comes into focus
      getAllToko5();

      // Optional: Cleanup function
      return () => {
        // Cleanup if needed
      };
    }, [])
  );

  // useFocusEffect(() => {
  //   getAllToko5();
  // }, []);

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
        <PaperProvider>
          <Portal>
            <View style={styles.container}> 
              {(Array.from(listToko5.values())).length > 0 ?
                <View style={{
                  marginTop: 30,
                  flex: 1,
                  flexDirection: 'column',
                  alignContent: 'center',
                  gap: 14
                }}>
                  <ScrollView
                    keyboardShouldPersistTaps="handled"
                    style={{
                      width: '88%', // 90% of parent width
                      maxHeight: '80%', // 60% of screen height
                      alignSelf: 'center',
                      backgroundColor: 'ghostwhite',
                      borderRadius: 10,
                      // borderEndColor: 'ghostwhite',
                      // shadowColor: "black",
                      // shadowOpacity: 0.26,
                      // shadowOffset: { width: 0, height: 2 },
                      // shadowRadius: 8,
                      // elevation: 5,
                    }}
                    contentContainerStyle={{
                      flexGrow: 1,
                      flexDirection: 'column',
                      alignItems: 'center',
                      alignContent: 'center',
                      gap: 15,
                      paddingBottom: 10,
                    }}
                    persistentScrollbar={true}
                  >
                    {Array.from(listToko5.values()).map((toko5: any, index: number) => (

                      // make sure that pressable doesn't change height or width when the name is too long.. It should only show part of it in that case

                      <Pressable key={toko5.toko5_id} style={({ pressed }) => [
                        styles.toko5,
                        {
                          width: "100%",
                          backgroundColor: pressed ? 'rgba(148, 203, 224, 1)' : 'rgba(230, 241, 255, 1)',
                          borderRadius: 8, // Add borderRadius for better visual effect
                        }
                      ]} onPress={() => { navigation.navigate('Think', { toko5Id: toko5.toko5_id }) }}>
                        {/* <View style={{ flexDirection: 'column', flexWrap: 'wrap' }}>
                    <Text
                      style={{ textAlign: "center", paddingLeft: 17 }}
                      variant="titleMedium"
                    >
                      toko5 de {toko5.prenom_contractant}
                      </Text>
                     <Text
                      style={{ textAlign: "center", paddingLeft: 17 }}
                      variant="titleMedium"
                    > 
                      {toko5.date_heure.split("T")[0]}
                    </Text>
                  </View> */}
                        <Text
                          style={{
                            textAlign: "center", paddingLeft: 17, flex: 1, // Add this
                            flexWrap: 'wrap', // Add this
                            flexShrink: 1,
                          }}
                          variant="titleMedium"
                        >
                          TOKO5 de {toko5.prenom_contractant.slice(0, 22)}...  {"\n"}
                          <Text style={{ color: 'rgba(49, 108, 184, 0.85)', fontWeight: 'bold' }}>
                            {toko5.date_heure.split("T")[0].replaceAll("-", "/")}
                          </Text>
                        </Text>
                        <View
                          style={{ flexDirection: "row", justifyContent: "flex-start" }}
                        >
                          <IconButton
                            icon="trash-can-outline"
                            size={24}
                            onPress={() => {
                              setDeleteVisible(true);
                              setCurrentDeleteId(toko5.toko5_id);
                            }}
                          />
                          <IconButton
                            icon="qrcode"
                            size={24}
                            onPress={() => { setCurrentCodeId(toko5.toko5_id), setCodeVisible(true) }}
                          />

                          {toko5.etat === ETAT.valide && (
                            <IconButton
                              //disabled={true}
                              icon="check"
                              iconColor="green"
                              size={24}
                            />
                          )}

                          {toko5.etat === ETAT.invalide && (
                            <IconButton
                              //disabled={true}
                              icon="close"
                              iconColor="red"
                              size={24}
                            />
                          )}

                          {toko5.etat === ETAT.ongoing && (
                            <IconButton
                              icon="progress-helper"
                              // or use that image in the pictogram folder
                              iconColor={theme.colors.primary}
                              size={24}
                            />
                          )}

                        </View>
                      </Pressable>
                    ))}
                  </ScrollView>
                </View>
                :
                (<View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
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
                </View>)}




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
            </View >

            <Modal visible={deleteVisible} onDismiss={hideDeleteModal} contentContainerStyle={styles.deleteModalStyle}>
              <Text style={{ textAlign: "center", paddingLeft: 17 }}
                variant="titleMedium">
                Voulez-vous vraiment supprimer ce TOKO5?
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', gap: 30 }}>
                <Button style={{
                  width: "30%",
                  borderRadius: 5,
                  backgroundColor: "rgba(161, 26, 26, 0.87)"
                }}
                  mode="contained"
                  onPress={handleDeleteToko5}
                  //contentStyle={{ flexDirection: 'row-reverse' }}
                  labelStyle={{
                    color: theme.colors.secondary,
                    fontSize: 18
                  }}
                >
                  oui
                </Button>
                <Button style={{
                  width: "30%",
                  borderRadius: 5,
                  backgroundColor: "rgba(16, 81, 165, 1)"
                }}
                  mode="contained"
                  onPress={async () => {
                    setDeleteVisible(false);
                  }}
                  //contentStyle={{ flexDirection: 'row-reverse' }}
                  labelStyle={{
                    color: theme.colors.secondary,
                    fontSize: 18
                  }}
                >
                  non
                </Button>
              </View>
            </Modal>

            <Modal visible={codeVisible} onDismiss={hideCodeModal} contentContainerStyle={styles.codeModalStyle}>
              {/* <Text style={{ textAlign: "center", paddingLeft: 17 }}
                variant="titleMedium">
              </Text> */}
              {/* <View style={{ flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
              </View> */}
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <QRCode
                  value={currentCodeId}
                  size={230}          // Size of the QR code in pixels
                  color="black"
                  backgroundColor="white"
                />
              </View>
            </Modal>


          </Portal>
        </PaperProvider>
      )
      }
    </>
  );
}
