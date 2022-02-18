import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image,StatusBar } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../common/icons';
import Theme from "../styles/Theme";

export default class Moblierecharge extends Component {
    constructor() {
        super()
        this.state = {
            isPrepaid: false,
        };
    }

    send = () => {
        this.props.navigation.navigate("LoginScreen");
    }


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Theme.bgcolor }}>
              <StatusBar backgroundColor="#020cab" barStyle="light-content" />
                <ScrollView>
                    <View style={styles.headContainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Icon family="MaterialIcons" name="arrow-back" size={25} color="#FFF" />
                        </TouchableOpacity>
                        <Text style={styles.headTxt}>Moblie Recharges</Text>
                    </View>

                    <View style={styles.transferbox}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }} >
                            <Text style={styles.paidTxt}>Prepaid</Text>
                            <Text style={styles.paidTxt}>PostPaid</Text>
                        </View>

                        <View style={styles.txtbox}>
                            <TextInput
                                style={{ flex: 0.9, paddingLeft: 20 }}
                                placeholder="Moblie Number"
                                keyboardType='phone-pad'  
                                maxLength={10}
                            />
                            <Icon family="Feather" name="smartphone" size={25} color="black" style={{ flex: 0.1, marginHorizontal: 10 }} />
                        </View>
                        <View style={styles.txtbox}>
                            <TextInput
                                style={{ flex: 0.9, paddingLeft: 20 }}
                                placeholder="Operator"
                                keyboardType="name-phone-pad"
                            />
                            <Icon family="Octicons" name="radio-tower" size={25} color="black" style={{ flex: 0.1, marginHorizontal: 10 }} />
                        </View>
                        <View style={styles.txtbox}>
                            <TextInput
                                style={{ flex: 0.9, paddingLeft: 20 }}
                                placeholder="Circle"
                                keyboardType="name-phone-pad"    
                            />
                            <Icon family="MaterialIcons" name="my-location" size={25} color="black" style={{ flex: 0.1, marginHorizontal: 10 }} />
                        </View>
                        <View style={styles.txtbox}>
                            <TextInput
                                style={{ flex: 0.9, paddingLeft: 20 }}
                                placeholder="Amount"
                                keyboardType="number-pad"        
                            />
                            <Icon family="FontAwesome" name="rupee" size={20} color="black" style={{ flex: 0.1, marginHorizontal: 10 }} />
                        </View>

                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }} onPress={() => this.props.navigation.navigate("Topup")}>
                            <Icon style={{ padding: 5 }} family="Entypo" name="wallet" size={30} color="#020cab" />
                            <View>
                                <Text>Wallet / Cashback</Text>
                                <Text style={{ fontSize: 10, color: 'gray' }}>Wallet Balance : $ 1200</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginHorizontal: 20, paddingVertical: 20 }} onPress={this.onPressSignUp}>
                            <View style={styles.signContainer}>
                                <Text style={styles.signinTxt}>Recharge</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.acTxt}>
                        <Text style={{ fontSize: 13, fontWeight: '500' }}>Recent Trasactions</Text>
                    </View>

                    <View style={[styles.notifiContainer]}>
                        <Text style={{ fontWeight: '500' }}>9876543210</Text>
                        <Text style={{ fontSize: 12, color: 'gray' }}>Topup 50 Rupees</Text>
                        <View style={{ borderWidth: 1, padding: 5, borderColor: 'green' }}><Text style={{ fontSize: 10, color: 'green', fontWeight: '600' }}>Suceess</Text></View>
                    </View>
                    <View style={[styles.notifiContainer]}>
                        <Text style={{ fontWeight: '500' }}>9123456780</Text>
                        <Text style={{ fontSize: 12, color: 'gray' }}>Topup 399 Rupees</Text>
                        <View style={{ borderWidth: 1, padding: 5, borderColor: 'orange' }}><Text style={{ fontSize: 10, color: 'orange', fontWeight: '600' }}>Pending</Text></View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#020cab'
    },
    headTxt: {
        color: 'white',
        fontSize: 17,
        fontWeight: '600',
        marginHorizontal: 20
    },
    transferbox: {
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginVertical:10,
        borderRadius: 15,
    },
    notifiContainer: {
        flex: 1,
        backgroundColor: 'white',
        marginVertical: 5,
        marginHorizontal: 15,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 13,
        elevation: 1,
        shadowColor: 'lightgrey',
        shadowOffset: { width: -0.5, height: 0.5 },
        shadowOpacity: 0.1,
        shadowRadius: 1
    },
    paidTxt: {
        fontSize: 18,
        color: '#000',
        fontWeight: '400',
        paddingVertical: 20,
        paddingHorizontal: 30
    },
    txtbox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 50,
        margin: 10,
    },
    container: {
        paddingHorizontal: 20,
    },
    txtStl: {
        flex: 0.9,
        color: 'black',
        paddingLeft: 5,
    },
    headertxt: {
        color: 'white',
        fontSize: 20,
        fontWeight: "600",
        paddingVertical: 20,
    },
    txtSignup: {
        color: 'white',
        textAlign: 'center',
    },
    forgettxt: {
        color: 'white',
        textAlign: 'right',
        marginVertical: 10
    },
    signContainer: {
        backgroundColor: '#020cab',
        padding: 10,
        borderRadius: 50
    },
    signinTxt: {
        textAlign: 'center',
        fontWeight: '600',
        color: '#FFF',
        fontSize: 16
    },
    acTxt: {
        paddingLeft: 15,
        marginVertical: 10
    },
})

