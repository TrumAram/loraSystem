import {StyleSheet, Dimensions} from 'react-native';
const chCao = new Dimensions.get('screen').height
const chartstyle= StyleSheet.create({
    header:{
        width:'100%',
        height: 50,
        backgroundColor: 'rgba(20,100,197,0.36)',
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon:{
        width: 25,
        height: 25,
        marginLeft: 10
    },
    background:{
        width: '100%',
        height: chCao*0.75,
        alignItems: 'center'
    },
    buttonWrap:{
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    chuThich:{
        height:30, 
        borderTopWidth: 1,
        backgroundColor: '#fff', 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});
export default chartstyle;