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
   result_item: {
      backgroundColor: '#1f1f1f',
      marginVertical: '2%',
      marginHorizontal: '4%',
      borderRadius: 8,
      flexDirection: 'row',
      padding: "3%"
   },
   result_icon_view: {
      backgroundColor: "#00ff00"
   },
   result_icon: {
      width: 60, 
      height: 96, 
      resizeMode: "stretch",
      marginRight: "4%"
   },
   result_information: {
      flexDirection: 'column',
      flex: 1
   },
   result_name: {
      backgroundColor: '#0000ff',
   },
   result_tag: {
      flexDirection: 'row',
      flexWrap: 'wrap'
   },
   normal_text: {
      color: '#fff',
      flex: 1,
      flexWrap: 'wrap'
   }
});