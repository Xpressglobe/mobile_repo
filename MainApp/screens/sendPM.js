import React,{Component} from 'react';
import {View,Text,ScrollView,StyleSheet,TouchableOpacity,Image,TextInput,StatusBar,Picker,Alert} from 'react-native';
import Icon from '../common/icons';
import Theme from '../styles/Theme';
import Spinner from 'react-native-loading-spinner-overlay';
import Constant from "../components/Constant";
import AsyncStorage from '@react-native-community/async-storage';

import {TextInputMask} from 'react-native-masked-text'
import {SCLAlert,SCLAlertButton} from 'react-native-scl-alert'



export default class Send extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currencyFrom: this.props.navigation.getParam('cur_from','0'),
            cus_name: this.props.navigation.getParam('cus_name','Name'),
            cus_phone: this.props.navigation.getParam('cus_phone','phone'),
            customer_id: this.props.navigation.getParam('customer_id','0'),
            amount: this.props.navigation.getParam('amount','0'),
            amount_real: this.props.navigation.getParam('amount_real','0'),
            r_amount_real: this.props.navigation.getParam('r_amount_real','0'),
            percentage: this.props.navigation.getParam('percentage','0'),
            country_id_to: this.props.navigation.getParam('country_id_to','0'),
            currency_id: this.props.navigation.getParam('currency_id','0'),
            rate_setting: this.props.navigation.getParam('rate_setting','0'),
            dollar_rate: this.props.navigation.getParam('dollar_rate','0'),
            percent_setting_id: this.props.navigation.getParam('percent_setting_id','0'),
            rate_setting_id: this.props.navigation.getParam('rate_setting_id','0'),
            cur_to: this.props.navigation.getParam('cur_to','0'),
             a_date: this.props.navigation.getParam('date',''),
            rate_type: this.props.navigation.getParam('cal_type','0'),
            setting_type: this.props.navigation.getParam('setting_type','0'),

            trans_type: this.props.navigation.getParam('trans_type','0'),
            rate: this.props.navigation.getParam('rate','0'),
            // cur_to 
            pin: '',
            ModeOfPayment: [],
            mop: "",
            ben_id: "",
            dial_code : "",
            personal_info_id: "",
            spinner: true,
            CountryList: [],
            r_name: "", r_phone:'',
            dataSource: [],
            benList: [],
            providerList:  [],
            r_name : "",
            r_phone : "",
            provider : "",
            account_name : "",
            account_no : "",
            mobile_money_name : "",
            mobile_money_no : "",
            ben_name : "",
            ben_iban : "",
            ben_address : "",
            ben_bank_address : "",
            ben_bank_swift : "",
            ben_sort_code : "",
            inter_bank: "",
            inter_bank_addr: "",
            inter_bank_swift: "",
            pop : "",
        }

    }
    async componentDidMount() {

        this.setState({spinner: true});
        this.setState({
            personal_info_id: await AsyncStorage.getItem('@personal_info_id'),
            getCurrency: await AsyncStorage.getItem('@getCurrency'),
            getFrom: await AsyncStorage.getItem('@getFrom'),
            token: await AsyncStorage.getItem("@token"),


        });

        console.log( this.props.navigation.getParam('date',''),)

        const headers = {
            "Authorization": "Bearer "+ this.state.token,
            "Content-Type": "application/json",
            "Accept": "application/json",
        };


       

        try {
             const BalApiCall = await fetch(Constant.URL + Constant.getCusBal + "/" + this.state.customer_id + "/wallet-balance" + "/" + this.state.getCurrency,
            {
                method: "GET",
                headers,
            });
            const dataSource = await BalApiCall.json();
            // console.log(dataSource.data)
            this.setState({bal: dataSource.data.balance,r_bal: dataSource.data.reverse_balance,spinner: false});
           
        } catch (err) {
            console.log("Error fetching data-----------",err);
        }

        try {

            const ModeofPaymentApiCall = await fetch(Constant.URL + "settings/modes-of-payment?country_id=" + this.state.country_id_to + "&currency=" + this.state.cur_to + "&transaction_type=send",
            {
                method: "GET",
                headers,
            });
            const getMOP = await ModeofPaymentApiCall.json();
            this.setState({ModeOfPayment: getMOP.data,spinner: false});
        } catch (err) {
            console.log("Error fetching data-----------",err);
        }

        try {

            const BenApiCall = await fetch(Constant.URL + "beneficiaries?customer_id=" + this.state.customer_id,
            {
                method: "GET",
                headers,
            });
            const getBen = await BenApiCall.json();
            // console.log("getCountry",getBen.data)
            this.setState({benList: getBen.data,spinner: false});
        } catch (err) {
            console.log("Error fetching data-----------",err);
        }

        try {

            const CountryApiCall = await fetch(Constant.URL + Constant.getCOUNTRY,
            {
                method: "GET",
                headers,
            });
            const getCountry = await CountryApiCall.json();
            
            this.setState({CountryList: getCountry.data.filter(({country_id}) => country_id == this.state.country_id_to),spinner: false});
            this.setState({dial_code: this.state.CountryList[0].dial_code})
            console.log("getCountry",this.state.CountryList[0].dial_code)
        } catch (err) {
            console.log("Error fetching data-----------",err);
        }

       
    }

    getProviders(provider){

     const providerList =   this.state.ModeOfPayment.filter(({payment_medium}) => payment_medium == provider);
  
     if(providerList.length > 0){
       // console.log(providerList[0].id)
        this.setState({mop_id: providerList[0].id})
        if(providerList[0].providers.length > 0){
   
     this.setState({providerList: providerList[0].providers})
     }
    }
    }

    handleClose = () => {
        this.setState({show: false})
    }


    onPress = async () => {
        console.log(this.state.a_date)
      if (this.state.pin.length != 4) {
            Alert.alert("Pin must be 4 Characters.");
            return false
        }

        if (this.state.currencyFrom == 0) {
        console.log(24433)
            Alert.alert("No Currency From Selected.");
            return false
        }
         if(this.state.mop == "cash"){
            console.log(23333)
            if(this.state.r_name == ""){
                Alert.alert("Receiver Name is empty!");
                return false
            }else if(this.state.r_phone == ""){
                Alert.alert("Receiver Phone is empty!");
                return false
            }

        }
         if(this.state.mop == "bank"){
            console.log(233333)
            if(this.state.provider == ""){
                Alert.alert("Provider is empty!");
                return false
            }else if(this.state.account_name == ""){
                Alert.alert("Account Name is empty!");
                return false
            }else if(this.state.account_no == ""){
                Alert.alert("Account Number is empty!");
                return false
            }

        }
         if(this.state.mop == "mobile_money"){
            console.log(33233)
            if(this.state.provider == ""){
                Alert.alert("Provider is empty!");
                return false
            }else if(this.state.mobile_money_name == ""){
                Alert.alert("Mobile Money Name is empty!");
                return false
            }else if(this.state.mobile_money_no == ""){
                Alert.alert("Mobile Money Number is empty!");
                return false
            }

        }
         if(this.state.mop == "tt"){
            console.log(24433)
            if(this.state.provider == ""){
                Alert.alert("Provider is empty!");
                return false
            }else if(this.state.ben_name == ""){
                Alert.alert("Beneficiary Name is empty!");
                return false
            }else if(this.state.ben_iban == ""){
                Alert.alert("Beneficiary IBAN Number is empty!");
                return false
            }else if(this.state.ben_address == ""){
                Alert.alert("Beneficiary Address is empty!");
                return false
            }else if(this.state.ben_bank_address == ""){
                Alert.alert("Beneficiary Bank Address is empty!");
                return false
            }else if(this.state.ben_sort_code == ""){
                Alert.alert("Beneficiary Sort Code is empty!");
                return false
            }else if(this.state.pop == ""){
                Alert.alert("Purpose of Payment is empty!");
                return false
            }

        }

        
          console.log(233)
            this.setState({spinner: true});

            const headers = {
                "Authorization": "Bearer "+ this.state.token,
                "Content-Type": "application/json",
                "Accept": "application/json",
            };

            var ben_details = {};

            if(this.state.mop == "cash"){
                ben_details = [{
                    ben_name: this.state.r_name,
                    ben_phone: this.state.dial_code + this.state.r_phone
                }];
            }

            var formdata = {
                customer_id: this.state.customer_id,
                    agent_from: this.state.personal_info_id,
                    country_id: this.state.getFrom,
                    country_id_to: this.state.country_id_to,
                    mode_of_payment_id: this.state.mop_id,
                    percent_setting_id: this.state.percent_setting_id,
                    rate_setting_id: this.state.rate_setting_id,
                    cur_from: this.state.currencyFrom,
                    cur_to:  this.state.cur_to,
                    amount: (this.state.amount_real),
                    r_amount: this.state.r_amount_real,
                    charges:  this.state.percentage/100 * (this.state.amount_real),
                    percentage: this.state.percentage,
                    beneficiary: ben_details,
                    a_date: this.state.a_date,
                    rate_type: this.state.rate_type,
                    pin: this.state.pin,

                    rate: this.state.rate,
                    second_rate: 0,
                    setting_type: this.state.setting_type,
                    transaction_type: this.state.trans_type,
            }

            console.log(formdata);

            await fetch(Constant.URL + "transactions/send",{
                method: 'POST',
                body: JSON.stringify({
                    customer_id: this.state.customer_id,
                    agent_from: this.state.personal_info_id,
                    country_id: this.state.getFrom,
                    country_id_to: this.state.country_id_to,
                    mode_of_payment_id: this.state.mop_id,
                    // percent_setting_id: this.state.percent_setting_id,
                    rate_setting_id: this.state.rate_setting_id,
                    cur_from: this.state.currencyFrom,
                    cur_to:  this.state.cur_to,
                    amount: (this.state.amount_real),
                    r_amount: this.state.r_amount_real,
                    charges:  this.state.percentage/100 * (this.state.amount_real),
                    // percentage: this.state.percentage,
                    beneficiary: ben_details,
                    a_date: this.state.a_date,
                    rate_type: this.state.rate_type,
                    pin: this.state.pin,

                    rate: this.state.rate,
                    second_rate: 0,
                    setting_type: this.state.setting_type,
                    transaction_type: this.state.trans_type,


                    
                
                }),
                headers,
            })
                .then((response) => response.json())
                .then((result) => {
console.log("result:", result);
                    this.setState({
                        spinner: false,
                        dataSource: result,
                    });

                    
                    if(result.errors){
                       
                        if(result.errors.pin.length >0){
                          
                            this.setState({spinner: false,Sshow: true ,Amessage:result.errors.pin[0] });
                        }
                    }else{
                        if(result.message == "Credit transaction was successful"){
                            this.setState({spinner: false,show: true ,Smessage:"Credit transaction was successful" });
                        }else{
                            this.setState({spinner: false,Sshow: true ,Amessage: result.message + "\nUnexpected Error!" });
                        }
    
                       
                    }

                    if (this.state.dataSource.errors == 200) {
                        this.setState({spinner: false});

                    } else {
                        this.setState({spinner: false});
                        Alert.alert(this.state.dataSource.data.message);
                    }


                }).catch(function (error) {
                    this.setState({spinner: false});
                    console.log("-------- error ------- " + error);
                    alert("result:" + error)
                });
            // Get Rate





        
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
                    <Text style={styles.headTxt}>Send {this.state.cus_name}</Text>
                </View>
                <ScrollView>
                    <View style={{flexDirection: 'row',borderBottomWidth: 1,borderColor: 'lightgray',alignItems: 'center'}}>
                        <View style={styles.imgContainer}>
                            <Image style={styles.userimg} source={require('../assets/img/boy.png')} />
                        </View>
                        <View style={styles.userdetails}>
                            <Text style={{fontSize: 18,color: '#000',fontFamily: 'Poppins-Light'}}>{this.state.cus_name}</Text>
                            <Text style={{fontSize: 12,color: '#000',fontFamily: 'Poppins-Thin'}}>{this.state.cus_phone}</Text>
                        </View>

                    </View>
                    {/* onPress={() => this.props.navigation.navigate("Receive")} */}
                    <TouchableOpacity style={{flexDirection: 'row',alignItems: 'center',paddingLeft: 20,paddingTop: 10}} >
                        <View>
                            <Text style={{fontFamily: 'Poppins-Regular'}}>Wallet Balance :</Text>
                            <Text style={{fontSize: 20,color: '#000',fontFamily: 'Poppins-ExtraLight'}}> {this.state.getCurrency} : {Constant.numberFormate(this.state.bal) }</Text>
                        </View>
                        
                    </TouchableOpacity>

                    <TouchableOpacity style={{flexDirection: 'row',alignItems: 'center',paddingLeft: 20,paddingTop: 10}} >
                         <View>
                            <Text style={{fontFamily: 'Poppins-Regular'}}>Amount to Send :</Text>
                            <Text style={{fontSize: 20,color: '#000',fontFamily: 'Poppins-ExtraLight'}}> {this.state.getCurrency} : {Constant.numberFormate((this.state.amount_real))}</Text>
                        </View>

                        <View style={{paddingLeft: 40,paddingTop: 0}} >
                            <Text style={{fontFamily: 'Poppins-Regular'}}>Charges :</Text>
                            <Text style={{fontSize: 20,color: '#000',fontFamily: 'Poppins-ExtraLight'}}> {this.state.getCurrency} : {this.state.percentage/100 * Constant.rawNumber(this.state.amount)}  </Text>
                        </View>
                        
                    </TouchableOpacity>

                    <TouchableOpacity style={{flexDirection: 'row',alignItems: 'center',paddingLeft: 20,paddingTop: 10}} >
                         <View>
                            <Text style={{fontFamily: 'Poppins-Regular'}}>Amount to Send in  {this.state.cur_to} :</Text>
                            <Text style={{fontSize: 20,color: '#000',fontFamily: 'Poppins-ExtraLight'}}> {this.state.cur_to} : {Constant.numberFormate((this.state.r_amount_real))}</Text>
                        </View>

                      
                        
                    </TouchableOpacity>

                  
                    <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,marginTop: 30,paddingHorizontal: 15}}>
                            <Text style={{flex: 0.1,paddingLeft: 1}} ></Text>
                            <Picker style={{flex: 0.9,paddingLeft: 150}}
                                selectedValue={this.state.mop}
                                onValueChange={(itemValue,itemPosition) => {
                                    console.log(itemValue);
                                    this.setState({mop: itemValue,toIndex: itemPosition})
                                    this.getProviders(itemValue)

                                }}   >
                                <Picker.Item label="Mode of Payment" value="0" />
                                {
                                    this.state.ModeOfPayment.map((v) => {
                                    //   if(v.country_id != this.state.getFrom ){
                                        return <Picker.Item label={v.payment_medium} value={v.payment_medium}  />
                                    //   }
                                        
                                     
                                    })
                                }
                            </Picker>
                        </View>
                        {this.state.mop != "" ? (
                        <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,marginTop: 10,paddingHorizontal: 15}}>
                            <Text style={{flex: 0.1,paddingLeft: 1}} ></Text>
                            <Picker style={{flex: 0.9,paddingLeft: 150}}
                                selectedValue={this.state.ben_id}
                                onValueChange={(itemValue,itemPosition) => {
                                    console.log(itemValue);
                                    this.setState({ben_id: itemValue,toIndex: itemPosition})
                                    // this.getCurencies(itemValue)

                                }}   >
                                <Picker.Item label="Select Existing Beneficiary" value="0" />
                                {
                                    this.state.benList.map((v) => {
                                     return <Picker.Item label={v.ben_name} value={v.id}  />
                                        
                                     
                                    })
                                }
                            </Picker>
                        </View>
                        ) : null}

