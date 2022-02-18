import React,{Component} from 'react';
import {View,Text,ScrollView,StyleSheet,Image,TouchableOpacity,FlatList,TextInput,StatusBar,Alert,Picker} from 'react-native';
import Theme from '../styles/Theme';
import Icon from '../common/icons';
import Spinner from 'react-native-loading-spinner-overlay';
import Constant from "../components/Constant";
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from "react-redux";

import {TextInputMask} from 'react-native-masked-text'
import {SCLAlert,SCLAlertButton} from 'react-native-scl-alert'

class PayoutConfirm extends Component {
    constructor(props) {
        super(props)
        this.state = {

            amount: this.props.navigation.getParam('amount','0'),
            rate: this.props.navigation.getParam('rate','0'),
            rate_type_s: this.props.navigation.getParam('rate_type','0'),
            charges: this.props.navigation.getParam('charges','0'),
            to: this.props.navigation.getParam('to','0'),
            from: this.props.navigation.getParam('from','0'),
            agent_acct_id: this.props.navigation.getParam('agent_acct_id','0'),
            agent_to: this.props.navigation.getParam('agent_to','0'),
            c_ref: this.props.navigation.getParam('c_ref','0'),
            status: this.props.navigation.getParam('status','0'),
            due_amount: this.props.navigation.getParam('due_amount','0'),
            payout_bal_set: this.props.navigation.getParam('payout_bal','0'),
            bank_id_pay: this.props.navigation.getParam('bank_id_pay','0'),
            payout_due_set: this.props.navigation.getParam('payout_due','0'),
            country_id_to: this.props.navigation.getParam('country_id_to','0'),
            ch_type: this.props.navigation.getParam('ch_type','0'),
            r_amount: this.props.navigation.getParam('r_amount','0'),
            local: 0,
            local2: 0,
            bal: 0,
            due_bal: 0,payout_bal: 0,bal_due: 0,
            pin: "",
            spinner: false,
            Amessage: "",
            Smessage: "",
            bank_type: 0,
            BankList: [],
            AgentList: [],
            bank_id: 0,agent_to_id:0,
            payout_cost: 0,
            Cbal: 0,pay_to: 0,new_wallet: 0,
            CountryList: [],rate_v: 0,
            rate_type: 0,reason: "",ref_no: "",
            dataSource: [],


        }
    }


    async componentDidMount() {

        var getbal
        if (this.state.r_amount != 0) {
            getbal = this.state.r_amount

        } else {
            if (this.state.rate_type_s == 1) {
                getbal = (this.state.due_amount) * (this.state.rate)
            } else if (this.state.rate_type_s == 2) {
                getbal = (this.state.due_amount) / (this.state.rate)
            } else {
                getbal = (this.state.due_amount) * 1
            }

        }


        this.setState({
            getFrom: await AsyncStorage.getItem('@getFrom'),
            personal_info_id: await AsyncStorage.getItem('@personal_info_id'),
            wallet: await AsyncStorage.getItem('@wallet'),
            bal: getbal,bal_due: getbal,
        })

        try {

            const BankApiCall = await fetch(Constant.URL + Constant.getBANKS + "/" + this.state.getFrom);
            const getBank = await BankApiCall.json();
            this.setState({BankList: getBank,spinner: false});
        } catch (err) {
            console.log("Error fetching data-----------",err);
        }
        try {

            const CountryApiCall = await fetch(Constant.URL + Constant.getCOUNTRY + "/" + this.state.getFrom);
            const getCountry = await CountryApiCall.json();
            console.log("getCountry",getCountry)
            this.setState({CountryList: getCountry,spinner: false});
        } catch (err) {
            console.log("Error fetching data-----------",err);
        }

              //gET Agent
              try {

                const AgentApiCall = await fetch(Constant.URL + Constant.getAGENT+"/"+this.state.personal_info_id+"/"+this.state.getFrom+"/"+1);
                const getAgent = await AgentApiCall.json();
               
                this.setState({ AgentList: getAgent, spinner: false });
            } catch (err) {
                console.log("Error fetching data-----------", err);
            }

    }

