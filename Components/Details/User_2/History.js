import React, {Component} from 'react'
import {Image, Text, View, ScrollView} from 'react-native'
import {firebaseApp} from '../../../Firebase/FBConfig'

const Database = firebaseApp.database()
export default class History extends Component{
   state={
      onFire:[],
      nhietDo: [],
      doAm:[],
      time:[],
      date:[],
      node:[]
   }
   render(){
      const {node, nhietDo, doAm, time, date, onFire} = this.state;
      var item = []
      for (var i=0; i<4; i++){
         item.push(
            <Content
               node = {node[i]}
               nhietDo = {nhietDo[i]}
               doAm = {doAm[i]}
               time = {time[i]}
               date = {date[i]}
               onFire = {onFire[i]}
            />
         )
      }
      return(
         <View style={{flex:1, backgroundColor: 'rgb(228,228,228)', marginBottom: 10}}>
            <ScrollView ref={'listView'}>
               {item}
            </ScrollView>
         </View>
      )
   }
   componentDidMount(){
      setTimeout(() => {
         this.refs.listView.scrollToEnd();
      }, 500);
      const userID = firebaseApp.auth().currentUser.uid
      var nhietDo = [];
      var doAm = [];
      var time = [];
      var onFire = [];
      var date = [];
      var node = [];
      Database.ref(`${userID}`).child('Gateway 1').child('History').on('child_added', (snap)=> {
         nhietDo.push(snap.val().nhietDo)
         doAm.push(snap.val().doAm)
         time.push(snap.val().time)
         onFire.push(snap.val().onFire)
         date.push(snap.val().date)
         node.push(snap.val().node);
         if (time.length > 12){
            
            time.shift();
         }
         this.setState({
            nhietDo, doAm, time, date, onFire, node
         })
      })
   }
}

class Content extends Component{
   render(){
      const {node, nhietDo, doAm, time, date, onFire} = this.props;
      return(
         <View
            style={{
               height: 150, width: '100%',
               justifyContent: 'space-between', 
               paddingHorizontal: 10, 
               backgroundColor: '#fff',
               marginBottom: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
               <Text style={{color: '#000', fontWeight: 'bold', fontSize: 20}}>Node {node}</Text>
               <Image
                  source={onFire? require('../../img/Map/fire.png'):null}
                  style={{height: 30, width: 30}}
               />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
               <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1, flexDirection: 'row', alignItems:'center'}}>
                     <Text>Nhiệt độ:  </Text>
                     <Text style={{color: '#000', fontWeight: 'bold', fontSize: 20}}>{nhietDo}</Text>
                     <Text> °C</Text>
                  </View>

                  <View style={{flex: 1, flexDirection: 'row', alignItems:'center'}}>
                     <Text>Độ ẩm:  </Text>
                     <Text style={{color: '#000', fontWeight: 'bold', fontSize: 20}}>{doAm}</Text>
                     <Text> %</Text>
                  </View>
               </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}> 
               <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1, flexDirection: 'row', alignItems:'center'}}>
                     <Text>Ngày:  </Text>
                     <Text style={{color: '#000', fontWeight: 'bold', fontSize: 18}}>{date}</Text>
                  </View>

                  <View style={{flex: 1, flexDirection: 'row', alignItems:'center'}}>
                     <Text>Giờ:  </Text>
                     <Text style={{color: '#000', fontWeight: 'bold', fontSize: 18}}>{time}</Text>
                  </View>
               </View>  
            </View>
         </View>
      )
   }
}