{this.state.mop == "cash" ? (
<View>
<View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, marginTop: 2, paddingHorizontal: 15 }}>
                            <TextInput
                                style={{ flex: 0.9, paddingLeft: 20 }}
                                placeholder="Receiver's Name"
                                keyboardType="name-phone-pad"
                                onChangeText={(r_name)=>this.setState({r_name})}
                                value={this.state.r_name}
                                
                            />
                          
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15,marginTop:2, paddingHorizontal: 1 }}>
                    
                
<Text style={{  paddingLeft: 20, fontWeight: '800',  }}  >{this.state.dial_code}</Text>
<TextInput
style={{ flex: 0.9, paddingLeft: 20 }}
placeholder="Receiver's Number"
keyboardType="phone-pad"
maxLength={16}
onChangeText={(r_phone)=>this.setState({r_phone})}
value={this.state.r_phone}
/>

</View>

</View> 


) : null} 
{this.state.providerList.length > 0 ?  (
<View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,marginTop: 10,paddingHorizontal: 15}}>
                            <Text style={{flex: 0.1,paddingLeft: 1}} ></Text>
                            <Picker style={{flex: 0.9,paddingLeft: 150}}
                                selectedValue={this.state.provider}
                                onValueChange={(itemValue,itemPosition) => {
                                    console.log(itemValue);
                                    this.setState({provider: itemValue,toIndex: itemPosition})
                                    // this.getCurencies(itemValue)

                                }}   >
                                <Picker.Item label="Select Provider" value="0" />
                                {
                                    this.state.providerList.map((v) => {
                                     return <Picker.Item label={v} value={v}  />
                                        
                                     
                                    })
                                }
                            </Picker>
                        </View>

                        ) : null} 

