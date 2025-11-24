import React from "react";
import { Image, KeyboardAvoidingView, Platform, View } from "react-native";
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
} from "react-native-paper";
import styles from "../styles/controlMeasureStyles";
import globalStyles from "../styles";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";

export default function Commentaire() {
  const theme = useTheme();
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  /* const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length); */

  const [checked, setChecked] = React.useState(false);

  const [text, setText] = React.useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget velit mauris."
  );

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <>
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
                  width:"100%"
                  // alignContent: "center",
                }}>
              <View
                style={{
                  marginTop: 40,
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
                  Pour ajouter une nouvelle ligne:{" "}
                  {"\n"}
                  Appuyer sur le bouton en dessous
                  {/* Vous n'avez pas de : {"\n"}- [something...] */}
                </Text>
              </View>

              <DataTable style={{
                backgroundColor: 'ghostwhite',
                borderColor: "rgba(0, 0, 0, 1)",
                borderRadius: 10,
                width: "95%",
                borderEndColor: 'ghostwhite',
                shadowColor: "black",
                shadowOpacity: 0.26,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 8,
                elevation: 5,
              }}>
                <DataTable.Header>
                  <DataTable.Title style={styles.cell}>danger</DataTable.Title>
                  <DataTable.Title style={styles.cell}>mesures</DataTable.Title>
                  <DataTable.Title style={styles.cell}>en place</DataTable.Title>
                  <DataTable.Title style={styles.cell}>supprimer</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row style={styles.trow}>
                  <DataTable.Cell style={styles.cell}>
                    <Image
                      source={require("../assets/pictogram/test.jpg")}
                      style={{ width: 30, height: 30 }}
                    />
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.cell}>
                    {/* <TextInput
                  value={text}
                  multiline={true}
                  onChangeText={(text) => setText(text)}
                /> */}
                    <IconButton
                      icon="pen"
                      size={24}
                      onPress={showModal}
                    />
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.cell}>
                    <Checkbox
                      status={checked ? "checked" : "unchecked"}
                      onPress={() => {
                        setChecked(!checked);
                      }}
                    />
                  </DataTable.Cell>

                  <DataTable.Cell style={styles.cell}>
                    <IconButton
                      icon="trash-can-outline"
                      size={24}
                      onPress={showModal}
                    />
                  </DataTable.Cell>

                </DataTable.Row>

                <DataTable.Row style={styles.trow}>
                  <DataTable.Cell style={styles.cell}>
                    <Image
                      source={require("../assets/pictogram/test.jpg")}
                      style={{ width: 30, height: 30 }}
                    />
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.cell}>
                    <IconButton
                      icon="pen"
                      size={24}
                      onPress={() => { }}
                    />
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.cell}>
                    <Checkbox
                      status={checked ? "checked" : "unchecked"}
                      onPress={() => {
                        setChecked(!checked);
                      }}
                    />
                  </DataTable.Cell>

                  <DataTable.Cell style={styles.cell}>
                    <IconButton
                      icon="trash-can-outline"
                      size={24}
                      onPress={() => { }}
                    />
                  </DataTable.Cell>

                </DataTable.Row>
              </DataTable>
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
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalStyle}>
            <View style={{
              flex: 1,
              flexWrap: 'wrap',
              flexDirection: 'column',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10
            }}>
              <TextInput
                left={<TextInput.Icon icon="pen" />}
                label={
                  <Text
                    style={{ textAlign: "center", color: 'rgba(77, 77, 71, 0.87)', }}
                    variant="titleMedium"
                  >
                    Mesure à prendre
                  </Text>
                }
                style={{ width: "90%", height: "70%", backgroundColor: 'rgba(234, 235, 232, 0.87)' }}
                onChangeText={text => setText(text)}
                underlineColor='darkgrey'
              />

              <Button style={{
                width: "90%",
                borderRadius: 5,
                backgroundColor: "rgba(26, 85, 161, 0.87)"
              }}
                mode="contained"
                onPress={() => {
                }}

                //test qr
                //onPress = {requestPermission}
                //onPress = {() => {navigation.navigate('ScanQr')}}

                contentStyle={{ flexDirection: 'row-reverse' }}
                labelStyle={{
                  color: theme.colors.secondary, // Manually set to theme contrast color
                  fontSize: 16
                }}
              >
                valider
              </Button>

            </View>
          </Modal>

          {/* also add a delete modal */}

        </Portal>
      </PaperProvider>
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