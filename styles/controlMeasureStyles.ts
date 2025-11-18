import { Platform, StatusBar, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  trow: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    height: 150
  },
  cell: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1
  }
});