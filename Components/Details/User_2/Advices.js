import React, {Component} from 'react'
import {Image, Text, View, Modal,TouchableOpacity, Dimensions, Linking, TextInput} from 'react-native'
import overstyle from '../../styles/overstyle';

const chCao = new Dimensions.get('window').height -50
const chRong = new Dimensions.get('window').width

const ggSearch = 'https://www.google.com/search?q='
const question_1 = 'Tin tức về cháy rừng mới nhất'
const question_2 = 'Cách phòng chống cháy rừng ở Việt Nam'
const question_3 = 'Quy định về quản lý rừng'
const question_4 = 'Các loại gỗ quý hiếm ở Việt Nam'

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
                     source={require('../../img/User/search.png')}
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
               source = {require('../../img/User/questions.png')}
               style = {{width: '100%', height: 185}}/>
         </View>
      )
   }
   
}