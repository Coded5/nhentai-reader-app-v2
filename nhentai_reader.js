import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Backend from './backend';

import Dashboard from './pages/dashboard/dashboard';
import Search from './pages/search/search';
import Download from './pages/download/download';
import Reader from './pages/reader/reader';

const Stack = createStackNavigator();

class NhentaiReader extends Component {
   state = {
      doujins: []
   };

   componentDidMount() {
      this.loadDoujins();
   }

   loadDoujins = async () => {
      const list = await Backend.listDoujins();
      this.setState({
         doujins: list
      });
   }

   render() { 
      return (
         <NavigationContainer>
            <Stack.Navigator initialRouteName="Dashboard" screenOptions={{headerShown: false}}>
               <Stack.Screen name="Dashboard">
                     {props => <Dashboard {...props} doujins={this.state.doujins} onUpdate={this.loadDoujins}/>}
               </Stack.Screen>
               <Stack.Screen name="Search">
                     {props => <Search {...props} />}
               </Stack.Screen>
               <Stack.Screen name="Download">
                     {props => <Download {...props} doujins={this.state.doujins} onUpdate={this.loadDoujins}/> }
               </Stack.Screen>
               <Stack.Screen name="Reader">
                     {props => <Reader {...props} />}
               </Stack.Screen>
               <Stack.Screen name="Help">
                     {props => <Help {...props} />}
               </Stack.Screen>
            </Stack.Navigator>
         </NavigationContainer>
      );
   }
}
 
export default NhentaiReader;