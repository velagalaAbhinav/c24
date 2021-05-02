import React,{Component} from 'react'
import{View,StyleSheet,Text,Image,TouchableOpacity,TextInput,Alert,Morda,KeyboardAvoidingView} from 'react-native'
import db from '../config';
import firebase from 'firebase'
import MyHeader from '../Components/myheader'

export default class notificationScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            userId:firebase.auth().currentUser.email,
            AllDonations:[]
        }
        this.notificationRef = null
    }

    keyextracter = (item,index)=>index.toString()
    renderItem = ({item,index})=>(
        <ListItem
        key = {index}
        title = {item.item_name}
        subtitle = {item.message}
        leftElement = {<Icon name = "item"type = "font-awesome" color = 'yellow'/> }
        titleStyle = {{color:'black',fontWeight:'bold'}}
        bottomDivider
        />
    )
    render(){
        return(
            <View>
                <MyHeader title = "Notifications" navigation = {this.props.navigation}/>
                <View>
                    {
                        this.state.AllNotifications.lenght === 0
                        ?(
                            <View><Text>no notifications</Text></View>
                        )
                        :(
                            <SwipeableFlatList
                            AllNotifications = {this.state.AllNotifications}
                            />
                        )
                    }
                </View>
            </View>
        )
    }
}