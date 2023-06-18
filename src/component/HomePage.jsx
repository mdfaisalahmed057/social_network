import React, {useEffect,useState } from 'react'
import { View, Text, StyleSheet, Image, TextInput, Pressable,ScrollView, TouchableOpacity } from 'react-native'
import Feed from './Feed'
import {FontAwesome5} from '@expo/vector-icons'
import { signOut } from "firebase/auth";
import {auth, db, storage} from '../../firebase';
import * as ImagePicker from 'expo-image-picker';
 import { collection,Timestamp, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable,getDownloadURL } from "firebase/storage";
 

 function HomePage() {
    const imagerl = "https://www.cined.com/content/uploads/2023/03/Midjourney_v5_out_now-feature_image_2.jpg"
    const icon=require('../../assets/addAvatar.png')
    const[desc,setDesc]=useState()
    const[img,setImg]=useState(null)

// const logout=async()=>
// {
//     try{
//      const res= signOut(auth)
//      console.log(res)
//      navigation.navigate('Login')

//     }catch(err){
// console.log(err)
//     }
// }

// adding post 

useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission not granted!');
      }
    })();
  }, []);


const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
       quality: 1,
    });

    if (!result.canceled) {
        setImg(result.assets[0]);
    }
  };

const handlesubmit = async () => {
try {
    if (img) {
        const date = new Date().getTime();
      const storageref = ref(storage,`post+${date}`);
      const response = await fetch(img.uri);
      const blob = await response.blob();
        const uploadTask = uploadBytesResumable(storageref, blob)

        uploadTask.on(
            (err) => {
    console.log(err)
            },
            () => {
                getDownloadURL(storageref).then(async (downloadurl) => {
                    try {
                        await addDoc(collection(db, "post"), {
                            desc,
                            postImage: downloadurl,
                            date: Timestamp.now()
                        })
                    } catch (err) {
                        console.log(err)

                    }
                })
            }

        )
    } else {
        await addDoc(collection(db, "post"), {
            desc,
            date: Timestamp.now()
        })
    }
} catch (err) {
    console.log(err)

}
}


return (
    <ScrollView>

        <View>
            <View style={Style.header}>
                <Text >SociaL-Network</Text>
                <Pressable >
                    <Text style={Style.button} >Logout</Text>
                </Pressable>
            </View>
            {/* this is for the post section */}
            <View >
                <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 10 }}>
                    <Image
                        source={{ uri: imagerl }}
                        style={Style.image} />
                    <Text style={Style.username}  >Username</Text>
                </View>
                <TextInput   onChange={event => setDesc(event.nativeEvent.text)} style={Style.input} placeholder='Write Something' />

                <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={pickImage}>
                  <Image
                        source={icon} 
                        style={{ marginTop: 10, marginLeft: 16, width: 40, height: 40 }} />
                   </TouchableOpacity>
                    <Pressable style={Style.button}>
                        <Text style={{ marginLeft: 16, marginTop: 4 }} onPress={handlesubmit}  >Post</Text>
                    </Pressable>
                </View>
            </View>
            <Feed />
        </View>

    </ScrollView>
)
}

const Style = StyleSheet.create({
    header: {
         marginLeft: 20,
        fontSize: 16,
        fontWeight: "500",
        marginTop:20,
        flexDirection:'row',
        justifyContent: 'space-evenly',

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
        marginLeft:20,
        backgroundColor: "#FFE70D"
    }
})

export default HomePage
