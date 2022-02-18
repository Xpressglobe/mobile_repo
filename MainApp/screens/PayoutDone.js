import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, FlatList, TextInput, StatusBar, Alert } from 'react-native';
import Theme from '../styles/Theme';
import Icon from '../common/icons';
import Spinner from 'react-native-loading-spinner-overlay';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import Constant from "../components/Constant";
import AsyncStorage from '@react-native-community/async-storage';

import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert'
export default class PayoutDone extends Component {
    constructor(props) {
        super(props)
        this.state = {
            beneficiary: this.props.navigation.getParam('beneficiary', 'Name'),
            cus_phone: this.props.navigation.getParam('cus_phone', 'phone'),
            customer_id: this.props.navigation.getParam('customer_id', '0'),
            amount: this.props.navigation.getParam('amount', '0'),
            rate: this.props.navigation.getParam('rate', '0'),
            rate_type: this.props.navigation.getParam('rate_type', '0'),
            charges: this.props.navigation.getParam('charges', '0'),
            to: this.props.navigation.getParam('to', '0'),
            from: this.props.navigation.getParam('from', '0'),
            ben_name: this.props.navigation.getParam('ben_name', '0'),
            ben_id: this.props.navigation.getParam('ben_id', '0'),
            ben_bank: this.props.navigation.getParam('ben_bank', '0'),
            ben_acct: this.props.navigation.getParam('ben_acct', '0'),
            ben_phone: this.props.navigation.getParam('ben_phone', '0'),
            message: this.props.navigation.getParam('message', '0'),
            toAgent: this.props.navigation.getParam('toAgent', '0'),
            first_name: this.props.navigation.getParam('first_name', '0'),
            last_name: this.props.navigation.getParam('last_name', '0'),
            phone: this.props.navigation.getParam('phone', '0'),
            agent_to: this.props.navigation.getParam('agent_to', '0'),
            agent_acct_id: this.props.navigation.getParam('agent_acct_id', '0'),
            c_ref: this.props.navigation.getParam('c_ref', '0'),
            status: this.props.navigation.getParam('status', '0'),
            due_amount: this.props.navigation.getParam('due_amount', '0'),
            payout_bal: this.props.navigation.getParam('payout_bal', '0'),
            bank_id_pay: this.props.navigation.getParam('bank_id_pay', '0'),
            payout_due: this.props.navigation.getParam('payout_due', '0'),
            country_id_to: this.props.navigation.getParam('country_id_to', '0'),
            agent_name: this.props.navigation.getParam('agent_name', '0'),
            ch_type: this.props.navigation.getParam('ch_type', '0'),
            r_amount: this.props.navigation.getParam('r_amount', '0'),
            

            pin: "",
            spinner: false,
            Amessage: "",
            Smessage: "",
            tableHeadRQ: [, 'Agent',  'Beneficiary'],
            tableDataRQ: [
                [props.navigation.getParam('agent_name', '')  , this.props.navigation.getParam('ben_name', '')],
                [ this.props.navigation.getParam('ben_phone', ''),this.props.navigation.getParam('ben_phone', '')],
            ],
            tableHead: [, 'Transaction ID'],
            tableData: [
               [this.props.navigation.getParam('c_ref', '0')],
            ],
            // RtableHead: ['Bank', 'Account'],
            // RtableData: [
            //     [this.props.navigation.getParam('ben_bank', '0'), this.props.navigation.getParam('ben_acct', '0')],

            // ],
            RRtableHead: ['Message'],
            RRtableData: [
                [this.props.navigation.getParam('message', '0')],

            ]

        }
    }


    async componentDidMount() {


    }

    onPressProcess  = async() => {
        const { pin } = this.state;
        if (pin.length != 4) {
            Alert.alert("Please Enter Your Pin.");
        } else {
            this.setState({ spinner: true });

            let token=   await AsyncStorage.getItem("@token");

           
            const headers = {
                "Authorization": "Bearer "+ token,
                "Content-Type": "application/json",
                "Accept": "application/json",
            };
    
            // post method
            fetch(Constant.URL + "payouts/" + this.state.agent_acct_id + "/move-to-processing", {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    // agent_to: this.state.agent_to,
                    // agent_acct_id: this.state.agent_acct_id,
                    pin: this.state.pin,
                    // c_ref: this.state.c_ref,
                })
            })
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    this.setState({
                        spinner: false,
                      
                    });

