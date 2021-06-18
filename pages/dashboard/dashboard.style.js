import { StyleSheet } from "react-native";
export default StyleSheet.create({
   body: {
      backgroundColor: '#3c3c3c',
      flex: 1
   },
   white_text: {
      color: '#fff'
   },
   header: {
      backgroundColor: '#1f1f1f',
      padding: "4%"
   },
   child_container: {
      flex: 1,
      backgroundColor: '#1f1f1f',
      padding: "5%",
      borderRadius: 8,
      marginTop: "1%",
      marginBottom: "1%",
      flexDirection: 'row'
   },
   nothing: {
      alignItems: 'center',
      justifyContent: 'center'
   },
   container: {
      flex: 13,
      padding: 0,
      backgroundColor: '#3c3c3c'
   },
   add : {
      width: 50,
      height: 50,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      backgroundColor: '#ed2553',
      position: 'absolute',
      bottom: '5%',
      right: '5%' 
   }
});