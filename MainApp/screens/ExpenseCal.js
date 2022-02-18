import React,{Component} from 'react';
import {View,Text,ScrollView,StyleSheet,TouchableOpacity,Image,TextInput,StatusBar,Alert,Picker} from 'react-native';
import Icon from '../common/icons';
import Theme from '../styles/Theme';
import Spinner from 'react-native-loading-spinner-overlay';
import Constant from "../components/Constant";
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-datepicker'
import {SCLAlert,SCLAlertButton} from 'react-native-scl-alert'
import {connect} from "react-redux";




class ExpensesCal extends Component {
    constructor(props) {

        super(props)
        this.state = {
            cus_name: this.props.navigation.getParam('cus_name','Name'),
            cus_phone: this.props.navigation.getParam('cus_phone','phone'),
            customer_id: this.props.navigation.getParam('customer_id','0'),
            c_type: this.props.navigation.getParam('c_type','0'),

            BankList: [],
            bank_id: "",
            amount: '',
            msg: "",
            personal_info_id: "",
            spinner: false,
            bal: "0.00",
            show: false,
            income_bal: 0,
            pin: "",
            Amessage: "",
            Smessage: "",


        }
    }
    async componentDidMount() {
        this.setState({spinner: true});

        this.setState({
            personal_info_id: await AsyncStorage.getItem('@personal_info_id'),
            getCurrency: await AsyncStorage.getItem('@getCurrency'),
            getFrom: await AsyncStorage.getItem('@getFrom'),
            wallet: await AsyncStorage.getItem('@wallet'),
        });
        try {

            const BalApiCall = await fetch(Constant.URL + Constant.getCusBal + "/" + this.state.customer_id);
            const dataSource = await BalApiCall.json();
            console.log("dataSource",dataSource)
            this.setState({bal: dataSource.bal,spinner: false});
        } catch (err) {
            console.log("Error fetching data-----------",err);
        }
        //gET Bank
        try {

            const BankApiCall = await fetch(Constant.URL + Constant.getBANKS + "/" + this.state.getFrom);
            const getBank = await BankApiCall.json();
            this.setState({BankList: getBank,spinner: false});
        } catch (err) {
            console.log("Error fetching data-----------",err);
        }

        //get profit rate
        this.GetProfitRate();

    }

    async bal() {

        this.setState({spinner: true});
        try {

            const BalApiCall = await fetch(Constant.URL + Constant.getAgBal + "/" + this.state.personal_info_id + "/" + this.state.getFrom + "/" + 2);
            const dataSource = await BalApiCall.json();
            Constant.SetAsyncValue('@wallet',dataSource.bal)
            this.props.getCustomerWallet(dataSource.c_bal)
            this.props.getAgentWallet(dataSource.bal)

        } catch (err) {
            console.log("Error fetching data-----------",err);
            this.setState({spinner: false});
        }
    }

    async GetProfitRate() {

        this.setState({spinner: true});
        try {

            const BalApiCall = await fetch(Constant.URL + Constant.getProfitRate + "/" + this.state.getFrom);
            const dataSource = await BalApiCall.json();

            this.setState({spinner: false,getProfit: dataSource.data.profit_rate});
        } catch (err) {
            console.log("Error fetching data-----------",err);
            this.setState({spinner: false});
        }
    }



    handleOpen = () => {
        const {amount} = this.state;
        if (this.state.amount > Constant.rawNumber(this.state.wallet)) {
            Alert.alert("Insufficient Funds.");
            return false
        }

        if (amount.length <= 0) {
            this.setState({spinner: false});
            Alert.alert("Enter Amount .");
            return false;
        }
        if (this.state.msg == "") {
            Alert.alert("Enter Transaction  Details");
            return false
        }
        this.setState({show: true})

    }

    handleClose = () => {
        this.setState({show: false})
    }


