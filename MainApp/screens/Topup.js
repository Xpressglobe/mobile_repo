import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import Theme from '../styles/Theme';
import Icon from '../common/icons';

export default class Topup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            wallet:"0.00",
        }
    }

    async componentDidMount() {

        this.setState({ wallet: await AsyncStorage.getItem('@wallet') ,
        getCurrency: await AsyncStorage.getItem('@getCurrency'), });
    
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Theme.bgcolor }}>
                <StatusBar backgroundColor="#020cab" barStyle="light-content" />
                <View style={styles.logContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("ProfileScreen")}>
                        <Icon family="MaterialIcons" name="arrow-back" size={25} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.logintxt}>TopUp</Text>
                </View>
                <ScrollView>
                    <View style={[styles.transferbox]}>
                        <Text style={{ fontFamily: 'Poppins-Bold' }}>Total Wallet Balance:</Text>
                        <Text style={{ fontSize: 17, color: '#fcad50', fontFamily: 'Poppins-Bold' }}>{this.state.getCurrency} {this.state.wallet} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, paddingHorizontal: 15 }}>
                        <Icon family="FontAwesome" name="money" size={25} />
                        <TextInput style={{ paddingLeft: 10, fontSize: 16 }}
                            keyboardType='number-pad'
                            placeholder="Enter Amount"
                        />
                    </View>
                  
                    <TouchableOpacity style={styles.TopupContainer}>
                        <Text style={styles.TopupTxt}>TopUp</Text>
                    </TouchableOpacity>
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
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
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
    label: {
        fontFamily: 'Poppins-Bold'
    },
    input: {
        paddingTop: 1,
        color: "#000",
        fontFamily: 'Poppins-Regular'
    },
    TopupTxt: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Poppins-Bold'
    },
    TopupContainer: {
        paddingVertical: 10,
        backgroundColor: '#020cab',
        marginTop: 30,
        borderRadius: 50,
        marginHorizontal: 30
    }
});