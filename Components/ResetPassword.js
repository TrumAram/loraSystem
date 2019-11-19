import React, {Component} from 'react';
import {Alert, Text, View,ImageBackground, Image,TextInput, TouchableOpacity, Linking} from 'react-native';
import loginstyle from './styles/loginstyle';
import {firebaseApp} from "../Firebase/FBConfig";

export default class register extends Component{
    static navigationOptions={
        header: null
    }
    constructor(props){
        super(props);
        this.state={
            email:''
        }
    }
    resetPassword = () => {
        firebaseApp.auth().sendPasswordResetEmail(this.state.email)
            .then(()=> {
                Alert.alert(
                    'Đã gửi yêu cầu!!',
                    'Hãy kiểm tra Email của bạn',
                    [
                        { text: 'OK'},
                    ],
                    {cancelable: false},
                );
            })
            .catch(function(error) {
                Alert.alert(
                    'Thông báo!!',
                    'Không thể thay đổi mật khẩu. Vui lòng thử lại',
                );
        });

    }
    render(){
        return(
            <View style={{flex: 1}}>
            <ImageBackground source={require('./img/login.jpg')}
                             style={loginstyle.container}>
                <View style={{flex: 3, justifyContent: 'center'}}>
                    <Image
                        source={require('./img/logo.png')}
                        style={loginstyle.logo}
                        resizeMode={'contain'}/>
                </View>

                <View 
                    style={{
                        ...loginstyle.wraptext,
                        justifyContent: 'center',
                        }}>
                    <Text style={{color: 'black', fontSize: 15}}>Nhập email của bạn</Text>
                    <TextInput placeholder={'Username'} style={loginstyle.text1}
                               onChangeText={(email)=> this.setState({email})}
                    />
                    <TouchableOpacity
                        onPress={this.resetPassword} 
                        style={loginstyle.logbutton}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize:18}}>
                            Lấy lại mật khẩu
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 5}}>
                    <TouchableOpacity
                        onPress={()=> this.props.navigation.navigate('dangnhap')}
                        style={{
                            padding: 5, paddingHorizontal: 20,
                            borderWidth: 2,
                            borderColor: '#fff',
                            marginTop: '50%'
                        }}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize:17}}>Quay lại</Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>
            </View>

        )
    }
}