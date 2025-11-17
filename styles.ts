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
    backgroundColor: 'ghostwhite'
  },

  single: {
    flexDirection: 'column',
    alignContent: 'center',
    borderWidth: 0,
    borderStyle: 'dashed'
  },

  checkboxContainer: {
    borderWidth: 0,
    flexDirection: 'row',
    justifyContent: 'center'
  }

  /*
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
  },


  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    /*shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 0,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  }*/


})