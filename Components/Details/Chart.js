import React, {Component} from 'react';
import {Image, Text, View, ScrollView, CheckBox} from 'react-native';
import chartstyle from "../styles/chartstyle";
import Node  from './Chart_2/tramNode';
import DoAm from './Chart_2/doAm';
import NoConnection from '../ConnectionStatus';
import {firebaseApp} from '../../Firebase/FBConfig'

const Database = firebaseApp.database();
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
         numberOfNode: null
      }
   
   render() {
      const {navigation} = this.props;
      var listNode = [];
      for(var i = 1; i<=this.state.numberOfNode ; i++){
         listNode.push(
            <Node
               number = {i}
               nhietDo = {this.state.data1}
               doAm = {this.state.data2}
               time = {this.state.timeData}
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
            </View>
            
            <View style={{flex: 1, backgroundColor: 'rgb(229,228,228)'}}>
               {/* ---------------------------------- BUTTON -------------------------------------- */}
               <View style={{height: 40, backgroundColor: '#fff', flexDirection: 'row'}}>
                  <View style={chartstyle.buttonWrap}>
                     <Text>Theo giờ</Text>
                     <CheckBox onValueChange = {(value)=> {this.setState({ byHour: value})}} 
                              value ={this.state.byHour}/>
                  </View>
                  <View style={chartstyle.buttonWrap}>
                     <Text>Theo ngày</Text>
                     <CheckBox onValueChange = {(value)=> {this.setState({ byDate: value})}} 
                              value ={this.state.byDate}/>
                  </View>
               </View>
               <View style={chartstyle.chuThich}>
                  <View style={{flexDirection: 'row', alignItems:'center'}}>
                     <View style={{height: 15, width:20, backgroundColor: 'rgba(0, 0, 255, 0.6)'}}/>
                     <Text style={{marginLeft: 10}}>Nhiệt độ</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems:'center'}}>
                     <View style={{height: 2, width:25, backgroundColor: 'red'}}/>
                     <Text style={{marginLeft: 10}}>Độ ẩm</Text>
                  </View>
               </View>
               {/* ---------------------------------- CONTENT ------------------------------------ */}
               {/* a.nativeEvent.contentSize.height */}
               <ScrollView 
                  ref = {'chartView'}
                  style={{marginTop: 12, paddingRight:5}} 
                  >
                  {this.state.byHour?
                     listNode
                  : null}
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
      // NetInfo.isConnected.addEventListener('connectionChange', (isConnected)=>{
      //    this.setState({ isConnected });
      // })

      const userID = firebaseApp.auth().currentUser.uid
      Database.ref(`${userID}`).child('Gateway 1').child('Number of node').on('value', snap=>{
         this.setState({
            numberOfNode: snap.val()
         })
         console.log(this.state.numberOfNode)
      })
      var item1 = [];
      var item2 = [];
      var time = [];
      Database.ref(`${userID}`).child('Gateway 1').child('Node 1').on('child_added', (snap)=> {
         item1.push(snap.val().nhietDo);
         item2.push(snap.val().doAm);
         time.push(snap.val().time);
         if (time.length > 12){
            item1.shift();
            item2.shift();
            time.shift();
         }
         this.setState({
            data1: item1,
            data2: item2,
            timeData: time
         })
      })
   }
}