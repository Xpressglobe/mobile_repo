import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput, StatusBar, Alert, Picker } from 'react-native';
import Icon from '../common/icons';
import Theme from '../styles/Theme';

import Spinner from 'react-native-loading-spinner-overlay';
import Constant from "../components/Constant";
import AsyncStorage from '@react-native-community/async-storage';

import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert'
import { connect } from "react-redux";





class TransferConfirm extends Component {
    constructor(props) {

        super(props)
        this.state = {
            first_name: this.props.navigation.getParam('first_name', 'Name'),
            last_name: this.props.navigation.getParam('last_name', 'Name'),
            amount: this.props.navigation.getParam('amount', '0'),
            transfer_acct_id: this.props.navigation.getParam('transfer_acct_id', '0'),
            status: this.props.navigation.getParam('status', '0'),
            c_ref: this.props.navigation.getParam('c_ref', '0'),
            spinner: false,
            bal: "0.00",
            show: false,
            pin: "",
            Amessage: "",
            Smessage: "",


        }
    }
    async componentDidMount() {
        //this.setState({ spinner: true });
        this.setState({
            personal_info_id: await AsyncStorage.getItem('@personal_info_id'),
            getCurrency: await AsyncStorage.getItem('@getCurrency'),
        });

    }

    async bal() {

        this.setState({ spinner: true });
        try {

            const BalApiCall = await fetch(Constant.URL + Constant.getAgBal + "/" + this.state.personal_info_id + "/" + this.state.country_id+"/"+2);
            const dataSource = await BalApiCall.json();
            await AsyncStorage.setItem('@wallet', dataSource.bal)

            this.props.getCustomerWallet(dataSource.c_bal)
            this.props.getAgentWallet(dataSource.bal)

            this.setState({ wallet: dataSource.bal, c_wallet: dataSource.c_bal, spinner: false });
        } catch (err) {
            console.log("Error fetching kdata-----------", err);
            this.setState({ spinner: false });
        }
    }





    handleOpen = () => {

        this.setState({ show: true, type_id: 1 })
    }
    handleDecline = () => {

        this.setState({ show: true, type_id: 2 })
    }

