import React, {Component} from 'react'
import {Image, Text, View, TouchableOpacity, Alert, Linking} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { firebaseApp } from '../../Firebase/FBConfig'
import userstyle from '../styles/userstyle'
import ImageResizer from 'react-native-image-resizer'
import MyModal from './User_2/MyModalBox'
import NoConnection from '../ConnectionStatus';

const options = {
  title: 'Chọn ảnh đại diện',
  cancelButtonTitle: 'Hủy',
  takePhotoButtonTitle: 'Chụp ảnh...',
  chooseFromLibraryButtonTitle: 'Chọn từ Thư viện...',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  noData: true,
};
const storage = firebaseApp.storage();
const duLieu = firebaseApp.database();

export default class user extends Component{
   static navigationOptions= {
      tabBarLabel: 'Người dùng',
      tabBarIcon: ({tintColor})=>(
         <Image source={require('../img/user.png')} style={[{height: 25, width: 25},{tintColor}]}/>
      )
   }

   state = {
      name: '',
      address: '',
      phone: '',
      email: '',
      avatarSource: require('../img/User/avatar.png'),
      isShowModal: false,
      isShowSetting: false,
      isConnected: true
   }

   showModal = () => this.setState({ isShowModal: true })
   hideModal = () => this.setState({ isShowModal: false })

   showSetting = () => this.setState({ isShowSetting: true })
   hideSetting = () => this.setState({ isShowSetting: false })

   hoTro = () =>{
      Alert.alert(
         'Đường dây nóng',
         '19001009',
         [
            { text: 'Gọi', onPress: () => Linking.openURL('tel: 19001009')},
            { text: 'Hủy', style: 'cancel' }
         ]
         );
   }
   dangXuat = () => {
      Alert.alert(
         '',
         'Bạn muốn đăng xuất?',
         [
            { text: 'OK', onPress: () => {
               firebaseApp.auth().signOut().then(()=> {
                  this.props.navigation.navigate('dangnhap')
                })
            }},
            { text: 'Hủy', style: 'cancel'}
         ]
         );
   }

   pickImage = () => {
      ImagePicker.showImagePicker(options, (response) => {
       
         if (response.didCancel) {
         } 
         else if (response.error) {
         } 
         else if (response.customButton) {
         } 
         else {
            ImageResizer.createResizedImage(response.uri, 700, 700, 'JPEG', 80)
               .then(response => {
                  this.setState({ avatarSource: { uri: response.uri }})
                  this.uploadImage(response.uri);
               })
               .catch(err => console.error(err))
         }
      })
   }

   uploadImage = async uri => {
      const userID = firebaseApp.auth().currentUser.uid;
      const response = await fetch(uri);
      const blob = await response.blob();
      storage.ref(`${userID}`).child('Avatar.jpg').put(blob, { contentType: 'image/jpeg' })
   }

   render() {
      return (
         <View style={{flex: 1}}>
            {this.state.isConnected?
               null
            : <NoConnection/>}
            <View style={userstyle.header}>
               <Image source={require('../img/User/icon2.png')} style={userstyle.icon}/>
               <Text
                  style={{
                     fontSize:15, 
                     fontWeight:'bold',
                     color:'#000'}}>Người sử dụng</Text>
            </View>
            {/* -------------------------------  Cá nhân ------------------------------------- */}
            <View style={{flex:1, backgroundColor:'rgb(228,228,228)'}}>
               <TouchableOpacity style={userstyle.personal} onPress={this.showModal}>
                  <TouchableOpacity onPress={this.pickImage}>
                     <Image source={this.state.avatarSource} style={userstyle.avatar} resizeMode={'contain'}/>
                  </TouchableOpacity>
                  <Text style={{marginLeft:15, fontSize:18, color: '#000'}}>
                     {this.state.name}
                  </Text>
               </TouchableOpacity>
               {/* ----------------------------  Details  ----------------------------------- */}
               <View style={userstyle.content}>
                  
                  <TouchableOpacity style={userstyle.detail} onPress = {()=> this.props.navigation.navigate('timKiem')}>           
                     <Image source={require('../img/User/search.png')} style={userstyle.icon}/>
                     <Text style={userstyle.text}>Tìm kiếm</Text>             
                  </TouchableOpacity>
                          
                  <TouchableOpacity style={userstyle.detail} onPress = {()=> this.props.navigation.navigate('ghiChu')}>
                     <Image source={require('../img/User/history.png')} style={userstyle.icon}/>
                     <Text style={userstyle.text}>Ghi chú</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={userstyle.detail} onPress={this.hoTro}>
                     <Image source={require('../img/User/hotro.png')} style={userstyle.icon}/>
                     <Text style={userstyle.text}>Hỗ trợ</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={userstyle.detail} onPress={()=> this.props.navigation.navigate('caiDat')}>
                     <Image source={require('../img/User/caidat.png')} style={userstyle.icon}/>
                     <Text style={userstyle.text}>Cài đặt</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={userstyle.detail_z} onPress={this.dangXuat}>    
                     <Image source={require('../img/User/logout.png')} style={userstyle.icon}/>
                     <Text style={userstyle.text}>Đăng xuất</Text>         
                  </TouchableOpacity>

               </View>
            </View>
            <MyModal
               avatarSource = {this.state.avatarSource}
               isOpen = {this.state.isShowModal }
               onClosed = {this.hideModal}
               name = {this.state.name}
               phone = {this.state.phone}
               email = {this.state.email}
               address = {this.state.address}
               />
            
         </View>
         
      );
   }
   componentDidMount(){
      // NetInfo.isConnected.addEventListener('connectionChange', (isConnected)=>{
      //    if (isConnected) {
      //       this.setState({ isConnected });
      //    } else {
      //       this.setState({ isConnected });
      //    }
      // })
      //---------------------- Personal Information ----------------------------------
      const userID = firebaseApp.auth().currentUser.uid;
      storage.ref(`${userID}`).child('Avatar.jpg').getDownloadURL()
         .then((url) => {
            this.setState({
               avatarSource: {uri: url}
            })
         })
      duLieu.ref(`${userID}`).child('Information').child('Name').on('value', snap =>{
         this.setState({
            name: snap.val()
         })
      })

      duLieu.ref(`${userID}`).child('Information').child('Phone').on('value', snap =>{
         this.setState({
            phone: snap.val()
         })
      })

      duLieu.ref(`${userID}`).child('Information').child('Email').on('value', snap =>{
         this.setState({
            email: snap.val()
         })
      })

      duLieu.ref(`${userID}`).child('Information').child('Address').on('value', snap =>{
         this.setState({
            address: snap.val()
         })
      })
   }
}