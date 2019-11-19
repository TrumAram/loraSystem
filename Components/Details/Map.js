import React, {Component} from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout, Overlay} from 'react-native-maps'
import { TouchableOpacity } from 'react-native-gesture-handler';
import NoConnection from '../ConnectionStatus';
import mapstyle from '../styles/mapstyle';
// import Weather from './Map_2/Weather';
import {firebaseApp} from "../../Firebase/FBConfig";

const Database = firebaseApp.database()

export default class map extends Component{
   static navigationOptions= {
      tabBarLabel: 'Bản đồ',
      tabBarIcon: ({tintColor})=>(
         <Image source={require('../img/map.png')} style={[{height: 25, width: 25},{tintColor}]}/>
      ),
   }
   state={
      longitude: [],
      latitude: [],
      bottomPadding: 1,
      mapType: false,
      isConnected: true,
      address:'',
      nhietDo: null,
      doAm: null,
      numberOfNode: 0,
      nhietDoThresh: null,
      doAmThresh: null
   }
   animateToNode = () =>{
      this.refs.myMap.animateToRegion({
         latitude: this.state.latitude[1],
         longitude: this.state.longitude[1],
         latitudeDelta: 0.005,
         longitudeDelta: 0.005 
      })
   }
   
   render(){
      const {latitude, longitude, nhietDo, doAm, mapType, bottomPadding, numberOfNode, nhietDoThresh, doAmThresh} = this.state
      var item = []
      if (latitude[numberOfNode] != null){
         for (var i = 1; i<=numberOfNode; i++){

            item.push(
               <Marker
                  key = {i}
                  title = {`Node ${i}`}
                  icon = {(nhietDo[i]>nhietDoThresh || doAm[i]<doAmThresh)? require('../img/Map/fire.png'):null}
                  coordinate={{
                     latitude: latitude[i],
                     longitude: longitude[i],
                  }}/>
            )
         }
      }
      
      return(
         <View style ={{flex: 1}}>
            {this.state.isConnected?
               null
            : <NoConnection/>}
            <View style={mapstyle.header}>
               <Image source={require('../img/Map/icon2.png')} style={mapstyle.icon}/>
               <Text 
                  style={{
                     fontSize:15, fontWeight:'bold',
                     marginLeft:8, color: '#000'}}>Vị trí các node</Text>
            </View>
            
            {/* <Weather
               location = {this.state.address}
            /> */}
            
            <View style={{flex: 1}}>
               <MapView 
                  ref = {'myMap'}
                  mapType = {(mapType? 'satellite': 'standard')}
                  provider = {PROVIDER_GOOGLE}
                  style={{flex: 1, margin: bottomPadding}}
                  region={{
                     latitude: latitude[1] == null? 10.77: latitude[1],
                     longitude: longitude[1] == null? 106.66: longitude[1],
                     latitudeDelta: 0.006,
                     longitudeDelta: 0.006,
                  }}
                  showsUserLocation = {true}
                  showsMyLocationButton = {true}
                  onMapReady = {() => this.setState({ bottomPadding: 0 })}
               >
                  {item}
                  
               </MapView>
               
               {/* ----------------- Change map type ------------------- */}
               <Overlay style={{bottom: 55, right: 10}}>
                  <TouchableOpacity 
                     style = {mapstyle.myPonds}
                     onPress = { ()=> 
                        this.setState({
                           mapType: !(mapType)})
                     }>
                     <Image
                        source = {require('../img/Map/change.png')}
                        style = {{width: 22, height: 22}}/>
                  </TouchableOpacity>
               </Overlay>
               
               {/* ---------------- Animate to my node 1 -------------------- */}
               <Overlay style={{bottom: 10, right: 10}}>
                  <TouchableOpacity
                     style = {mapstyle.myPonds}
                     onPress = {this.animateToNode}
                  >
                     <Image
                        source = {require('../img/Map/pondLocation.png')}
                        style = {{width: 22, height: 22}}/>
                  </TouchableOpacity>
               </Overlay>
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
      const userID = firebaseApp.auth().currentUser.uid

      Database.ref(`${userID}`).child('Information').child('Address').on('value', snap => {
         this.setState({
            address: snap.val()
         })
      })
      Database.ref(`${userID}`).child('Gateway 1').child('Number of node').on('value', snap=>{
         this.setState({
            numberOfNode: snap.val()
         })
      })
      //--------------------------------Location---------------------------------
      Database.ref(`${userID}`).child('Gateway 1').child('Location').child('Longitude').on('value', (snap)=>{
         this.setState({
            longitude: [...snap.val()]
         })
         
      })
      Database.ref(`${userID}`).child('Gateway 1').child('Location').child('Latitude').on('value', (snap)=>{
         this.setState({
            latitude: [...snap.val()]
         })
      })
      //-------------------------Check warning--------------------
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
