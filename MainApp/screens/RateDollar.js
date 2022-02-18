import React,{Component} from 'react';
import {View,Text,ScrollView,StyleSheet,Image,TouchableOpacity,TextInput,Picker,StatusBar,Alert} from 'react-native';
import Theme from '../styles/Theme';
import Icon from '../common/icons';
import RadioForm from 'react-native-simple-radio-button';
import Constant from "../components/Constant";


import {TextInputMask} from 'react-native-masked-text'

export default class RateDollar extends Component {
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
            //USD and RMD usage
            from_dollar: this.props.navigation.getParam('from_dollar','0'),
            to_osr: this.props.navigation.getParam('to_osr','0'),
            to_dollar: this.props.navigation.getParam('to_dollar','0'),
            from_osr_to: this.props.navigation.getParam('from_osr_to','0'),
            to_osr_to: this.props.navigation.getParam('to_osr_to','0'),
            to_orr: this.props.navigation.getParam('to_orr','0'),

            value: 0,up_val: 0,down_val: 0,
            rate_v: 0,rate_v2:0,rate_set:1,
            rate_type: 0,
            r_amount: 0,r_click: 0,
            bal: 0,sum_rate:0,
            mut_float: [],div_float: [],
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
        this.GetRateSet(1);
        this.GetRateSetTO(1)

    }


    async GetRateSet(rate_type) {

        this.setState({spinner: true});
        try {

            const BalApiCall = await fetch(Constant.URL + Constant.getRateSetUSD + "/" + this.state.getCountry_id + "/" + this.state.to_id + "/" + rate_type);
            const dataSource = await BalApiCall.json();
            console.log("dataSource",dataSource)
          
         if (dataSource.code == 401) {
            this.setState({spinner: false,rate_set:0});
            Alert.alert(dataSource.data.message);
            return
        }


            //CALCULATE RATE 
            console.log("USD Start")
        

            var i,floats = [],floats2 = [],from_dollar
            var rate_cal_type = dataSource.data.rate_cal_type

            if (rate_cal_type == 2) {
                var from_dr
                from_dr = dataSource.data.from_dr
                var split = from_dr.split(',');
                for (var i = 0; i < split.length; i++) {
                    floats.push(split[i])
                }
                this.setState({mut_float: floats})

                return false
            }
            //End Manual 

            if (rate_cal_type == 1) {
                if (dataSource.data.from_dollar_c == 1) {from_dollar = this.state.from_osr_to/this.state.to_orr} else {from_dollar = this.state.to_orr/this.state.from_osr_to}
            } else {
                from_dollar = this.state.from_dollar
            }
            console.log("from_dollar",from_dollar)
            var i,z,limit_v = Number(dataSource.data.limit_v)
            var current_rate = Number(from_dollar)
            var rate_inc = Number(dataSource.data.increase_by)
            var rate_dec = Number(dataSource.data.decrease_by)
            var sum_v = Number(dataSource.data.sum_up)
            var decima_v_from = Number(dataSource.data.decima_v_from)
            var calculated_rate = current_rate + (rate_inc - rate_dec)


            i = Constant.naiveRound(calculated_rate,decima_v_from)
            floats.push(i.toFixed(2)) //mutiplication
            floats2.push((1 / i)) //Division
            if (i < 0) {i = 0} else {i}
            while (i <= (calculated_rate + limit_v)) {
                //Set limit for loop
                if (floats.length === limit_v) {
                    break;
                }

                i = Constant.naiveRound((i + sum_v),decima_v_from)
                floats.push(i.toFixed(2));
                // floats2.push((1/i));
            }
            floats.toString()
            this.setState({mut_float: floats})
            console.log("floats",floats)
            //END GET RATE

        } catch (err) {
            console.log("Error fetching data-----------",err);
            this.setState({spinner: false});
        }

        

        //END GET RATE
    }

    //GET RATE DOLLAR TO 
    async GetRateSetTO(rate_type) {

        this.setState({spinner: true});
        try {

            const BalApiCall = await fetch(Constant.URL + Constant.getRateSetUSD + "/" + this.state.getCountry_id + "/" + this.state.to_id + "/" + rate_type);
            const dataSource = await BalApiCall.json();

            //CALCULATE RATE 
            console.log("Start")
            var i,z,floats2 = [],floats = [],to_dollar
            var rate_cal_type_to = dataSource.data.rate_cal_type_to

            
            if (rate_cal_type_to == 2) {
                var to_dr
                to_dr = dataSource.data.to_dr
                var split = to_dr.split(',');
                for (var i = 0; i < split.length; i++) {
                    floats.push(split[i])
                }
                this.setState({div_float: floats})

                return false
            }
            //End Manual 

            if (rate_cal_type_to == 1) {
                if (dataSource.data.to_dollar_c == 1) {to_dollar = this.state.from_osr_to/this.state.to_orr} else {to_dollar = this.state.to_orr/this.state.from_osr_to}
            } else {
                to_dollar = this.state.to_dollar
            }
            console.log("to dollar",to_dollar)
            var i,z,limit_v = Number(dataSource.data.limit_v_to)
            var current_rate = Number(to_dollar)
            var rate_inc = Number(dataSource.data.increase_by)
            var rate_dec = Number(dataSource.data.decrease_by)
            var sum_v = Number(dataSource.data.sum_v_to)
            var decima_v_to = Number(dataSource.data.decima_v_to)
            var calculated_rate = current_rate + (rate_inc - rate_dec)

            // console.log("limit_v",limit_v)
            // console.log("current_rate",current_rate)
            // console.log("rate_inc",rate_inc)
            // console.log("rate_dec",rate_dec)
            // console.log("sum_v",sum_v)
            // console.log("decima_v_to",decima_v_to)
            // console.log("calculated_rate",calculated_rate)

            i = Constant.naiveRound(calculated_rate,decima_v_to)
            floats.push(i.toFixed(2)) //mutiplication
            // floats2.push((1/i)) //Division
            if (i < 0) {i = 0} else {i}
            while (i <= (calculated_rate + limit_v)) {
                //Set limit for loop
                if (floats.length === limit_v) {
                    break;
                }

                i = Constant.naiveRound((i + sum_v),decima_v_to)
                floats.push(i.toFixed(2));
                //floats2.push((1/i));
            }
            floats.sort()
            this.setState({div_float: floats})
            console.log("floats",floats)
            //END GET RATE

        } catch (err) {
            console.log("Error fetching data-----------",err);
            this.setState({spinner: false});
        }

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
        if (this.state.r_bal < this.state.due_amount) {
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
            rate: this.state.sum_rate,
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
            due_amount: this.state.due_amount.toFixed(5),
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
                    <Text style={styles.logintxt}>USD Rate Calculation </Text>

                </View>
                <ScrollView>
                    <View style={styles.AmountCon}>

                        <Text style={styles.valTxt}>You Send</Text>
                        <View style={styles.rowcenter}>
                            {/* <Icon family="FontAwesome" name="rupee" size={40} color="#FFF" /> */}
                            <Text style={{color: "#FFF",fontSize: 40,paddingLeft: 5}}>
                                {Constant.numberFormate(this.state.due_amount.toFixed(2))}
                                <Icon family="Feather" name="plus" size={20} color="#FFF" />
                                <Text style={{textAlign: 'right',fontSize: 12,color: "#fff"}}> Charges : </Text>
                                <Text style={{textAlign: 'right',fontSize: 20,color: "#fff"}}>{this.state.charges.toFixed(2)} </Text>
                            </Text>
                        </View>
                        <Text style={styles.updateSty}>{this.state.from} </Text>
                        <Text style={{textAlign: 'left',fontSize: 12,color: "#fff"}}> Calculated Rate : </Text>
                        <Text style={{textAlign: 'left',fontSize: 20,color: "#fff"}}>{this.state.sum_rate.toFixed(2)} </Text>



                        <Text style={{textAlign: 'right',fontSize: 12,color: "#fff"}}>Recipient Gets</Text>
                        <Text style={{textAlign: 'right',fontSize: 30,color: "#fff"}}>

                            {Constant.numberFormate(this.state.bal.toFixed(2))}
                        </Text>
                        <Text style={{textAlign: 'right',fontSize: 20,color: "#fff"}}> {this.state.to}</Text>

                    </View>



                    <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,marginTop: 5,paddingHorizontal: 10}}>
                        <Picker style={{flex: 0.9,paddingLeft: 150}}
                            selectedValue={this.state.rate_v}
                            onValueChange={(itemValue,itemPosition) => {
                                this.setState({rate_v: itemValue,toIndex: itemPosition,r_amount: 0})

                            }}   >
                            <Picker.Item label="Sending Rate " value="0" />
                            {
                                this.state.mut_float.map((v) => {
                                    return <Picker.Item label={v} value={v} />
                                })
                            }

                        </Picker>
                    </View>

                    {this.state.rate_v != 0 ? (
                        <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,marginTop: 5,paddingHorizontal: 10}}>
                            <Text style={{flex: 0.1,paddingLeft: 1}} ></Text>
                            <Picker style={{flex: 0.9,paddingLeft: 150}}
                                selectedValue={this.state.rate_v2}
                                onValueChange={(itemValue,itemPosition) => {
                                    this.setState({rate_v2: itemValue,toIndex: itemPosition,rate_type: 0})

                                }}   >
                                <Picker.Item label="Receiving Rate " value="0" />
                                {
                                    this.state.div_float.map((v) => {
                                        return <Picker.Item label={v} value={v} />
                                    })
                                }

                            </Picker>
                        </View>
                    ) : null}

                    {this.state.rate_v2 != 0 ? (
                        <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,marginTop: 5,paddingHorizontal: 10}}>
                            <Text style={{flex: 0.1,paddingLeft: 1}} ></Text>
                            <Picker style={{flex: 0.9,paddingLeft: 150}}
                                selectedValue={this.state.rate_type}
                                onValueChange={(itemValue,itemPosition) => {
                                    this.setState({rate_type: itemValue,toIndex: itemPosition})
                                    if (itemValue == 1) {
                                        var getBal = this.state.due_amount * (this.state.rate_v2 / this.state.rate_v)
                                        console.log("getBal",getBal)
                                        this.setState({bal: getBal,sum_rate:this.state.rate_v2 / this.state.rate_v,r_amount:0})
                                    }
                                    if (itemValue == 2) {
                                        var getBal = this.state.due_amount / (this.state.rate_v / this.state.rate_v2)
                                        this.setState({bal: getBal,sum_rate:(this.state.rate_v / this.state.rate_v2),r_amount:0})
                                    }
                                }
                                
                                }>
                                <Picker.Item label="Select Rate Calculation Type" value="0" />
                                <Picker.Item label="Rate Multiplication" value="1" />
                                <Picker.Item label="Rate Division" value="2" />
                            </Picker>
                        </View>
                    ) : null}


