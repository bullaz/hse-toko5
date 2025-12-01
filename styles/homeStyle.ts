import { Platform, StatusBar, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    // //justifyContent: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'ghostwhite',
    // ...Platform.select({
    //   ios: { paddingTop: 40 },
    //   android: { paddingTop: StatusBar.currentHeight }
    // }),
  },
  bottomButton: {
    width: '90%',
  },
});