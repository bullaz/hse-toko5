import { Platform, StatusBar, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white"
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
    width: '90%'
  },
  checkboxContainer: {
    borderWidth: 0,
    flexDirection: 'row',
    justifyContent: 'center'
  },
});