import React, { Component } from 'react';
import { View, Text, TextInput, Button, FlatList, Image } from 'react-native';
import styles from './search.style';

import Item from './result_item/result_item';
import Header from '../../components/header';
import { searchDoujin } from '../../backend';
import FastImage from 'react-native-fast-image';

class Search extends Component {
   state = {
      query: "",
      current_page: 1
   }

   handleSearch = () => {
      if(this.state.query === "") return;
      let result = searchDoujin(this.state.query, this.state.current_page);
      if(this.flatListRef !== undefined) this.flatListRef.scrollToOffset({ animated: false, offset: 0 });
      this.setState({search_result: result, current_page: 1});
   }

   loadMore = () => {
      if(this.state.current_page >= this.state.search_result.num_pages) return;
      this.setState({ current_page: this.state.current_page + 1 });
      let more_result = searchDoujin(this.state.query, this.state.current_page);
      let result = this.state.search_result.result;
      let final_result = result.concat(more_result.result);
      this.setState({search_result: {result: final_result}});
   }

   renderResultView = () => {
      if(this.state.search_result === undefined) {
         return (
            <View style={styles.result_panel}>
               <FastImage 
                  style={{width:150, height: 150}}
                  source={require("../../assets/magnifying-glass.png")}
               />
               <Text style={{color: '#fff', fontSize: 25}}>Type to start search!</Text>
            </View>
         );
      } else if(this.state.search_result.result.length === 0) {
         return (
            <View style={styles.result_panel}>
               <Text style={{color: '#fff', fontSize: 125}}>:(</Text>
               <Text style={{color: '#fff', fontSize: 25}}>No result found!</Text>
            </View>
         );
      } 
      else {
         return (
            <FlatList 
               ref={(ref) => {this.flatListRef = ref}}
               data={this.state.search_result.result}
               renderItem={({item}) => <Item item={item} navigation={this.props.navigation}/>}
               keyExtractor={(item, i) => String(i)}
               onEndReached={this.loadMore}
            />
         );
      }
   }

   render() { 
      return (
         <React.Fragment>
            <Header navigation={this.props.navigation} name={"Search"}/>
            <View style={styles.container}>
               <View style={styles.search_box}>
                  <TextInput style={styles.search_bar}
                     onChangeText={(txt) => {this.setState({query: txt})}}
                  />
                  <Button style={styles.serach_button} 
                     title="Search"
                     color="#ed2553"
                     onPress={this.handleSearch}
                  />
               </View>
               <View style={styles.result_view}>
                  {this.renderResultView()}
               </View>
            </View>
         </React.Fragment>
      );
   }
}
 
export default Search;