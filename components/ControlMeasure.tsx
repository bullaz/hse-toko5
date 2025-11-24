import React from "react";
import { Image, View } from "react-native";
import {
  Button,
  Checkbox,
  DataTable,
  TextInput,
  useTheme,
  Text,
  IconButton,
} from "react-native-paper";
import styles from "../styles/controlMeasureStyles";
import globalStyles from "../styles";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";

export default function ControlMeasure() {
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

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            flexWrap: "wrap",
            flexDirection: "row",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <MaterialDesignIcons
            name="lightbulb-on-outline"
            size={30}
            style={{}}
          />
          <Text
            style={{ textAlign: "center", paddingLeft: 17 }}
            variant="titleMedium"
          >
            Pour ajouter une nouvelle ligne:{" "}
            {"\n"}
            Appuyer sur le bouton en dessus 
            {/* Vous n'avez pas de : {"\n"}- [something...] */}
          </Text>
        </View>
        <DataTable style={{ borderWidth: 2, borderColor: "rgba(0, 0, 0, 1)" , borderRadius:10}}>
          <DataTable.Header>
            <DataTable.Title style={styles.cell}>danger</DataTable.Title>
            <DataTable.Title style={styles.cell}>mesures</DataTable.Title>
            <DataTable.Title style={styles.cell}>en place</DataTable.Title>
          </DataTable.Header>

          <DataTable.Row style={styles.trow}>
            <DataTable.Cell style={styles.cell}>
              <Image
                source={require("../assets/pictogram/test.jpg")}
                style={{ width: 70, height: 70 }}
              />
            </DataTable.Cell>
            <DataTable.Cell style={styles.cell}>
              <TextInput
                value={text}
                multiline={true}
                onChangeText={(text) => setText(text)}
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
          </DataTable.Row>

          <DataTable.Row style={styles.trow}>
            <DataTable.Cell style={styles.cell}>
              <Image
                source={require("../assets/pictogram/test.jpg")}
                style={{ width: 70, height: 70 }}
              />
            </DataTable.Cell>
            <DataTable.Cell style={styles.cell}>
              <TextInput
                value={text}
                multiline={true}
                onChangeText={(text) => setText(text)}
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
          </DataTable.Row>

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
        </DataTable>

        <View>
          <IconButton
            icon="plus"
            size={24}
            iconColor="white"
            onPress={() => {}}
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
    </>
  );
}
