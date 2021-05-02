import React,{Component} from 'react'
import{View,StyleSheet,Text,Image,TouchableOpacity,TextInput,Alert,Morda,KeyboardAvoidingView} from 'react-native'
import db from '../config';
import firebase from 'firebase'
import MyHeader from '../Components/myheader'

export default class MyBarterScreen extends React.Component{
    static navigationOptions = {header:null}
    constructor(props){
        super(props)
        this.state = {
            UserId: firebase.auth().currentUser.email,
            AllDonations:[]
        }
        this.requestRef = null
    }
    sendItem = (itemDetails)=>{
        if(itemDetails.request_Status === "Item sent"){
            var requestStatus = "donorInterest"
            db.collection("All_donations").doc(itemDetails.doc_id).update({
                request_Status:"donorInterested"
            })
            this.sendNotification(itemDetails,requestStatus)
        }
        else{
            var requestStatus = "ItemSent"
            db.collection("All_donations").doc(itemDetails.doc_id).update({
                request_Status:"ItemSent"
            })
            this.sendNotification(itemDetails,requestStatus)
        }
    }
    sendNotification = (itemDetails,requestStatus)=>{
        var Requestid = itemDetails.Request_id
        var donorId = itemDetails.donor_id
        db.collection("all_notification").where("Request_id","==",Requestid)
        .where("Donor_id","==",DonorId).get()
        .then(snapshot=>{
            snapshot.forEach((doc) => {
                var message = ""
                if(requestStatus ==="item sent"){
                    message = this.state.donorName +"sent u the item"
                }
                else{
                    message = this.state.donorName + "has shown interest in donating the item"
                }
                db.collection("all_notifications").doc(doc.id).update({
                    message:message,
                    notification_status:"unread",
                    date:firebase.firestore.Fieldvalue.serverTimeStamp(),

                })
            })
        })

    }

    getAllBarters = ()=>{
        this.requestRef = db.collection("all_donations").where("donar_id","==",this.state.UserId)
        onSnapShot((snapshot)=>{
            var AllDonations = snapshot.docs.map(document => document.data())
            this.setState({
                AllDonations:AllDonations
            })
        })
    }
    sendNotification = (itemDetails,requestStatus)=>{
        var Requestid = itemDetails.Request_id
        var donorId = itemDetails.donor_id
        db.collection("all_notification").where("Request_id","==",Requestid)
        .where("Donor_id","==",DonorId).get()
        .then(snapshot=>{
            snapshot.forEach((doc) => {
                var message = ""
                if(requestStatus ==="item sent"){
                    message = this.state.donorName +"sent u the item"
                }
                else{
                    message = this.state.donorName + "has shown interest in donating the item"
                }
                db.collection("all_notifications").doc(doc.id).update({
                    message:message,
                    notification_status:"unread",
                    date:firebase.firestore.Fieldvalue.serverTimeStamp(),

                })
            })
        })

    }



    

    render(){
        return(
            <View>
            <MyHeader title="My Donations" navigation ={this.props.navigation}/>
            <View>
                {
                    this.state.AllDonations.length === 0
                    ?
                    (
                        <View><Text> List of all donated items </Text></View>
                    )
                    :(
                        <FlatList
                        keyExtractor = {this.keyExtractor}
                        data = {this.state.AllBarterss}
                        renderItem = {this.renderItem}
                        />
                    )


                }
            </View>
        </View>
        )
    }
}
        
    
   
