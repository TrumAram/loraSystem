import React, {Component} from 'react';
import {Text, View, ScrollView, Dimensions} from 'react-native';
import {BarChart, XAxis,YAxis, Grid} from 'react-native-svg-charts';
import {firebaseApp} from "../../../Firebase/FBConfig";

const chCao = Dimensions.get('window').height;
const chRong = Dimensions.get('window').width;
const dulieu= firebaseApp.database();
export default class DoAm extends Component{
   constructor(props){
      super(props);
      this.state={
         data:[],
         timeData: []
      }
   }

   render(){
      const barChart = [{
         data: this.state.data
      }]
      return(
         <View style={{flexDirection: 'row' }}>
            <YAxis
               style={{height: chCao*0.3, width: 30}}
               data={ [0, 100] }
               formatLabel={ value => `${value}%` }
               numberOfTicks = {6}
               contentInset={{ top: 10, bottom: 10 }}
               svg={{ fontSize: 12, fill: 'black' }}
            />
            <ScrollView horizontal = {'true'}>
               <View>
               <BarChart
                  style={{height: chCao*0.3, width: chRong*1.2}}
                  data={ barChart}
                  gridMin={0}
                  gridMax={100}
                  spacingInner= {0.3}
                  svg={{ fill: 'rgba(111, 220, 0, 0.7)' }}
                  contentInset={{ top: 10, bottom: 10 }}
               >
                  <Grid direction={Grid.Direction.HORIZONTAL}/>
                  
               </BarChart>

               <XAxis
                  style={{width: chRong*1.2, paddingTop:10}}
                  data={ this.state.timeData}
                  formatLabel={ (value, index) => this.state.timeData[index] }
                  svg={{ fontSize: 10, fill: 'black' }}
                  contentInset= {{left: 15, right: 15}}
               />
               </View>
            </ScrollView>
         </View>
      )
   }

   componentDidMount() {
      var items = [];
      var time = [];
      const userID = firebaseApp.auth().currentUser.uid

      // this.dulieu.ref('nhiet do').on('value', (snap)=> {
      //    this.setState({
      //       data: [
      //          ...snap.val()
      //       ]
      //    })
      // });
      dulieu.ref(`${userID}`).child('Database').child('Node 1').child('Độ ẩm').on('child_added', (snap)=> {
         items.unshift(snap.val().nhietDo)
         time.unshift(snap.val().time)
         if (items.length > 12){
            items.pop();
            time.pop()
         }
         this.setState({
            data: items,
            timeData: time
         })
      });
   }
}
