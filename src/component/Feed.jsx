import { collection, onSnapshot, doc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

function Feed() {
  const imagerl = "https://www.cined.com/content/uploads/2023/03/Midjourney_v5_out_now-feature_image_2.jpg"
  const [postData, setPostData] = useState([])
  const translateY = useSharedValue(0);

  // Define shared animated value
  const opacityValue = useSharedValue(0);

  // Define animated style based on shared value
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(collection(db, "post"), (querySnapshot) => {
        const documents = [];
        querySnapshot.forEach((doc) => {
          documents.push(doc.data());
        });
        setPostData(documents);
       });
      return () => {
        unsub();
      };
    };
  
    getChats();
  }, []);
  return (
    <ScrollView>
      <View >
        {postData.map((data, index) => (
          <View style={Style.postsection} key={data.id ?? index}>

            <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 10 }}>
              <Image
                source={{ uri: imagerl }}
                style={Style.image} />
              <Text style={Style.username}>username</Text>
            </View>
            <View>
              <Text style={{ marginLeft: 60, fontWeight: "500", color: "#5C5858" }}>{data.desc}</Text>
              {data.postImage && <Image
                source={{ uri: data.postImage }}
                style={{ width: 270, height: 200, borderRadius: 10, marginLeft: 60, marginBottom: 20 }} />}
            </View>

          </View>
        ))}
        {/* this section is for post  */}


      </View>
    </ScrollView>
  )
}

const Style = StyleSheet.create({
    image: {
        borderRadius: 100,
        width: 40,
        height: 40
    },

    username: {
        fontSize: 16,
        fontWeight: "500",
        color: "#CBC6C6",
        marginTop: 10,
        marginLeft: 10,
    },
    postsection: {
        backgroundColor: "#fffff",
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#CBC6C6",
        marginTop:20
        
    },
})
export default Feed