    async bal() {

        this.setState({spinner: true});
        try {

            const BalApiCall = await fetch(Constant.URL + Constant.getAgBal + "/" + this.state.personal_info_id + "/" + this.state.getFrom + "/" + 2);
            const dataSource = await BalApiCall.json();
            await AsyncStorage.setItem('@wallet',dataSource.bal)

            this.props.getCustomerWallet(dataSource.c_bal)
            this.props.getAgentWallet(dataSource.bal)
            this.setState({wallet: dataSource.bal,c_wallet: dataSource.c_bal,spinner: false});
        } catch (err) {
            console.log("Error fetching kdata-----------",err);
            this.setState({spinner: false});
        }
    }


    async NewBal(NewCountry_id) {
        console.log("NewCountry_id",NewCountry_id)
        this.setState({spinner: true});
        try {
            const BalApiCall = await fetch(Constant.URL + Constant.getAgBal + "/" + this.state.personal_info_id + "/" + NewCountry_id + "/" + 2);
            const dataSource = await BalApiCall.json();
            console.log('@wallet',Constant.rawNumber(dataSource.bal))

            this.setState({new_wallet: dataSource.bal,new_c_wallet: dataSource.c_bal,spinner: false});
        } catch (err) {
            console.log("Error fetching kdata-----------",err);
            this.setState({spinner: false});
        }
    }



    handleOpen = () => {
    
        let payoutVV
        if (this.state.payout_cost != 0) {
            payoutVV = Constant.rawNumber(this.state.payout_cost)
        } else {payoutVV = 0;}


        if (this.state.bank_type == 2) {
            if (this.state.bank_id <= 0) {
                Alert.alert("Please Select a Bank.");
                return false
            }
        }


        const {pin} = this.state;
        if (pin.length <= 0) {
            Alert.alert("Please Enter Your Pin.");
        } else if (this.state.bank_type <= 0) {
            Alert.alert("Please Select Payout Type.");

        } else {

            if (this.state.bal_due > Constant.rawNumber(this.state.wallet) && this.state.bank_type == 1) {
                Alert.alert("Insufficient Funds.");
                return false
            }
            //cross currency 
            if (this.state.bal_due > Constant.rawNumber(this.state.new_wallet) && this.state.bank_type == 3) {
                Alert.alert("Insufficient Funds on your wallet");
                return false
            }

            if (this.state.payout_due_set > 0) {
                this.setState({Cbal: this.state.payout_due_set,tto: this.state.to})
            } else {
                if (this.state.rate_type == 1) {
                    this.setState({Cbal: Number(this.state.due_bal) + payoutVV,tto: this.state.x_tox})
                } else if (this.state.rate_type == 2) {
                    this.setState({Cbal: Number(this.state.due_bal) + payoutVV,tto: this.state.x_tox})

                } else {
                    this.setState({Cbal: Number(this.state.bal) + payoutVV,tto: this.state.to})
                }
            }
            this.setState({Pshow: true})

        }
    }


