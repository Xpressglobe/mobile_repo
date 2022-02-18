import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, FlatList, TextInput, StatusBar, Alert } from 'react-native';
import Theme from '../styles/Theme';
import Icon from '../common/icons';
import Spinner from 'react-native-loading-spinner-overlay';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import Constant from "../components/Constant";
import AsyncStorage from '@react-native-community/async-storage';

import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert'
import { connect } from "react-redux";

class done extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cus_name: this.props.navigation.getParam('cus_name', 'Name'),
            cus_phone: this.props.navigation.getParam('cus_phone', 'phone'),
            customer_id: this.props.navigation.getParam('customer_id', '0'),
            amount: this.props.navigation.getParam('amount', '0'),
            rate: this.props.navigation.getParam('rate', '0'),
            rate_type: this.props.navigation.getParam('rate_type', '1'),
            charges: this.props.navigation.getParam('charges', '0'),
            to: this.props.navigation.getParam('to', '0'),
            from: this.props.navigation.getParam('from', '0'),
            ben_name: this.props.navigation.getParam('ben_name', '0'),
            ben_id: this.props.navigation.getParam('ben_id', '0'),
            ben_bank: this.props.navigation.getParam('ben_bank', '0'),
            ben_acc: this.props.navigation.getParam('ben_acc', '0'),
            ben_phone: this.props.navigation.getParam('ben_phone', '0'),
            message: this.props.navigation.getParam('message', '0'),
            toAgent: this.props.navigation.getParam('toAgent', '0'),
            country: this.props.navigation.getParam('country', '0'),
            first_name: this.props.navigation.getParam('first_name', '0'),
            last_name: this.props.navigation.getParam('last_name', '0'),
            phone: this.props.navigation.getParam('phone', '0'),
            fromAgent: this.props.navigation.getParam('fromAgent', '0'),
            bank_id: this.props.navigation.getParam('bank_id', '0'),
            ch_type: this.props.navigation.getParam('ch_type','0'),
            due_amount: this.props.navigation.getParam('due_amount','0'),
            getCountry_id:this.props.navigation.getParam('getCountry_id','0'),
            to_id:this.props.navigation.getParam('to_id','0'),
            pin: "",
            spinner: false,
            Amessage: "",
            Smessage: "",
            personal_info_id:0,
            tableHead: [, 'RECEIVER', 'CUSTOMER', 'BENEFICIARY'],
            tableData: [
                [props.navigation.getParam('first_name', '') + " " + this.props.navigation.getParam('last_name', ''), this.props.navigation.getParam('cus_name', ''), this.props.navigation.getParam('ben_name', '')],
                [this.props.navigation.getParam('phone', '0'), this.props.navigation.getParam('cus_phone', 'phone'), this.props.navigation.getParam('ben_phone', '')],
            ],
            RtableHead: ['AMOUNT', 'CHARGES', 'RATE'],
            RtableData: [
                [this.props.navigation.getParam('due_amount', '0'), this.props.navigation.getParam('charges', '0'), this.props.navigation.getParam('rate', '0')],

            ],
            BtableHead: ['BANK', 'ACCOUNT'],
            BtableData: [
                [this.props.navigation.getParam('ben_bank', ''), this.props.navigation.getParam('ben_acc', '')],

            ]

        }
    }

    async componentDidMount() {

        this.setState({  personal_info_id: await AsyncStorage.getItem('@personal_info_id') ,
        getFrom: await AsyncStorage.getItem('@getFrom'), 
    }); 
    
    }

    async bal() {

        this.setState({ spinner: true });
        try {

            const BalApiCall = await fetch(Constant.URL + Constant.getAgBal + "/" + this.state.personal_info_id+"/"+this.state.getFrom+"/"+2);
            const dataSource = await BalApiCall.json();
            Constant.SetAsyncValue('@wallet', dataSource.bal)
            this.props.getCustomerWallet(dataSource.c_bal)
            this.props.getAgentWallet(dataSource.bal)

        } catch (err) {
            console.log("Error fetching data-----------", err);
            this.setState({ spinner: false });
        }
    }

    



    onPressTransfer = async () => {

        let r_amount
        if (this.state.rate_type == 1) {
            r_amount = (this.state.due_amount) * (this.state.rate)
        } else {
            r_amount = (this.state.due_amount) / (this.state.rate)
        }

        const { pin } = this.state;
        if (pin.length <= 0) {
            Alert.alert("Please Enter Your Pin.");
        } else {
            this.setState({ spinner: true });
            // post method
            fetch(Constant.URL + Constant.addTRANSFER, {
                method: 'POST',
                body: JSON.stringify({
                    cus_name: this.state.cus_name,
                    cus_phone: this.state.cus_phone,
                    customer_id: this.state.customer_id,
                    amount: this.state.amount,
                    rate: this.state.rate,
                    rate_type: this.state.rate_type,
                    charges: this.state.charges,
                    to: this.state.to,
                    from: this.state.from,
                    ben_name: this.state.ben_name,
                    ben_id: this.state.ben_id,
                    ben_bank: this.state.ben_bank,
                    ben_acc: this.state.ben_acc,
                    ben_phone: this.state.ben_phone,
                    message: this.state.message,
                    toAgent: this.state.toAgent,
                    country: this.state.country,
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    phone: this.state.phone,
                    fromAgent: this.state.fromAgent,
                    pin: this.state.pin,
                    bank_id: this.state.bank_id,
                    ch_type: this.state.ch_type,
                    due_amount: this.state.due_amount,
                    getCountry_id:this.state.getCountry_id,
                    to_id:this.state.to_id,
                    r_amount:r_amount
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

                    } else {

                        this.setState({ spinner: false, show: true, Amessage: this.state.dataSource.data.message });

                    }

                }).catch(function (error) {
                    this.setState({ spinner: false });
                    console.log("-------- error ------- " + error);
                    alert("result:" + error)
                });

            //end post method
        }
    }

    render() {
        let bal
        if (this.state.rate_type == 1) {
            bal = (this.state.due_amount) * (this.state.rate)
        } else {
            bal = (this.state.due_amount) / (this.state.rate)
        }
        

        return (
            <View style={{ flex: 1, backgroundColor: Theme.bgcolor }}>
                <Spinner
                    visible={this.state.spinner}
                    overlayColor={'rgba(0, 0, 0, 0.30)'}
                />
                <StatusBar backgroundColor="#020cab" barStyle="light-content" />
                <View style={styles.logContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon family="MaterialIcons" name="arrow-back" size={25} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.logintxt}>Approve Transfer {this.state.to} </Text>
                </View>
                <ScrollView>
                    <View style={styles.AmountCon}>
                        <Text style={styles.valTxt}>Recipient Gets</Text>
                        <View style={styles.rowcenter}>
                            {this.state.getCurrency}
                            <Text style={{ color: "#FFF", fontSize: 40, paddingLeft: 5 }}>{Constant.numberFormate(bal.toFixed(2))}</Text>

                        </View>
         <Text style={styles.updateSty}>{this.state.from} > {this.state.to}</Text>
                       
                    </View>


                    {/* <Text style={styles.rewardsTxt}>No Rewards for you card</Text> */}
                    <View style={styles.container}>
                        <Table borderStyle={{ borderWidth: 1 }}>
                            <Row data={this.state.tableHead} flexArr={[1, 1, 1]} style={styles.head} textStyle={styles.text} />
                            <TableWrapper style={styles.wrapper}>
                                <Rows data={this.state.tableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text} />
                            </TableWrapper>
                        </Table>
                    </View>
                    {
                
                     
                    <View style={styles.container}>
                        <Table borderStyle={{ borderWidth: 1 }}>
                            <Row data={this.state.BtableHead} flexArr={[1, 1, 1]} style={styles.head} textStyle={styles.text} />
                            <TableWrapper style={styles.wrapper}>
                                <Rows data={this.state.BtableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text} />
                            </TableWrapper>
                        </Table>
                    </View> 
                    }
                    <View style={styles.container}>
                        <Table borderStyle={{ borderWidth: 1 }}>
                            <Row data={this.state.RtableHead} flexArr={[1, 1, 1]} style={styles.head} textStyle={styles.text} />
                            <TableWrapper style={styles.wrapper}>
                                <Rows data={this.state.RtableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text} />
                            </TableWrapper>
                        </Table>
                    </View> 
               
                    
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, paddingHorizontal: 15 }}>
                        <Icon family="Feather" name="key" size={25} />
                        <TextInput style={{ paddingLeft: 10, fontSize: 16 }}

                            placeholder="ENTER YOUR PIN"
                            keyboardType="number-pad"
                            secureTextEntry={true}
                            maxLength={4}
                            onChangeText={(pin) => this.setState({ pin })}
                            value={this.state.pin}
                        />

                    </View>
                    <TouchableOpacity style={{ paddingVertical: 10, backgroundColor: '#020cab', marginTop: 30, borderRadius: 50, marginHorizontal: 30 }} onPress={this.onPressTransfer}>
                        <Text style={{ color: '#FFF', textAlign: 'center', fontSize: 16, fontFamily: 'Poppins-Bold', }}>Transfer</Text>
                    </TouchableOpacity>
                    <View style={{ margin: 20 }}></View>

                    <SCLAlert
                        theme="danger"
                        show={this.state.show}
                        title="Error Message"
                        subtitle={this.state.Amessage}
                        onRequestClose={() => {
                            this.setState({ show: false })
                        }}
                    >

                        <SCLAlertButton theme="danger" onPress={() => {
                            this.setState({ show: false })
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
    transferbox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 50,
        backgroundColor: 'white',
        padding: 10,
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
        fontSize: 20,
        fontFamily: 'Poppins-Regular'
    },
    rewardsTxt: {
        paddingVertical: 20,
        fontFamily: 'Poppins-Thin',
        color: '#000'
    },
    container: { flex: 1, padding: 16, paddingTop: 10, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff', },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: { height: 28 },
    text: { textAlign: 'left',padding: 1 }
});

function mapStateProps(state) {
    return {
        userW: state.userW,
        agentW: state.agentW
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
        })
    }
}


export default connect(mapStateProps, mapDispatchProps)(done)