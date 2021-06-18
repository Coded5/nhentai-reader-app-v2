import React, { Component } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, FlatList } from 'react-native';
import styles from './search.style';

import run_search from './search_engine';
import Header from '../../components/header';
import Badge from '../../components/badge';

class Search extends Component {
   state = {
      query: ""
   }

   handleSearch = () => {
      result = run_search(this.state.query);
      this.setState({result: result});
   }

   renderResultView = () => {
      if(this.state.result === undefined) {
         return <Text>Start typing to search</Text>;
      } else if(this.state.result === 0) {
         return <Text>No result found</Text>;
      } else {
         return (
            <FlatList 
               data={this.state.result}
               renderItem={this.renderSearchResult}
               keyExtractor={(item, i) => String(i)}
            />
         );
      }
   }

   renderSearchResult = ({item}) => {
      return (
         <TouchableOpacity  onPress={() => {console.log("take a look")}}>
            <View style={styles.result_item}>
               <View>
               <Image 
                     style={styles.result_icon}
                     source={{uri: item.thumbnail}}
                  />
               </View>
               <View style={styles.result_information}>
                  <Text style={styles.normal_text}>
                     {item.title}
                  </Text>
                  <View style={styles.result_tag}>
                     {
                        item.tags.map((i, j) => {
                           return <Badge text={i} textcolor="#fff" color="#777" key={j} />
                        })
                     }
                  </View>
               </View>
            </View>
         </TouchableOpacity>
      );
   }

   render() { 
      return (
         <React.Fragment>
            <Header navigation={this.props.navigation} name={"Download"}/>
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