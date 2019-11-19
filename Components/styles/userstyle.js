import {StyleSheet} from 'react-native'
const userstyle= StyleSheet.create({
    header:{
        height: 50,
        backgroundColor: 'rgba(246,31,46,0.36)',
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon:{
        width: 25,
        height: 25,
        marginHorizontal: 10
    },
    personal:{
        flex:1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    avatar:{
        height: 110,
        width: 110,
        marginLeft: 10
    },
    content:{
        flex:3,
        marginVertical: 10, 
        backgroundColor:'white', 
        paddingHorizontal: 10
    },
    detail:{
        flex:1,
        width:'100%',
        flexDirection:'row',
        alignItems: 'center',
        borderBottomWidth: 1,  
    },
    detail_z:{
        flex:1,
        width:'100%',
        flexDirection:'row',
        alignItems: 'center',         
    },
    text:{
        fontSize:18,
        color: '#000'
    
    },
    modalInfo:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5
    },
    newPassword:{
        borderBottomWidth: 1,
        marginBottom: 5,
        height: 40,
        width: '100%',
        fontSize: 16,
        paddingVertical: 3
    },
    updatePassButton:{
        padding: 5,
        marginTop: 10,
        width: 100,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#0080ff',
        borderRadius: 10,
    }
})
export default userstyle;