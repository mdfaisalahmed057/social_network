import React from 'react'
import { View, Text, StyleSheet, Image, TextInput, Pressable,ScrollView } from 'react-native'
import Feed from './Feed'
import {FontAwesome5} from '@expo/vector-icons'

 function HomePage() {
    const imagerl = "https://www.cined.com/content/uploads/2023/03/Midjourney_v5_out_now-feature_image_2.jpg"
    const icon=require('../../assets/addAvatar.png')
    return (
        <ScrollView>

        <View>
            <View>
                <Text style={Style.header}>SociaL-Network</Text>
            </View>
            {/* this is for the post section */}
            <View >
                <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 10 }}>
                    <Image
                        source={{ uri: imagerl }}
                        style={Style.image} />
                    <Text style={Style.username}  >Username</Text>
                </View>
                <TextInput style={Style.input} placeholder='Write Something' />
                
                <View style={{ flexDirection: 'row' }}>
                     <Image
                        source={icon}
                        style={{marginTop:10,marginLeft:16,width:40,height:40}} />
                     <Pressable    style={Style.button}>
                        <Text style={{marginLeft:16,marginTop:4}} >Add</Text>
                    </Pressable>
                </View>
            </View>
            <Feed/>
         </View>
            
         </ScrollView>
    )
}

const Style = StyleSheet.create({
    header: {
        marginVertical: 60,
        marginLeft: 20,
        fontSize: 16,
        fontWeight: "500",
    },
    postsection: {
        width: 320,
        height: "40%",
        backgroundColor: "#fffff",
        marginLeft: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#CBC6C6"
    },
    image: {
        borderRadius: 100,
        width: 40,
        height: 40,
     },

    username: {
        fontSize: 16,
        color: '5C5858',
        fontWeight: "500",
        color: "#CBC6C6",
        marginTop: 10,
        marginLeft: 10,
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#B4AFAF',
        marginHorizontal: 10,
        marginTop: 10,
        height: 40,
        textAlign: "left"
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        width: 70,
        height: 30,
        borderRadius: 10,
        marginLeft: 220,
        backgroundColor: "#FFE70D"
    }
})

export default HomePage
