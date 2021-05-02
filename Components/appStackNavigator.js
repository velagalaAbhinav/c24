import React,{Component} from 'react'
import {createStackNavigator} from 'react-navigation - stack'
import HomeScreen from '../screens /HomeScreen'
import RecieverDetailsScreens from '../screens /recieverdetailsScreen'

export const AppStackNavigator = createStackNavigator({
    HomeScreenList: {
        screen:HomeScreenList,
        navigationOptions:{
            headerShown:false
        }
    },
    recieverDetailsList: {
        screen:RecieverDetailsScreens,
        navigationOptions:{
            headerShown:false
        }
    },
},
{
    intialRouteName:'HomeScreenList'
 })