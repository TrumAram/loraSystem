import React, {Component} from 'react';
import {View,Text, ScrollView, Dimensions, StyleSheet} from 'react-native';
import {LineChart, XAxis,YAxis, Grid, BarChart} from 'react-native-svg-charts';
import * as shape from 'd3-shape'
import { Circle, Line } from 'react-native-svg'

const chCao = Dimensions.get('window').height;
const chRong = Dimensions.get('window').width;
export default class Node extends Component{
   
   render(){
      const {number, nhietDo, doAm, time} = this.props;
      const Decorator = ({ x, y, data }) => {
         return data.map((value, index) => (
             <Circle
                 key={ index }
                 cx={ x(index) }
                 cy={ y(value) }
                 r={ 2 }
                 stroke={ 'rgb(134, 65, 244)' }
                 fill={ 'white' }
             />
         ))
      }
      const barChart = [{data: nhietDo }]
      
      return(
         <View style={{backgroundColor: '#fff', marginBottom: 10}}>
            <Text style={{fontSize:18, padding:5, color: 'black'}}>Node {number}</Text>
            <View style={{flexDirection: 'row'}}>
               <YAxis
                  style={{height: chCao*0.3}}
                  data={ [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50] }
                  formatLabel={ (value, index) => `${value}ºC` }
                  contentInset={{ top: 10, bottom: 10 }}
                  svg={{ fontSize: 10, fill: 'black' }}
               />
               <ScrollView horizontal = {'true'} ref={'content'}>
                     <BarChart
                        style={{height: chCao*0.3, width: chRong*1.4}}
                        data={ nhietDo }
                        svg={{ fill: 'rgba(0, 0, 255, 0.6)'}}
                        spacingInner = {0.4}
                        gridMin={0}
                        gridMax={50}
                        contentInset={{ top: 10, bottom: 10 }}
                     >
                        <Grid direction={Grid.Direction.HORIZONTAL}/>
                        {/* <Decorator/> */}
                     </BarChart>
                     <LineChart
                        style={{...StyleSheet.absoluteFill, width: chRong*1.4}}
                        data={ doAm }
                        svg={{ stroke: 'rgb(255, 0, 0)', strokeWidth: 2}}
                        gridMin={0}
                        gridMax={100}
                        curve={shape.curveNatural}
                        contentInset={{ top: 10, bottom: 10, left: 15, right: 15 }}
                     >
                        {/* <Decorator/> */}
                     </LineChart>

                     <XAxis
                        style={{width: chRong*1.4, paddingTop:10}}
                        data={ time }
                        formatLabel = { (val, ind) => time[ind] }
                        svg={{ fontSize: 10, fill: 'black' }}
                        contentInset= {{left: 15, right: 15}}
                     />
               </ScrollView>
               <YAxis
                  style={{height: chCao*0.3}}
                  data={ [0, 100] }
                  formatLabel={ (value, index) => `${value}%` }
                  contentInset={{ top: 10, bottom: 10 }}
                  svg={{ fontSize: 10, fill: 'black' }}
               />
            </View>
         </View>
      )
   }
   componentDidMount() {
      // setTimeout(() => {
      //    this.refs.content.scrollToEnd();
      // }, 50);

      // this.dulieu.ref('nhiet do').on('value', (snap)=> {
      //    this.setState({
      //       data: [
      //          ...snap.val()
      //       ]
      //    })
      // });
      
   }
}
