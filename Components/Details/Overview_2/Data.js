import React, {Component} from 'react';
import { Image, Text, View, TouchableOpacity, ImageBackground} from 'react-native';

export default class Content extends Component{

   render(){
      const {number, nhietDo, doAm, nhietDoThresh, doAmThresh, battery} = this.props;
      const danGer = (nhietDo > nhietDoThresh) || (doAm < doAmThresh)
      return(
         <View 
            style={{
               height: 100,
               backgroundColor: '#fff',
               paddingHorizontal: 5,
               marginTop: 10,
               justifyContent: 'space-around',
               borderColor: 'red',
               borderWidth: (danGer)? 4:0
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
               <Text style={{ color: '#000', fontSize: 22}}>Node {number}</Text>
               <ImageBackground 
                  source={require('../../img/Overview/battery.png')}
                  style={{width:40, height: 25, justifyContent: 'center'}}
                  resizeMode={'contain'}>
                     <View 
                        style={{
                           width:34, marginLeft:4, height: 19,
                           borderRadius:3, alignItems:'center',
                           backgroundColor: battery > 40? '#38e100':'red'}}>
                        <Text style={{color: 'black', fontSize: 12}}>{battery}</Text>
                     </View>
               </ImageBackground>
            </View>
            <View style={{flexDirection: 'row'}}>
               <View style={{flex: 1, flexDirection: 'row', alignItems:'center'}}>
                  <Text>Nhiệt độ:  </Text>
                  <Text style={{color: '#000', fontWeight: 'bold', fontSize: 22}}>{nhietDo}</Text>
                  <Text> °C</Text>
               </View>

               <View style={{flex: 1, flexDirection: 'row', alignItems:'center'}}>
                  <Text>Độ ẩm:  </Text>
                  <Text style={{color: '#000', fontWeight: 'bold', fontSize: 22}}>{doAm}</Text>
                  <Text> %</Text>
               </View>
            </View>
         </View>
      )
   }

}