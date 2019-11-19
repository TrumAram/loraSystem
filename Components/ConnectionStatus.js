import React, {Component} from 'react'
import {View, Text} from 'react-native'

export default class NoConnection extends Component{
    render(){
        return(
            <View
                style = {{
                    height: 30, width: '100%',
                    backgroundColor: '#c80000',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Text
                    style = {{
                        color: '#fff',
                        fontSize: 13,
                        fontWeight: '900'
                    }}>Mất kết nối Internet</Text>
            </View>
        )
    }
}