                    if(result.errors){
                        if(result.errors.pin){
                            this.setState({ spinner: false, show: true, Amessage: "The selected pin is invalid!" });

                        }
                    }
                    if (result.message != "") {

                        this.setState({ spinner: false, Sshow: true, Smessage: result.message });

                    } else {

                        this.setState({ spinner: false, show: true, Amessage: "Unexpected Error, Contact Admin!" });

                    }

                }).catch(function (error) {
                    this.setState({ spinner: false });
                    console.log("-------- error ------- " + error);
                    alert("result:" + error)
                });
            }
    }

    onPressTransfer = async () => {
        this.props.navigation.navigate("PayoutConfirm", {
            agent_acct_id: this.state.agent_acct_id,
            agent_to: this.state.agent_to,
            c_ref: this.state.c_ref,
            amount: this.state.amount,
            rate: this.state.rate,
            rate_type: this.state.rate_type,
            charges: this.state.charges,
            from: this.state.from,
            to: this.state.to,
            status: this.state.status,
            due_amount: this.state.due_amount,
            payout_bal: this.state.payout_bal,
            bank_id_pay: this.state.bank_id_pay,
            payout_due: this.state.payout_due,
            country_id_to: this.state.country_id_to,
            ch_type:this.state.ch_type,
            r_amount:this.state.r_amount,

        })
    }

    onPressRV = async () => {


        const { pin } = this.state;
        if (pin.length <= 0) {
            Alert.alert("Please Enter Your Pin.");
        } else {
            this.setState({ spinner: true });
            // post method
            fetch(Constant.URL + Constant.RPAYOUT, {
                method: 'POST',
                body: JSON.stringify({
                    agent_to: this.state.agent_to,
                    agent_acct_id: this.state.agent_acct_id,
                    pin: this.state.pin,
                    c_ref: this.state.c_ref,
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
        var bal
       
        if(this.state.r_amount==0){
         
        if (this.state.rate_type == 1) {
            bal = (this.state.due_amount) * (this.state.rate)
        } else if(this.state.rate_type == 2) {
            bal = (this.state.due_amount) / (this.state.rate)
        }else{
            bal = (this.state.due_amount) *1
        } 
    }else{
        bal=this.state.r_amount
       
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
                    <Text style={styles.logintxt}>Approve Payout</Text>
                    
                </View>
                <ScrollView>
                    <View style={styles.AmountCon}>
                        <Text style={styles.valTxt}>Value To Transfer between currency</Text>
                        <View style={styles.rowcenter}>
                            {this.state.getCurrency}
                            <Text style={{ color: "#FFF", fontSize: 40, paddingLeft: 5 }}>{Constant.numberFormate( bal)}</Text>

                        </View>
                        {this.state.from ? ( <Text style={styles.updateSty}>{this.state.from} {'>'} {this.state.to}</Text>):null}
                    </View>

             

          
                    <View style={styles.container}>
                        <Table borderStyle={{ borderWidth: 1 }}>
                            <Row data={this.state.tableHead} flexArr={[1, 1, 1]} style={styles.head} textStyle={styles.text} />
                            <TableWrapper style={styles.wrapper}>
                                <Rows data={this.state.tableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text} />
                            </TableWrapper>
                        </Table>
                    </View>
            

                    {/* <View style={styles.container}>
                        <Table borderStyle={{ borderWidth: 1 }}>
                            <Row data={this.state.RtableHead} flexArr={[1, 1, 1]} style={styles.head} textStyle={styles.text} />
                            <TableWrapper style={styles.wrapper}>
                                <Rows data={this.state.RtableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text} />
                            </TableWrapper>
                        </Table>
                    </View> */}

                    <View style={styles.container}>
                        <Table borderStyle={{ borderWidth: 1 }}>
                            <Row data={this.state.RRtableHead} flexArr={[1, 1, 1]} style={styles.head} textStyle={styles.text} />
                            <TableWrapper style={styles.wrapper}>
                                <Rows data={this.state.RRtableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text} />
                            </TableWrapper>
                        </Table>
                    </View>

                    {this.state.status == 1 ? (

                        <View>
                            <TouchableOpacity style={{ paddingVertical: 10, backgroundColor: '#020cab', marginTop: 30, borderRadius: 50, marginHorizontal: 30 }} onPress={this.onPressTransfer}>
                                <Text style={{ color: '#FFF', textAlign: 'center', fontSize: 16, fontFamily: 'Poppins-Bold', }}>Continue To Process Payout</Text>
                            </TouchableOpacity>



                        </View>

                    ) : null}

                    {this.state.status == 0 ? (
                        <View>
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

                            <TouchableOpacity style={{ paddingVertical: 10, backgroundColor: '#020cab', marginTop: 20, borderRadius: 50, marginHorizontal: 20, height: 50 }} onPress={this.onPressProcess}>
                                <Text style={{ color: '#FFF', textAlign: 'center', fontSize: 16, fontFamily: 'Poppins-Bold', }}>Process Payout</Text>
                            </TouchableOpacity>

                            {/* <TouchableOpacity style={{ paddingVertical: 10, backgroundColor: 'red', marginTop: 30, borderRadius: 50, marginHorizontal: 30 }} onPress={this.onPressRV}>
                                <Text style={{ color: '#FFF', textAlign: 'center', fontSize: 16, fontFamily: 'Poppins-Bold', }}>Reverse Payment</Text>
                            </TouchableOpacity> */}
                        </View>
                    ) : null}

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
    text: { textAlign: 'center' }
});