{this.state.rate_type != 0 ? (
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
                                            r_amount: text,r_click:1
                                        });
                                        var bal = 0,percent,due,charges,dueBal,ammt,rect_amt
                                        if (this.state.rate_type == 1) {
                                            const getRaw = Constant.rawNumber(text);
                                            const getRawRate = this.state.sum_rate;

                                            

                                            percent = this.state.ch_type / 100
                                            if(!getRaw){
                                                ammt=0
                                                rect_amt=0
                                              
                                                
                                            }else{
                                                ammt = (getRaw) / (getRawRate)
                                                if(getRaw < 1){rect_amt=0}else{rect_amt=getRaw}
                                              
                                                
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
                                                bal =0;
                                            }
                                            this.setState({amount: (ammt + charges),bal: rect_amt,due_amount: bal,charges: charges})


                                        } else if (this.state.rate_type == 2) {

                                            if (this.state.rate_v == 0) {
                                                bal = 0
                                            } else {
                                                const getRaw = Constant.rawNumber(text);
                                                const getRawRate = this.state.sum_rate;

                                                percent = this.state.ch_type / 100

                                                if(!getRaw){
                                                    ammt=0
                                                    rect_amt=0
                                                   
                                                }else{
                                                    ammt = (getRaw) * (getRawRate)
                                                    if(getRaw < 1){rect_amt=0}else{rect_amt=getRaw}
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
                         ):null}



                        {this.state.rate_set == 1 ? (
                    <TouchableOpacity style={{paddingVertical: 10,backgroundColor: '#020cab',marginTop: 30,borderRadius: 50,marginHorizontal: 30}} onPress={this.onPressB}>
                        <Text style={{color: '#FFF',textAlign: 'center',fontSize: 16,fontFamily: 'Poppins-Bold'}}>Proccess</Text>
                    </TouchableOpacity>
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


