import { Platform, StatusBar, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    backgroundColor: "ghostwhite",

    ...Platform.select({
      ios: { paddingTop: 40 },
      android: { paddingTop: StatusBar.currentHeight }
    }),

  },

  verticalLine: {
    width: 2, // Adjust the thickness of the line
    height: '100%', // Make it span the full height of its parent container
    backgroundColor: 'gray', // Set the color of the line
  },

  toko5: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "lightgray",
    // backgroundColor: 'rgba(213, 238, 248, 1)',
    width: "90%",
    padding: 4,
    //marginTop: 30,
    borderRadius: 10,

    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },

  pressableToko5: {
    backgroundColor: "lightgray",
    width: "90%",
    padding: 5,
    borderRadius: 10,
  },

  deleteModalStyle: {
    width: "90%", 
    backgroundColor: 'ghostwhite', 
    borderRadius: 30,
    height: "25%", //currently we support only numbers in height prop warning
    // padding: 20,
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center'
  },

  codeModalStyle: {
    width: "80%", 
    backgroundColor: 'ghostwhite', 
    borderRadius: 30,
    height: "45%", //currently we support only numbers in height prop warning
    // padding: 20,
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center'
  },
  

  //   box: {
  //     width: 90,
  //     height: 90,
  //     margin: 10,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     alignSelf: 'stretch',
  //     borderWidth: 0,
  //     borderStyle: 'dashed'
  //   },

  //   pressedBox: {
  //     backgroundColor: 'lightgray',
  //   },
  //   boxText: {
  //     fontWeight: 'bold',
  //   },

  //   buttonContainer: {
  //     padding: 10,
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //     alignItems: 'center',
  //     backgroundColor: 'ghostwhite',
  //     paddingBottom: 30
  //   },

  //   single: {
  //     flexDirection: 'column',
  //     alignContent: 'center',
  //     borderWidth: 0,
  //     borderStyle: 'dashed'
  //   },

  //   singleEpi: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     borderWidth: 0,
  //     borderStyle: 'dashed',
  //     padding: 15
  //   },

  //   checkboxContainer: {
  //     borderWidth: 0,
  //     flexDirection: 'row',
  //     justifyContent: 'center'
  //   },

  //   bottomButton: {
  //     width: 120,
  //   }
});
