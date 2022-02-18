import React, { Component } from 'react';
import { Platform } from 'react-native';
import Icon from '../../common/icons';
import ThemeStyle from '../../styles/Theme';

import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from './HomeScreen';
import TransferScreen from './Transaction';
import Formula from '../Formula';
import ProfileScreen from './ProfileScreen';

const TabNav = createBottomTabNavigator({

    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: "Home",
            tabBarIcon: ({ tintColor }) => (
                <Icon family="AntDesign" name="home" size={27} color={tintColor} />
            ),
        }
    },

    TransferScreen: {
        screen: TransferScreen,
        navigationOptions: {
            tabBarLabel: "Transfer",
            tabBarIcon: ({ tintColor }) => (
                <Icon family="AntDesign" name="profile" size={28} color={tintColor} />
            ),
        }
    },

    Formula: {
        screen: Formula,
        navigationOptions: {
            tabBarLabel: "Formula",
            tabBarIcon: ({ tintColor }) => (
                <Icon family="Feather" name="activity" size={25} color={tintColor} />
            ),
        }
    },

    
    ProfileScreen: {
        screen: ProfileScreen,
        navigationOptions: {
            tabBarLabel: "Account",
            tabBarIcon: ({ tintColor }) => (
                <Icon family="Entypo" name="user" size={30} color={tintColor} />
            ),
        }
    },

},
    {
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: true,
        tabBarOptions: {
            showLabel: false,
            showIcon: true,
            upperCaseLabel: false,
            pressColor: '#f9e500',
            pressOpacity: 0.6,
            activeTintColor: ThemeStyle.mainColor,
            inactiveTintColor: '#555',
            style: {
                backgroundColor: '#FFF',
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: 0,
                height: Platform.OS === 'ios' ? 74 : 64,
            },
        }
    }
);

export default createAppContainer(TabNav);
