import { Platform, StatusBar, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'ghostwhite',
    ...Platform.select({
      ios: { paddingTop: 40 },
      android: { paddingTop: StatusBar.currentHeight }
    }),
  },
  loginDiv: {
    borderColor: '#d8d8dfff',
    minHeight: 300,
    minWidth: 300,
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    backgroundColor: 'ghostwhite',

    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 8,
  },
  bottomButton: {
    width: 200,
  },
  textInput: {
    width: 250,
  },

  loadingContainer: {
    justifyContent: "center",
    alignItems: 'center',
    padding:10
  },
});