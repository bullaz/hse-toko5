import { Platform, StatusBar, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: "column",
    justifyContent: 'space-between',
    alignItems: "center",
    alignContent: 'center',
    gap: 60,
    // paddingLeft: 10,
    // paddingRight: 10,
  },
  trow: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  cell: {
    alignItems: "center",
    justifyContent: "center",
  },


  modalStyle: {
    width: "95%", 
    backgroundColor: 'ghostwhite', 
    borderRadius: 30,
    minHeight: "40%", //currently we support only numbers in height prop warning
    padding: 20,
    alignSelf: 'center'
  }
});
