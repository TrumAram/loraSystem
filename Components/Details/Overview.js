import React, {Component} from 'react';
import {Alert, Image, Text, View,  TouchableOpacity, ScrollView} from 'react-native';
import overstyle from "../styles/overstyle";
import {firebaseApp} from "../../Firebase/FBConfig";
import NoConnection from '../ConnectionStatus';
import Content from './Overview_2/Data'

const Database = firebaseApp.database()
const year = new Date().getFullYear()

export default class overview extends Component {
   static navigationOptions= {
      title: 'Tổng quan',
      tabBarIcon: ({tintColor})=>(
         <Image source={require('../img/Overview.png')} style={[{height: 25, width: 25},{tintColor}]}/>
      )
   }
   
   state={
      nhietDo: [],
      doAm: [],
      numberOfNode: null,
      isConnected: true,
      nhietDoThresh: 100,
      doAmThresh: 0
   }
   showChart(n){
      this.props.navigation.navigate('view2', {scroll: true, node: n})
   }
   render() {
      var item = [];
      var danGer = 0
      const {nhietDo, doAm, nhietDoThresh, doAmThresh} = this.state
      for(var i = 1; i<=this.state.numberOfNode ; i++){
         const node = i;
         danGer = (nhietDo[i]>nhietDoThresh || doAm[i]<doAmThresh) || danGer;  // check warning
         //------display content--------
         item.push (
            <TouchableOpacity onPress = {()=>this.showChart(node)}>
               <Content
                  key = {i}
                  number = {i}
                  nhietDo = {nhietDo[i]}
                  doAm = {doAm[i]}
                  nhietDoThresh = {nhietDoThresh}
                  doAmThresh = {doAmThresh}
               />
            </TouchableOpacity>
         )
      }
      return (
         <View style={{flex: 1}}>   
            {this.state.isConnected?
               null
            : <NoConnection/>}       
            <View style={overstyle.header}>
               <Image source={require('../img/Overview/icon2.png')} style={overstyle.icon}/>
               <Text
                  style={{
                     fontSize:15, fontWeight:'bold',
                     marginLeft:8, color:'#000'}}>Gateway 1 - {year}</Text>
               {danGer?
                  <TouchableOpacity style={overstyle.warning}>
                     <Image source={require('../img/Overview/warning.png')} style={overstyle.warnIcon}/>
                     <Text style={{color: 'red', fontWeight:'bold'}}> Cảnh Báo</Text>
                  </TouchableOpacity>
               :
               null}
            </View>

            {/*----------------------------------  Content  --------------------------------*/}
            <View style={{flex: 1, backgroundColor:'rgb(228,228,228)'}}>
               <ScrollView>
                  {item}
               </ScrollView>
            </View>
         </View>
      )
   }
   componentDidMount(){
      // NetInfo.isConnected.addEventListener('connectionChange', (isConnected)=>{
      //    if (isConnected) {
      //       this.setState({ isConnected });
      //    } else {
      //       this.setState({ isConnected });
      //    }
      // })

      //------------------------------- thông số ao nuôi ----------------------------
      const userID = firebaseApp.auth().currentUser.uid
      Database.ref(`${userID}`).child('Gateway 1').child('Number of node').on('value', snap=>{
         this.setState({
            numberOfNode: snap.val()
         })
      })

      Database.ref(`${userID}`).child('Gateway 1').child('Now').child('Nhiệt độ').on('value', (snap)=>{
         this.setState({
            nhietDo: [...snap.val()]
         })
      })
      Database.ref(`${userID}`).child('Gateway 1').child('Now').child('Độ ẩm').on('value', (snap)=>{
         this.setState({
            doAm: [...snap.val()]
         })
      })
      //----------------------------Threshold----------------------------------
      Database.ref(`${userID}`).child('Threshold').child('nhietDo').on('value', snap=>{
         this.setState({ nhietDoThresh: snap.val() })
      })
      Database.ref(`${userID}`).child('Threshold').child('doAm').on('value', snap=>{
         this.setState({ doAmThresh: snap.val() })
      })
   }
}
