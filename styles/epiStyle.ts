import { Platform, StatusBar, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'ghostwhite',
    ...Platform.select({
      ios: { paddingTop: 40 },
      android: { paddingTop: StatusBar.currentHeight }
    }),
    paddingLeft: 10,
  }, 

  box: {
    width: 90,
    height: 90,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderWidth: 0,
    borderStyle: 'dashed'
  },

  pressedBox: {
    backgroundColor: 'lightgray',
  },
  boxText: {
    fontWeight: 'bold',
  },


  buttonContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'ghostwhite',
    paddingBottom: 30
  },

  single: {
    flexDirection: 'column',
    alignContent: 'center',
    borderWidth: 0,
    borderStyle: 'dashed'
  },

  singleEpi: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0,
    borderStyle: 'dashed',
    padding: 15
  },

  checkboxContainer: {
    borderWidth: 0,
    flexDirection: 'row',
    justifyContent: 'center'
  },

  bottomButton: {
    width: 120,
  }


})