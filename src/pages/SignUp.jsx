import React, { useEffect,useState } from 'react'
import { View, Text,Pressable, StyleSheet, Image, ScrollView,Alert, TouchableOpacity,TextInput } from 'react-native'
import {  createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth, db} from '../../firebase';
import * as ImagePicker from 'expo-image-picker';
 import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import{storage} from '../../firebase'
import { setDoc,collection, addDoc } from 'firebase/firestore';
 import { useNavigation } from '@react-navigation/native';
 
function SignUp() {
  const [username, setUsername] = useState()
  const [email, SetEmail] = useState()
  const [password, setPassword] = useState()
  const[error,setError]=useState(false)
  const [selectImage, setSelectImage] = useState(null)
  const navigation = useNavigation();
  const icon=require('../../assets/addAvatar.png')

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
      setSelectImage(result.assets[0]);
    }
  };


  const handlesubmit = async (e) => {
    try {

      const res = await createUserWithEmailAndPassword(auth, email, password);
      const date = new Date().getTime();
      const storageRef = ref(storage, `${username + date}`);
      const response = await fetch(selectImage.uri);
      const blob = await response.blob();

      const uploadTask = uploadBytesResumable(storageRef, blob);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle upload progress or state changes if needed
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(storageRef).then(async (downloadurl) => {
            try {
              await addDoc(collection(db, "users"), {
                username,
                photourl: downloadurl,
              });
              navigation.navigate('HomePage');
            } catch (err) {
              console.log(err);
            }
          });
        }
      );
    } catch (err) {
      console.log(err);
      Alert.alert("Firebase Error", err.message);

      
    }
  // }
  };
      
  return (
    <ScrollView>
      <View>
        <View>
          <Text style={Style.header}>Register</Text>
        </View>
        <View style={{ marginLeft: 20, marginTop: 14 }}>

          <Text >
            Username
          </Text>

          <TextInput
            style={Style.input}
            placeholder='Enter Your username'
            onChangeText={(text) => setUsername(text)}
          />
          <Text >
            Email
          </Text>
          <TextInput
            style={Style.input}
            keyboardType='email-address'
            placeholder='Enter Your Email'
            onChangeText={(text) => SetEmail(text)}
          />
          <Text >
            Password
          </Text>
          <TextInput
            style={Style.input}
            placeholder='Enter Your Password'
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
          <Text >
            Profile Picture
          </Text>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={icon}
              style={{ marginTop: 10, marginLeft: 16, width: 40, height: 40 }} />
          </TouchableOpacity>
          {selectImage && <Image source={{ uri: selectImage.uri }} style={Style.image} />}
        </View>
        <Pressable style={Style.button}>
          <Text style={{ marginLeft: 140, marginTop: 13, color: '#FFFFFF', fontSize: 20 }} onPress={handlesubmit} >SignUp</Text>
        </Pressable>
        <Text style={{ marginLeft: 20, marginTop: 20 }}>Already have an Account.
          <Text style={{ color: '#FDD365' }} onPress={() => navigation.navigate('Login')}>Login
          </Text>
        </Text>
      </View>
    </ScrollView>

  )
}
const Style = StyleSheet.create({
  header: {
  color:"#B4AFAF",
    marginLeft: 20,
    fontSize: 30,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#B4AFAF',
    marginTop: 10,
    width: '90%',
    height: 50,
    textAlign: "left",
    marginBottom: 20
  },
  button: {
    backgroundColor: '#FDD365',
    width: '88%',
    height: 50,
    marginLeft: 20,
    borderRadius: 100,
    marginTop:10

  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
})

export default SignUp
