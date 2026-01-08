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
    minHeight: 205,
    minWidth: "95%",
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
    width: "90%",
  },
  textInput: {
    width: 250,
  },

  loadingContainer: {
    justifyContent: "center",
    alignItems: 'center',
    padding:10
  },






  dropdown: {
      height: 50,
      width: "90%",
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    }
});