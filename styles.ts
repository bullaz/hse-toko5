import { Platform, StatusBar, StyleSheet } from "react-native";

export default StyleSheet.create({


  //added to see changes
  container: {
    flex: 1,
    backgroundColor: 'ghostwhite',
  },

  content: {
    flex: 1,
  },
  //added to see changes does it really work why? (the original problem : /////there is a visual problem during the first second when we still retrieving the list question : the two buttons go bellow the end of the screen.. only part of it is visible and then after we get the data the buttons are placed on the right place


  loadingContainer: {
    flex:1,
    justifyContent: "center",
    alignItems: 'center'
  },


  pictoContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // Changed from 'center' to 'flex-start'
    justifyContent: 'flex-start',
    backgroundColor: 'ghostwhite',

    //this is responsable for that padding on top of the screen.. that padding on that title
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
    alignContent: 'center',
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
    width: 130,
    borderRadius: 5
  },


  modalStyle: {
    width: "95%",
    backgroundColor: 'ghostwhite', 
    borderRadius: 30,
    minHeight: "50%",
    padding: 20,
    alignSelf: 'center'
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