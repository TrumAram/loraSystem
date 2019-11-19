import React, {Component} from 'react'
import {Text, TextInput, View, Modal, Alert,
   Dimensions, TouchableOpacity, ToastAndroid} from 'react-native'
import userstyle from '../../styles/userstyle'
import {firebaseApp} from '../../../Firebase/FBConfig'

const chCao = new Dimensions.get('screen').height
const Database = firebaseApp.database();

export default class Setting extends Component{
   state = {
      newPassword: '',
      repeatPassword: '',
      nhietDo: null,
      doAm: null,
      newNhietDo: null,
      newDoAm: null
   }
   updatePassword = () =>{
      {this.state.repeatPassword == this.state.newPassword?
         firebaseApp.auth().currentUser.updatePassword(this.state.newPassword)
         .then(()=>{
            ToastAndroid.showWithGravity('Đổi mật khẩu thành công !', ToastAndroid.SHORT, ToastAndroid.CENTER)
            this.setState({newPassword: '', repeatPassword: ''})
         })
         .catch(function(error) {
            Alert.alert('', 'Đổi mật khẩu thất bại. Vui lòng thử lại');
         })
         : Alert.alert('', 'Nhập mật khẩu không giống nhau. Hãy nhập lại.');
      }
   }
   changeThreshold = () =>{
      const userID = firebaseApp.auth().currentUser.uid;
      if (this.state.newNhietDo != null || this.state.newDoAm!=null){
         Database.ref(`${userID}`).child('Threshold').set({
            nhietDo: (this.state.newNhietDo!= null)? Number(this.state.newNhietDo): Number(this.state.nhietDo),
            doAm: (this.state.newDoAm!=null)? Number(this.state.newDoAm): Number(this.state.doAm)
         })
         ToastAndroid.showWithGravity('Thay đổi thành công !', ToastAndroid.SHORT, ToastAndroid.CENTER)
      }else{
         Alert.alert('', 'Bạn chưa nhập giá trị mới.')
      }
      
   }
   render(){
      return(
         <View style={{flex:1, alignItems: 'center', backgroundColor: '#e0e0e0'}}>
            <View style={{width: '100%', height:150, alignItems: 'center', padding: 10, backgroundColor: 'white'}}>
               <Text style={{ fontSize: 18, color: '#0149f3'}}>Thay đổi ngưỡng cảnh báo</Text>
               <View style={{flex:1, flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center'}}>
                  <View style={{flex: 8}}>
                     <View style={{flexDirection: 'row', marginBottom: 5, alignItems:'center'}}>
                        <Text>Nhiệt độ</Text>
                        <TextInput 
                           style={{
                              width: 70, borderWidth: 1, marginLeft: 10, 
                              marginRight: 5, fontSize: 17, paddingVertical: 3}}
                           keyboardType={'number-pad'}
                           placeholder={`${this.state.nhietDo}`}
                           onChangeText={text=> this.setState({newNhietDo: text})}
                        />
                        <Text>°C</Text>
                     </View>
                     <View style={{flexDirection: 'row', alignItems:'center'}}>
                        <Text>Độ ẩm</Text>
                        <TextInput 
                           style={{
                              width: 70, borderWidth: 1, marginLeft: 22,
                              marginRight: 5, fontSize: 17, paddingVertical: 3}}
                           keyboardType={'number-pad'}
                           placeholder={`${this.state.doAm}`}
                           onChangeText={text=> this.setState({newDoAm: text})}
                        />
                        <Text>%</Text>
                     </View>
                  </View>
                  <View
                     style={{
                        flex: 2, backgroundColor: 'tomato', height: 40, 
                        alignItems:'center', justifyContent: 'center'}}>
                     <TouchableOpacity onPress={this.changeThreshold}>
                        <Text style={{color: '#fff', fontSize: 18}}>Lưu</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </View>
            
            <View style = {{width: '100%', marginVertical: 10, alignItems: 'center', padding: 10, backgroundColor: 'white'}}>
               <Text style={{ fontSize: 18, color: '#0149f3'}}>Đổi mật khẩu</Text>
               <TextInput 
                  placeholder={'Nhập mật khẩu mới'}
                  secureTextEntry={true}
                  onChangeText={(value)=> this.setState({newPassword: value})}
                  style = {userstyle.newPassword}/>
               <TextInput 
                  placeholder={'Nhập lại mật khẩu mới'} 
                  secureTextEntry={true}
                  onChangeText={(value)=> this.setState({repeatPassword: value})}
                  style = {userstyle.newPassword}/>
               <TouchableOpacity
                  onPress = {this.updatePassword}
                  style = {userstyle.updatePassButton}>
                  <Text style = {{color: '#fff'}}>Cập nhật</Text>
               </TouchableOpacity>
            </View>
         </View>
      )
   }
   componentDidMount(){
      const userID = firebaseApp.auth().currentUser.uid;
      Database.ref(`${userID}`).child('Threshold').child('nhietDo').on('value', snap=>{
         this.setState({ nhietDo: snap.val() })
      })
      Database.ref(`${userID}`).child('Threshold').child('doAm').on('value', snap=>{
         this.setState({ doAm: snap.val() })
      })
   }
}