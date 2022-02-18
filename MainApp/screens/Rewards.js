import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, FlatList, TextInput, StatusBar } from 'react-native';
import Theme from '../styles/Theme';
import Icon from '../common/icons';

export default class Rewards extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Theme.bgcolor }}>
                <StatusBar backgroundColor="#020cab" barStyle="light-content" />
                <View style={styles.logContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon family="MaterialIcons" name="arrow-back" size={25} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.logintxt}>Rewards</Text>
                </View>
                <ScrollView>
                    <View style={styles.AmountCon}>
                        <Text style={styles.valTxt}>Value Received</Text>
                        <View style={styles.rowcenter}>
                            <Icon family="FontAwesome" name="rupee" size={40} color="#FFF" />
                            <Text style={{ color: "#FFF", fontSize: 40, paddingLeft: 5 }}>0</Text>
                        </View>
                        <Text style={styles.updateSty}>Last Updated 1 mins ago</Text>
                    </View>
                    <View style={{ alignItems: 'center', paddingTop: 100 }}>
                        <Image style={{ width: 150, height: 150, resizeMode: 'center' }} source={require('../assets/img/award.png')} />
                        <Text style={styles.rewardsTxt}>No Rewards for you card</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    transferbox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 50,
        backgroundColor: 'white',
        padding: 20,
    },
    logContainer: {
        padding: 15,
        backgroundColor: '#020cab',
        flexDirection: 'row',
        alignItems: 'center'
    },
    logintxt: {
        color: '#FFf',
        fontSize: 17,
        fontFamily: 'Poppins-Bold',
        marginHorizontal: 20
    },
    AmountCon: {
        backgroundColor: '#020cab',
        paddingVertical: 20,
        paddingHorizontal: 15,
        paddingTop: -10
    },
    valTxt: {
        color: '#FFF',
        paddingVertical: 10,
        fontSize: 13,
        fontFamily: 'Poppins-Medium'
    },
    rowcenter: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    updateSty: {
        color: "#FFF",
        fontSize: 10,
        fontFamily: 'Poppins-Regular'
    },
    rewardsTxt: {
        paddingVertical: 20,
        fontFamily: 'Poppins-Thin',
        color: '#000'
    }
});