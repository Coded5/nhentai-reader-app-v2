import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Button } from 'react-native';
import styles from './dashboard.style';

import * as Backend from '../../backend';
import Header from '../../components/header';
import Badge from '../../components/badge';

class Dashboard extends Component {
   state = {}

   renderItem = ({item}) => {
      return (
         <TouchableOpacity onPress={() => {this.props.navigation.navigate("Download", {detail: item})}}>
            <View style={styles.result_item}>
               <View>
                  <Image 
                     style={styles.result_icon}
                     source={{uri: Backend.getPageImageURL(item.media_id, item.images.pages[0], 1, true)}}
                  />
                  <View style={styles.progressView}>
                     <TouchableOpacity onPress={() => {Backend.deleteDoujin(item.id, this.props.onUpdate)}}>
                        <Image
                           style={{width:30, height: 30, marginTop: "8%"}} 
                           source={require('../../assets/trash-bin.png')}
                        />
                     </TouchableOpacity>
                  </View>
               </View>
               <View style={styles.result_information}>
                  <Text style={[styles.normal_text, {fontWeight: 'bold'}]}>
                     {item.title.english}
                  </Text>
                  <Text style={styles.normal_text}>
                     #{item.id}
                  </Text>
                  <View style={styles.result_tag}>
                     {
                        item.tags.map((i, j) => {
                           return <Badge text={i.name} textcolor="#fff" color="#777" key={j} />
                        })
                     }
                  </View>
               </View>
            </View>
         </TouchableOpacity>
      );
   }

   renderDashboard = () => {
      if(this.props.doujins.length === 0) {
         return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
               <Text style={{color: '#fff', margin: '2%'}}>Theres nothing yet</Text>
               <Button
                  onPress={() => {this.props.navigation.navigate("Search")}}
                  title="start searching"
                  color="#ed2553"
               />
            </View>
         );
      } else {
         return (
            <FlatList
               data={this.props.doujins}
               renderItem={this.renderItem}
               keyExtractor={item => String(item.id)}
            />
         );
      }
   }

   render() {
      return (
         <React.Fragment>
            <View style={styles.container}>
               {this.renderDashboard()}
               <TouchableOpacity onPress={() => this.props.navigation.navigate("Search")} style={styles.add}>
                  <Text style={{color: '#fff', fontSize: 25, fontWeight: 'bold'}}>+</Text>
               </TouchableOpacity>
            </View>
         </React.Fragment>
      );
   }
}
 
export default Dashboard;