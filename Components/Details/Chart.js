import React, {Component} from 'react';
import {Image, Text, View, ScrollView, CheckBox} from 'react-native';
import DatePicker from 'react-native-datepicker'
import chartstyle from "../styles/chartstyle";
import Node  from './Chart_2/tramNode';
import DoAm from './Chart_2/doAm';
import NoConnection from '../ConnectionStatus';
import {firebaseApp} from '../../Firebase/FBConfig'

const Database = firebaseApp.database();
const d = new Date().getDate();
const m = new Date().getMonth()+1;
const y = new Date().getFullYear();
export default class chart extends Component{
   static navigationOptions= {
      tabBarLabel: 'Biểu đồ',
      tabBarIcon: ({tintColor})=>(
         <Image source={require('../img/Chart.png')} style={[{height: 25, width: 25},{tintColor}]}/>
      )
   }
   state = {
         byHour: true,
         byDate: false,
         data1: [],
         data2: [],
         timeData: [],
         isConnected: true,
         numberOfNode: null,
         toDay: `${d}-${m}-${y}`
      }
   getDataByHour = (str)=>{
      const userID = firebaseApp.auth().currentUser.uid
      var value1 = [];
      var value2 = [];
      var time = [];
      Database.ref(`${userID}`).child('Gateway 1').child('Node 1').child('By hour').child(`${str}`)
      .on('child_added', (snap)=> {
         value1.push(snap.val().nhietDo);
         value2.push(snap.val().doAm);
         time.push(snap.val().time);
         if (time.length > 24){
            value1.shift();
            value2.shift();
            time.shift();
         }
      })
      this.setState({
         data1: value1,
         data2: value2,
         timeData: time
      })
   }
   getDataByDate = ()=>{
      const userID = firebaseApp.auth().currentUser.uid
      var value1 = [];
      var value2 = [];
      var time = [];
      Database.ref(`${userID}`).child('Gateway 1').child('Node 1').child('By date').on('child_added', (snap)=> {
         value1.push(snap.val().nhietDo);
         value2.push(snap.val().doAm);
         time.push(snap.val().time);
         if (time.length > 24){
            value1.shift();
            value2.shift();
            time.shift();
         }
      })
      this.setState({
         data1: value1,
         data2: value2,
         timeData: time
      })
   }
   render() {
      const {navigation} = this.props;
      var listNode = [];
      for(var i = 1; i<=this.state.numberOfNode ; i++){
         listNode.push(
            <Node
               key = {i}
               number = {i}
               nhietDo = {this.state.data1}
               doAm = {this.state.data2}
               time = {this.state.timeData}
               date = {this.state.byDate}
            />
         )
      }
      setTimeout(() => {
         if (navigation.getParam('scroll')){
            this.refs.chartView.scrollTo({                     // scroll to Node i
               x:0, y: 276*(navigation.getParam('node')-1),
            })
         }
      }, 1000);
      return (
         <View style={{flex: 1}}>
            {this.state.isConnected?
               null
            : <NoConnection/>}
            <View style={chartstyle.header}>
               <Image source={require('../img/Chart/icon2.png')} style={chartstyle.icon}/>
               <Text
                  
                  style={{
                     fontSize:15, fontWeight:'bold',
                     marginLeft:8, color:'#000'}}>Biểu đồ chỉ số</Text>
               <DatePicker
                  style={{marginLeft: '15%'}}
                  date={this.state.toDay}
                  mode="date"
                  format="DD-MM-YYYY"
                  minDate={`${d}-${m}-${y-1}`}
                  maxDate={`${d}-${m}-${y}`}
                  confirmBtnText="Ok"
                  cancelBtnText="Cancel"
                  customStyles={{
                     dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                     },
                     dateInput: {
                        marginLeft: 36
                     }
                  }}
                  onDateChange={(date) => {
                     this.getDataByHour(date); 
                     this.setState({
                        toDay: date,
                        byDate: false
                     })
                  }}
                  />
            </View>
            
            <View style={{flex: 1, backgroundColor: 'rgb(229,228,228)'}}>
               {/* ---------------------------------- BUTTON -------------------------------------- */}
               <View style={{height: 40, backgroundColor: '#fff', flexDirection: 'row'}}>
                  <View style={chartstyle.buttonWrap}>
                     <Text>Theo giờ</Text>
                     <CheckBox 
                        onValueChange = {(value)=> {
                           this.setState({ byDate: !value});
                           if(value){this.getDataByHour(this.state.toDay)}
                           else{this.getDataByDate()}
                        }} 
                        value ={!this.state.byDate}/>
                  </View>
                  <View style={chartstyle.buttonWrap}>
                     <Text>Theo ngày</Text>
                     <CheckBox 
                        onValueChange = {(value)=> {
                           this.setState({ byDate: value});
                           if(value){this.getDataByDate()}
                           else{this.getDataByHour(this.state.toDay)}
                        }} 
                        value ={this.state.byDate}/>
                  </View>
               </View>
               <View style={chartstyle.chuThich}>
                  <View style={{flexDirection: 'row', alignItems:'center'}}>
                     <View style={{height: 15, width:20, backgroundColor: 'rgba(0, 0, 255, 0.6)'}}/>
                     <Text style={{marginLeft: 10}}>Nhiệt độ</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems:'center'}}>
                     <View style={{height: 3, width:25, backgroundColor: 'red'}}/>
                     <Text style={{marginLeft: 10}}>Độ ẩm</Text>
                  </View>
               </View>
               {/* ---------------------------------- CONTENT ------------------------------------ */}
               {/* a.nativeEvent.contentSize.height */}
               <ScrollView 
                  ref = {'chartView'}
                  style={{marginTop: 12, paddingRight:5}} 
                  >
                     {listNode}
                  {/* {this.state.byDate?
                     <View style={{backgroundColor: '#fff', marginBottom: 10}}>
                        <Text 
                           style={{fontSize:18, padding:5, color: 'black'}}
                           onPress = {this.clickDoam}
                        >Độ ẩm</Text>
                        <DoAm/>
                     </View>
                  : null} */}
               </ScrollView>
            </View>
         </View>
      )
   }
   componentDidMount(){

      const userID = firebaseApp.auth().currentUser.uid
      Database.ref(`${userID}`).child('Gateway 1').child('Number of node').on('value', snap=>{
         this.setState({
            numberOfNode: snap.val()
         })
      })
      
      if(!this.state.byDate){
         this.getDataByHour(this.state.toDay)
      }
      
   }
}