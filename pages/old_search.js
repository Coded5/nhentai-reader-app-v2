import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button, NativeModules, Image } from 'react-native';
import Header from '../components/header';
import * as RNFS from 'react-native-fs';
import * as Progress from 'react-native-progress';

import { download } from '../components/download';

const NOT_DOWNLOAD = -1;
const DOWNLOADING = 0;
const FINISH = 1;

class Download extends Component {
     state = {
          query: "",
          download_status: {
               status: NOT_DOWNLOAD,
               progress: 0
          },
          on_download_error: false
     }

     //update search query
     updateQuery = (q) => {
          this.setState({query: q});
     }

     //formate page number
     formatPage = (i) => {
          const digit = 1 + Math.floor(Math.log10(this.state.query_result.num_page));
          return ('00000000000000000'+i).substr(-digit);
     }

     //search
     handleSearch = () => {
          //reset download status
          this.setState({
               download_status: {
                    status: NOT_DOWNLOAD
               }
          });
          const { NHRequest } = NativeModules;

          console.log("QUERY Searching for " + this.state.query);
          const rawdata = NHRequest.getNH(this.state.query);
          if(rawdata === "") {
               console.log("ERROR unable to connect to nhentai");
               this.setState({query_result: {error: "Unable to connect to nhentai server"}});
               return;
          }
          try {
               
               const data = JSON.parse(rawdata);
               const p = data.images.pages;
               
               let prefix = "";
               if     (p[0].t === 'j') prefix = ".jpg"
               else if(p[0].t === 'p') prefix = ".png"

               this.setState({
                    query_result: {
                         title: data.title,
                         num_page: data.images.pages.length,
                         img_uri: "https://i.nhentai.net/galleries/"+ data.media_id +"/1"+prefix,
                         pages: data.images.pages,
                         media_id: data.media_id,
                         id: data.id,
                         prefix: prefix
                    }
               });
          } catch (error) {
               console.log(error);
               this.setState({query_result: {error: "Not found"}});
               
          }
     }

     //where magic happen
     handleDownload = async () => {

          const { Dir } = NativeModules;

          this.setState({
               download_status: {
                    status: DOWNLOADING,
                    progress: 0
               }
          });

          const { query_result } = this.state;
          let progress = 0;
          var i;

          //Create download directory
          const base_dir = Dir.getFilesDir() +"/"+ query_result.id
          console.log(base_dir);
          RNFS.mkdir(base_dir);

          //Write metadata
          const metadata = JSON.stringify(query_result);

          console.log("DOWNLOAD Write files at " + base_dir);

          RNFS.writeFile(base_dir + "/metadata.json", metadata, 'utf8').then(s => {
               console.log("Successfully created metadata");
          }).catch(e => {
               console.log(e);
          });

          for(i = 0; i < query_result.pages.length; i++) {
               //console.log(i);

               //Download path and url
               const path = base_dir + "/" + this.formatPage(i) + query_result.prefix;
               const url = "https://i.nhentai.net/galleries/"+query_result.media_id+"/"+(i+1)+query_result.prefix;
               //Download
               download(url, path, 2, 0).then(r => {
                    progress++;
                    if(progress === query_result.num_page) {
                         this.setState({
                              download_status: {
                                   status: FINISH,
                                   progress: progress
                              }
                         });
                         this.props.onUpdate();
                    } else {
                         this.setState({
                              download_status: {
                                   status: DOWNLOADING,
                                   progress: progress
                              }
                         });
                    }
               }).catch(err => {
                    console.log(err);
                    //handle error
                    progress++;
                    if(progress === query_result.num_page) {
                         this.setState({
                              download_status: {
                                   status: FINISH,
                                   progress: progress
                              }
                         });
                         this.props.onUpdate();
                    } else {
                         this.setState({
                              download_status: {
                                   status: DOWNLOADING,
                                   progress: progress
                              }
                         });
                    }
               });
               
               await new Promise(r => setTimeout(r, 50));
          }
     }

     renderProgressbar() {
          const {progress} = this.state.download_status;
          if(this.state.download_status.status === DOWNLOADING) {
               var p = progress/(this.state.query_result.num_page-1)
               return <Progress.Bar progress={p} width={200} />
          } else {
               return (
                    <React.Fragment>
                         <Text style={{color: '#fff', padding: 0, margin: 0}}>Finished downloading!</Text>
                         <Button title="Read now" onPress={() => {
                              this.props.onChangeRead(this.state.query_result)
                              this.props.navigation.navigate("Reader");
                         }} color="#ed2553"/>
                    </React.Fragment>
               )
          }
     }

     renderResult() {
          const { query_result } = this.state;
          if(query_result === undefined) {
               return;
          }
          else if(query_result.error !== undefined) {
               return (
                    <View style={styles.error_container}>
                         <Text style={styles.white_text}>{query_result.error}</Text>
                    </View>
               );
          } else {
               return (
                    <View>
                         <Text style={styles.white_text}>{query_result.title.pretty}</Text>
                         <Text style={styles.white_text}>{query_result.num_page} pages</Text>
                         <View style={{justifyContent: 'center', alignItems: 'center'}}>
                              <Image style={styles.thumbnail} source={{uri : query_result.img_uri}} onError={e => console.log(query_result)}/>
                              {
                                   (this.state.download_status.status === NOT_DOWNLOAD) ? 
                                   (
                                        <Button title="Download" color="#ed2553" onPress={this.handleDownload} />
                                   ) : (this.renderProgressbar())
                              }
                         </View>

                    </View>
               )
          }
     }

     render() { 
          return (
               <React.Fragment>
                    <Header navigation={this.props.navigation} name={"Download"}/>
                    <View style={{padding:20, flex:1, backgroundColor: '#3c3c3c'}}>
                         
                         <View style={styles.search_bar}>
                              <TextInput style={styles.search_box} keyboardType="number-pad" onChangeText={this.updateQuery}/>
                              <Button style={styles.search_button} onPress={this.handleSearch} title="Search" color="#ed2553" />
                         </View>
                         <View style={styles.container}>
                              {this.renderResult()}
                         </View>
                    </View>
               </React.Fragment>
          );
     }
}

const styles = StyleSheet.create({
     thumbnail: {
          width: "56%",
          height: "80%",
          alignItems: 'center',
          resizeMode: 'contain'
     },
     error_container: {
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1
     },
     white_text: {
          color: '#fff'
     },  
     search_box: {
          backgroundColor: '#fff',
          flex: 7
     },
     search_button: {
          flex: 1
     },
     search_bar: {
          flexDirection: 'row'
     },
     container: {
          marginTop: "10%",
          marginBottom: "2%",
          marginLeft: "2%",
          marginRight: "2%",
          borderRadius: 8,
          padding: "2%",
          backgroundColor: '#1f1f1f',
          flex: 1
     }
});
 
export default Download;