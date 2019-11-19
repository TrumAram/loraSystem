import React, {Component} from 'react';
import { Image, Text, View, TouchableOpacity} from 'react-native';

export default class Content extends Component{

   render(){
      const {number, nhietDo, doAm, nhietDoThresh, doAmThresh} = this.props;
      const danGer = (nhietDo > nhietDoThresh) || (doAm < doAmThresh)
      return(
         <View 
            style={{
               height: 85,
               backgroundColor: '#fff',
               paddingHorizontal: 5,
               marginTop: 10,
               justifyContent: 'space-around',
               borderColor: 'red',
               borderWidth: (danGer)? 3:0
            }}>
            <Text
               style={{
                  color: '#000',
                  fontSize: 22,
               }}>Node {number}</Text>

            <View style={{flexDirection: 'row'}}>
               <View style={{flex: 1, flexDirection: 'row', alignItems:'center'}}>
                  <Text>Nhiệt độ:  </Text>
                  <Text style={{color: '#000', fontWeight: 'bold', fontSize: 20}}>{nhietDo}</Text>
                  <Text> °C</Text>
               </View>

               <View style={{flex: 1, flexDirection: 'row', alignItems:'center'}}>
                  <Text>Độ ẩm:  </Text>
                  <Text style={{color: '#000', fontWeight: 'bold', fontSize: 20}}>{doAm}</Text>
                  <Text> %</Text>
               </View>
            </View>
         </View>
      )
   }

}