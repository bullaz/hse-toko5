import React, { useCallback, useContext, useState } from "react";
import { Image, ScrollView, View } from "react-native";
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
//import globalStyles from "../styles";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { StatusBar } from "expo-status-bar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CommentaireInterface, DatabaseContext, RootStackParamList } from "../context";
import { useFocusEffect } from "@react-navigation/native";
import { imagePathMapping } from "../utils/imagePathMapping";
import { BACKEND_URL } from "../constants/commonConstants";
import axios from "axios";

type Props = NativeStackScreenProps<RootStackParamList, 'Commentaire'>;

export default function Commentaire({ navigation, route }: Props) {
  const { toko5 } = route.params;

  const theme = useTheme();
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const [visible, setVisible] = useState(false);

  const [deleteVisible, setDeleteVisible] = useState(false);

  const [currentDeleteId, setCurrentDeleteId] = useState<number>();

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const showDeleteModal = () => setDeleteVisible(true);
  const hideDeleteModal = () => setDeleteVisible(false);

  const [listCommentaire, setListCommentaire] = useState<Map<number, CommentaireInterface>>(new Map());

  // const toko5Repository = useContext(DatabaseContext);

  const [loading, setLoading] = useState(true);

  const [saveLoading, setSaveLoading] = useState<boolean>(false);

  const [currentCom, setCurrentCom] = useState<CommentaireInterface>();
  const [currentComText, setCurrentComText] = useState<string>('')
    ;
  const openComModal = async (com: CommentaireInterface) => {
    setCurrentCom(com);
    setCurrentComText(com.commentaire);
    setVisible(true);
  }

  const initialize = async () => {
    let list = new Map();
    // for (let com of toko5?.listCommentaire as CommentaireInterface[]) {
    //   list.set(com.commentaireId, com);
    // }
    setListCommentaire(list);
    setLoading(false);
  }


  const updateListCommentaire = async (comId: number, commentaire: string) => {
    let listCom = structuredClone(listCommentaire);
    let com = listCom.get(comId);
    if (com) {
      com.commentaire = commentaire;
      await axios.put(`${BACKEND_URL}/toko5s/commentaires/${com.commentaireId}`,{params: {commentaire: com.commentaire}});
      setListCommentaire(listCom);
    }
  }

  const deleteCommentaire = async (comId: number) => {
    let listCom = structuredClone(listCommentaire);
    listCom.delete(comId);
    let com = listCom.get(comId);
    if (com) {
      await axios.delete(`${BACKEND_URL}/toko5s/commentaires/${com.commentaireId}`);
    } 
    setListCommentaire(listCom);
  }

  useFocusEffect(
    useCallback(() => {
      initialize();
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
                      <DataTable.Title style={styles.cell}>Nom du commentateur</DataTable.Title>
                      <DataTable.Title style={styles.cell}>Prenom du commentateur</DataTable.Title>
                      <DataTable.Title style={styles.cell}>commentaire</DataTable.Title>
                      <DataTable.Title style={styles.cell}>supprimer</DataTable.Title>
                    </DataTable.Header>


                    {Array.from(listCommentaire.values()).map((com: CommentaireInterface) => (
                      <DataTable.Row style={styles.trow} key={com.commentaireId}>
                        <DataTable.Cell style={styles.cell}>
                          <Text>{com.nom}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell style={styles.cell}>
                          <Text>{com.prenom}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell style={styles.cell}>
                          <IconButton
                            icon="pen"
                            size={24}
                            onPress={() => openComModal(com)}
                          />
                        </DataTable.Cell>

                        <DataTable.Cell style={styles.cell}>
                          <IconButton
                            icon="trash-can-outline"
                            size={24}
                            onPress={() => {
                              setDeleteVisible(true);
                              setCurrentDeleteId(com.commentaireId);
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
                      Commentaire
                    </Text>
                  }
                  value={currentComText}
                  style={{ width: "95%", height: "60%", backgroundColor: 'rgba(234, 235, 232, 0.87)' }}
                  onChangeText={(newValue) => {
                    setCurrentComText(newValue);
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
                    if(currentCom){
                      await updateListCommentaire(currentCom.commentaireId, currentComText);
                    }
                    setVisible(false);
                  }}

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
                Voulez-vous vraiment supprimer ce commentaire?
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', gap: 30 }}>
                <Button style={{
                  width: "30%",
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: 'black',
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
                  oui
                </Button>
                <Button style={{
                  width: "30%",
                  borderRadius: 5,
                  backgroundColor: "ghostwhite",
                  borderWidth: 1,
                  borderColor: 'black'
                }}
                  mode="contained"
                  onPress={async () => {
                  }}
                  //contentStyle={{ flexDirection: 'row-reverse' }}
                  labelStyle={{
                    color: 'black',
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