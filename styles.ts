import { Platform, StatusBar, StyleSheet } from "react-native";

export default StyleSheet.create({
  pictoContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'ghostwhite',
    ...Platform.select({
      ios: { paddingTop: 40 },
      android: { paddingTop: StatusBar.currentHeight }
    })
  }, 
  box: {
    width: 100,
    height: 100,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderWidth: 1,
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
    backgroundColor: 'ghostwhite'
  },


  modalContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'gray'
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
    elevation: 4
  },

  closeButton: {
    marginTop: 20
  }


})