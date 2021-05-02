import React,{Component} from 'react'
import {View,StyleSheet,Text,Image,TouchableOpacity,TextInput,Alert,Modal,KeyboardAvoidingViewComponent, FlatList} from 'react-native';
import db from '../config';
import firebase from 'firebase'
import MyHeader from '../Components/myheader'

export default class MyRecievedItems extends React.Component{
    constructor(){
        super()
        this.state = {
            userId:firebase.auth().currentUser.email,
            recieveitemList:[],
        }
        this.RequestRef = null
    }

    getRecieveItemList = () => {
        this.RequestRef = db.collection("request_items").where("user_id",'==',this.state.userId)
        .where("item_status",'==',"recieved")
        .onSnapshot((snapshot)=>{
            var ItemList= snapshot.docs.math((doc)=>{
                doc.data()
            })
            this.setState({
                recievedItemList:ItemList
            })
        })
    }
    render(){
        return(
            <View>
                <MyHeader title = "RecievedItems" navigation = {this.props.navigation}/>
                <View>
                    {
                        this.state.recievedItems.lenght === 0
                        ?
                        (
                            <View><Text>list all recieved items</Text></View>
                        )
                        :(
                            <FlatList
                            keyExtractor = {this.keyExtractor}
                            data = {this.state.MyRecievedItems}
                            renderItem = {this.renderItem}
                            />
                        )
                    }
                </View>
            </View>
        )
    }
}
