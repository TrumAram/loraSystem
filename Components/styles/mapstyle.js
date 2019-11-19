import {StyleSheet} from 'react-native';

const mapstyle = StyleSheet.create({
    icon:{
        width: 25,
        height: 25,
        marginLeft: 10
    },
    header:{
        height: 50,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(189,96,4,0.36)'
    },
    myPonds:{
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fffa',
        borderWidth: 1,
        borderRadius: 5
    }

});
export default mapstyle;