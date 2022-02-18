import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import Theme from '../styles/Theme';
import Icon from '../common/icons';

export default class Wallet extends Component {
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
                    <Text style={styles.logintxt}>Wallet</Text>
                </View>
                <ScrollView>
                    <View style={{ alignItems: 'center', paddingTop: 70 }}>
                        <Image style={{ width: 200, height: 200 }} source={require('../assets/img/wallet.png')} />
                    </View>
                    <View style={styles.transferbox}>
                        <Text style={{ fontSize: 16, fontFamily: 'Poppins-Regular' }}>Wallet Balance</Text>
                        <Text style={{ fontSize: 20, color: '#fcad50', fontFamily: 'Poppins-Bold' }}>{this.state.getCurrency} {this.state.wallet} </Text>
                    </View>

                    <TouchableOpacity style={styles.topup} onPress={() => this.props.navigation.navigate("Topup")}>
                        <Text style={styles.topuptxt}>TopUp My Wallet</Text>
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
        alignItems: 'center',
        marginTop: 50,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10
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
    topup: {
        paddingVertical: 10,
        backgroundColor: '#020cab',
        marginTop: 30,
        borderRadius: 50,
        marginHorizontal: 30
    },
    topuptxt: {
        color: '#FFF',
        fontFamily: 'Poppins-Bold',
        textAlign: 'center',
        fontSize: 16
    }
});