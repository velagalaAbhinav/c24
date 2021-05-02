import React,{Component} from 'react'
import{View,Text,StyleSheet,Image,TouchableOpacity,TextInput,Alert,Modal,KeyboardAvoidingView, ScrollView, FlatList} from 'react-native'
import db from '../config';
import firebase from 'firebase'
import MyHeader from '../Components/myheader'

export default class SettingScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            emailId:'',
            firstName:'',
            lastName:'',
            Address:'',
            Contact:'',
            DocId:'',

        }
    }

    getData = ()=>{
        var email = firebase.auth().currentUser.email
        db.collection('data').where('email_id','==',email).get()
        .then((snapshot)=>{
            snapshot.forEach(doc =>{
                var data = doc.data()
                this.setState({
                    emailId: data.email_Id,
                    firstName: data.first_Name,
                    lastName:data.last_Name,
                    Contact:data.Contact,
                    Address:data.address,
                    DocId: doc.Id
                })
            })
        })
    }

    UpdateData = ()=>{
        db.collection('data').doc(this.state.DocId)
        .update({
            first_Name:this.state.firstName,
            last_Name:this.state.lastName,
            Address:this.state.Address,
            Contact:this.state.Contact
        })
        Alert.alert("profile updated sucessfully")
    }
    render(){
        return(
            <View>
                <MyHeader title = "Settings" navigation = {this.props.navigation}/>
                <View>
                    <TextInput
                    style = {styles.formTextInput}
                    placeholder = {'First Name'}
                    maxLength = {8}
                    onChangeText = {(text)=>{
                        this.setState({
                            firstName: text
                        })
                    }}
                    value = {this.state.firstName}
                    />
                    <TextInput
                    style = {styles.formTextInput}
                    placeholder = {'last name'}
                    maxLength = {8}
                    onChangeText = {(text)=>{
                        this.setState({
                            lastName: text
                        })
                    }}
                    value = {this.state.lastName}
                    />

                    <TextInput
                    style = {styles.formTextInput}
                    placeholder = {'Address'}
                    multiline = {true}
                    onChangeText = {(text)=>{
                        this.setState({
                            Address: text
                        })
                    }}
                    value = {this.state.Address}
                    />
                    <TextInput
                    style = {styles.formTextInput}
                    placeholder = {'Contact'}
                    maxLength = {10}
                    keyboardType = {'numeric'}
                    onChangeText = {(text)=>{
                        this.setState({
                            Contact: text
                        })
                    }}
                    value = {this.state.Contact}
                    />

                    <TouchableOpacity
                    style = {styles.button}
                    onPress = {()=>{
                        this.UpdateData(this.state.emailId,this.state.password)
                    }}>
                        <Text style = {styles.buttonText}>Save</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    formTextInput:{
        width:"75%", 
        height:35, 
        alignSelf:'center', 
        borderColor:'#ffab91', 
        borderRadius:10, 
        borderWidth:1, 
        marginTop:20, 
        padding:10, 
       },
    button:{
        width:300,
        length:40,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        backgroundColor: 'blue',
        shadowColor:'brown',
        shadowOffset:{
            width:0,
            height:8,
        },
        shadowOpacity:0.30,
        textShadowRadius:10.32,
        elevation:16
    },
    buttonText:{
        color:'green',
        fontWeight:'200',
        fontSize:20
    },
})