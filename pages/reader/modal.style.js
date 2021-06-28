import { StyleSheet } from "react-native";
export default StyleSheet.create({
   modal_container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
      flex: 1
   },
   modal_dialog_box: {
      width: "80%",
      backgroundColor: '#3c3c3c',
      borderRadius: 16,
      padding: "4%"
   },
   modal_input: {
      backgroundColor: "#fff",
      borderRadius: 8,
      padding: 2,
      marginVertical: "3%"
   },
   modal_button: {
      padding: "2%",
      backgroundColor: "#ed2553",
      alignSelf: 'flex-start',
      borderRadius: 3,
      marginHorizontal: "2%"
   }
});