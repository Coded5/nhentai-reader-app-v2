import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './result_item.style';

import { getPageImageURL } from '../../../backend';
import Badge from '../../../components/badge';

class Item extends PureComponent {
   state = {  }
   render() { 
      console.log(this.props.item);
      return (
         <TouchableOpacity  onPress={() => {this.props.navigation.navigate("Download", {detail: this.props.item})}}>
            <View style={styles.result_item}>
               <View>
               <Image 
                     style={styles.result_icon}
                     source={{uri: getPageImageURL(this.props.item.media_id, this.props.item.images.pages[0], 1)}}
                  />
               </View>
               <View style={styles.result_information}>
                  <Text style={styles.normal_text}>
                     {this.props.item.title.english}
                  </Text>
                  <View style={styles.result_tag}>
                     {
                        this.props.item.tags.map((i, j) => {
                           return <Badge text={i.name} textcolor="#fff" color="#777" key={j} />
                        })
                     }
                  </View>
               </View>
            </View>
         </TouchableOpacity>
      );
   }
}
 
export default Item;