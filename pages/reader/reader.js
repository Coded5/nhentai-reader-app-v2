import React, { Component } from 'react';
import { View, Text, StyleSheet, NativeModules, Image, TouchableOpacity, Alert } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import {ReactNativeZoomableView}  from '@dudigital/react-native-zoomable-view';

import Header from '../../components/header';

class Reader extends Component {
     state = {
          page: 0,
          showDialog: false
     }
     
     askGoto = (input) => {
          this.setState({showDialog: false});
          const re = /^[0-9]*$/;
          if(re.test(input)) {
               if(parseInt(input) > this.props.reading.num_page || parseInt(input) <= 0) {
                    Alert.alert("Error", "Invalid page number!");
                    return;
               }

               this.setState({page : parseInt(input)});
          } else {
               Alert.alert("Error", "Invalid page number!");
          }
          
     }

     goto = (p) => {
          if(p < 0 || p >= this.props.reading.num_page) {
               return;
          }
          else this.setState({page : p});
     }

     move = (o) => {
          if(this.state.page + o < 0 || this.state.page + o >= this.props.reading.num_page) {
               console.log('ERROR page doesn\'t exist returning');
               return;
          }
          else this.setState({page : this.state.page + o});
     }

     formatFile = (page) => {
          const { Dir } = NativeModules;
          
          //format page number
          const maxPageDigit = 1 + Math.floor(Math.log10(this.props.reading.num_page));
          const p = ('000000000000000'+page).substr(-maxPageDigit);

          return "file:///" + Dir.getFilesDir() + "/"+ this.props.reading.id + "/" + p + this.props.reading.prefix;
     }

     render() {
          return (
               <React.Fragment>
                    <Header navigation={this.props.navigation} name="Read"/>
                    <View style={styles.container}>
                         <View style={styles.header}>
                              <Text style={styles.white_text}>{this.props.reading.title.pretty}</Text>
                              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                   <Text style={styles.white_text}>#{this.props.reading.id}</Text>
                                   <Text style={styles.white_text}>Page : {this.state.page + 1} / {this.props.reading.num_page}</Text>
                              </View>
                         </View>
                         <View style={styles.body}>
                              <ReactNativeZoomableView
                                   maxZoom={5}
                                   minZoom={1}
                                   zoomStep={0.5}
                                   initialZoom={1}
                                   bindToBorders={true}
                              >
                                   <Image source={{uri : this.formatFile(this.state.page)}} style={{width : "100%", height: "100%", resizeMode:"contain"}} />
                    
                              </ReactNativeZoomableView>
                         </View>
                         <View style={styles.bottom}>
                              <TouchableOpacity style={styles.page_button} onPress={() => {this.goto(0)}}>
                                   <Text style={styles.btn_txt}> {"<<"} </Text>
                              </TouchableOpacity>

                              <TouchableOpacity style={styles.page_button} onPress={() => this.move(-1)}>
                                   <Text style={styles.btn_txt}> {"<"} </Text>
                              </TouchableOpacity>

                              <TouchableOpacity style={styles.page_button} onPress={() => this.setState({showDialog: true})}>
                                   <Text style={styles.btn_txt}> Goto </Text>
                              </TouchableOpacity>

                              <TouchableOpacity style={styles.page_button} onPress={() => this.move(1)}>
                                   <Text style={styles.btn_txt}> {">"} </Text>
                              </TouchableOpacity>

                              <TouchableOpacity style={styles.page_button} onPress={() => this.goto(this.props.reading.num_page-1)}>
                                   <Text style={styles.btn_txt}> {">>"} </Text>
                              </TouchableOpacity>
                         </View>
                         <DialogInput isDialogVisible={this.state.showDialog}
                              title={"Go to page"}
                              message={"Please enter page : "}
                              hintInput ={"Page"}
                              submitInput={ (inputText) => {this.askGoto(inputText)} }
                              closeDialog={ () => {this.setState({showDialog: false})}}>
                         </DialogInput>
                    </View>
               </React.Fragment>
          );
     }
}
 
export default Reader;