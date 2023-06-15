import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native'

function Feed() {
    const imagerl = "https://www.cined.com/content/uploads/2023/03/Midjourney_v5_out_now-feature_image_2.jpg"

    return (
        <ScrollView>
            <View >
                <View style={Style.postsection}>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 10 }}>
                        <Image
                            source={{ uri: imagerl }}
                            style={Style.image} />
                        <Text style={Style.username}>Username</Text>
                    </View>
                    <Text style={{ marginLeft: 60, fontWeight: "500", color: "#5C5858" }}>Define the menu bar layout: Within the"MenuBar.js" file, define the layout of your menu bar using the imported components. This could be a horizontal bar at the top or bottom of the screen, or a sidebar navigation menu.</Text>
                    <Image
                        source={{ uri: imagerl }}
                        style={{ width: 270, height: 200, borderRadius: 10, marginLeft: 60,marginBottom:20 }} />
                        
                </View>
                <View style={Style.postsection}>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 10 }}>
                        <Image
                            source={{ uri: imagerl }}
                            style={Style.image} />
                        <Text style={Style.username}>Username</Text>
                    </View>
                    <Text style={{ marginLeft: 60, fontWeight: "500", color: "#5C5858" }}>Define the menu bar layout: Within the"MenuBar.js" file, define the layout of your menu bar using the imported components. This could be a horizontal bar at the top or bottom of the screen, or a sidebar navigation menu.</Text>
                    <Image
                        source={{ uri: imagerl }}
                        style={{ width: 270, height: 200, borderRadius: 10, marginLeft: 60,marginBottom:20 }} />
                        
                </View>
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
        marginTop:10
        
    },
})
export default Feed
