import React from 'react'
import { View, Text,Pressable, StyleSheet,Button, Image, ScrollView, TextInput, TouchableOpacity,Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {  signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../firebase'
import { useState } from 'react';
function Login() {

    const navigation = useNavigation();
    const [email, SetEmail] = useState()
    const [password, setPassword] = useState()
     const handlesubmit = async () => {
    
      
            try {
              const creden= await signInWithEmailAndPassword(auth, email, password)
              if(creden.user){
                navigation.navigate('HomePage')

              }
            } catch (err) {
                if (err.code === "auth/network-request-failed") {
                    Alert.alert("Network Error", "Please check your internet connection and try again.");
                  } else {
                    Alert.alert("Firebase Error", err.message);
                  }
              }           
              setPassword("")
              SetEmail("")
    }
    
    return (
        <View>
            <View>
                <Text style={Style.header}>Login</Text>
            </View>
           <View style={{marginTop:40}}>
            <Text style={{ marginLeft: 20 }}>
                Email
            </Text>
            <TextInput 
             value={email} 
             keyboardType="email-address"
             onChange={(e)=>SetEmail(e.nativeEvent.text)} 
             style={Style.input} 
             placeholder='Enter Your Email'
              />
            <Text style={{ marginLeft: 20,marginTop:10 }}>
                Password
            </Text>
            <TextInput 
            value={password}
            onChange={(e)=>setPassword(e.nativeEvent.text)} 
            style={Style.input} 
            placeholder='password'
            secureTextEntry={true}
             />
            <Pressable style={Style.button}>
                <Text style={{ marginLeft: 140, marginTop: 13, color: '#FFFFFF', fontSize: 20 }} onPress={handlesubmit} >Login</Text>
            </Pressable>
              <Text style={{ marginLeft: 20  }}>Already have an Account.
            <Text  style={{ color:'#FDD365'}} onPress={() => navigation.navigate('SignUp')}>SignUp</Text>
            </Text>
        </View>
        </View>
    )
}
const Style=StyleSheet.create({
    header: {
        marginTop:20,
         marginLeft: 10,
        fontSize: 30,
        color:"#B4AFAF",
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
