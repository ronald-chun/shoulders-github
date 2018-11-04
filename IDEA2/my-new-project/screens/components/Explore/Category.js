import React, { Component } from "react";
import Icon from 'react-native-vector-icons/Ionicons'
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

class Category extends Component {
    
    render() {
        const gender = this.props.gender;
        const smoke = this.props.smoke;
        const fav   = this.props.fav;
        const shareRoom = this.props.shareRoom;


        var smokeImage;
        var genderImage;
        var favIcon;
        var shareRoomImage;

        if(fav == "true"){
            favIcon = "ios-bookmark"
        }else{
            favIcon = "ios-bookmark-outline"
        }

        if(shareRoom == "false"){
            shareRoomImage = require("../../../assets/flatMate_single.png")
        }else{
            shareRoomImage = require("../../../assets/flatMate.png")
        }

        if(smoke == "true"){
            smokeImage = require('../../../assets/smoking.png')
        }else{
            smokeImage = require('../../../assets/noSmoking.png')
        }

        if (gender == 'M') {
            genderImage =  require('../../../assets/gender_M.png')
        }else if (gender == 'F') {
            genderImage =  require('../../../assets/gender_F.png')
        }else{
            genderImage =  require('../../../assets/gender.png')
        }
        return (
            <View style={{ height: 110, marginLeft: 5, marginRight: 5,marginBottom: 10, borderWidth: 0.5, borderColor: '#dddddd',flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image source={this.props.imageUri}
                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                    />
                </View>
                
                <View style={{ flex: 2, paddingLeft: 10, paddingTop: 0 ,flexDirection: 'column' }}>
                
                    <View class="infoGrp">
                        {/* <Text>{this.props.name} </Text> */}
                        
                        <View style={{flexDirection:'row',paddingTop:5}}>
                            <View style={{flex:1,flexDirection:'row'}}>
                                <Image
                                    source = {require('../../../assets/location.png')}
                                    style = {{width: 20,height:20}}
                                />
                                <Text>{this.props.location}</Text>
                            </View>
                        </View>
                    </View>
                    <View class="infoGrp">
                        <View style={{flexDirection:'row',paddingTop:5}}>

                            <View style={{flex:1,flexDirection:'row'}}>
                                <Image
                                    source = {genderImage}
                                    style = {{width: 20,height:20}}
                                />
                            </View>
                            <View style={{flex:1,flexDirection:'row'}}>
                                <Image
                                    source = {require('../../../assets/rest.png')}
                                    style = {{width: 20,height:20}}
                                />
                                <Text>{this.props.restTime}</Text>
                            </View>
                        </View>
                    </View>
                    <View class="infoGrp">
                        <View style={{flexDirection:'row',paddingTop:5}}>
                            <View style={{flex:1,flexDirection:'row'}}>
                                <Image source={smokeImage}
                                    style={{width: 20,height:20}}
                                />
                            </View>
                            <View style={{flex:1,flexDirection:'row'}}>
                                <Image source={require('../../../assets/money.png')}
                                    style={{width: 20,height:20}}
                                />
                                <Text>{this.props.money}</Text>
                            </View>
                            

                        </View>
                    </View>
                    <View class="infoGrp">
                        <View style={{flexDirection:'row',paddingTop:5}}>
                            <View style={{flex:1,flexDirection:'row'}}>
                                <Image source={shareRoomImage}
                                    style={{width: 20,height:20}}
                                />
                            </View>
                            <View style={{flex:1,flexDirection:'row'}}>
                                <Image
                                    source = {require('../../../assets/people.png')}
                                    style = {{width: 20,height:20}}
                                />
                                <Text>{this.props.peopleLimit}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <Icon style={{paddingTop:0,textAlign:"right",paddingRight:20}} name={favIcon} size={24} /> 
                </View>
            </View>
        );
    }
}
export default Category;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
