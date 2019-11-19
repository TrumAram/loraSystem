import React, {Component} from 'react'
import {Image, Text, View} from 'react-native'
import Modal from 'react-native-modalbox'
import userstyle from '../../styles/userstyle'

export default class MyModal extends Component{
   render(){
      const { onClosed, isOpen, name, phone, email, address } = this.props;
      return(
         <Modal
            backButtonClose={true}
            onClosed={onClosed}
            isOpen={isOpen}
            key={isOpen}
            style={{ width: 300, height: 500, padding: 10 }}>
            
            <Image source={this.props.avatarSource}
                  style={{width: 280, height: 280, marginBottom: 10}}/>
            <View style={{flex: 1, justifyContent: 'space-around'}}>
               <View style={userstyle.modalInfo}>
                  <Image source={require('../../img/User/user.png')} style={{width:25, height:25}}/>
                  <Text style={{marginLeft: 5}}>{name}</Text>
               </View>
               <View style={userstyle.modalInfo}>
                  <Image source={require('../../img/User/phone.png')} style={{width:25, height:25}}/>
                  <Text style={{marginLeft: 5}}>{phone}</Text>
               </View>
               <View style={userstyle.modalInfo}>
                  <Image source={require('../../img/User/email.png')} style={{width:25, height:25}}/>
                  <Text style={{marginLeft: 5}}>{email}</Text>
               </View>
               <View style={userstyle.modalInfo}>
                  <Image source={require('../../img/User/address.png')} style={{width:25, height:25}}/>
                  <Text style={{marginLeft: 5}}>{address}</Text>
               </View>
            </View>
         </Modal>
      )
   }
   
}