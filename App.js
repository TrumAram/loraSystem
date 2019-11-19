import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import login from "./Components/Login";
import ResetPassword from './Components/ResetPassword'
import overview from "./Components/Details/Overview";
import chart from "./Components/Details/Chart";
import map from './Components/Details/Map'
import user from "./Components/Details/User";
import History from './Components/Details/User_2/History'
import Setting from './Components/Details/User_2/Setting'
console.disableYellowBox = true

const Home = createMaterialTopTabNavigator({
   view1: overview,
   view2: chart ,
   view3: map,
   view4: user 
   }, {
      //lazy: true,
      tabBarPosition: 'bottom',
      tabBarOptions:{
         activeTintColor: '#18f400',
         inactiveTintColor: '#fff',
         showIcon: true,
         upperCaseLabel: false,
         indicatorStyle:{
            position: 'relative',
            backgroundColor: '#00b300'
         },
         tabStyle:{
            padding: 0,
         },
         labelStyle:{
            fontSize: 12,
            marginTop: 0
         },
         iconStyle:{
            marginTop: 0
         },
         style:{
            height: 55,
            backgroundColor: '#001b35',
         }
      }
      
   }
);


const House= createStackNavigator({
   dangnhap: login,
   thanhcong: {
      screen: Home,
      navigationOptions: ()=> ({
         header: null,
         gesturesEnabled: true,
      })
   },
   quenMatkhau: ResetPassword,
   lichSu: {
      screen: History,
      navigationOptions: ()=> ({
         headerTitle: 'Lịch sử',
         headerStyle:{
            color: '#fff'
         },
         headerStyle:{
            height: 50,
            backgroundColor: 'rgba(130,130,0,0.5)',
         }
      }),
   },
   caiDat: {
      screen: Setting,
      navigationOptions: ()=> ({
         headerTitle: 'Cài đặt',
         headerStyle:{
            height: 50,
            backgroundColor: 'rgba(0,128,0,0.5)',
         }
      }),
   },
});

const App = createAppContainer(House);
export default App;
