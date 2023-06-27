import React, {useContext, useEffect,useState } from 'react'
import { View, Text, StyleSheet, Image, TextInput, Pressable,ScrollView, TouchableOpacity } from 'react-native'
import Feed from './Feed'
import {FontAwesome5} from '@expo/vector-icons'
import { signOut } from "firebase/auth";
import {auth, db, storage} from '../../firebase';
import * as ImagePicker from 'expo-image-picker';
 import { collection,Timestamp, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable,getDownloadURL } from "firebase/storage";
 import { useNavigation } from '@react-navigation/native';
 import { AuthContext } from '../context/AuthC';
 
 const{currentUser}=useContext(AuthContext)
 console.log(currentUser)
 function HomePage() {
    const imagerl = "https://www.cined.com/content/uploads/2023/03/Midjourney_v5_out_now-feature_image_2.jpg"
    const icon=require('../../assets/addAvatar.png')
    const[desc,setDesc]=useState()
    const[img,setImg]=useState(null)
 const navigation=useNavigation()
const logout=async()=>
{
    try{
     const res= signOut(auth)
     console.log(res)
     navigation.navigate('Login')

    }catch(err){
console.log(err)
    }
}

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
            const storageref = ref(storage, `post/${date}`);
            const response = await fetch(img.uri);
            const blob = await response.blob();
            const uploadTask = uploadBytesResumable(storageref, blob)

            uploadTask.on(
                (err) => {
                    console.log(err)
                },
                () => {
                    getDownloadURL(storageref).then(async (downloadurl) => {

                        await addDoc(collection(db, "post"), {
                            desc,
                            date: Timestamp.now(),
                            postImage: downloadurl,

                        })

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
    setDesc("")
    setImg(null)
}


return (
    <ScrollView>

        <View>
            <View style={Style.header}>
                <Text style={{color:"#B4AFAF",fontSize:26}} >SociaL-Network</Text>
                <Pressable style={Style.button}   >
                    <Text style={{marginLeft:14,marginTop:4}} onPress={logout} >Logout</Text>
                </Pressable>
            </View>
            {/* this is for the post section style={{marginTop:10}}   */}
            <View >
                <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 10 }}>
                    <Image
                        source={{ uri: imagerl }}
                        style={Style.image} />
                    <Text style={Style.username}  >Username</Text>
                </View>
                <TextInput value={desc}   onChange={event => setDesc(event.nativeEvent.text)} style={Style.input} placeholder='Write Something' />

                <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={pickImage}>
                  <Image
                        source={icon} 
                        style={{ marginTop: 10, marginLeft: 16, width: 40, height: 40 }} />
                   </TouchableOpacity>

                         {/* <Text style={{ marginLeft: 16, marginTop: 4  }} onPress={handlesubmit}  >Post</Text> */}
                         <TouchableOpacity onPress={handlesubmit}>
                  <Image
                        source={icon} 
                        style={{ marginTop: 10, marginLeft: 16, width: 40, height: 40 }} />
                   </TouchableOpacity> 
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
          fontWeight: "500",
         flexDirection:'row',
 
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
        marginTop: 10,
        width: 80,
        height: 34,
        borderRadius: 10,
        marginLeft:40,
        backgroundColor: "#FFE70D"
    }
})

export default HomePage
