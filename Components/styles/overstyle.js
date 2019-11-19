import {StyleSheet} from 'react-native';
const overstyle= StyleSheet.create({
    header:{
        width:'100%',
        height: 50,
        backgroundColor: 'rgba(189,197,46,0.36)',
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon:{
        width: 22,
        height: 22,
        marginLeft: 10
    },
    warning:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    warnIcon:{
        width: 30,
        height: 30
    },
    img:{
        flex:4,
        width: '100%',
        height: '100%',
    },
    content:{
        paddingLeft: 12,
        marginRight: 12,
        borderColor: 'red',
    },
    search:{
        height: 40,
        flexDirection: 'row', 
        backgroundColor: '#e9e9e9', 
        borderRadius: 25,
        alignItems: 'center',
        margin: 15,
    },
    advices:{
        height: 50, 
        width: '100%',
        justifyContent: 'center',
        borderBottomWidth: 1
    }
});
export default overstyle;