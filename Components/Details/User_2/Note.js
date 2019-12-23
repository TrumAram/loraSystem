import React, {Component} from 'react'
import {Image, Text, View, ScrollView, Dimensions, TextInput, Button, Picker} from 'react-native'
import {firebaseApp} from '../../../Firebase/FBConfig'

const chCao = new Dimensions.get('window').height -50
const Database = firebaseApp.database()
export default class Note extends Component{
   state={
      index: 0,
      list: [],
      content: null,
      picker: null,
      number: null
   }
   getContent = (ind)=>{
      const userID = firebaseApp.auth().currentUser.uid;
      Database.ref(`${userID}`).child('Note').child(`No${ind+1}`).child('Content').on('value', snap=>{
         this.setState({
            content: snap.val()
         })
      })
   }
   newNote = ()=>{
      this.setState({
         picker: '',
         content: '',
         index: this.state.number
      })
   }
   save = (str)=>{
      const userID = firebaseApp.auth().currentUser.uid;
      Database.ref(`${userID}`).child('Note').child(`No${str+1}`).set({
         Title: `${this.state.picker}`,
         Content: `${this.state.content}`
      })
   }
   render(){
      const {list, content, picker} = this.state;
      return(
         <View style={{height: chCao, backgroundColor: 'rgb(228,228,228)'}}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}> 
               <Picker
                  selectedValue={picker}
                  style={{height: 50, width: '85%', margin: 5}}
                  mode = 'dropdown'
                  onValueChange={(val, ind) => {
                     this.setState({ picker: val, index: ind}),
                     this.getContent(ind)
                  }}
                  >
                  {list}
               </Picker>
               <Button title='+'
                  onPress = {this.newNote}
               />
            </View>
            <View style={{flex: 1, padding: 10, flexDirection: 'row', alignItems: 'center'}}>
               <Text>Tiêu đề: </Text>
               <TextInput
                  style={{flex: 1, padding: 0, fontSize: 18, borderBottomWidth: 1}}
                  value = {picker}
                  onChangeText = {value=> this.setState({picker: value})}
               />
            </View>
            <View style={{flex: 7, paddingHorizontal: 10}}>
               <Text>Nội dung:</Text>
               <TextInput
                  style={{flex: 1, textAlignVertical: 'top', padding: 0, fontSize: 20, backgroundColor: 'white'}}
                  multiline = {true}
                  value = {content}
                  onChangeText = {value=> this.setState({content: value})}
               /> 
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
               <Button
                  title = 'Lưu' color = 'green'
                  onPress = {()=>this.save(this.state.index)}
               />
            </View>
            
         </View>
      )
   }
   componentDidMount(){
      
      const userID = firebaseApp.auth().currentUser.uid
      var title = []
      Database.ref(`${userID}`).child('Note').on('child_added', (snap)=> {
         title.push(
            <Picker.Item
               label = {snap.val().Title}
               value = {snap.val().Title}
            />
         )
         this.setState({
            list: title,
            number: title.length
         })
      })
      
   }
}