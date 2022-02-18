import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, Dimensions, Alert, TouchableHighlight, StatusBar } from 'react-native';
import Icon from '../common/icons';
import ThemeStyle from '../styles/Theme';
import { NavigationActions, StackActions } from 'react-navigation';
import AppIntroSlider from 'react-native-app-intro-slider';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');
const imagestyle = { width: 150, height: 150, resizeMode: 'contain' };
const textStyle = { color: '#fff', textAlign: 'center', fontSize: 16, paddingBottom: 16, fontFamily: 'Poppins-Regular' };
const titleStyle = { color: '#fff', textAlign: 'center', fontSize: 20, fontFamily: 'Poppins-Bold' };

const slides = [ 
    {
        key: 'slideOne',
        title: 'Make Better Decisions',
        text: 'Xpress Logistics Currency Converter.',
        image: require("./../assets/img/receipt.png"),
        imageStyle: { height: 150, width: 150, resizeMode: 'cover' },
        textStyle: textStyle,
        titleStyle: titleStyle,
    },
    {
        key: 'slideTwo',
        title: 'Make Better Decisions',
        text: 'Xpress Logistics  Digital Rate Center',
        image: require("./../assets/img/study.png"),
        imageStyle: { height: 150, width: 150, resizeMode: 'cover' },
        textStyle: textStyle,
        titleStyle: titleStyle,
    },
    {
        key: 'slideThree',
        title: 'Make Better Decisions',
        text: ' Xpress Logistics Send and Receiving  Transaction',
        image: require("./../assets/img/transaction.png"),
        imageStyle: { height: 150, width: 150, resizeMode: 'cover' },
        textStyle: textStyle,
        titleStyle: titleStyle,
    }
];

export default class SliderScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onDonePress = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'LoginScreen' })],
        });
        this.props.navigation.dispatch(resetAction);
    }


    _renderNextButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Icon name="right" family="AntDesign" size={22} color="#fc0f84" style={{ backgroundColor: 'transparent' }} />
            </View>
        );
    }

    _renderDoneButton = () => {
        return (
            <TouchableOpacity style={styles.buttonCircle} onPress={this.onDonePress} >
                <Icon name="check" family="AntDesign" size={22} color="#fc0f84" style={{ backgroundColor: 'transparent' }} />
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <LinearGradient colors={['#fc0f84', '#020cab']}
                    start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={{ flex: 1 }}>
                    <StatusBar barStyle="light-content" />
                    <View style={{ flex: 6 }}>
                        <AppIntroSlider
                            slides={slides}
                            renderDoneButton={this._renderDoneButton}
                            renderNextButton={this._renderNextButton}
                            activeDotStyle={{ backgroundColor: '#fc0f84' }}
                            dotStyle={{ backgroundColor: '#FFF' }}
                        />
                    </View>
                </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
