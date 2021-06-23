import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import styles from './reader.style';
import * as RNFS from 'react-native-fs';

import Header from '../../components/header';

class Reader extends Component {
   state = {
      page: 1
   }

   getSource = () => {
      const { reading } = this.props.route.params;
      const prefix = {
         "p": "png",
         "j": "jpg"
      }
      
      return "file://" + RNFS.DocumentDirectoryPath + "/doujins/" + reading.id + "/" + this.state.page + "." + prefix[reading.images.pages[this.state.page-1].t];
   }

   clamp = (x, min=1, max=this.props.route.params.reading.num_pages) => {
      return Math.min(Math.max(x, min), max);
   }

   nextPage = () => {
      this.setState({
         page: this.clamp(this.state.page+1)
      });
   }

   lastPage = () => {
      this.setState({
         page: this.clamp(this.state.page-1)
      });
   }

   render() { 
      return (
         <React.Fragment>
            <View style={styles.header}>
               <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <TouchableOpacity onPress={() => {this.setState({page: 1})}}>
                     <Text style={[styles.normal_text]}> {"<First page"} </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {this.props.navigation.goBack()}}>
                     <Text style={[styles.normal_text]}> {"Go back"} </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {this.setState({page: this.props.route.params.reading.num_pages})}}>
                     <Text style={[styles.normal_text]}> {"Last page>"} </Text>
                  </TouchableOpacity>
               </View>
               <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: "1%"}}>
                  <Text style={styles.normal_text}>Page : {this.state.page} / {this.props.route.params.reading.num_pages}</Text>
                  <Text style={styles.normal_text}>#{this.props.route.params.reading.id}</Text>
                     
               </View>
            </View>
            <GestureRecognizer style={styles.container} 
               onSwipeLeft={this.nextPage} 
               onSwipeRight={this.lastPage}>
               <Image 
                  source={{uri: this.getSource()}}
                  style={{width : "100%", height: "100%", resizeMode:"contain"}}
               />
            </GestureRecognizer>
         </React.Fragment>
      );
   }
}
 
export default Reader;