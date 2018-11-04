import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
    ScrollView,
    Image,
    Dimensions
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import Category from './components/Explore/Category'
const { height, width } = Dimensions.get('window')
class Explore extends Component {

    componentWillMount() {
        this.startHeaderHeight = 80
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 100 + StatusBar.currentHeight
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ height: this.startHeaderHeight, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#dddddd' }}>
                        <View style={{
                            flexDirection: 'row', padding: 10,
                            backgroundColor: 'white', marginHorizontal: 20,
                            shadowOffset: { width: 0, height: 0 },
                            shadowColor: 'black',
                            shadowOpacity: 0.2,
                            elevation: 1,
                            marginTop: Platform.OS == 'android' ? 30 : null
                        }}>
                            <Icon name="ios-search" size={20} style={{ marginRight: 10 }} />
                            <TextInput
                                underlineColorAndroid="transparent"
                                placeholder="更改你的搜尋條件"
                                placeholderTextColor="grey"
                                style={{ flex: 1, fontWeight: '700', backgroundColor: 'white' }}
                            />
                        </View>
                    </View>

                    <ScrollView 
                    scrollEventThrottle={16}
                    >
                        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                                有你適合的房間嗎？
                            </Text>

                        </View>

                        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>

                            <View style={{ marginTop: 20 }}>
                                <ScrollView
                                    horizontal={false}
                                    showsHorizontalScrollIndicator={false}
                                >
                                    <Category 
                                        imageUri={require('../assets/home.jpg')}
                                        name="Home"
                                        peopleLimit="4"
                                        restTime = "12:00 A.M."
                                        location = "Tsing Yi"
                                        gender = "M"
                                        smoke = "false"
                                        flatMate = "true"
                                        money = "2,000"
                                        shareRoom = "true"
                                    />
                                    <Category 
                                        imageUri={require('../assets/experiences.jpg')}
                                        name="Home"
                                        peopleLimit="2"
                                        restTime = "11:00 P.M."
                                        location = "Tsun Wan"
                                        gender = ""
                                        smoke = "false"
                                        flatMate = "true"
                                        money = "5,600"
                                        fav = "true"
                                        shareRoom = "false"
                                    />
                                    <Category imageUri={require('../assets/restaurant.jpg')}
                                        name="Home"
                                        peopleLimit="3"
                                        restTime = "01:00 A.M."
                                        location = "Centre"
                                        gender = "G"
                                        smoke = "true"
                                        flatMate = "true"
                                        money = "2,000"
                                        shareRoom = "false"
                                    />
                                </ScrollView>
                            </View>

                        </View>
                    </ScrollView>

                </View>
            </SafeAreaView>
        );
    }
}
export default Explore;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});