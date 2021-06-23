import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
      borderRadius: 32,
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
   normal_text: {
      color: '#fff',
      flex: 1,
      flexWrap: 'wrap'
   }
});