{this.state.mop == "bank" ? (
<View>



<View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, marginTop: 2, paddingHorizontal: 15 }}>
                            <TextInput
                                style={{ flex: 0.9, paddingLeft: 20 }}
                                placeholder="Account Name"
                                keyboardType="name-phone-pad"
                                onChangeText={(account_name)=>this.setState({account_name})}
                                value={this.state.account_name}
                                
                            />
                          
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15,marginTop:2, paddingHorizontal: 15 }}>
                    
       
<TextInput
style={{ flex: 0.9, paddingLeft: 20 }}
placeholder="Account Number"
keyboardType="phone-pad"
maxLength={16}
onChangeText={(account_no)=>this.setState({account_no})}
value={this.state.account_no}
/>

</View>

</View> 


) : null} 

{this.state.mop == "mobile_money" ? (
<View>



<View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, marginTop: 2, paddingHorizontal: 15 }}>
                            <TextInput
                                style={{ flex: 0.9, paddingLeft: 20 }}
                                placeholder="Mobile Money Name"
                                keyboardType="name-phone-pad"
                                onChangeText={(mobile_money_name)=>this.setState({mobile_money_name})}
                                value={this.state.mobile_money_name}
                                
                            />
                          
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15,marginTop:2, paddingHorizontal: 15 }}>
                    
                    
<Text style={{  paddingLeft: 20, fontWeight: '800',  }}  >{this.state.dial_code}</Text>
<TextInput
style={{ flex: 0.9, paddingLeft: 20 }}
placeholder="Mobile Money Number"
keyboardType="phone-pad"
maxLength={16}
onChangeText={(mobile_money_no)=>this.setState({mobile_money_no})}
value={this.state.mobile_money_no}
/>

