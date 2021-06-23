import { StyleSheet } from "react-native";
export default StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#3c3c3c'
   },
   thumbnail: {
      width: "100%",
      height: 200,
      resizeMode: 'cover'
   },
   detail_view: {
      flex: 1,
      marginHorizontal: "4%",
     // backgroundColor: '#0000ff'
   },
   detail_title: {
      marginTop: "2%"
   },
   preview: {
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
   },
   floating_button: {
      padding: 15,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      backgroundColor: '#ed2553',
      position: 'absolute',
      bottom: '5%',
      right: '5%' 
   },
   normal_text: {
      color: '#fff'
   }
});