import {StyleSheet, Dimensions} from 'react-native';
const chCao = new Dimensions.get('screen').height // height of the phone
const loginstyle= StyleSheet.create({
    container:{
        height: chCao,
        width: '100%',
        alignItems:'center'
    },
    logo:{
        height:'75%'
    },
    wraptext:{
        flex:4,
        width: '90%',
    },
    text1:{
        fontSize: 18,
        borderWidth: 1,
        marginTop: 10
    },
    password:{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        marginTop: 5,
    },
    eye:{
        width: 30,
        height: 30,
        marginRight: 5,
    },
    logbutton:{
        marginTop:10,
        height: 50,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,3,0,0.7)',
    },
    register:{
        marginTop: 5,
        fontSize: 18,
        color: '#0000ff',
        fontWeight: 'bold',
        fontStyle: 'italic',
        alignSelf: 'flex-end'
    },
    fbgg:{
        flex:5,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
    },
    fbbutton:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 80,
        padding: 4,
        borderColor: '#fff',
        borderWidth:1
    },

})
export default loginstyle;