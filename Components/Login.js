import React, {Component} from 'react';
import {
   Text, View, ImageBackground, Alert, CheckBox,
   Image, TextInput, ActivityIndicator,
   TouchableOpacity, TouchableWithoutFeedback, AsyncStorage} from 'react-native';
import {firebaseApp} from "../Firebase/FBConfig";
import loginstyle from './styles/loginstyle';
import SplashScreen from 'react-native-splash-screen';

const date = new Date().getDate();
var d = date<10? '0'+date: date;
const month = new Date().getMonth()+1;
var m = month<10? '0'+month: month;
const y = new Date().getFullYear();
export default class login extends Component{
   static navigationOptions={ header: null };
   state={
      isSecure: true,
      eye: require('./img/eye.png'),
      email:'',
      password:'',
      showLoading: false,
      rememberMe: null
   }
   dangnhap = () => {
      firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
         .then(()=> {
            this.setState({ showLoading: true})
            if (this.state.rememberMe){
               AsyncStorage.setItem('username', this.state.email)
               AsyncStorage.setItem('password', this.state.password)
               AsyncStorage.setItem('rememberMe', 'true')
            }else{
               AsyncStorage.setItem('username', '')
               AsyncStorage.setItem('password', '')
               AsyncStorage.setItem('rememberMe', '')
            }
            setTimeout(()=>{
               this.props.navigation.navigate('thanhcong')
               this.setState({ showLoading: false })
            }, 500)
            this.setState({password: ''})
            this.refs.passWord.clear()  // remove all text from the TextInput
         })
         .catch(function(error) {
               Alert.alert(
                  'Đăng nhập thất bại !',
                  'Tên đăng nhập/mật khẩu KHÔNG đúng  -_-',
               );
         })
   }

   
   lookPassword = () => {
      this.setState({
         isSecure: !(this.state.isSecure),
         eye: (this.state.isSecure)? require('./img/non-eye.png') : require('./img/eye.png')
      })
   }
   clickNhietdo = (str) =>{
      firebaseApp.database().ref('r3NPCRAbzRZBnda8wAvMh76Kygn2').child('Gateway 1').child(`${str}`).child('By hour')
      .child(`${d}-${m}-${y}`).push({
         nhietDo: Date.now()%15 + 23,
         doAm: Date.now()%15 + 43,
         time: `${new Date().getHours()}:${new Date().getMinutes()}`
      })
   }
   
   
   render(){
      const {navigate} = this.props.navigation;
      
      return(
         <ImageBackground source={require('./img/login.jpg')}
                           style={loginstyle.container}>
            <View style={{flex:3, justifyContent: 'center'}}>
               <Image 
                  source={require('./img/logo.png')}
                  style={loginstyle.logo}
                  resizeMode={'contain'}/>
            </View>
            {/*----------------------------- Đăng nhập ----------------------------------*/}
            <View style={loginstyle.wraptext}>
               <TextInput
                  placeholder={'Tên đăng nhập'}
                  style={loginstyle.text1}
                  onChangeText={value => this.setState({email: value})}
                  value = {this.state.email}
               />
               <View style={loginstyle.password}>
                  <TextInput 
                     placeholder={'Mật khẩu'} 
                     style={{ flex: 1, fontSize: 18 }} 
                     secureTextEntry={this.state.isSecure}
                     onChangeText={value=> this.setState({password: value})}
                     value = {this.state.password}
                     ref = {'passWord'}
                  />
                  {this.state.password != ''?
                     <TouchableWithoutFeedback onPress = {this.lookPassword}>
                        <Image source={this.state.eye} style={loginstyle.eye}/>
                     </TouchableWithoutFeedback>
                  : null }
                  
               </View>
               <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                  <CheckBox 
                     onValueChange = {value=> this.setState({ rememberMe: value})}
                     value ={this.state.rememberMe}/>
                  <Text>Nhớ mật khẩu</Text>
               </View>
               <TouchableOpacity onPress={this.dangnhap} style={loginstyle.logbutton}>
                  {this.state.showLoading?
                     <ActivityIndicator color = {'#fff'} size = {30}/>
                     :
                     <Text style={{color: 'white', fontWeight: 'bold', fontSize:18}}>Đăng nhập</Text>
                  }
               </TouchableOpacity>

               <TouchableOpacity onPress = {()=> navigate('quenMatkhau')}>
                  <Text style={loginstyle.register}>Quên mật khẩu</Text>
               </TouchableOpacity>
            </View>
            {/*--------------------------------------------------------------------------------*/}
            <View style={loginstyle.fbgg}>
               {/* <TouchableOpacity style={loginstyle.fbbutton} onPress={()=>this.clickNhietdo('Node 1')}>
                  <Text style={{color: 'white'}}>Facebook</Text>
               </TouchableOpacity>

               <TouchableOpacity style={loginstyle.fbbutton} onPress={()=>this.clickNhietdo('Node 2')}>
                  <Text style={{color: 'white'}}>Google</Text>
               </TouchableOpacity> */}
               <Text
                  style={{
                     color: 'white', marginTop: '50%', 
                     fontFamily: 'serif', fontSize: 17, fontWeight: 'bold'}}
                  >Hãy bảo vệ rừng vì hành tinh xanh</Text>
            </View>
         </ImageBackground>
      )
   }
   getData = async ()=>{
      if(await AsyncStorage.getItem('rememberMe')=='true'){
         var email = await AsyncStorage.getItem('username')
         var password = await AsyncStorage.getItem('password')
         this.setState({
            email, password, rememberMe: true
         })
      }else{
         this.setState({ rememberMe: false})
      }
   }
   componentDidMount(){
      SplashScreen.hide();
      this.getData()
   }
}