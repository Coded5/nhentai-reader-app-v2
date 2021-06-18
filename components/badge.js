import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Badge extends Component {
   state = {  }
   render() { 
      return (
         <View style={[styles.badge, {backgroundColor: this.props.color}]}>
            <Text style={[{color: this.props.textcolor}]}>{this.props.text}</Text>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   badge: {
       padding: "1%",
       margin: "0.5%",
       borderRadius: 6,
       alignSelf: 'flex-start',
   }
});
 
export default Badge;