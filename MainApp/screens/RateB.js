import React,{Component} from 'react';
import {View,Text,ScrollView,StyleSheet,Image,TouchableOpacity,TextInput,Picker,StatusBar,Alert} from 'react-native';
import Theme from '../styles/Theme';
import Icon from '../common/icons';
import RadioForm from 'react-native-simple-radio-button';
import Constant from "../components/Constant";


import {TextInputMask} from 'react-native-masked-text'

export default class RateB extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cus_name: this.props.navigation.getParam('cus_name','Name'),
            cus_phone: this.props.navigation.getParam('cus_phone','phone'),
            customer_id: this.props.navigation.getParam('customer_id','0'),
            amount: this.props.navigation.getParam('amount','0'),
            dollar: this.props.navigation.getParam('dollar','0'),
            dollar2: this.props.navigation.getParam('dollar2','0'),
            local: this.props.navigation.getParam('local','0'),
            local2: this.props.navigation.getParam('local2','0'),
            charges: this.props.navigation.getParam('charges','0'),
            to: this.props.navigation.getParam('to','0'),
            to_id: this.props.navigation.getParam('to_id','0'),
            from: this.props.navigation.getParam('from','0'),
            fromAgent: this.props.navigation.getParam('fromAgent','0'),
            bank_id: this.props.navigation.getParam('bank_id','0'),
            ch_type: this.props.navigation.getParam('ch_type','0'),
            due_amount: this.props.navigation.getParam('due_amount','0'),
            r_bal: this.props.navigation.getParam('r_bal','0'),
            getCountry_id: this.props.navigation.getParam('getCountry_id','0'),
            r_bal: this.props.navigation.getParam('r_bal','0'),
            getCountry_id: this.props.navigation.getParam('getCountry_id','0'),
            trans_type: this.props.navigation.getParam('trans_type','0'),
            cov_rate: this.props.navigation.getParam('cov_rate','0'),
            new_local_rate: this.props.navigation.getParam('new_local_rate','0'),
            new_dollar_trans: this.props.navigation.getParam('new_dollar_trans','0'),
            value: 0,up_val: 0,down_val: 0,
            rate_v: 0,
            rate_type: 0,
            r_amount: 0,r_click: 0,
            bal: 0,mut_float:[],dv_float:[],
            rate1_props: [
                // {label: 'DOLLAR', value: this.props.navigation.getParam('dollar', '0') },
                // {label: 'LOCAL', value: this.props.navigation.getParam('local', '0') },

            ],

            rate2_props: [
                // {label: 'DOLLAR', value: this.props.navigation.getParam('dollar2', '0') },
                // {label: 'LOCAL', value: this.props.navigation.getParam('local2', '0') },

            ],
        }
    }

    async componentDidMount() {
        //get Rate
        this.GetRateSet();

    }


    async GetRateSet() {
        var floats=[]
        floats.push(this.state.new_local_rate);
        console.log("floats",floats)
        this.setState({mut_float: floats,dv_float: floats})
     
       
        //END GET RATE
    }


    onPressB = () => {


        if (this.state.rate_v == "Select Rate") {
            Alert.alert("Please Select Rate Type.");
            return false;
        }

        if (this.state.rate_type <= 0) {
            Alert.alert("Please Rate is required.");
            return false;
        }
        if (this.state.bal <= 0) {
            Alert.alert("Please enter amount to calculate recipient amount.");
            return false;
        }
        if (this.state.r_bal < 1) {
            Alert.alert("Insufficient Credit.");
            return false;
        }
        if (this.state.amount == 0) {
            Alert.alert("You have not enter a valid amount.");
            return false;
        }

        if (this.state.r_amount == 0 && this.state.r_click == 1) {
            Alert.alert("Enter Recipient Amount to continue.");
            return false;
        }

        this.setState({show: false})
        this.props.navigation.navigate("SendB",{
            cus_name: this.state.cus_name,
            customer_id: this.state.customer_id,
            amount: this.state.amount.toFixed(5),
            rate: this.state.rate_v,
            rate_type: this.state.rate_type,
            charges: this.state.charges.toFixed(5),
            to: this.state.to,
            to_id: this.state.to_id,
            from: this.state.from,
            fromAgent: this.state.fromAgent,
            cus_phone: this.state.cus_phone,
            bank_id: this.state.bank_id,
            ch_type: this.state.ch_type,
            bal: this.state.bal,
            due_amount: 1,
            getCountry_id: this.state.getCountry_id,

        })

    }

    render() {

        return (
            <View style={{flex: 1,backgroundColor: Theme.bgcolor}}>
                <StatusBar backgroundColor="#020cab" barStyle="light-content" />
                <View style={styles.logContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon family="MaterialIcons" name="arrow-back" size={25} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.logintxt}>Rate Calculation Sum</Text>

                </View>
                <ScrollView>
                    <View style={styles.AmountCon}>

                        <Text style={styles.valTxt}>You Send</Text>
                        <View style={styles.rowcenter}>
                            <Icon family="FontAwesome" name="rupee" size={40} color="#FFF" />
                            <Text style={{color: "#FFF",fontSize: 40,paddingLeft: 5}}>
                                {/* {Constant.numberFormate(1.toFixed(2))} */}
                                <Icon family="Feather" name="plus" size={20} color="#FFF" />
                                <Text style={{textAlign: 'right',fontSize: 12,color: "#fff"}}> Charges : </Text>
                                <Text style={{textAlign: 'right',fontSize: 20,color: "#fff"}}>{this.state.charges.toFixed(2)} </Text>
                            </Text>
                        </View>
                        <Text style={styles.updateSty}>{this.state.from} </Text>



                        <Text style={{textAlign: 'right',fontSize: 12,color: "#fff"}}>Recipient Gets</Text>
                        <Text style={{textAlign: 'right',fontSize: 30,color: "#fff"}}>

                            {Constant.numberFormate(this.state.bal.toFixed(2))}
                        </Text>
                        <Text style={{textAlign: 'right',fontSize: 20,color: "#fff"}}> {this.state.to}</Text>

                    </View>
                    <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,marginTop: 5,paddingHorizontal: 10}}>
                        <Text style={{flex: 0.1,paddingLeft: 1}} ></Text>
                        <Picker style={{flex: 0.9,paddingLeft: 150}}
                            selectedValue={this.state.rate_type}
                            onValueChange={(itemValue,itemPosition) => {
                                // this.GetRateSet(itemValue)
                                this.setState({rate_type: itemValue,toIndex: itemPosition,rate_v: 0,r_amount: 0,bal: 0,due_amount: this.props.navigation.getParam('due_amount','0')})
                                if (itemValue == 1) {
                                    this.setState({rate_v: "Select Rate"})

                                    if (this.state.r_amount == 0) {
                                        var getBal = 1 * (this.state.local)
                                        this.setState({bal: getBal})
                                    }

                                } else if (itemValue == 2) {
                                    this.setState({rate_v: "Select Rate"})
                                    if (this.state.r_amount == 0) {
                                        var getBal = 1 / (this.state.local2)
                                        this.setState({bal: getBal})

                                    }
                                }
                            }
                            }>
                            <Picker.Item label="Select Rate Calculation Type" value="0" />
                            <Picker.Item label="Rate Multiplication" value="1" />
                            <Picker.Item label="Rate Division" value="2" />
                        </Picker>
                    </View>



                    {/* not in use , remove on production  */}

                    {this.state.rate_type != 0 ? (
                        <View>

                            <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,marginTop: 2,paddingHorizontal: 15}}>
                                <Text style={{flex: 0.1,paddingLeft: 1}} ></Text>
                                {this.state.rate_type == 1 ? (
                                    <Picker style={{flex: 0.9,paddingLeft: 150}}
                                        selectedValue={this.state.rate_v}
                                        onValueChange={(itemValue,itemPosition) => {
                                            this.setState({rate_v: itemValue,toIndex: itemPosition,r_amount: 0})

                                            if (this.state.r_amount == 0) {
                                                var getBal = 1 * itemValue
                                                this.setState({bal: getBal})
                                            }

                                        }}   >

                                        {
                                            this.state.mut_float.map((v) => {
                                                return <Picker.Item label={v} value={v} />
                                            })
                                        }
                                        <Picker.Item label={this.state.rate_v} value={this.state.rate_v} />
                                    </Picker>
                                ) : null}

                                {this.state.rate_type == 2 ? (
                                    <Picker style={{flex: 0.9,paddingLeft: 150}}
                                        selectedValue={this.state.rate_v}
                                        onValueChange={(itemValue,itemPosition) => {
                                            this.setState({rate_v: itemValue,toIndex: itemPosition,r_amount: 0})
                                            if (this.state.r_amount == 0) {
                                                var getBal = 1 / itemValue
                                                this.setState({bal: getBal})

                                            }
                                        }}   >

                                        {
                                            this.state.dv_float.map((v) => {
                                                return <Picker.Item label={v} value={v} />
                                            })
                                        }
                                        <Picker.Item label={this.state.rate_v} value={this.state.rate_v} />
                                    </Picker>
                                ) : null}

                            </View>

                            {this.state.rate_v != "Select Rate" ? (
                                <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,marginTop: 20,paddingHorizontal: 15}}>
                                    <Text >Recipient Amount</Text>
                                    <TextInputMask style={{paddingLeft: 10,fontSize: 16}}
                                        type={'money'}
                                        placeholder="Set Recipient Amount"
                                        options={{
                                            precision: 2,
                                            separator: '.',
                                            delimiter: ',',
                                            unit: '',
                                            suffixUnit: ''
                                        }}
                                        value={this.state.r_amount}
                                        onChangeText={text => {

                                            this.setState({
                                                r_amount: text,r_click: 1
                                            });
                                            var bal = 0,percent,due,charges,dueBal,ammt,rect_amt
                                            if (this.state.rate_type == 1) {
                                                const getRaw = Constant.rawNumber(text);
                                                const getRawRate = Constant.rawNumber(this.state.rate_v);



                                                percent = this.state.ch_type / 100
                                                if (!getRaw) {
                                                    ammt = 0
                                                    rect_amt = 0

                                                } else {
                                                    ammt = (getRaw) / (getRawRate)
                                                    rect_amt = Constant.rawNumber(text);

                                                }

                                                if (this.state.ch_type == 0) {
                                                    charges = this.state.charges
                                                } else {
                                                    charges = ammt * percent
                                                }

                                                bal = ammt

                                                if (bal > 0) {
                                                    bal = ammt
                                                } else {
                                                    bal = 0;
                                                }
                                                this.setState({amount: (ammt + charges),bal: rect_amt,due_amount: bal,charges: charges})


                                            } else if (this.state.rate_type == 2) {

                                                if (this.state.rate_v == 0) {
                                                    bal = 0
                                                } else {
                                                    const getRaw = Constant.rawNumber(text);
                                                    const getRawRate = Constant.rawNumber(this.state.rate_v);

                                                    percent = this.state.ch_type / 100

                                                    if (!getRaw) {
                                                        ammt = 0
                                                        rect_amt = 0
                                                        console.log("zero")
                                                    } else {
                                                        ammt = (getRaw) * (getRawRate)
                                                        rect_amt = Constant.rawNumber(text);
                                                        console.log("not zero")
                                                    }


                                                    if (this.state.ch_type == 0) {
                                                        charges = this.state.charges
                                                    } else {
                                                        charges = ammt * percent
                                                    }

                                                    bal = ammt

                                                    if (bal > 0) {
                                                        bal = ammt
                                                    } else {
                                                        bal = 0;
                                                    }
                                                    this.setState({amount: (ammt + charges),bal: rect_amt,due_amount: bal,charges: charges})

                                                }
                                            } else {
                                                bal = 0
                                            }

                                        }}

                                    />


                                </View>
                            ) : null}


                            <TouchableOpacity style={{paddingVertical: 10,backgroundColor: '#020cab',marginTop: 30,borderRadius: 50,marginHorizontal: 30}} onPress={this.onPressB}>
                                <Text style={{color: '#FFF',textAlign: 'center',fontSize: 16,fontFamily: 'Poppins-Bold'}}>Proccess</Text>
                            </TouchableOpacity>
                        </View>
                    ) : null}
                    <View style={{margin: 20}}></View>
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
    }
});


