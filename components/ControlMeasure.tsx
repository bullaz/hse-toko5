import React, { useCallback, useContext, useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import {
  Button,
  Checkbox,
  DataTable,
  TextInput,
  useTheme,
  Text,
  IconButton,
  PaperProvider,
  Portal,
  Modal,
  ActivityIndicator,
} from "react-native-paper";
import styles from "../styles/controlMeasureStyles";
import globalStyles from "../styles";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ControlMeasureRisk, DatabaseContext, Reponse, RootStackParamList } from "../context";
import { useFocusEffect } from "@react-navigation/native";
import { imagePathMapping } from "../utils/imagePathMapping";

type Props = NativeStackScreenProps<RootStackParamList, 'ControlMeasure'>;

export default function ControlMeasure({ navigation, route }: Props) {

  const { toko5Id, questionId } = route.params;

  const theme = useTheme();
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  /* const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length); */

  const [checked, setChecked] = useState(false);

  const [text, setText] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget velit mauris."
  );

  const [visible, setVisible] = useState(false);

  const [deleteVisible, setDeleteVisible] = useState(false);

  const [currentDeleteId, setCurrentDeleteId] = useState<number>();

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const showDeleteModal = () => setDeleteVisible(true);
  const hideDeleteModal = () => setDeleteVisible(false);

  const [listMesure, setListMesure] = useState<any>([]);

  const toko5Repository = useContext(DatabaseContext);

  const [loading, setLoading] = useState(true);

  const [saveLoading, setSaveLoading] = useState<boolean>(false);

  const [currentMesure, setCurrentMesure] = useState<any>();
  const [currentMesureText, setCurrentMesureText] = useState<string>('')
    ;
  const openMesureModal = async (mesure: any) => {
    setCurrentMesure(mesure);
    //console.log("current mesure",mesure)
    setCurrentMesureText(mesure.mesure_prise);
    setVisible(true);
  }

  const getAllData = async () => {
    try {
      setLoading(true);
      if (toko5Repository !== null) {
        const data = await toko5Repository?.getAllControlMeasure(toko5Id);
        //console.log('list control measure', data);

        let listControl = new Map();

        for (let control of data as ControlMeasureRisk[]) {
          //console.log('conversion individual of the database answer to reponse',answer);
          listControl.set(control.mesure_controle_id, control);
        }
        setListMesure(listControl);
      } else {
        throw new Error("toko5repository null");
      }
    } catch (error) {
      console.log('error in getAllDAta risks', error);
    } finally {
      setLoading(false);
    }
  }


  const updateListMesure = async (control_id: number, mesure: string, implemented: boolean) => {
    //console.log('ato anh');
    let listControl = structuredClone(listMesure);
    //console.log('before',listControl.get(control_id));
    let control = listControl.get(control_id);
    control.mesure_prise = mesure;
    control.implemented = implemented;
    //console.log('modified',listControl.get(control_id));
    if (toko5Repository !== null) {
      await toko5Repository?.updateControlMesure(control_id, mesure, implemented);
    } else {
      throw new Error('toko5repository is null');
    }
    setListMesure(listControl);
  }

  const deleteControlMesure = async (control_id: number) => {
    let listControl = structuredClone(listMesure);
    listControl.delete(control_id);
    if (toko5Repository !== null) {
      await toko5Repository.deleteFromControlMeasureById(control_id);
    } else {
      throw new Error('toko5repository is null');
    }
    setListMesure(listControl);
  }

  // useEffect(() => {
  //   setPage(0);
  // }, [itemsPerPage]);

  useFocusEffect(
    useCallback(() => {
      getAllData();
      return () => {
      };
    }, [])
  );

  return (
    <>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <PaperProvider>
          <Portal>
            <View style={styles.container}>
              <View style={{
                flex: 1,
                flexWrap: "wrap",
                flexDirection: "column",
                alignItems: "center",
                alignContent: "center",
                gap: 40,
                width: "100%"
                // alignContent: "center",
              }}>
                <View
                  style={{
                    marginTop: 40,
                    marginBottom: 10,
                    // flex: 1,
                    flexWrap: "wrap",
                    flexDirection: "row",
                    justifyContent: 'center',
                    alignItems: "center",
                    // alignContent: "center",
                  }}
                >
                  <MaterialDesignIcons
                    name="lightbulb-on-outline"
                    size={30}
                    style={{
                      color: 'black'
                    }}
                  />
                  <Text
                    style={{ textAlign: "center", paddingLeft: 17 }}
                    variant="titleMedium"
                  >
                    Pour ajouter une nouvelle ligne: {" "}
                    {"\n"}
                    Appuyer sur le bouton en dessous
                    {/* Vous n'avez pas de : {"\n"}- [something...] */}
                  </Text>
                </View>

                <ScrollView
                  keyboardShouldPersistTaps="handled"
                  style={{
                    width: '90%', // 90% of parent width
                    maxHeight: '60%', // 60% of screen height
                    alignSelf: 'center',
                    backgroundColor: 'ghostwhite',
                    borderRadius: 10,
                    borderEndColor: 'ghostwhite',
                    shadowColor: "black",
                    shadowOpacity: 0.26,
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 8,
                    elevation: 5,
                  }}
                  contentContainerStyle={{
                    flexGrow: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    alignContent: 'center',
                  }}
                  persistentScrollbar={true}
                >

                  <DataTable style={{
                    backgroundColor: 'ghostwhite',
                    borderColor: "rgba(0, 0, 0, 1)",
                    borderRadius: 10,
                    width: "100%",
                    borderEndColor: 'ghostwhite',
                    // shadowColor: "black",
                    // shadowOpacity: 0.26,
                    // shadowOffset: { width: 0, height: 2 },
                    // shadowRadius: 8,
                    // elevation: 5,
                  }}>
                    <DataTable.Header>
                      <DataTable.Title style={styles.cell}>danger</DataTable.Title>
                      <DataTable.Title style={styles.cell}>mesures</DataTable.Title>
                      <DataTable.Title style={styles.cell}>en place</DataTable.Title>
                      <DataTable.Title style={styles.cell}>supprimer</DataTable.Title>
                    </DataTable.Header>


                    {Array.from(listMesure.values()).map((mesure: any) => (
                      <DataTable.Row style={styles.trow} key={mesure.mesure_controle_id}>
                        <DataTable.Cell style={styles.cell}>
                          <Image
                            source={imagePathMapping(mesure.pictogramme)}
                            style={{ width: 30, height: 30 }}
                          />
                        </DataTable.Cell>
                        <DataTable.Cell style={styles.cell}>
                          <IconButton
                            icon="pen"
                            size={24}
                            onPress={() => openMesureModal(mesure)}
                          />
                        </DataTable.Cell>
                        <DataTable.Cell style={styles.cell}>
                          <Checkbox
                            status={mesure.implemented ? "checked" : "unchecked"}
                            onPress={async () => {
                              await updateListMesure(mesure.mesure_controle_id, mesure.mesure_prise, !mesure.implemented);
                            }}
                          />
                        </DataTable.Cell>

                        <DataTable.Cell style={styles.cell}>
                          <IconButton
                            icon="trash-can-outline"
                            size={24}
                            onPress={() => {
                              setDeleteVisible(true);
                              setCurrentDeleteId(mesure.mesure_controle_id);
                            }}
                          />
                        </DataTable.Cell>

                      </DataTable.Row>
                    ))}

                  </DataTable>

                </ScrollView>
              </View>

              <View>
                <IconButton
                  icon="plus"
                  size={24}
                  iconColor="white"
                  onPress={() => { }}
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

            {/* mesure a prendre modal */}
            {/* HOW TO MAKE THIS SHIT REACT PROPERLY WHEN THE KEYBOARD SHOWS */}
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalStyle}>
              <View style={{
                flex: 1,
                flexWrap: 'wrap',
                flexDirection: 'column',
                alignContent: 'center',
                alignItems: 'center',
                paddingTop: 15,
                paddingBottom: 5,
                justifyContent: 'space-around',
                //gap: 10,
                width: '90%'
              }}>
                <TextInput
                  multiline={true}
                  left={<TextInput.Icon icon="pen" />}
                  label={
                    <Text
                      style={{ textAlign: "center", color: 'rgba(77, 77, 71, 0.87)', textAlignVertical: 'top' }}
                      variant="titleMedium"
                    >
                      Mesure à prendre
                    </Text>
                  }
                  value={currentMesureText}
                  style={{ width: "95%", height: "60%", backgroundColor: 'rgba(234, 235, 232, 0.87)' }}
                  onChangeText={(newValue) => {
                    setCurrentMesureText(newValue);
                  }}
                  underlineColor='darkgrey'
                />

                <Button style={{
                  width: "95%",
                  borderRadius: 5,
                  backgroundColor: "rgba(26, 85, 161, 0.87)"
                }}
                  mode="contained"
                  onPress={async () => {
                    await updateListMesure(currentMesure.mesure_controle_id, currentMesureText, currentMesure.implemented);
                    setVisible(false);
                  }}

                  //test qr
                  //onPress = {requestPermission}
                  //onPress = {() => {navigation.navigate('ScanQr')}}

                  contentStyle={{ flexDirection: 'row-reverse' }}
                  labelStyle={{
                    color: theme.colors.secondary, // Manually set to theme contrast color
                    fontSize: 18
                  }}
                >
                  valider
                </Button>

                {/* <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color={theme.colors.primary} />
              </View> */}
              </View>
            </Modal>

            {/* also add a delete modal */}
            <Modal visible={deleteVisible} onDismiss={hideDeleteModal} contentContainerStyle={styles.deleteModalStyle}>
                <Text style={{ textAlign: "center", paddingLeft: 17 }}
                  variant="titleMedium">
                    Voulez-vous vraiment supprimer cette mesure de controle?
                </Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', gap:30}}>
                  <Button style={{
                    width: "30%",
                    borderRadius: 5,
                    backgroundColor: "rgba(161, 26, 26, 0.87)"
                  }}
                    mode="contained"
                    onPress={async () => {
                    }}
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
                    backgroundColor: "rgba(26, 85, 161, 0.87)"
                  }}
                    mode="contained"
                    onPress={async () => {
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

          </Portal>
        </PaperProvider>
      )}
    </>
  );
}

{/*<DataTable.Pagination
                        page={page}
                        numberOfPages={Math.ceil(items.length / itemsPerPage)}
                        onPageChange={(page) => setPage(page)}
                        label={`${from + 1}-${to} of ${items.length}`}
                        numberOfItemsPerPageList={numberOfItemsPerPageList}
                        numberOfItemsPerPage={itemsPerPage}
                        onItemsPerPageChange={onItemsPerPageChange}
                        showFastPaginationControls
                        selectPageDropdownLabel={'Rows per page'}
                    />*/}