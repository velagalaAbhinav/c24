import React,{Component} from 'react'
import{View,Text,StyleSheet,Image,TouchableOpacity,TextInput,Alert,Modal,KeyboardAvoidingView, ScrollView, FlatList} from 'react-native'
import db from '../config';
import firebase from 'firebase'
import MyHeader from '../Components/myheader'

export default class HomeScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            requestedItemList = []
        }
        this.requestRef = null
    }

    getRequestedItemList = ()=>{
        this.requestRef = db.collection('requested_items')
        .onSnapShot((snapshot)=>{
            var requestedItemList = snapshot.docs.map(document => document.data())
            this.setState({
                 requestedItemList:requestedItemList
            })
           })
    }

    componentDidMount(){
        this.getRequestedItemList()
    }
    componentWillUnmount(){
        this.requestRef()
    }

    keyExtractor = (item,index)=> index.tostring()
    renderItem = ({item,i})=>(
        <ListItem
        key = {i}
        title = {item.item_name}
        subtitle = {item.reason_to_request}
        titleStyle = {{color:'black',fontWeight:'bold'}}
        rightElement = {
            <TouchableOpacity style = {styles.button}
            onPress = {()=>{
                this.props.navigation.navigate("Recieverdetails",{"details":item})
            }
        }>
            <Text>View</Text>
        </TouchableOpacity>
        }
        bottomDivider
        />
       
    )

    
    render(){
        return(
            <View>
                <MyHeader title = "Donate Items" navigation = {this.props.navigation}/>
                <View>
                    {
                        this.state.requestedItemList.length === 0
                        ?
                        (
                            <View><Text>list of requested items</Text></View>
                        )
                        :(
                            <FlatList
                            keyExtractor= {this.keyExtractor}
                            data = {this.state.requestedItemList}
                            renderItem = {this.renderItem}
                            />
                        )
                    }
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
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
})