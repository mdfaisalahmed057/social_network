import React, { useState, useEffect } from 'react';
import { Button, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../../firebase';
import { storage } from '../../firebase';

function Posting() {
  const [selectImage, setSelectImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission not granted!');
      }
    })();
  }, []);

  const uploadImage = async () => {
    if (selectImage) {
      try {
        const response = await fetch(selectImage.uri);
        const blob = await response.blob();
        const storageRef = firebase.storage().ref();
        console.log(storageRef);
        const imageRef = storageRef.child('images/' + selectImage.uri);
        await imageRef.put(blob);
        const imageUrl = await imageRef.getDownloadURL();
        console.log('Image URL:', imageUrl);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 2],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectImage(result.assets[0]);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Select Image" onPress={pickImage} />
      {selectImage && <Image source={{ uri: selectImage.uri }} style={styles.image} />}
      {selectImage && <Button title="Upload Image" onPress={uploadImage} style={styles.button} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  button: {
    marginTop: 20,
  },
});

export default Posting;