    onPressConfirm = async () => {

        this.setState({ spinner: true });
        fetch(Constant.URL + Constant.ConfirmTransfer, {
            method: 'POST',
            body: JSON.stringify({
                transfer_acct_id: this.state.transfer_acct_id,
                personal_info_id:this.state.personal_info_id,
                c_ref:this.state.c_ref,
                pin: this.state.pin,
                type_id: this.state.type_id,
            })
        })
            .then((response) => response.json())
            .then((result) => {

                this.setState({
                    spinner: false,
                    dataSource: result,
                });

                console.log(this.state.dataSource.data);
                if (this.state.dataSource.code == 200) {
                    this.bal()
                    this.setState({ spinner: false, Sshow: true, Smessage: this.state.dataSource.data.message });
                    this.setState({
                        amount: '',
                        pin: "",
                        show: false
                    });

                } else {
                    this.setState({ spinner: false, Ashow: true, show: false, Amessage: this.state.dataSource.data.message });
                }

            }).catch(function (error) {
                this.setState({ spinner: false });
                console.log("-------- error ------- " + error);
                alert("result:" + error)
            });


    }




    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Theme.bgcolor }} >
                <Spinner
                    visible={this.state.spinner}
                    overlayColor={'rgba(0, 0, 0, 0.25)'}
                />

                <StatusBar backgroundColor="#020cab" barStyle="light-content" />
                <View style={styles.headContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon family="MaterialIcons" name="arrow-back" size={25} color="#FFF" />
                    </TouchableOpacity>
        <Text style={styles.headTxt}>Confirm Transfer </Text>
                </View>
                <ScrollView>
                    <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: 'lightgray', alignItems: 'center' }}>
                        <View style={styles.imgContainer}>
                            <Icon family="FontAwesome" name="money" size={22} />
                        </View>
                        <View style={styles.userdetails}>
                            <Text style={{ fontSize: 18, color: '#000', fontFamily: 'Poppins-Light' }}>{this.state.first_name} {this.state.last_name}</Text>
                            <Text style={{ fontSize: 12, color: '#000', fontFamily: 'Poppins-Thin' }}>{this.state.getCurrency} {this.state.amount}</Text>
                            {this.state.status == 2 ? (
                            <Text style={{ textAlign: 'right', fontSize: 10, color: 'red', fontFamily: 'Poppins-Thin',paddingRight:20, fontWeight:"bold" }}>DECLINE</Text>
                            ):null}
                             {this.state.status == 1 ? (
                            <Text style={{ textAlign: 'right', fontSize: 10, color: 'green', fontFamily: 'Poppins-Thin',paddingRight:20, fontWeight:"bold"  }}>CONFIRM</Text>
                             ):null}
                        </View>

                    </View>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingTop: 10 }}  >

                    </TouchableOpacity>
                    {this.state.status == 0 ? (
                <View>
                    <TouchableOpacity style={{ paddingVertical: 10, backgroundColor: '#020cab', marginTop: 30, borderRadius: 50, marginHorizontal: 30 }} onPress={this.handleOpen}  >
                        <Text style={{ color: '#FFF', textAlign: 'center', fontSize: 16, fontFamily: 'Poppins-Bold', }}>CONFIRM TRANSFER</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingVertical: 10, backgroundColor: 'red', marginTop: 30, borderRadius: 50, marginHorizontal: 30 }} onPress={this.handleDecline}  >
                        <Text style={{ color: '#FFF', textAlign: 'center', fontSize: 16, fontFamily: 'Poppins-Bold', }}>DECLINE TRANSFER</Text>
                    </TouchableOpacity>
                </View>
                    ):null}
                    <View style={{ margin: 20 }}></View>

                    <SCLAlert
                        theme="info"
                        show={this.state.show}
                        title="Enter Your Pin"
                        onRequestClose
                        subtitle="Enter Pin To Complete Transaction"
                        onRequestClose={() => {
                            this.setState({ show: false })
                        }}
                    >

                        <TextInput style={{ paddingLeft: 10, fontSize: 16 }}
                            keyboardType='number-pad'
                            placeholder="Enter Pin"
                            onChangeText={(pin) => this.setState({ pin })}
                            value={this.state.pin}
                            secureTextEntry={true}
                            maxLength={4}
                        />


                        <SCLAlertButton theme="info" onPress={this.onPressConfirm} >CONFIRM</SCLAlertButton>

                    </SCLAlert>

                    <SCLAlert
                        theme="danger"
                        show={this.state.Ashow}
                        title="Error Message"
                        subtitle={this.state.Amessage}
                        onRequestClose={() => {
                            this.setState({ Ashow: false })
                        }}
                    >

                        <SCLAlertButton theme="danger" onPress={() => {
                            this.setState({ Ashow: false })
                        }} >Close</SCLAlertButton>
                    </SCLAlert>

                    <SCLAlert
                        theme="success"
                        show={this.state.Sshow}
                        title="Successful Message"
                        subtitle={this.state.Smessage}
                        onRequestClose={() => {
                            this.setState({ Sshow: false })
                        }}
                    >


                        <SCLAlertButton theme="success" onPress={() => {
                            this.props.navigation.navigate("TabNav")
                        }} >Close</SCLAlertButton>
                    </SCLAlert>

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
        fontFamily: 'Poppins-Bold',
        marginHorizontal: 20
    },
    imgContainer: {
        backgroundColor: "#fff",
        marginHorizontal: 10,
        marginVertical: 10,
        width: 55,
        height: 55,
        borderRadius: 55 / 2,
        overflow: "hidden",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        elevation: 2,
        shadowColor: 'lightgrey',
        shadowOffset: { width: -0.5, height: 0.5 },
        shadowOpacity: 0.2,
        shadowRadius: 1
    },
    userimg: {
        width: 40,
        height: 40,
        resizeMode: "contain"
    },
    userdetails: {
        flex: 1,
        paddingLeft: 10,
        justifyContent: 'center',
    },
    acTxt: {
        backgroundColor: '#FFF',
        paddingVertical: 5,
        paddingLeft: 15,
        marginVertical: 10
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
});

function mapStateProps(state) {
    return {
        userW: state.userW,
        agentW: state.agentW,
        agentC: state.agentC
    }
}

function mapDispatchProps(dispatch) {

    return {
        getCustomerWallet: (response) => dispatch({
            type: 'CUSTOMER_WALLET',
            payload: response
        }),
        getAgentWallet: (response) => dispatch({
            type: 'AGENT_WALLET',
            payload: response
        }),

    }
}


export default connect(mapStateProps, mapDispatchProps)(TransferConfirm)

