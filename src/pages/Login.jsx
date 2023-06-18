import React from 'react'
import { View, Text,Pressable, StyleSheet,Button, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {  signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../firebase'
import { useState,useEffect } from 'react';
function Login() {

    const navigation = useNavigation();
    const [email, SetEmail] = useState()
    const [password, setPassword] = useState()
 
    const handlesubmit = async () => {
        try {
           const res= signInWithEmailAndPassword(auth, email, password)
            console.log(res)
            if(!res){
                Alert.alert("Enter the credential")

            }else{
                navigation.navigate('HomePage')
            }
        } catch (err) {
            console.log(err)
        }
    }
    
    return (
        <View>
            <View>
                <Text s tyle={Style.header}>Login</Text>
            </View>
            <Text style={{ marginLeft: 20 }}>
                Email
            </Text>
            <TextInput onChange={(text)=>SetEmail(text)} style={Style.input} placeholder='Enter Your Email' />
            <Text style={{ marginLeft: 20,marginTop:10 }}>
                Password
            </Text>
            <TextInput onChange={(text)=>setPassword(text)} style={Style.input} placeholder='password' />
            <Pressable style={Style.button}>
                <Text style={{ marginLeft: 140, marginTop: 13, color: '#FFFFFF', fontSize: 20 }} onPress={handlesubmit} >Login</Text>
            </Pressable>
            <Text style={{ marginLeft: 20  }}>Already have an Account.
            <Text  style={{ color:'#FDD365'}} onPress={() => navigation.navigate('SignUp')}>SignUp</Text>
            </Text>
        </View>
    )
}
const Style=StyleSheet.create({
    header: {
        marginVertical: 60,
        marginLeft: 20,
        fontSize: 16,
        fontWeight: "500",
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#B4AFAF',
        marginHorizontal: 10,
        marginTop: 10,
        width: '90%',
        height: 50,
        textAlign: "left"
    },
    button:{
        backgroundColor: '#FDD365',
         width: '90%',
         height:50,
           marginVertical:20,
          marginLeft:10,
        borderRadius: 100,
      
      },
})

export default Login
