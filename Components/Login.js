import React, {Component} from 'react';
import {
   Text, View, ImageBackground, Alert, CheckBox,
   Image, TextInput, ActivityIndicator,
   TouchableOpacity, TouchableWithoutFeedback, AsyncStorage} from 'react-native';
import {firebaseApp} from "../Firebase/FBConfig";
import loginstyle from './styles/loginstyle';
import SplashScreen from 'react-native-splash-screen';

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
   clickNhietdo = () =>{
      firebaseApp.database().ref('r3NPCRAbzRZBnda8wAvMh76Kygn2').child('Gateway 1').child('Node 1').child('By hour')
      .child(`${new Date().getDate()-1}-${new Date().getMonth()+1}-${(new Date().getFullYear())}`).push({
         nhietDo: Date.now()%25 + 20,
         doAm: Date.now()%25 + 40,
         // date: ((new Date().getFullYear())%100)*10000+(new Date().getMonth()+1)*100+(new Date().getDate()),
         time: `${new Date().getHours()}:${new Date().getMinutes()}`
      })
   }
   clickDate = () =>{
      firebaseApp.database().ref('r3NPCRAbzRZBnda8wAvMh76Kygn2').child('Gateway 1').child('Node 1').child('By date').push({
         nhietDo: Date.now()%25 + 20,
         doAm: Date.now()%25 + 40,
         time: `${new Date().getDate()}/${new Date().getMonth()+1}/${(new Date().getFullYear())%100}`
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
               <TouchableOpacity style={loginstyle.fbbutton} onPress={this.clickDate}>
                     <Image source={require('./img/iconfb.png')} style={{width:30, height:30}}/>
                     <Text style={{color: 'white', marginLeft: 10}}>Facebook</Text>
               </TouchableOpacity>

               <TouchableOpacity style={loginstyle.fbbutton} onPress={this.clickNhietdo}>
                     <Image source={require('./img/icongg.png')} style={{width:30, height:30}}/>
                     <Text style={{color: 'white', marginLeft: 10}}>Google</Text>
               </TouchableOpacity>
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