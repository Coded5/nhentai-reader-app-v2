import { StyleSheet } from 'react-native';
export default StyleSheet.create({
   container: {
      backgroundColor: '#3c3c3c',
      flex: 1,
      marginVertical: 0
   },
   header: {
      backgroundColor: '#1f1f1f',
      padding: "3%",
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
   normal_text: {
         color: '#fff'
   },
   under_tab: {
      backgroundColor: '#1f1f1f',
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
   under_tab_button: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   }
});