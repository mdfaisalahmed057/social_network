import React from 'react'
import { View, Text,Pressable, StyleSheet,Button, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native'

function Login() {
    return (
        <View>
            <View>
                <Text style={Style.header}>Login</Text>
            </View>
            <Text style={{marginLeft:20}}>
                Email
            </Text>
            <TextInput style={Style.input} placeholder='Enter Your Email' />
            <Pressable style={Style.button}>
                <Text style={{marginLeft:140,marginTop:13,color:'#FFFFFF',fontSize:20}} >Login</Text>
            </Pressable>
            <Text style={{marginLeft:20}}>Already have an Account.Register</Text>
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
