import React from "react";
import { Image, Text, View } from "react-native"
import { Button, Checkbox, DataTable, TextInput, useTheme } from 'react-native-paper';
import styles from "../styles/controlMeasureStyles"
import globalStyles from "../styles";


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

    const [text, setText] = React.useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget velit mauris.");

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    return (
        <>
            <View style={styles.container}>
                <DataTable style={{ borderWidth: 3, borderColor: 'rgba(0, 0, 0, 1)' }}>
                    <DataTable.Header>
                        <DataTable.Title style={styles.cell}>danger</DataTable.Title>
                        <DataTable.Title style={styles.cell}>mesures</DataTable.Title>
                        <DataTable.Title style={styles.cell}>en place</DataTable.Title>
                    </DataTable.Header>

                    
                    <DataTable.Row style={styles.trow}>
                        <DataTable.Cell style={styles.cell}><Image source={require('../assets/pictogram/test.jpg')} style={{ width: 70, height: 70 }} /></DataTable.Cell>
                        <DataTable.Cell style={styles.cell}>
                            <TextInput
                                value={text}
                                multiline={true}
                                onChangeText={text => setText(text)} />
                        </DataTable.Cell>
                        <DataTable.Cell style={styles.cell}>
                            <Checkbox
                                status={checked ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked(!checked);
                                }}
                            />
                        </DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row style={styles.trow}>
                        <DataTable.Cell style={styles.cell}><Image source={require('../assets/pictogram/test.jpg')} style={{ width: 70, height: 70  }} /></DataTable.Cell>
                        <DataTable.Cell style={styles.cell}>
                            <TextInput
                                value={text}
                                multiline={true}
                                onChangeText={text => setText(text)} />
                        </DataTable.Cell>
                        <DataTable.Cell style={styles.cell}>
                            <Checkbox
                                status={checked ? 'checked' : 'unchecked'}
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
            </View>
        </>
    );
};