    onPressTransfer = async () => {


        let payoutVV
        if (this.state.payout_cost != 0) {
            payoutVV = this.payoutV.getRawValue()
        } else {payoutVV = 0}

        const {pin} = this.state;
        if (pin.length <= 0) {
            Alert.alert("Please Enter Your Pin.");
        } else if (this.state.bank_type <= 0) {
            Alert.alert("Please Select Bank.");
        } else {
            this.setState({spinner: true});
            // post method
            fetch(Constant.URL + Constant.CPAYOUT,{
                method: 'POST',
                body: JSON.stringify({
                    personal_info_id: this.state.personal_info_id,
                    agent_to: this.state.agent_to,
                    agent_acct_id: this.state.agent_acct_id,
                    pin: this.state.pin,
                    bank_id: this.state.bank_id,
                    getpayout_cost: payoutVV,
                    c_ref: this.state.c_ref,
                    bank_type: this.state.bank_type,
                    payout_rate: this.state.rate_v,
                    payout_to: this.state.pay_to,
                    country_id_to: this.state.country_id_to,
                    cur_x: this.state.x_tox,
                    payout_due: this.state.Cbal,
                    getFrom: this.state.getFrom,
                    payout_bal: this.state.payout_bal,
                    payout_bal_set: this.state.payout_bal_set,
                    ref_no: this.state.ref_no,
                    ch_type: this.state.ch_type,
                    payout_cost: this.state.payout_cost,
                })
            })
                .then((response) => response.json())
                .then((result) => {

                    this.setState({
                        spinner: false,
                        dataSource: result,
                    });
                    console.log("payout_bal",this.state.payout_bal);
                    console.log("Cbal",this.state.Cbal);
                    console.log(this.state.dataSource.data);
                    console.log(this.state.dataSource.data);
                    if (this.state.dataSource.code == 200) {
                        this.bal()
                        this.setState({spinner: false,Sshow: true,Smessage: this.state.dataSource.data.message});

                    } else {

                        this.setState({spinner: false,show: true,Amessage: this.state.dataSource.data.message,Pshow: false});

                    }

                }).catch(function (error) {
                    this.setState({spinner: false});
                    console.log("-------- error ------- " + error);
                    alert("result:" + error)
                });

            //end post method
        }
    }
    onPressRV = async () => {


        const {pin,reason} = this.state;

        if (reason.length <= 0) {
            Alert.alert("Please Enter Reason for not making payment.");
            return false
        }
        if (pin.length <= 0) {
            Alert.alert("Please Enter Your Pin.");
        } else {
            this.setState({spinner: true});
            // post method
            fetch(Constant.URL + Constant.RPAYOUT,{
                method: 'POST',
                body: JSON.stringify({
                    agent_to: this.state.agent_to,
                    agent_acct_id: this.state.agent_acct_id,
                    pin: this.state.pin,
                    c_ref: this.state.c_ref,
                    reason: this.state.reason,

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

                        this.setState({spinner: false,Sshow: true,Smessage: this.state.dataSource.data.message});

                    } else {

                        this.setState({spinner: false,show: true,Amessage: this.state.dataSource.data.message});

                    }

                }).catch(function (error) {
                    this.setState({spinner: false});
                    console.log("-------- error ------- " + error);
                    alert("result:" + error)
                });

            //end post method
        }
    }


    onPressTR = async () => {


        const {pin,reason} = this.state;

        if (reason.length <= 0) {
            Alert.alert("Please Enter Reason for transferring this  payment.");
            return false
        }
        if (this.state.agent_to_id == 0) {
            Alert.alert("Please select a payout agent.");
            return false
        }
        if (pin.length <= 0) {
            Alert.alert("Please Enter Your Pin.");
        } else {
            this.setState({spinner: true});
            // post method
            fetch(Constant.URL + Constant.TRPAYOUT,{
                method: 'POST',
                body: JSON.stringify({
                    agent_to: this.state.agent_to,
                    agent_to_id:this.state.agent_to_id,
                    agent_acct_id: this.state.agent_acct_id,
                    pin: this.state.pin,
                    c_ref: this.state.c_ref,
                    reason: this.state.reason,

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

                        this.setState({spinner: false,Sshow: true,Smessage: this.state.dataSource.data.message});

                    } else {

                        this.setState({spinner: false,show: true,Amessage: this.state.dataSource.data.message});

                    }

                }).catch(function (error) {
                    this.setState({spinner: false});
                    console.log("-------- error ------- " + error);
                    alert("result:" + error)
                });

            //end post method
        }
    }


    render() {


        return (
            <View style={{flex: 1,backgroundColor: Theme.bgcolor}}>
                <Spinner
                    visible={this.state.spinner}
                    overlayColor={'rgba(0, 0, 0, 0.30)'}
                />
                <StatusBar backgroundColor="#020cab" barStyle="light-content" />
                <View style={styles.logContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon family="MaterialIcons" name="arrow-back" size={25} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.logintxt}>Approve Payout </Text>
                </View>
                <ScrollView>
                    <View style={styles.AmountCon}>
                        <Text style={styles.valTxt}>Value To Transfer between currency</Text>
                        <View style={styles.rowcenter}>
                            {this.state.getCurrency}
                            <Text style={{color: "#FFF",fontSize: 30,paddingLeft: 5}}>{Constant.numberFormate(this.state.bal)}</Text>
                        </View>
                        {this.state.from ? (<Text style={styles.updateSty}>{this.state.from} > {this.state.to}</Text>) : null}


                        {this.state.bank_type != 3 ? (
                            <View>
                                <Text style={{textAlign: 'right',fontSize: 12,color: "#fff"}}>Payout Due</Text>
                                {this.state.payout_due_set <= 0 ? (
                                    <Text style={{textAlign: 'right',fontSize: 20,color: "#fff"}}>

                                        {Constant.numberFormate(this.state.bal_due)}
                                    </Text>
                                ) : null}
                                {this.state.payout_due_set > 0 ? (
                                    <Text style={{textAlign: 'right',fontSize: 20,color: "#fff"}}>

                                        {this.state.payout_due_set}
                                    </Text>
                                ) : null}
                                <Text style={{textAlign: 'right',fontSize: 12,color: "#fff"}}>Outstanding</Text>
                                <Text style={{textAlign: 'right',fontSize: 15,color: "#fff"}}>

                                    {Constant.numberFormate(this.state.payout_bal_set)}
                                </Text>
                            </View>
                        ) : null}
                        {/* Cross Country */}
                        {this.state.bank_type == 3 ? (
                            <View>

                                <Text style={{textAlign: 'right',fontSize: 12,color: "#fff"}}>Payout Due</Text>
                                <Text style={{textAlign: 'right',fontSize: 10,color: "#fff"}}>Charges : {this.state.payout_cost}</Text>

                                <Text style={{textAlign: 'right',fontSize: 15,color: "#fff"}}>
                                    {this.state.x_tox}    {Constant.numberFormate(this.state.due_bal.toFixed(2))}
                                </Text>
                            </View>
                        ) : null}
                    </View>

                    <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,marginTop: 10,paddingHorizontal: 15}}>
                        <Text style={{flex: 0.1,paddingLeft: 1}} ></Text>
                        <Picker style={{flex: 0.9,paddingLeft: 150}}
                            selectedValue={this.state.bank_type}
                            onValueChange={(itemValue,itemPosition) => this.setState({bank_type: itemValue,toIndex: itemPosition,value: "",rate_type: 0,pay_to: 0})}   >
                            <Picker.Item label="Select Payout Type" value="0" />
                            <Picker.Item label="Wallet Payout" value="1" />
                            <Picker.Item label="Bank Payout" value="2" />
                            <Picker.Item label="Cross Currency Payout" value="3" />
                            <Picker.Item label="Transfer Payout to Agent" value="4" />
                            <Picker.Item label="Unable To Payout" value="20" />
                        </Picker>
                    </View>
                    {this.state.bank_type != 3 ? (
                        <View>
                            {this.state.bank_type == 2 ? (
                                <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,marginTop: 2,paddingHorizontal: 15}}>
                                    <Text style={{flex: 0.1,paddingLeft: 1}} ></Text>
                                    <Picker style={{flex: 0.9,paddingLeft: 150}}
                                        selectedValue={this.state.bank_id}
                                        onValueChange={(itemValue,itemPosition) => this.setState({bank_id: itemValue,toIndex: itemPosition})}   >
                                        <Picker.Item label="SELECT BANK" value="0" />
                                        {
                                            this.state.BankList.map((v) => {
                                                return <Picker.Item label={v.bank_name} value={v.bank_id} />
                                            })
                                        }
                                    </Picker>
                                </View>
                            ) : null}




                        </View>
                    ) : null}

