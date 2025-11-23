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
    // ...Platform.select({
    //   ios: { paddingTop: 40 },
    //   android: { paddingTop: StatusBar.currentHeight }
    // }),
    //marginTop: 30
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
    backgroundColor: "lightgray",
    width: "90%",
    padding: 5,
    borderRadius: 10
  },

  pressableToko5: {
    backgroundColor: "lightgray",
    width: "90%",
    padding: 5,
    borderRadius: 10
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
