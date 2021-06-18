import { StyleSheet } from "react-native";
export default StyleSheet.create({
   header: {
        backgroundColor: '#2b2b2b',
        padding: "3%",
        flex: 1
   },
   body: {
        backgroundColor: '#3c3c3c',
        flex: 8
   },
   bottom: {
        flex : 1,
        flexDirection: 'row',
        backgroundColor: '#1f1f1f'
   }
   ,
   white_text: {
        color: '#fff'
   },
   container: {
        flex: 1,
        flexDirection: 'column'
   },
   page_button: {
        margin: "1%",
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
   },
   btn_txt: {
        color: '#fff',
        fontSize: 25
   }
});