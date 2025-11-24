import { Platform, StatusBar, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: "column",
    alignItems: "center",
    gap: 70,
    paddingLeft: 10,
    paddingRight: 10,
  },
  trow: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    height: 150,
  },
  cell: {
    alignItems: "center",
    justifyContent: "center",
  },
});
