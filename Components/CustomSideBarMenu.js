import React,{Component} from 'react';
import {View,StyleSheet,text,Image,TouchableOpacity,TextInput,Alert,Modal,KeyboardAvoidingViewComponent} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer'
import {avatar} from 'react-native-element'

export default class customSideBarMenu extends React.Component{
    constructor(){
        super()
        this.state = {
            userId:firebase.auth().currentuser.email,
            image:'#',
            name:'',
            docId:''
        }
    }

    selectPicture = () =>{
        const {cancelled,url} = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.All,
            AllowsEditing:true,
            Aspect:[4,3],
            Quality:1
        })
        if(!cancelled){
            this.uploadImage(url,this.state.userId)
        }
    }
    uploadImage = (url,imageName)=>{
        var response  = await fetch(url)
        var blob = await response.blob()
        var Ref = firebase.stories().ref().child('user_profiles/'+imageName)
        return ref.put(blob).then(response=>{
            this.fetchImage(imageName)
        })
    }
    fetchImage = (imageName)=>{
        var storageRef = firebase.storage().ref().child('user_profiles/'+imageName)
        storageRef.getDownloadURL()
        .then(url=>{
            this.setState({
                image:url
            })
            .catch(error=>{
                this.setState({
                    image:'#'
                })
            })
        })
    }

    getuserProfile = () =>{
        db.collection("users").where("email_id",'==', this.state.userId)
        onSnapshot((snapshot)=>{
            snapshot.forEach(doc=>{
                this.setState({
                    name:doc.data().first_name+""+doc.data(),last_name,
                    docId: doc.Id,
                    image:doc.data().image
                })
            })
        })
    }
    
    render(){
        return(
          <View style = {{flex:1}}>
              <View style = {{flex:0.5,alignItems:'center',backgroundColor:'orange'}}>
                <Avatar
                roundIt
                source = {{
                    url:this.state.image
                }}
                size = 'medium'
                onPress = {()=>{
                    this.selectPicture()
                }}
                containerStyle = {styles.imageContainer}
                showEditButton
                />
                <Text style = {{fontWeight:100,fontSize:20,paddingTop:10}}>{this.state.name}</Text>
              </View>
              <View>
                  <View style = {styles.drawerItemsContainer}>
                    <TouchableOpacity style = {styles.logOutButton}
                    onPress = {()=>{
                        this.props.navigation.navigate('SignUpLoginScreen')
                        firebase.auth().signOut()
                    }}>
                        <Text>LogOut</Text>
                    </TouchableOpacity>
                  </View>
              </View>
          </View>
        )
    }
}
