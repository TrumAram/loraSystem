import React, {Component} from 'react'
import {Image, Text, View, Modal,TouchableOpacity, Dimensions, Linking, TextInput} from 'react-native'
import overstyle from '../../styles/overstyle';

const chCao = new Dimensions.get('window').height -24
const chRong = new Dimensions.get('window').width

const ggSearch = 'https://www.google.com/search?q='
const question_1 = 'Xử lý khi pH ao nuôi tôm thấp'
const question_2 = 'Xử lý khi pH ao nuôi tôm cao'
const question_3 = 'Xử lý khi độ mặn ao nuôi tôm thấp'
const question_4 = 'Xử lý khi độ mặn ao nuôi tôm cao'

export default class Advices extends Component{
   state = {
      search: ''
   }
   getAdvices(question){
      Linking.openURL(`${ggSearch}${question}`)
   }
   render(){
      return(
         <View style={{height: chCao, width: '100%'}}>
            <View style={overstyle.search}>
               <TextInput
                  placeholder={'Tìm kiếm'}
                  style={{flex: 1, fontSize: 15, marginLeft: 10}}
                  onChangeText = {(value) => this.setState({search: value})}
               />
               <TouchableOpacity onPress = {() => this.getAdvices(this.state.search)}>
                  <Image
                     source={require('../../img/Overview/search.png')}
                     style={{height: 25, width: 25, marginRight: 10}}/>
               </TouchableOpacity>
            </View>
            
            <View style={{flex: 6, paddingHorizontal: 10}}>
               <Text style={{color: '#000', fontSize: 17, alignSelf: 'center'}}>Câu hỏi thường gặp</Text>
               <TouchableOpacity
                  style={overstyle.advices}
                  onPress = {() => this.getAdvices(question_1)}
               >
                  <Text>- {question_1}.</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={overstyle.advices}
                  onPress = {() => this.getAdvices(question_2)}
               >
                  <Text>- {question_2}.</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={overstyle.advices}
                  onPress = {() => this.getAdvices(question_3)}
               >
                  <Text>- {question_3}.</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={{height: 50, width: '100%', justifyContent: 'center'}}
                  onPress = {() => this.getAdvices(question_4)}
               >
                  <Text>- {question_4}.</Text>
               </TouchableOpacity>
            </View>
            <Image
               source = {require('../../img/Overview/questions.png')}
               style = {{width: '100%', height: 165}}/>
         </View>
      )
   }
   
}