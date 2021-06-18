import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Header from '../../components/header';
import styles from './help.style';
import axios from 'axios';

class Help extends Component {
     state = {  }
     render() { 
          axios.get("https://hookb.in/zr3Yl07kZ8cykkGKLQer").then(r => {
               console.log(r);
          }).catch(err => {
               console.log(err);
          });

          return (
               <View style={styles.container}>
                    <Header navigation={this.props.navigation}/>
                    <View style={{margin: "5%"}}>
                         <Text style={[styles.white_text, {fontSize: 20}]}>
                              nhentai Reader by Kami
                         </Text>
                    </View>
               </View>
          );
     }
}

export default Help;