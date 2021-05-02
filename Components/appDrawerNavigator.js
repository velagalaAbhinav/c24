import React from 'react'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {AppTabNavigator} from './AppTabNavigator'
import {customSideBarMenu} from './customSideBarmenu'
import SettingsScreen from '../screens /settingsScreen'
import userDetailsScreen from '../screens/userDetailsScreen'

export const AppDrawerNavigator = createDrawerNavigator({
    home:{
        screen:AppTabNavigator,
    },
    settings:{
        screen:SettingsScreen
    },
    UserDetails:{
        headerShown : false
    }
},
{
    contentComponent:customSideBarMenu
},
{
    intialRouteName:'Home'
})