import { StyleSheet } from "react-native";
export default StyleSheet.create({
   container: {
      backgroundColor: '#3c3c3c',
      flex: 1,
      paddingTop: '4%'
   },
   item: {
      marginVertical: '2%',
      marginHorizontal: '2%',
      backgroundColor: '#1f1f1f',
      borderRadius: 16
   },
   result_item: {
      backgroundColor: '#1f1f1f',
      marginVertical: '2%',
      marginHorizontal: '4%',
      borderRadius: 8,
      flexDirection: 'row',
      padding: "3%"
   },
   result_icon: {
      width: 60, 
      height: 96, 
      borderRadius: 16,
      overflow: 'hidden',
      resizeMode: "stretch",
      marginRight: "4%"
   },
   result_information: {
      flexDirection: 'column',
      flex: 1
   },
   result_tag: {
      flexDirection: 'row',
      flexWrap: 'wrap'
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
   },
   save : {
      width: 50,
      height: 50,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      backgroundColor: '#ed2553',
      position: 'absolute',
      bottom: '5%',
      left: '5%' 
   },
   progressView: {
      //backgroundColor: '#0000ff',
      marginTop: "16%"
   },
   normal_text: {
      color: '#fff',
      flex: 1,
      flexWrap: 'wrap'
   }
});