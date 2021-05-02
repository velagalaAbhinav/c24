import React,{Component} from 'react'
import{View,Text,StyleSheet,Image,TouchableOpacity,TextInput,Alert,Modal,KeyboardAvoidingView, ScrollView} from 'react-native'
import db from '../config';
import firebase from 'firebase'
import MyHeader from '../Components/myheader'
import { Header } from 'react-native/Libraries/NewAppScreen';

export default class userDetailsScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            userId: firebase.auth().currentUser.email,
            UserId: this.props.navigation.getParam('details')["user_Id"],
            RequestId: this.props.navigation.getParam('details')["request_Id"],
            BookName: this.props.navigation.getParam('details')["book_name"],
            reason_for_requesting: this.props.navigation.getParam('details')["Reason_to_Request"],
            UserName: '',
            UserContact:'',
            UserrAddress:'',
            userRequestDocId:''
        }

    }
    getuserDetails = ()=>{
        db.collection('users').where("email_id",'==',this.state.UserId).get()
        .then(snapshot => {
            snapshot.forEach(doc=>{
                this.setState({
                    UserName:doc.data().first_name,
                    UserContact:doc.data().Contact,
                    UserrAddress:doc.data().Address
                })
            })
        })
    }

    addBarters = ()=>{
        db.collection("MyBarters").add({
            item_Name:this.state.itemName,
            Exchanger_Name:this.state.ExchangerName,
            Exchanger_Contact:this.state.ExchangerContact,
            Exchanger_Address:this.state.ExchangerAddress,
            Exchanger_id:this.state.ExchangerId,
            Exchanger_status:this.state.Exchangerstatus
        })
    }

    addNotifications = ()=>{
        var message = this.state.UserName + 'has shown interest in donating the book'
        db.collection("all_notifications").add({
            user_Id:this.state.UserId,
            Donar_id:this.state.DonarId,
            date:this.state.date,
            message: this.state.message,
            item_Name:this.state.itemName,
            notification_status:this.state.notificationStatus,
            
        })
    }
    
    render(){
        return(
            <View>
                <View style = {{flex:0.1}}>
                    <Header
                    leftComponent = {<Icon name = 'arrow-left'type ='feather'color = 'green'onPress = {()=>this.props.navigation.goBack()}/>}
                    centerComponent = {{text:"donate items", style:{color:'black',fontSize:20,fontWeight:"bold"}}}
                    backgroundColor = "red"
                    />
                </View>
                <View style = {{flex:0.3}}>
                    <Card 
                    title  = {"item information"}
                    titleStyle = {{fontSize:20}}>
                        <Card>
                            <Text style = {{fontWeight:'bold'}}>
                                Reason:{this.state.reason_for_requesting}
                            </Text>
                        </Card>
                        
                    </Card>
                </View>
                <View style = {{flex:0.3}}>
                    <Card
                    title = {"User information"}
                    titleStyle = {{fontSize:20}}>
                        <Card>
                            <Text style  = {{fontWeight:'bold'}}>
                                name:{this.state.UserName}
                            </Text>
                        </Card>
                        <Card>
                            <Text style = {{fontWeight:'bold'}}>
                                Contact:{this.state.UserContact}
                            </Text>
                        </Card>
                        <Card>
                            <Text style = {{fontWeight:'bold'}}>
                                Address:{this.state.AddressContact}
                            </Text>
                        </Card>
                    </Card>
                 </View>
                 <View style = {style.buttonContainer}>
                    {
                        this.state.RecieverId!== this.state.UserId
                        ?(
                            <TouchableOpacity
                            style = {styles.button}
                            onPress = {()=>{
                                this.getuserDetails()
                                this.addBarters()
                                this.addNotifications()
                            }}>
                                <Text>i want to donate</Text>
                            </TouchableOpacity>
                        ):
                        null
                    }
                 </View>
            </View>
        )
    }
}