    onPressDebit = async () => {

        this.setState({spinner: true});
        //    var due_amount = this.state.amount * Constant.rawNumber(this.state.getProfit)

        // if (due_amount > wallet && this.state.c_type==1 ) {

        //     this.setState({ spinner: false,Ashow: true ,show: false,Amessage:"Insufficient Please try Again" });
        // }else {
        // post method
        fetch(Constant.URL + Constant.addEXPENSES,{
            method: 'POST',
            body: JSON.stringify({
                customer_id: this.state.customer_id,
                personal_info_id: this.state.personal_info_id,
                msg: this.state.msg,
                pin: this.state.pin,
                bank_id: this.state.bank_id,
                getCountry_id: this.state.getFrom,
                date: this.state.date,
                getProfit: Constant.rawNumber(this.state.getProfit),
                amount: this.state.amount
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
                    this.setState({spinner: false,Sshow: true,Smessage: this.state.dataSource.data.message});
                    this.setState({
                        amount: '',
                        pin: "",
                        show: false
                    });

                } else {
                    this.setState({spinner: false,Ashow: true,show: false,Amessage: this.state.dataSource.data.message});
                }

            }).catch(function (error) {
                this.setState({spinner: false});
                console.log("-------- error ------- " + error);
                alert("result:" + error)
            });

        //end post method
        //}
    }

    render() {
        return (
            <View style={{flex: 1,backgroundColor: Theme.bgcolor}} >
                <Spinner
                    visible={this.state.spinner}
                    overlayColor={'rgba(0, 0, 0, 0.25)'}
                />

                <StatusBar backgroundColor="#020cab" barStyle="light-content" />
                <View style={styles.headContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon family="MaterialIcons" name="arrow-back" size={25} color="#FFF" />
                    </TouchableOpacity>

                    <Text style={styles.headTxt}> Expenses Transaction </Text>

                </View>
                <ScrollView>



                    <TouchableOpacity style={{flexDirection: 'row',alignItems: 'center',paddingLeft: 20,paddingTop: 10}}  >
                        <Icon style={{padding: 5}} family="FontAwesome" name="compass" size={30} color="#020cab" />
                        <View>
                            <Text style={{fontFamily: 'Poppins-Regular'}}>Total Expenses  :</Text>
                            <Text style={{fontSize: 18,color: '#000',fontFamily: 'Poppins-ExtraLight'}}> {this.state.getCurrency} {this.state.amount} </Text>
                        </View>

                    </TouchableOpacity>

                    {this.state.c_type == 2 ? (
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

                    <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,paddingHorizontal: 15}}>
                        <Icon family="FontAwesome" name="money" size={25} />
                        <TextInput style={{paddingLeft: 10,fontSize: 16}}
                            keyboardType='number-pad'
                            placeholder="Enter Amount"
                            value={this.state.amount}
                            onChangeText={(amount) => {this.setState({amount})}}
                        />
                    </View>

                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15,marginTop:20, paddingHorizontal: 15 }}>
                    <Text >Profit Rate</Text>
                    
                        <TextInputMask style={{ paddingLeft: 10, fontSize: 16 }}
                            type={'money'}
                            placeholder="Enter Rate"
                            options={{
                                precision: 4,
                                separator: '.',
                                delimiter: ',',
                                unit: '',
                                suffixUnit: ''
                            }}
                            value={this.state.getProfit}
                            onChangeText={text => {
                                this.setState({
                                    getProfit: text,
                                    income_bal:this.state.amount*Constant.rawNumber(text)
                                })

                                
                                
                            }}
                            
                        />
                        
                    </View> */}

                    <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,marginTop: 2,paddingHorizontal: 15}}>
                        <DatePicker
                            style={{width: 200,borderColor: "#fff"}}
                            date={this.state.date}
                            mode="date"
                            placeholder="Select Date"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    borderWidth: 0

                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => {this.setState({date: date})}}
                        />
                    </View>

                    <View style={{flexDirection: 'row',alignItems: 'center',borderBottomWidth: 1,margin: 15,paddingHorizontal: 15}}>
                        <TextInput style={{flex: 1,paddingLeft: 10,fontSize: 16,fontFamily: 'Poppins-ExtraLightItalic'}}
                            keyboardType='email-address'
                            placeholder="Enter Transaction Details"
                            onChangeText={(msg) => this.setState({msg})}
                            value={this.state.msg}
                        />
                    </View>
                    <TouchableOpacity style={{paddingVertical: 10,backgroundColor: '#020cab',marginTop: 30,borderRadius: 50,marginHorizontal: 30}} onPress={this.handleOpen}  >
                        <Text style={{color: '#FFF',textAlign: 'center',fontSize: 16,fontFamily: 'Poppins-Bold',}}>Debit Expenses</Text>
                    </TouchableOpacity>


                    <View style={{margin: 20}}></View>

                    <SCLAlert
                        theme="info"
                        show={this.state.show}
                        title="Enter Your Pin"
                        onRequestClose
                        subtitle="Enter Pin To Complete Transaction"
                        onRequestClose={() => {
                            this.setState({show: false})
                        }}
                    >

                        <TextInput style={{paddingLeft: 10,fontSize: 16}}
                            keyboardType='number-pad'
                            placeholder="Enter Pin"
                            onChangeText={(pin) => this.setState({pin})}
                            value={this.state.pin}
                            secureTextEntry={true}
                            maxLength={4}
                        />


                        <SCLAlertButton theme="info" onPress={this.onPressDebit} >SEND</SCLAlertButton>

                    </SCLAlert>

                    <SCLAlert
                        theme="danger"
                        show={this.state.Ashow}
                        title="Error Message"
                        subtitle={this.state.Amessage}
                        onRequestClose={() => {
                            this.setState({Ashow: false})
                        }}
                    >

                        <SCLAlertButton theme="danger" onPress={() => {
                            this.setState({Ashow: false})
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
        shadowOffset: {width: -0.5,height: 0.5},
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


export default connect(mapStateProps,mapDispatchProps)(ExpensesCal)