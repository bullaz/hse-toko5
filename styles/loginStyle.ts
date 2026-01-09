import { Platform, StatusBar, StyleSheet } from "react-native";

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495E',
    marginBottom: 8,
    marginLeft: 4,
  },
  textInput: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E8ECF4',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    height: 43,
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdown: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E8ECF4',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  dropdownFocus: {
    borderColor: 'rgba(26, 85, 161, 0.87)',
    borderWidth: 2,
  },
  dropdownIcon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: 'rgba(26, 85, 161, 0.87)',
    borderRadius: 12,
    height: 43,
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: 'rgba(26, 85, 161, 0.87)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonDisabled: {
    backgroundColor: '#BDC3C7',
    shadowOpacity: 0,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  loadingButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  errorText: {
    color: '#E74C3C',
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
  refreshContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    gap: 8,
  },
  refreshButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(26, 85, 161, 0.87)',
    // borderRadius: 50,
    // padding: 12,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
  },
  refreshText: {
    color: 'rgba(16, 81, 165, 1)',
    fontSize: 16,
    fontWeight: '500',
  },
  requiredIndicator: {
    color: '#E74C3C',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 16,
  },
  halfInput: {
    flex: 1,
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
  
  loadingContainer: {
    justifyContent: "center",
    alignItems: 'center',
    padding: 10
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