                    {/* TRANSFER TO OTHER AGENT  */}

                    {this.state.bank_type == 4 ? (
                        <View>

                            <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,marginTop: 2,paddingHorizontal: 15}}>
                                <Text style={{flex: 0.1,paddingLeft: 1}} ></Text>
                                <Picker style={{flex: 0.9,paddingLeft: 150}}
                                    selectedValue={this.state.agent_to_id}
                                    onValueChange={(itemValue,itemPosition) => this.setState({agent_to_id: itemValue,toIndex: itemPosition})}   >
                                    <Picker.Item label="SELECT PAYOUT AGENT" value="0" />
                                    {
                                        this.state.AgentList.map((v) => {
                                            return <Picker.Item label={v.first_name + " " + v.last_name + " > " + v.phone} value={v.personal_info_id} />
                                        })
                                    }
                                </Picker>
                            </View>

                        </View>
                    ) : null}
                    {/* CROSS CURRENCY PAYMENT  */}
                    {this.state.bank_type == 3 ? (
                        <View>

                            <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,marginTop: 2,paddingHorizontal: 15}}>
                                <Text style={{flex: 0.1,paddingLeft: 1}} ></Text>
                                <Picker style={{flex: 0.9,paddingLeft: 150}}
                                    selectedValue={this.state.pay_to}
                                    onValueChange={(itemValue,itemPosition) => {

                                        this.setState({pay_to: itemValue,toIndex: itemPosition})
                                        //GET RATE
                                        this.NewBal(itemValue)
                                        this.setState({spinner: true});

                                        fetch(Constant.URL + Constant.getRATE,{
                                            method: 'POST',
                                            body: JSON.stringify({
                                                amount: this.state.amount,
                                                rateType: this.state.rateType,
                                                to: itemValue,
                                                from: this.state.getFrom
                                            })
                                        })
                                            .then((response) => response.json())
                                            .then((result) => {
                                                console.log("allrest",result);
                                                this.setState({
                                                    spinner: false,
                                                    dataSource: result,
                                                });
                                                if (this.state.dataSource.code == 200) {
                                                    this.setState({
                                                        local: this.state.dataSource.data.local_rate_1,
                                                        local2: this.state.dataSource.data.local_rate_2,
                                                        x_tox: this.state.dataSource.data.to_currency
                                                    });
                                                } else {
                                                    this.setState({spinner: false});
                                                    Alert.alert(this.state.dataSource.data.message);
                                                }
                                            }).catch(function (error) {
                                                this.setState({spinner: false});
                                                console.log("-------- error ------- " + error);
                                                alert("result:" + error)
                                            });

                                    }}   >
                                    <Picker.Item label="SELECT OTHER WALLET CURRENCY" value="0" />

                                    {
                                        this.state.CountryList.map((v) => {
                                            return <Picker.Item label={v.country + " - " + v.currency} value={v.country_id} />
                                        })
                                    }
                                </Picker>
                            </View>

                            {this.state.pay_to != 0 ? (
                                <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,marginTop: 5,paddingHorizontal: 10}}>
                                    <Text style={{flex: 0.1,paddingLeft: 1}} ></Text>
                                    <Picker style={{flex: 0.9,paddingLeft: 150}}
                                        selectedValue={this.state.rate_type}
                                        onValueChange={(itemValue,itemPosition) => {
                                            this.setState({rate_type: itemValue,toIndex: itemPosition,rate_v: 0})
                                            if (itemValue == 1) {
                                                this.setState({rate_v: this.state.local})
                                                var getBal = this.state.bal * this.state.local
                                                this.setState({due_bal: getBal})


                                            } else if (itemValue == 2) {
                                                this.setState({rate_v: this.state.local2})
                                                var getBal = this.state.bal / this.state.local2
                                                this.setState({due_bal: getBal})
                                            }
                                        }
                                        }>
                                        <Picker.Item label="Select Rate Calcuation Type" value="0" />
                                        <Picker.Item label="Rate Multiplication" value="1" />
                                        <Picker.Item label="Rate Divison" value="2" />
                                    </Picker>
                                </View>
                            ) : null}

                            {this.state.rate_type != 0 ? (
                                <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,marginTop: 20,paddingHorizontal: 15}}>
                                    <Text >Rate </Text>

                                    <TextInputMask style={{paddingLeft: 10,fontSize: 16}}
                                        type={'money'}
                                        placeholder="Enter Rate"
                                        options={{
                                            precision: 4,
                                            separator: '.',
                                            delimiter: ',',
                                            unit: '',
                                            suffixUnit: ''
                                        }}
                                        value={this.state.rate_v}
                                        onChangeText={text => {
                                            this.setState({
                                                rate_v: text
                                            })

                                            if (this.state.rate_type == 1) {
                                                const getRaw = Constant.rawNumber(text);

                                                if (getRaw == 0) {
                                                    var getBal = (this.state.bal) * 1
                                                } else {
                                                    var getBal = (this.state.bal) * (getRaw)
                                                }

                                                this.setState({due_bal: getBal})


                                            } else if (this.state.rate_type == 2) {
                                                const getRaw = Constant.rawNumber(text);
                                                if (getRaw == 0) {
                                                    var getBal = (this.state.bal) * 1
                                                } else {
                                                    var getBal = (this.state.bal) / (getRaw)
                                                }

                                                this.setState({due_bal: getBal})
                                            }

                                        }}

                                    />



                                </View>
                            ) : null}


                        </View>
                    ) : null}
                    {this.state.bank_type == 1 || this.state.bank_type == 2 || this.state.bank_type == 3 ? (
                        <View>
                            {this.state.payout_due_set <= 0 ? (
                                <View>
                                    <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,paddingHorizontal: 15}}>

                                        <Text >Charges</Text>
                                        <TextInputMask style={{paddingLeft: 10,fontSize: 16}}
                                            type={'money'}
                                            placeholder="Enter Charges"
                                            options={{
                                                precision: 2,
                                                separator: '.',
                                                delimiter: ',',
                                                unit: '',
                                                suffixUnit: ''
                                            }}
                                            value={this.state.payout_cost}
                                            onChangeText={text => {
                                                this.setState({
                                                    payout_cost: text
                                                })
                                                let payoutVV = Constant.rawNumber(text)

                                                if (this.state.rate_type == 1) {
                                                    let cal = Number(this.state.due_bal) + payoutVV
                                                    this.setState({Cbal: cal})
                                                } else if (this.state.rate_type == 2) {
                                                    let cal = Number(this.state.due_bal) + payoutVV
                                                    this.setState({bal_due: cal})

                                                } else {
                                                    let cal = Number(this.state.bal) + payoutVV
                                                    this.setState({bal_due: cal})
                                                }
                                                let g_cal = Number(this.state.bal) + payoutVV
                                                this.setState({payout_bal: g_cal})
                                            }}
                                            ref={(ref) => this.payoutV = ref}
                                        />

                                    </View>

                                </View>
                            ) : null}
                          
                        </View>

                    ) : null}

                    {this.state.bank_type == 2 ? (
                        <View>
                            <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,paddingHorizontal: 15}}>

                                <TextInput style={{paddingLeft: 10,fontSize: 16}}

                                    placeholder="Reference No"
                                    onChangeText={(ref_no) => this.setState({ref_no})}
                                    value={this.state.ref_no}
                                />

                            </View>
                        </View>
                    ) : null}

                    {this.state.bank_type == 20  || this.state.bank_type == 4? (
                        <View>
                            <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,paddingHorizontal: 15}}>

                                <TextInput style={{paddingLeft: 10,fontSize: 16}}

                                    placeholder="Reason"
                                    onChangeText={(reason) => this.setState({reason})}
                                    value={this.state.reason}
                                />

                            </View>
                        </View>
                    ) : null}

                    <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,paddingHorizontal: 15}}>
                        <Icon family="Feather" name="key" size={25} />
                        <TextInput style={{paddingLeft: 10,fontSize: 16}}

                            placeholder="ENTER YOUR PIN"

                            keyboardType="number-pad"
                            secureTextEntry={true}
                            maxLength={4}
                            onChangeText={(pin) => this.setState({pin})}
                            value={this.state.pin}
                        />

                    </View>
                    {/* BUTTON */}

                    {this.state.rate_type != 0 ? (
                        <View>
                            {this.state.bank_type == 3 ? (
                                <TouchableOpacity style={{paddingVertical: 10,backgroundColor: '#020cab',marginTop: 30,borderRadius: 50,marginHorizontal: 30}} onPress={this.handleOpen}>
                                    <Text style={{color: '#FFF',textAlign: 'center',fontSize: 16,fontFamily: 'Poppins-Bold',}}>View Cross Payout</Text>
                                </TouchableOpacity>
                            ) : null}
                        </View>
                    ) : null}
                    {this.state.status == 0 ? (

                        <View>
                            {this.state.bank_type != 3 && this.state.bank_type != 0 && this.state.bank_type != 20 && this.state.bank_type != 4 ? (

                                <TouchableOpacity style={{paddingVertical: 10,backgroundColor: '#020cab',marginTop: 30,borderRadius: 50,marginHorizontal: 30}} onPress={this.handleOpen}>
                                    <Text style={{color: '#FFF',textAlign: 'center',fontSize: 16,fontFamily: 'Poppins-Bold',}}>Confirm Payout</Text>
                                </TouchableOpacity>
                            ) : null}

                            {this.state.bank_type == 20 ? (

                                <TouchableOpacity style={{paddingVertical: 10,backgroundColor: 'red',marginTop: 30,borderRadius: 50,marginHorizontal: 30}} onPress={this.onPressRV}>
                                    <Text style={{color: '#FFF',textAlign: 'center',fontSize: 16,fontFamily: 'Poppins-Bold',}}>Unable To Payout</Text>
                                </TouchableOpacity>

                            ) : null}
                                  {this.state.bank_type == 4 ? (

                                <TouchableOpacity style={{paddingVertical: 10,backgroundColor: 'green',marginTop: 30,borderRadius: 50,marginHorizontal: 30}} onPress={this.onPressTR}>
                                    <Text style={{color: '#FFF',textAlign: 'center',fontSize: 16,fontFamily: 'Poppins-Bold',}}>Transfer Payout</Text>
                                </TouchableOpacity>

                            ) : null}


                        </View>

                    ) : null}

                    <View style={{margin: 20}}></View>

                    <SCLAlert
                        theme="danger"
                        show={this.state.show}
                        title="Error Message"
                        subtitle={this.state.Amessage}
                        onRequestClose={() => {
                            this.setState({show: false})
                        }}
                    >


                        <SCLAlertButton theme="danger" onPress={() => {
                            this.setState({show: false})
                        }} >Close</SCLAlertButton>
                    </SCLAlert>

                    <SCLAlert
                        theme="success"
                        show={this.state.Sshow}
                        title="Successful Message"
                        subtitle={this.state.Smessage}
                        onRequestClose={() => {
                            this.setState({Sshow: false})
                        }}
                    >


                        <SCLAlertButton theme="success" onPress={() => {
                            this.props.navigation.navigate("TabNav")
                        }} >Close</SCLAlertButton>
                    </SCLAlert>


                    <SCLAlert
                        theme="info"
                        show={this.state.Pshow}
                        title="Confirm Payout"
                        onRequestClose
                        subtitle="Total Due Payout"
                        onRequestClose={() => {
                            this.setState({Pshow: false})
                        }}
                    >

                        <View style={styles.rowcenter}>
                            {this.state.payout_due_set <= 0 ? (
                                <Text style={{color: "#000",fontSize: 25,paddingLeft: 5,textAlign: "center"}}> {this.state.tto} {Constant.numberFormate(this.state.Cbal)}</Text>
                            ) : null}
                            {this.state.payout_due_set > 0 ? (
                                <Text style={{color: "#000",fontSize: 25,paddingLeft: 5,textAlign: "center"}}> {this.state.tto} {Constant.numberFormate(this.state.Cbal)}</Text>
                            ) : null}
                        </View>

                        <SCLAlertButton theme="info" onPress={this.onPressTransfer} >PAYOUT NOW</SCLAlertButton>
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

});

function mapStateProps(state) {
    return {
        userW: state.userW,
        agentW: state.agentW,

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


export default connect(mapStateProps,mapDispatchProps)(PayoutConfirm)