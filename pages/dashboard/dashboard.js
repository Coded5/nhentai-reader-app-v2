import React, { Component } from 'react';
import { View, Text, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import styles from './dashboard.style';

import Header from '../../components/header';

class Dashboard extends Component {
     state = {  }

     renderItem = ({item}) => {
          return (
               <TouchableOpacity style={styles.child_container} onPress={() => {this.props.onRead(item); this.props.navigation.navigate("Reader")}}>
                    <Image style={{width: 56, height: 80, marginRight: "4%"}} source={{uri : item.img_uri}} onError={e => console.log(query_result)}/>
                    <Text style={{color: '#fff', flex: 1, flexWrap: 'wrap'}}>{item.title.english}</Text>
                    <TouchableOpacity onPress={() => this.props.onDelete(item)} style={{margin: 0, flex: 0.25, alignItems: 'center', justifyContent: 'center'}}>
                         <Text style={{fontSize: 25}}>🗑️</Text>
                    </TouchableOpacity>
               </TouchableOpacity>
          );
     }
     
     render() {
          return (
               <React.Fragment>
                    <Header navigation={this.props.navigation} goto={"Help"} />
                    <View style={styles.container}>
                         <View style={{padding: 20}}>
                              {
                                   (this.props.nh.length !== 0) ? (
                                        <React.Fragment>
                                             <FlatList 
                                                  data={this.props.nh}
                                                  renderItem={this.renderItem}
                                                  keyExtractor={item => ""+item.id}
                                             />

                                             
                                        </React.Fragment>
                                   ) : (
                                        <View style={styles.nothing}>
                                             <Text style={{color: '#fff', margin: '2%'}}>Theres nothing yet</Text>
                                             <Button
                                                  onPress={() => {this.props.navigation.navigate("Download")}}
                                                  title="Go to download"
                                                  color="#ed2553"
                                             />
                                        </View>
                                   )
                              }
                         </View>     
                    </View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Download")} style={styles.add}>
                         <Text style={{color: '#fff', fontSize: 25}}>+</Text>
                    </TouchableOpacity>
               </React.Fragment>
          );
     }
}
 
export default Dashboard;