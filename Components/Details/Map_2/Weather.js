import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import Axios from 'axios';
import WeatherCondition from './WeatherCondition';


const APIkey = 'be0554201a825f8cbe3399dc737e0267';

const date = new Date().getDate();
const month = new Date().getMonth() + 1;
const year = new Date().getFullYear()

export default class Weather extends Component{
   constructor(props){
      super(props);
      this.state = {
         name:'',
         nhietDo: null,
         doAm: null,
         thoiTiet: '',
         wind: null,
         condition: null,
         icon:''
      }
   }

   getWeather = (address) => {
      Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=${APIkey}`)
      .then( (response)=>{
         // console.log(response.data)
         const duLieu = response.data;
         this.setState({
            name: duLieu.name,
            nhietDo: (duLieu.main.temp - 273.15).toFixed(1), // chuyển độ K sang độ C
            doAm: duLieu.main.humidity ,
            wind: (duLieu.wind.speed * 3.6).toFixed(1), // chuyển sang đơn vị km/h
            condition: duLieu.weather[0].id,
            icon: duLieu.weather[0].icon
         })
      })
   }

   render(){  
      this.getWeather(this.props.location)
      return(
         <View 
            style={{
               backgroundColor: '#dbebfb', margin: 2,
               borderWidth: 2, borderColor: '#54a0f6', borderRadius: 5
            }}
         >
            <Text> Thời tiết ngày: {date}/{month}/{year} - {this.state.name}</Text>
               
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
               <Image 
                  source={{uri: `http://openweathermap.org/img/w/${this.state.icon}.png`}} 
                  style={{width: 50, height: 50}}
               />
               <Text style={{color: '#000', fontSize: 16}}>{WeatherCondition[this.state.condition]}</Text>
               <Text style={{fontSize: 22, color: '#000'}}>{this.state.nhietDo}°C</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
               <View style={{flexDirection: 'row'}}>
                  <Text>Độ ẩm:</Text>
                  <Text style={{color: '#000', fontWeight: 'bold'}}> {this.state.doAm}%</Text>
               </View>
               <View style={{flexDirection: 'row'}}>
                  <Text>Sức gió:</Text>
                  <Text style={{color: '#000', fontWeight: 'bold'}}> {this.state.wind} km/h</Text>
               </View>
            </View>
            
         </View>
      )
   }
}