</View>

</View> 


) : null} 

{this.state.mop == "tt" ? (
<View>



<View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, marginTop: 2, paddingHorizontal: 15 }}>
                            <TextInput
                                style={{ flex: 0.9, paddingLeft: 20 }}
                                placeholder="Beneficiary Name"
                                keyboardType="name-phone-pad"
                                onChangeText={(ben_name)=>this.setState({ben_name})}
                                value={this.state.ben_name}
                                
                            />
                          
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15,marginTop:2, paddingHorizontal: 15 }}>
                    
       
<TextInput
style={{ flex: 0.9, paddingLeft: 20 }}
placeholder="Beneficiary IBAN/account number"
keyboardType="phone-pad"
maxLength={16}
onChangeText={(ben_iban)=>this.setState({ben_iban})}
value={this.state.ben_iban}
/>

</View>

<View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15,marginTop:2, paddingHorizontal: 15 }}>
                    
       
                    <TextInput
                    style={{ flex: 0.9, paddingLeft: 20 }}
                    placeholder="Beneficiary address"
                    keyboardType="phone-pad"
                    maxLength={16}
                    onChangeText={(ben_address)=>this.setState({ben_address})}
                    value={this.state.ben_address}
                    />
                    
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15,marginTop:2, paddingHorizontal: 15 }}>
                    
       
                    <TextInput
                    style={{ flex: 0.9, paddingLeft: 20 }}
                    placeholder="Beneficiary Bank address"
                    keyboardType="phone-pad"
                    maxLength={16}
                    onChangeText={(ben_bank_address)=>this.setState({ben_bank_address})}
                    value={this.state.ben_bank_address}
                    />
                    
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15,marginTop:2, paddingHorizontal: 15 }}>
                    
       
                    <TextInput
                    style={{ flex: 0.9, paddingLeft: 20 }}
                    placeholder="Beneficiary bank SWIFT code"
                    keyboardType="phone-pad"
                    maxLength={16}
                    onChangeText={(ben_bank_swift)=>this.setState({ben_bank_swift})}
                    value={this.state.ben_bank_swift}
                    />
                    
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15,marginTop:2, paddingHorizontal: 15 }}>
                    
       
                    <TextInput
                    style={{ flex: 0.9, paddingLeft: 20 }}
                    placeholder="Beneficiary bank routing number/sort code"
                    keyboardType="phone-pad"
                    maxLength={16}
                    onChangeText={(ben_sort_code)=>this.setState({ben_sort_code})}
                    value={this.state.ben_sort_code}
                    />
                    
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15,marginTop:2, paddingHorizontal: 15 }}>
                    
       
                    <TextInput
                    style={{ flex: 0.9, paddingLeft: 20 }}
                    placeholder="Purpose of Payment"
                    keyboardType="phone-pad"
                    maxLength={16}
                    onChangeText={(pop)=>this.setState({pop})}
                    value={this.state.pop}
                    />
                    
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15,marginTop:2, paddingHorizontal: 15 }}>
                    
       
                    <TextInput
                    style={{ flex: 0.9, paddingLeft: 20 }}
                    placeholder="Intermediate Bank (if any)"
                    keyboardType="phone-pad"
                    maxLength={16}
                    onChangeText={(inter_bank)=>this.setState({inter_bank})}
                    value={this.state.inter_bank}
                    />
                    
                    </View>


                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15,marginTop:2, paddingHorizontal: 15 }}>
                    
       
                    <TextInput
                    style={{ flex: 0.9, paddingLeft: 20 }}
                    placeholder="Intermediate bank address (If any)"
                    keyboardType="phone-pad"
                    maxLength={16}
                    onChangeText={(inter_bank_addr)=>this.setState({inter_bank_addr})}
                    value={this.state.inter_bank_addr}
                    />
                    
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15,marginTop:2, paddingHorizontal: 15 }}>
                    
       
                    <TextInput
                    style={{ flex: 0.9, paddingLeft: 20 }}
                    placeholder="Intermediate bank BIC/routing number/SWIFT code/account number (If any)"
                    keyboardType="phone-pad"
                    maxLength={16}
                    onChangeText={(inter_bank_swift)=>this.setState({inter_bank_swift})}
                    value={this.state.inter_bank_swift}
                    />
                    
                    </View>

                  
</View> 


) : null} 

{this.state.mop != "" ? (
<View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15,marginTop:2, paddingHorizontal: 1 }}>
                         
                           
                       
                         <TextInput
                         style={{ flex: 0.9, paddingLeft: 20 }}
                         placeholder="Pin"
                        
                         secureTextEntry={true}
                         maxLength={4}
                         onChangeText={(pin)=>this.setState({pin})}
                         value={this.state.pin}
                         />



                         </View>
) : null} 
{this.state.pin != "" ? (
                    <TouchableOpacity style={{paddingVertical: 15,backgroundColor: '#020cab',marginTop: 30,borderRadius: 50,marginHorizontal: 10,}} onPress={this.onPress}>
                        <Text style={{color: '#FFF',textAlign: 'center',fontSize: 16,fontFamily: 'Poppins-Bold',}}>Proccess</Text>
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

