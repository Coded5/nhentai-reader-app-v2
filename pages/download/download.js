import React, { Component } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity, Button, ImageBackground } from 'react-native';
import FastImage from 'react-native-fast-image'
import styles from './download.style';
import { Pie } from 'react-native-progress';

import * as Backend from '../../backend';
import Header from '../../components/header';
import Badge from '../../components/badge';

class Download extends Component {
   shouldUpdateProgress = true;
   state = {
      preview_amount: 10
   }

   componentWillUnmount() {
      this.shouldComponentUpdate = false;
   }

   componentDidMount() {
      this.shouldComponentUpdate = true;
      const { doujins } = this.props;
      const { detail } = this.props.route.params;
      for(var i = 0; i < doujins.length; i++) {
         if(String(doujins[i].id) === String(detail.id)) {
            this.setState({progress : 1});
            break;
         }
      }
   }

   updateProgress = (progress) => {
      if(this.shouldComponentUpdate) this.setState({progress: progress});
      if(progress === 1) {
         this.props.onUpdate();
      }
   }

   handleDownload = () => {
      Backend.download_doujin(this.props.route.params.detail, this.updateProgress);
   }

   handleLoadMore = () => {
      this.setState({
         preview_amount: this.state.preview_amount + 10
      });
   }

   //TODO: Use read button if the doujin is already in list
   renderButton = () => {
      if(this.state.progress === undefined) {
         return (
            <TouchableOpacity style={styles.floating_button} onPress={this.handleDownload}>
               <Image 
                  style={{width: 20, height: 20}}
                  source={require('../../assets/download-icon.png')}
               />
            </TouchableOpacity>
         );
      } else if(this.state.progress !== 1) {
         return (
            <View style={styles.floating_button}>
               <Pie progress={this.state.progress} size={20} color={'#ffffff'}/>
            </View>
         );
      } else {
         return (
            <TouchableOpacity style={styles.floating_button} onPress={() => {this.props.navigation.navigate("Reader", {reading : this.props.route.params.detail})}}>
               <Text style={{color: '#fff'}}>Read now</Text>
            </TouchableOpacity>
         );
      }
      
   }

   render() {
      const {detail} = this.props.route.params;
      return (
         <React.Fragment>
            <Header navigation={this.props.navigation}/>
            <View style={styles.container}>
               <ScrollView>
                  <View>
                     <ImageBackground
                        style={styles.thumbnail}
                        source={{uri: Backend.getPageImageURL(detail.media_id, detail.images.pages[0], 1)}}
                     >
                        {this.renderButton()}
                     </ImageBackground>
                  </View>
                  <View style={styles.detail_view}>
                     <View style={styles.detail_title}>
                        <Text style={styles.normal_text}>#{detail.id}</Text>
                        <Text style={[styles.normal_text, {fontWeight: 'bold'}]}>{detail.title.english}</Text>
                        <Text style={[styles.normal_text]}>{detail.title.japanese}</Text>
                        <Text style={[styles.normal_text]}>{detail.num_pages} Pages</Text>
                        <Text style={[styles.normal_text]}>{detail.num_favorites} Favorites</Text> 
                     </View>
                     <View style={{marginTop: "4%"}}>
                        <View style={{flexWrap: 'wrap', flexDirection:'row'}}>
                           {
                              detail.tags.map((i, j) => {
                                 return <Badge text={i.name} textcolor="#fff" color="#777" key={j} />
                              })
                           }
                        </View>
                     </View>
                  </View>
                  <View style={{marginTop: "4%"}}>
                     <Text style={{color: '#fff', fontSize: 25, fontWeight: 'bold', marginHorizontal: "2%", marginVertical: "2%"}}>Previews</Text>
                     <View style={styles.preview}>
                        {
                           detail.images.pages.map((i,j) => {
                              if(j >= this.state.preview_amount) {
                                 return;
                              }
                              return <FastImage 
                                 style={{width: "50%", aspectRatio: i.w/i.h, padding: 0, margin: 0, backgroundColor: '#fff'}}
                                 source={{uri: Backend.getPageImageURL(detail.media_id, i, j+1, true)}}
                                 key={j}
                              />
                           })
                        }
                     </View>
                     {
                        detail.num_pages > this.state.preview_amount && 
                        <Button 
                        title="Load more"
                        color="#ed2553"
                        onPress={this.handleLoadMore}
                     />
                     }
                  </View>
               </ScrollView>
               
            </View>
         </React.Fragment>
      );
   }
}
 
export default Download;