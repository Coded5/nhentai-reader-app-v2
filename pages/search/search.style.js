import { StyleSheet } from 'react-native';
export default StyleSheet.create({
   container: {
      backgroundColor: '#3c3c3c',
      flex: 1
   },
   search_box: {
      backgroundColor: '#0000ff',
      flexDirection: 'row',
      margin: '2%',
      flex: 1
   },
   search_bar: {
      backgroundColor: '#fff',
      flex: 8
   },serach_button: {
      flex: 2
   },
   result_view: {
      flex: 9
   },
   normal_text: {
      color: '#fff',
      flex: 1,
      flexWrap: 'wrap'
   },
   result_panel: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   }
});