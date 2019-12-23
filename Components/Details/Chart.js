import React, {Component} from 'react';
import {Image, Text, View, ScrollView, CheckBox} from 'react-native';
import DatePicker from 'react-native-datepicker'
import chartstyle from "../styles/chartstyle";
import Node  from './Chart_2/tramNode';
import NoConnection from '../ConnectionStatus';
import {firebaseApp} from '../../Firebase/FBConfig'

const Database = firebaseApp.database();
const date = new Date().getDate();
var d = date<10? '0'+date: date;
const month = new Date().getMonth()+1;
var m = month<10? '0'+month: month;
const y = new Date().getFullYear();
export default class chart extends Component{
   static navigationOptions= {
      tabBarLabel: 'Biểu đồ',
      tabBarIcon: ({tintColor})=>(
         <Image source={require('../img/Chart.png')} style={[{height: 25, width: 25},{tintColor}]}/>
      )
   }
   state = {
      byDate: false,
      toDayData: [[],[],[],[],[],[]],
      pastData: [],
      isConnected: true,
      numberOfNode: null,
      toDay: `${d}-${m}-${y}`
   }
   // clickNhietdo = (str) =>{
   //    firebaseApp.database().ref('r3NPCRAbzRZBnda8wAvMh76Kygn2').child('Gateway 1').child(`${str}`).child('By hour')
   //    .child(`${d}-${m}-${y}`).push({
   //       nhietDo: Date.now()%25 + 20,
   //       doAm: Date.now()%25 + 40,
   //       time: `${new Date().getHours()}:${new Date().getMinutes()}`
   //    })
   // }
   getDataByWhat = ( byWhat, str)=>{
      const userID = firebaseApp.auth().currentUser.uid
      var tem1 = [];
      var hum1 = [];
      var time = [];
      var tem2 = [];
      var hum2 = [];
      var time2 = [];
      var res = [tem1, hum1, time,tem2, hum2, time2]
      Database.ref(`${userID}`).child('Gateway 1').child(`Node 1`).child(`By ${byWhat}`).child(`${str}`)
      .on('child_added', (snap)=> {
         tem1.push(snap.val().nhietDo);
         hum1.push(snap.val().doAm);
         time.push(snap.val().time);
         if (time.length > 24){
            tem1.shift();
            hum1.shift();
            time.shift();
         };
         res[0] = tem1; res[1] = hum1; res[2] = time
         if(str==`${d}-${m}-${y}`){
            this.setState({
               toDayData: res,
            })
         }
      })
      //---------------------------Node 2-------------------------------------
      Database.ref(`${userID}`).child('Gateway 1').child(`Node 2`).child(`By ${byWhat}`).child(`${str}`)
      .on('child_added', (snap)=> {
         tem2.push(snap.val().nhietDo);
         hum2.push(snap.val().doAm);
         time2.push(snap.val().time);
         if (time.length > 24){
            tem2.shift();
            hum2.shift();
            time2.shift();
         };
         res[3] = tem2; res[4] = hum2; res[5] = time2
         if(str==`${d}-${m}-${y}`){
            this.setState({
               toDayData: res,
            })
         }
      })
      setTimeout(()=>{
         var res1 = [tem1, hum1, time ,tem2, hum2, time2]
         this.setState({
            pastData: res1
         })
      }, 1000)
      
   }
   
   render() {
      const {navigation} = this.props;
      const {pastData, toDayData, toDay, byDate} = this.state;
      var listNode = [];
         for(var i = 1; i<=this.state.numberOfNode ; i++){
            var j = 3*(i-1)
            listNode.push(
               <Node
                  key = {i}
                  number = {i}
                  nhietDo = {toDay== `${d}-${m}-${y}`&& byDate==false? toDayData[j]: pastData[j]}
                  doAm = {toDay== `${d}-${m}-${y}`&& byDate==false? toDayData[j+1]: pastData[j+1]}
                  time = {toDay== `${d}-${m}-${y}`&& byDate==false? toDayData[j+2]: pastData[j+2]}
                  date = {byDate}
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
                     {this.state.byDate? this.getDataByWhat('date',date.slice(3)): this.getDataByWhat('hour',date)}
                     this.setState({ toDay: date })
                  }}
                  />
            </View>
            
            <View style={{flex: 1, backgroundColor: 'rgb(229,228,228)'}}>
               {/* ---------------------------------- BUTTON -------------------------------------- */}
               <View style={{height: 40, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 20}}>
                  <View style={chartstyle.buttonWrap}>
                     <Text>Theo giờ</Text>
                     <CheckBox 
                        onValueChange = {(value)=> {
                           this.setState({ byDate: !value});
                           if(value){this.getDataByWhat('hour',this.state.toDay)}
                           else{this.getDataByWhat('date',this.state.toDay.slice(3))}
                        }} 
                        value ={!this.state.byDate}/>
                  </View>
                  <View style={chartstyle.buttonWrap}>
                     <Text>Theo ngày</Text>
                     <CheckBox 
                        onValueChange = {(value)=> {
                           this.setState({ byDate: value});
                           if(value){this.getDataByWhat('date',this.state.toDay.slice(3))}
                           else{this.getDataByWhat('hour',this.state.toDay)}
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
         this.getDataByWhat('hour', this.state.toDay)
      }
      
   }
}