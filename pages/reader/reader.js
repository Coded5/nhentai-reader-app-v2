import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import styles from './reader.style';
import modal_styles from './modal.style';
import * as RNFS from 'react-native-fs';
import FastImage from 'react-native-fast-image';

class Reader extends Component {
   state = {
      page: 3,
      showGoto: false
   }

   componentDidMount() {
      const { reading } = this.props.route.params;
      let uris = [];
      for(var i = 1; i <= reading.num_pages; i++) {
         uris.push({uri : this.getSource(i)});
      }
      FastImage.preload(uris);
      console.log("PRELOAD " + uris.length + " IMAGES");
   }

   getSource = (page) => {
      const { reading } = this.props.route.params;
      const prefix = {
         "p": "png",
         "j": "jpg"
      }
   
      return "file://" + RNFS.DocumentDirectoryPath + "/doujins/" + reading.id + "/" + page + "." + prefix[reading.images.pages[page-1].t];
   }

   clamp = (x, min=1, max=this.props.route.params.reading.num_pages) => {
      return Math.min(Math.max(x, min), max);
   }

   nextPage = () => this.setState({page: this.clamp(this.state.page+1)});
   lastPage = () => this.setState({page: this.clamp(this.state.page-1)});

   goto = () => {
      if(this.state.goto === undefined || isNaN(this.state.goto)) {
         this.setState({showGoto: false});
         return;
      }

      this.setState({
         showGoto: false,
         page: this.clamp(this.state.goto)
      });
   }

   render() { 
      const { reading } = this.props.route.params;
      return (
         <React.Fragment>
            <View style={styles.header}>
               <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                  <Text style={styles.normal_text}>{"< Go back"}</Text>
               </TouchableOpacity>
               <Text style={styles.normal_text}># {reading.id}</Text>
            </View>
            <View style={{flex: 1}}>
               <FastImage 
                  source={{uri: this.getSource(this.state.page)}}
                  style={{width : "100%", aspectRatio: reading.images.pages[this.state.page-1].w/reading.images.pages[this.state.page-1].h, resizeMode:"contain"}}
               />
            </View>
            <Modal transparent visible={this.state.showGoto}>
               <View style={modal_styles.modal_container}>
                  <View style={modal_styles.modal_dialog_box}>
                     <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>Go to page</Text>
                     <TextInput style={modal_styles.modal_input} onChangeText={(txt) => this.setState({goto: txt})}/>
                     <View style={{flexDirection: 'row' ,justifyContent: 'flex-end'}}>
                        <TouchableOpacity style={modal_styles.modal_button} onPress={() => this.setState({showGoto: false})}>
                           <Text style={styles.normal_text}>CANCEL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={modal_styles.modal_button} onPress={this.goto}>
                           <Text style={styles.normal_text}>OK</Text>
                        </TouchableOpacity>
                     </View>
                  </View>
               </View>
            </Modal>
            <View style={styles.under_tab}>
               <TouchableOpacity style={styles.under_tab_button} onPress={() => this.setState({page : 1})}>
                  <Text style={[styles.normal_text, {fontSize: 25}]}>{"<<"}</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.under_tab_button} onPress={this.lastPage}>
                  <Text style={[styles.normal_text, {fontSize: 25}]}>{"<"}</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.under_tab_button} onPress={() => this.setState({showGoto: true})}>
                  <Text style={[styles.normal_text]}>{this.state.page} / {reading.num_pages}</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.under_tab_button} onPress={this.nextPage}>
                  <Text style={[styles.normal_text, {fontSize: 25}]}>{">"}</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.under_tab_button} onPress={() => this.setState({page : reading.num_pages})}>
                  <Text style={[styles.normal_text, {fontSize: 25}]}>{">>"}</Text>
               </TouchableOpacity>
            </View>
         </React.Fragment>
      );
   }
}
 
export default Reader;