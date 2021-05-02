import React,{compoment} from 'react'
import {View,Text,StyleSheet,Image,TouchableOpacity,TextInput,Alert,Modal,KeyboardAvoidingView, ScrollView} from 'react-native'
import db from '../config';
import firebase from 'firebase'
import MyHeader from '../Components/myheader'

export default class SignUpLoginScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            emailId:'',
            password:''
        }
    }

    userLogin = (emailId,password) =>{
        firebase.auth().signInWithEmailAndPassword(emailId,password)
        .then(()=>{
            return Alert.alert("UserLogin is successful")
        })
        .catch((error)=>{
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
        })
    }

    userSignUp = (emailId,password,ConfirmPassword) =>{
        if(password !== ConfirmPassword){
            return Alert.alert('password doesnot match')
        }
        else{
        firebase.auth().createUserWithEmailAndPassword(emailId,password,ConfirmPassword)
        .then((response)=>{
            return Alert.alert("User Successfully SignedUp")
        })
        .catch(function(error){
            var errorCode = error.code
            var errorMessage = error.code
            var errorMessage = error.message
            return Alert.alert(errorMessage)
        }
        )
    }
    }

    showModal = ()=>{
        return(
            <Modal
            animationType = "fade"
            transparent = {true}
            visible = {this.state.isModalVisible}
            >
                <View style ={styles.modalContainer}>
                    <ScrollView style = {{width:'100%'}}>
                        <KeyboardAvoidingView style = {styles.KeyboardAvoidingView}>
                            <Text style = {styles.modalTitle}>Registration</Text>

                            <Textinput
                            style = {styles.formTextInput}
                            placeholder = {"First Name"}
                            maxlength = {8}
                            onChangeText={(text)=>{
                                this.setState({
                                    firstName:text
                                })
                            }}
                            />

                        <Textinput
                            style = {styles.formTextInput}
                            placeholder = {"Last Name"}
                            maxlength = {8}
                            onChangeText={(text)=>{
                                this.setState({
                                    lastName:text
                                })
                            }}
                        />

                        <Textinput
                            style = {styles.formTextInput}
                            placeholder = {"Phone number"}
                            maxlength = {8}
                            onChangeText={(text)=>{
                                this.setState({
                                    PhoneNumber:text
                                })
                            }}
                            />

                        <Textinput
                            style = {styles.formTextInput}
                            placeholder = {"address"}
                            maxlength = {8}
                            onChangeText={(text)=>{
                                this.setState({
                                    Address:text
                                })
                            }}
                            />

                        <Textinput
                            style = {styles.formTextInput}
                            placeholder = {"Emailid"}
                            maxlength = {8}
                            onChangeText={(text)=>{
                                this.setState({
                                    emailId:text
                                })
                            }}
                            />

                        <Textinput
                            style = {styles.formTextInput}
                            placeholder = {"password"}
                            maxlength = {8}
                            onChangeText={(text)=>{
                                this.setState({
                                    Password:text
                                })
                            }}
                            />
                            
                            <Textinput
                            style = {styles.formTextInput}
                            placeholder = {"Confirm Password"}
                            maxlength = {8}
                            onChangeText={(text)=>{
                                this.setState({
                                    firstName:text
                                })
                            }}
                            />

                            <TouchableOpacity
                            style = {styles.button}
                            onPress = {()=>{
                                this.userSignUp(this.state.password)
                            }}>
                                <Text style = {styles.buttonText}>Registration</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                            style = {styles.button}
                            onPress = {()=>{
                                this.Cancel(this.state.emailId,this.state.password)
                            }}>
                                <Text style = {styles.buttonText}>Cancel button</Text>
                            </TouchableOpacity>

                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        )
    }
    
    
    render(){
        return(
            <View>
                <View>
                    <TextInput
                    style ={styles.loginBox}
                    placeholder = 'emailId'
                    placeholderTextColor= 'black'
                    KeyboardType = 'email-address'
                    onChangeText={
                        (text)=>{
                            this.setState({
                                emailId:text
                            })
                        }
                    }
                        />

                <TextInput
                    style ={styles.loginBox}
                    placeholder = 'password'
                    placeholderTextColor= 'black'
                    onChangeText={
                        (text)=>{
                            this.setState({
                                password:text
                            })
                        }
                    }
                />

                <TouchableOpacity
                style = {styles.button}
                onPress ={()=>{
                    this.userLogin(this.state.emailId,this.state.password)
                }
            }>
                <Text style = {styles.buttonText}>login</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style = {style.button}
            onPress = {()=>{
                this.userSignUp(this.state.emailId,this.state.password)
            }
        }>
            <Text style = {styles.buttonText}>sign up</Text>
        </TouchableOpacity>


            </View>
        </View>
    )
}
}

const styles = StyleSheet.create({
    profileContainer:{
        flex:1,
        backgroundColor:'yellow'
    },
    
    loginBox:{
        width:300,
        length:40,
        borderBottomWidth:1.5,
        borderColor: 'green',
        fontSize:20,
        margin:10,
        paddingLeft:10
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