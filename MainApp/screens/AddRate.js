import React,{Component} from 'react';
import {View,Text,ScrollView,StyleSheet,TouchableOpacity,Image,TextInput,StatusBar,Picker,Alert} from 'react-native';
import Icon from '../common/icons';
import Theme from '../styles/Theme';
import Spinner from 'react-native-loading-spinner-overlay';
import Constant from "../components/Constant";
import AsyncStorage from '@react-native-community/async-storage';

import {TextInputMask} from 'react-native-masked-text'
import {SCLAlert,SCLAlertButton} from 'react-native-scl-alert'
import { ScreenStackHeaderRightView } from 'react-native-screens';



export default class AddRate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
            today_date: "",
            country_id: 0,
            currency_id: 0,
            CountryList: [],
            CurrencyList: [],
            MarkUpSettingList: [],
            market_conversion: 0,
            market_base: 0,
            market_settlement: 0,
            currentLabel: 'Select your currency',
            personal_info_id: "",
            spinner: true,
            Smessage:"",Amessage:"",



        }

    }
    async componentDidMount() {

     

        this.setState({spinner: true});
        this.setState({
            token: await AsyncStorage.getItem("@token"),


        });

        const headers = {
            "Authorization": "Bearer "+ this.state.token,
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

       


        try {

            const CountryApiCall = await fetch(Constant.URL + Constant.getCOUNTRY,
            {
                method: "GET",
                headers,
            });
            const getCountry = await CountryApiCall.json();
            // console.log("getCountry",getCountry.data)
            this.setState({CountryList: getCountry.data,spinner: false});
        } catch (err) {
            console.log("Error fetching data-----------",err);
        }

    }

    

    async getCurencies(id){
        try {

            this.setState({spinner: true});
            this.setState({
                token: await AsyncStorage.getItem("@token"),
            });
    
            const headers = {
                "Authorization": "Bearer "+ this.state.token,
                "Content-Type": "application/json",
                "Accept": "application/json",
            };

            const CurrencyApiCall = await fetch(Constant.URL + Constant.getCOUNTRY + "/" + id + "/currencies",
            {
                method: "GET",
                headers,
            });
            const getCurrency = await CurrencyApiCall.json();
            console.log("getCurrency",getCurrency.data)
            this.setState({CurrencyList: getCurrency.data,spinner: false});
        } catch (err) {
            console.log("Error fetching data-----------",err);
        }

    }

   

     getCurrentDate=()=>{

        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();

        return year + '-' + month + '-' + date;

    }

    async getMarkupsettings(country_id, currency){
        try {

            this.setState({spinner: true});
            this.setState({
                token: await AsyncStorage.getItem("@token"),
            });
    
            const headers = {
                "Authorization": "Bearer "+ this.state.token,
                "Content-Type": "application/json",
                "Accept": "application/json",
            };

            const MarkSettingApiCall = await fetch(Constant.URL + Constant.getMarkupSetting + "?country_id=" + country_id + "&currency=" + currency,
            {
                method: "GET",
                headers,
            });
            const getMarkUp = await MarkSettingApiCall.json();
            if(getMarkUp.data.length > 0){
                console.log("markup",getMarkUp)
                this.setState({MarkUpSettingList: getMarkUp.data[0],spinner: false});
            }else{
                this.setState({ MarkUpSettingList: [], spinner: false,Sshow: true ,Amessage:"Add markup settings for selected Country" });
            }
           
        } catch (err) {
            console.log("Error fetching data-----------",err);
        }

    }

    handleClose = () => {
        this.setState({show: false})
    }

   


    onPress = async () => {

        if (!this.state.getProfit) {
            Alert.alert("No Profit Rate Has Been Added , Please Contact Admin.");
            return false
        }

        if (this.state.get_charges == 0 && this.state.charges == 0) {
            Alert.alert("Select Percentage Chargers");
            return false
        }
        if (this.state.trans_type == "") {
            Alert.alert("Select Transaction Type.");
            return false
        }

        //Get rate
        var getCharges
        const getAmount = Constant.rawNumber(this.state.amount);
        if (this.state.ch_type == 0) {

            if (this.state.charges == 0) {
                getCharges = 0
            } else {
                getCharges = Constant.rawNumber(this.state.charges);
            }

        } else {
            getCharges = this.state.charges;
        }

        const getdue = getAmount - getCharges



        if (this.state.amount == 0) {

            Alert.alert("Please Enter Amount.");
        }
        // else if(this.state.charges <= 0){
        //     Alert.alert("Please Enter Charges.");
        // }
        else if (this.state.to <= 0 || this.state.to == "") {
            Alert.alert("Please Select Receiving Currency");
        }
        else if (getAmount <= getCharges) {
            Alert.alert("Your Charges Must Be Less  Than The Amount You Are Sending");
        } else if (this.state.r_bal < (getAmount)) {

            Alert.alert("Insufficient Credit ");
        }

        else {
            this.setState({spinner: true});

            fetch(Constant.URL + Constant.getRATE,{
                method: 'POST',
                body: JSON.stringify({
                    amount: this.state.amount,
                    rateType: this.state.rateType,
                    to: this.state.to,
                    from: this.state.getFrom,
                })
            })
                .then((response) => response.json())
                .then((result) => {

                    this.setState({
                        spinner: false,
                        dataSource: result,
                    });

                    if (this.state.dataSource.code == 200) {
                       

                        this.props.navigation.navigate(this.state.trans_type,{
                            cus_name: this.state.cus_name,
                            customer_id: this.state.customer_id,
                            amount: getAmount,
                            dollar: this.state.dataSource.data.dollar_rate_1,
                            local: this.state.dataSource.data.local_rate_1,
                            dollar2: this.state.dataSource.data.dollar_rate_2,
                            local2: this.state.dataSource.data.local_rate_2,
                            cov_rate: this.state.dataSource.data.from_c_rate,
                            charges: getCharges,
                            to: this.state.dataSource.data.to_currency,
                            to_id: this.state.to,
                            from: this.state.getCurrency,
                            fromAgent: this.state.personal_info_id,
                            cus_phone: this.state.cus_phone,
                            bank_id: this.state.bank_id,
                            ch_type: this.state.ch_type,
                            due_amount: getdue,
                            r_bal: this.state.r_bal,
                            getCountry_id: this.state.getFrom,
                            trans_type: this.state.trans_type,
                            //USD and RMD usage
                            from_dollar: this.state.dataSource.data.from_dollar,
                            to_osr: this.state.dataSource.data.to_osr,
                            to_dollar:this.state.dataSource.data.to_dollar,
                            from_osr_to:this.state.dataSource.data.from_osr_to,
                            to_osr_to:this.state.dataSource.data.to_osr_to,
                            to_orr:this.state.dataSource.data.to_orr,

                        })

                    } else {
                        this.setState({spinner: false});
                        Alert.alert(this.state.dataSource.data.message);
                    }


                }).catch(function (error) {
                    this.setState({spinner: false});
                    console.log("-------- error ------- " + error);
                    alert("result:" + error)
                });
            //Get Rate




        }
    }


    render() {

        return (
            <View style={{flex: 1,backgroundColor: Theme.bgcolor}}>
                <Spinner
                    visible={this.state.spinner}
                    overlayColor={'rgba(0, 0, 0, 0.50)'}
                />
                <StatusBar backgroundColor="#020cab" barStyle="light-content" />
                <View style={styles.headContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon family="MaterialIcons" name="arrow-back" size={25} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.headTxt}>Add Rate</Text>
                    <Text style={styles.smallTxt}> { this.getCurrentDate()}</Text>
                </View>
                <ScrollView>
               
                   

                  
                        <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,marginTop: 30,paddingHorizontal: 15}}>
                            <Text style={{flex: 0.1,paddingLeft: 1}} ></Text>
                            <Picker style={{flex: 0.9,paddingLeft: 150}}
                                selectedValue={this.state.country_id}
                                onValueChange={(itemValue,itemPosition) => {
                                    console.log(itemValue);
                                    this.setState({country_id: itemValue,toIndex: itemPosition})
                                    this.getCurencies(itemValue)

                                }}   >
                                {/* <Picker.Item label="COUNTRY" value="0" /> */}
                                {
                                    this.state.CountryList.map((v) => {
                                       
                                        return <Picker.Item label={v.country} value={v.country_id} />
                                     
                                    })
                                }
                            </Picker>
                        </View>

                        {this.state.country_id != 0 ? (
                        <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,marginTop: 5,paddingHorizontal: 15}}>
                            <Text style={{flex: 0.1,paddingLeft: 1}} ></Text>
                            <Picker style={{flex: 0.9,paddingLeft: 150}}
                                selectedValue={this.state.currency_id}
                                onValueChange={(itemValue,itemPosition) => {
                                    console.log(itemValue);
                                    this.getMarkupsettings(this.state.country_id, itemValue)

                                    this.setState({currency_id: itemValue,toIndex: itemPosition})
                                  

                                }}   >
                                {/* <Picker.Item label="CURRENCY" value="0" /> */}
                                {
                                    this.state.CurrencyList.map((v) => {
                                       
                                        return <Picker.Item label={v} value={v} />
                                        // return <Picker.Item label={v} value={v.country} />
                                    })
                                }
                            </Picker>
                        </View>
                         ) : null}


                        {this.state.MarkUpSettingList.length > 0 ? (
                            <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, marginTop: 2, paddingHorizontal: 15 }}>
                            <TextInput
                                style={{ flex: 0.9, paddingLeft: 20 }}
                                placeholder="Market Conversion"
                                keyboardType="phone-pad"
                                maxLength={16}
                                onChangeText={(market_conversion)=>this.setState({market_conversion})}
                                value={this.state.market_conversion}
                            />
                          
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15, marginTop: -10,  }}>
                          
                        <Text style={{ color: '#ff0000'  }}>Range :- </Text>
                        </View>

                        
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, marginTop: 15, paddingHorizontal: 15 }}>
                            <TextInput
                                style={{ flex: 0.9, paddingLeft: 20 }}
                                placeholder="Market Base"
                                keyboardType="phone-pad"
                                maxLength={16}
                                onChangeText={(market_base)=>this.setState({market_base})}
                                value={this.state.market_base}
                            />
                          
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15, marginTop: -10,  }}>
                          
                        <Text style={{ color: '#ff0000'  }}>Range :- </Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, marginTop: 15, paddingHorizontal: 15 }}>
                            <TextInput
                                style={{ flex: 0.9, paddingLeft: 20 }}
                                placeholder="Market Settlement"
                                keyboardType="phone-pad"
                                maxLength={16}
                                onChangeText={(market_settlement)=>this.setState({market_settlement})}
                                value={this.state.market_settlement}
                            />
                          
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15, marginTop: -10,  }}>
                          
                        <Text style={{ color: '#ff0000'  }}>Range :- </Text>
                        </View></View>
                     ) : null}

                  
                 

{/* onPress={this.onPress} */}

                    {this.state.market_settlement != 0 ? (
                    <TouchableOpacity style={{paddingVertical: 15,backgroundColor: '#020cab',marginTop: 30,borderRadius: 50,marginHorizontal: 10,}} >
                        <Text style={{color: '#FFF',textAlign: 'center',fontSize: 16,fontFamily: 'Poppins-Bold',}}>Save</Text>
                    </TouchableOpacity>
                     ) : null}
                    <View style={{margin: 20}}></View>

                    <SCLAlert
                        theme="danger"
                        show={this.state.Sshow}
                        title="Error Message"
                        subtitle={this.state.Amessage}
                        onRequestClose={() => {
                            this.setState({ show: false })
                            }}
                        >
                            
                 
          <SCLAlertButton theme="danger" onPress={() => {
                            this.setState({ Sshow: false })
                            }} >Close</SCLAlertButton>
        </SCLAlert>
                    <SCLAlert
                        theme="success"
                        show={this.state.show}
                        title="Successful Message"
                        subtitle={this.state.Smessage}
                        onRequestClose={() => {
                            this.setState({ show: false })
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
    smallTxt: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
        marginHorizontal: 120
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

