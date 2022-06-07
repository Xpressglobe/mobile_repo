import React,{Component} from 'react';
import {View,Text,ScrollView,StyleSheet,TouchableOpacity,Image,TextInput,StatusBar,Picker,Alert} from 'react-native';
import Icon from '../common/icons';
import Theme from '../styles/Theme';
import Spinner from 'react-native-loading-spinner-overlay';
import Constant from "../components/Constant";
import AsyncStorage from '@react-native-community/async-storage';
import ReactDOM from "react-dom";
import {TextInputMask} from 'react-native-masked-text'
import {SCLAlert,SCLAlertButton} from 'react-native-scl-alert'



export default class Send extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currencyFrom: this.props.navigation.getParam('currencyFrom','0'),
            cus_name: this.props.navigation.getParam('cus_name','Name'),
            cus_phone: this.props.navigation.getParam('cus_phone','phone'),
            customer_id: this.props.navigation.getParam('customer_id','0'),
            cc_type: this.props.navigation.getParam('cc_type','direct'),
            rate_type: this.props.navigation.getParam('rate_type','normal'),
            date: this.props.navigation.getParam('date',''),
            wallet: "0.00",
            percentage_real: 0,
            amount: "0",
            percentage_setting: [],
            due_amount: 0,
            charges: "0",
            to: 0,
            rate: "",
            country_id: 0,
            dollar_rate_setting: '',
            CountryList: [],
            currentLabel: 'Select your currency',
            personal_info_id: "",
            spinner: true,
            bal: "0.00",
            r_bal: 0,
            cal_type: 0,
            range1: 0, range2: 0,
            BankList: [],
            dataSource: [],
            PercentList: [],
            bank_id: 0,ch_type: 2,value: 0,trans_type: "",
            recipient_amt: "",
            to_country_id: 0,
            CurrencyList: [],
            MarkUpSettingList: [],
            RateSettingList: [],
            Smessage:"",Amessage:"",
            rate_setting: 0,
            mutiply: [], division: [],
            mode_payment:"",
            dollar_rate: 0,
            percentage_id: '',
            percentage: 0,
            currency_id: '',
            range3: '',
            range4: '',
            r_a_mount:1,
            r_amount_real: '',
            amount_real: ''

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

       
        const headers = {
            "Authorization": "Bearer "+ this.state.token,
            "Content-Type": "application/json",
            "Accept": "application/json",
        };


       

        try {
               console.log("shsjh",this.state.customer_id)
            const BalApiCall = await fetch(Constant.URL + Constant.getCusBal + "/" + this.state.customer_id + "/wallet-balance" + "/" + this.state.getCurrency,
            {
                method: "GET",
                headers,
            });
            const dataSource = await BalApiCall.json();
            console.log(dataSource.data)
            this.setState({bal: dataSource.data.balance,r_bal: dataSource.data.reverse_balance,spinner: false});
           
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
            // console.log("getCountry",getCountry.data)
            this.setState({CountryList: getCountry.data.filter(({country_id}) => country_id != this.state.getFrom),spinner: false});
        } catch (err) {
            console.log("Error fetching data-----------",err);
        }


        try {

            const BeneficiaryApiCall = await fetch(Constant.URL + "beneficiaries?customer_id" + this.state.customer_id,
            {
                method: "GET",
                headers,
            });
            const getBen = await BeneficiaryApiCall.json();
           
            this.setState({BenList: getBen.data,spinner: false});
        } catch (err) {
            console.log("Error fetching data-----------",err);
        }


    
    }

    handleClose = () => {
        this.setState({show: false})
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
            this.getRatesettings(this.state.currencyFrom, getCurrency.data[0])
            this.setState({CurrencyList: getCurrency.data,spinner: false});
        } catch (err) {
            console.log("Error fetching data-----------",err);
        }

    }

    async getRatesettings(country_id, currency){
        console.log(this.state.rate_type);
        try {

            this.setState({spinner: true});
            this.setState({
                token: await AsyncStorage.getItem("@token"),
                getFrom: await AsyncStorage.getItem('@getFrom'),
            });
    
            const headers = {
                "Authorization": "Bearer "+ this.state.token,
                "Content-Type": "application/json",
                "Accept": "application/json",
            };

            const percentageApiCall = await fetch(Constant.URL + "settings/percentages" 
                + "?from_country=" + this.state.getFrom + "&to_country=" + this.state.to_country_id
                + "?currency_from=" + country_id + "&currency_to=" + currency + "&transaction_type=send",
            {
                method: "GET",
                headers,
            });
            const getMarkUp = await percentageApiCall.json();

            //rate list
            var rate_ = this.state.cc_type== "direct" ? 0 : 1;

            console.log(rate_);
           
            const RateListApiCall = await fetch(Constant.URL + "settings/rates" 
                + "?country_id_from=" + this.state.getFrom + "&country_id_to=" + this.state.to_country_id
                + "?currency_from=" + country_id + "&currency_to=" + currency  + "&rate_g_type=" + rate_  + "&setting_type=" + this.state.rate_type,
            {
                method: "GET",
                headers,
            });
            const getRateList = await RateListApiCall.json();

          

            // console.log("hsdjhsdjhsd", getMarkUp.data);
            if(getRateList.data.length > 0){

                this.getRange( getRateList.data[getRateList.data.length - 1].rate_set_id, 1);
                // console.log("hsdjhsdjhsd", getRateList.data[getRateList.data.length - 1].rate_set_id);
            }else{
                this.setState({ RateSettingList: [], spinner: false,Sshow: true ,Amessage:"No rate settings found! COntact Administrator" });
         
            }
            if(getMarkUp.data.length > 0){
                // console.log("yuhuhyduisd",getMarkUp.data[0].Percent_setting_id)
                this.setState({percentage_id: getMarkUp.data[0].Percent_setting_id, percentage: getMarkUp.data[0].percentage, percentage_real:  getMarkUp.data[0].percentage,  limit_type: getMarkUp.data[0].limit_type,spinner: false});
            }
           
        } catch (err) {
            console.log("Error fetching data-----------",err);
        }

    }

    async getDollar(){
          if(this.state.cc_type == "dollar"){

                const DollarRateApiCall = await fetch(Constant.URL + "settings/rates/" 
              + rate_set_id +  "/compute-dollar-rate?id="+ rate_set_id + "&rate=" + this.state.rate_setting + "&rate_type=" + r_t + "&base_conversion=" + this.state.dollar_rate,
            {
                method: "GET",
                headers,
            });

            console.log(Constant.URL + "settings/rates/" 
            + rate_set_id +  "/compute-dollar-rate?id="+ rate_set_id + "&rate=" + this.state.rate_setting + "&rate_type=" + r_t + "&base_conversion=10" )
            const getDRate = await DollarRateApiCall.json();

           
            if(getDRate){
                console.log(getDRate);
            this.setState({dollar_rate: getDRate.data.dollar_rate});
            }

            }
    }


    async getRange(rate_set_id, r_t){
        // console.log("usuiusd",rate_set_id);
        try {

            this.setState({spinner: true});
            this.setState({
                token: await AsyncStorage.getItem("@token"),
                getFrom: await AsyncStorage.getItem('@getFrom'),
            });
    
            const headers = {
                "Authorization": "Bearer "+ this.state.token,
                "Content-Type": "application/json",
                "Accept": "application/json",
            };
           
            const RangeSettingApiCall = await fetch(Constant.URL + "settings/rates/" 
              + rate_set_id +  "/retrieve-rates-and-ranges?rate_type=" + r_t,
            {
                method: "GET",
                headers,
            });
            const getBaseRate = await RangeSettingApiCall.json();

          


            console.log(getBaseRate.data);
            if(getBaseRate.data){
                if(this.state.cc_type == "dollar"){
                    this.setState({rate_set_id: rate_set_id, range1: getBaseRate.data.rate_range[0], range2: getBaseRate.data.rate_range[1],
                        range3: getBaseRate.data.base_conversion_range[0], range4: getBaseRate.data.base_conversion_range[1],spinner: false});
                  
                }else{
                    this.setState({rate_set_id: rate_set_id, range1: getBaseRate.data.rate_range[0], range2: getBaseRate.data.rate_range[1],
                      spinner: false});
                  
                }
               
            
            }else{
                this.setState({spinner: false,Sshow: true ,Amessage:"No rate settings found for currency pair" });
            }
           
        } catch (err) {
            console.log("Error fetching data-----------",err);
        }

    }

    async calSum(amt, value){
      var amount_real, r_amount_real = 0;  
      
      if(value == 1){
        r_amount_real = Constant.rawNumber(amt) / this.state.rate_setting
      
        amount_real = r_amount_real.toFixed(2) * this.state.rate_setting
      }else{
        r_amount_real = Constant.rawNumber(amt)
      
        amount_real = Constant.rawNumber(amt) * this.state.rate_setting

        
      }
      
      
     
     

      this.setState({r_amount_real: r_amount_real.toFixed(2),amount_real: amount_real });
    }


    onPress = async () => {

       
       
        if( this.state.rate_setting <  this.state.range1  ||  this.state.rate_setting >  this.state.range2){
            Alert.alert("Rate is outside the range");
            return false
        }
// console.log(this.state.rate_type);

        this.props.navigation.navigate('SendPaymentMode',
        {  
            date: this.state.date,
            setting_type: this.state.cc_type,
            trans_type: this.state.rate_type,
            customer_id: this.state.customer_id,
            country_id: this.state.getFrom,
            country_id_to: this.state.to_country_id,
            percent_setting_id: this.state.percentage_id,
            r_bal: this.state.r_bal,
            rate_setting_id: this.state.rate_set_id,
            cur_from: this.state.currencyFrom,
            cur_to: this.state.currency_id,
            amount: this.state.amount,
            amount_real: this.state.amount_real,
            r_amount_real: this.state.r_amount_real,
            percentage: this.state.percentage,
            charges: this.state.charges,
            cal_type: this.state.cal_type,
            cus_name: this.state.cus_name,
            cus_phone: this.state.cus_phone,
            dollar_rate : this.state.dollar_rate,
            rate: this.state.rate_setting,



        }
        );
        //    this.setState({spinner: true});


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
                        <Icon style={{padding: 5}} family="Entypo" name="wallet" size={30} color="#020cab" />
                        <View>
                            <Text style={{fontFamily: 'Poppins-Regular'}}>Wallet Balance :</Text>
                            {/* <NumberFormat value={value} displayType='text' thousandSeparator={true} 
                            prefix='$' renderText={formattedValue => <Text>{formattedValue}</Text>}
                            /> */}
                            <Text style={{fontSize: 20,color: '#000',fontFamily: 'Poppins-ExtraLight'}}> {this.state.getCurrency} : {Constant.numberFormate(this.state.bal )}</Text>
                        </View>
                    </TouchableOpacity>

                  
                    <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,marginTop: 30,paddingHorizontal: 15}}>
                            <Text style={{flex: 0.1,paddingLeft: 1}} ></Text>
                            <Picker style={{flex: 0.9,paddingLeft: 150}}
                                selectedValue={this.state.to_country_id}
                                onValueChange={(itemValue,itemPosition) => {
                                    console.log(itemValue);
                                    this.setState({to_country_id: itemValue,toIndex: itemPosition})
                                    this.getCurencies(itemValue)

                                }}   >
                                <Picker.Item label="COUNTRY" value="0" />
                                {
                                    this.state.CountryList.map((v) => {
                                    //   if(v.country_id != this.state.getFrom ){
                                        return <Picker.Item label={v.country} value={v.country_id}  />
                                    //   }
                                        
                                     
                                    })
                                }
                            </Picker>
                        </View>
                        {this.state.to_country_id != 0 ? (
                        <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,marginTop: 5,paddingHorizontal: 15}}>
                            <Text style={{flex: 0.1,paddingLeft: 1}} ></Text>
                            <Picker style={{flex: 0.9,paddingLeft: 150}}
                                selectedValue={this.state.currency_id}
                                onValueChange={(itemValue,itemPosition) => {
                                    // console.log(itemValue);
                                    this.getRatesettings(this.state.currencyFrom, itemValue)



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


{this.state.currency_id != "" && this.state.bal > 0 ? (
                        <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,marginTop: 2,paddingHorizontal: 15}}>
                            <Text style={{flex: 0.1,paddingLeft: 1}} ></Text>
                            <Picker style={{flex: 0.9,paddingLeft: 150}}
                                selectedValue={this.state.cal_type}
                                onValueChange={(itemValue,itemPosition) => {
                                    this.setState({cal_type: itemValue,toIndex: itemPosition})
                                    this.getRange(this.state.rate_set_id, itemValue)

                                }}   >
                                <Picker.Item label="CALCULATOR TYPE" value="" />
                                <Picker.Item label="Multiplication" value="1" />
                                <Picker.Item label="Division" value="2" />
                               
                            </Picker>
                        </View>
                    ) : null}

                    
{this.state.cal_type != "" ? (
    <View>
<View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, marginTop: 15, paddingHorizontal: 15 }}>
                            <TextInput
                                style={{ flex: 0.9, paddingLeft: 20 }}
                                placeholder="Rate Setting"
                                keyboardType="phone-pad"
                                maxLength={16}
                                onChangeText={(rate_setting)=>this.setState({rate_setting})}
                                value={this.state.rate_setting}
                            />
                          
                        </View>
                          
                        <View style={{marginLeft: 15, marginTop: -10,  }}>
                      
                            <View>
                        <Text>Range : { this.state.range1 } - { this.state.range2 } </Text>
                        {this.state.rate_setting <  this.state.range1  ||  this.state.rate_setting >  this.state.range2 ? (
                        <Text style={{ color: '#ff0000'  }}>Rate is outside the range</Text>
                        ) : null}
                        </View>
                      


                        </View>
                        {this.state.cc_type == "dollar" ? (
                            <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, marginTop: 15, paddingHorizontal: 15 }}>
                            <TextInput
                                style={{ flex: 0.9, paddingLeft: 20 }}
                                placeholder="0"
                                keyboardType="phone-pad"
                                maxLength={16}
                                onChangeText={(dollar_rate)=>this.setState({dollar_rate})}
                                value={this.state.dollar_rate}
                            />
                          
                        </View>
                          
                        <View style={{marginLeft: 15, marginTop: -10,  }}>
                      
                            <View>
                            <Text>Range : { this.state.range3 } - { this.state.range4 } </Text>
                        {this.state.dollar_rate <  this.state.range3  ||  this.state.dollar_rate >  this.state.range4 ? (
                        <Text style={{ color: '#ff0000'  }}>Rate is outside the range</Text>
                        ) : null}
                        </View>
                      

                        </View>
                        </View>
                              ) : null}

                        </View>
                          ) : null}

{this.state.to_country_id != 0 &&  this.state.percentage_real != 0 ? (
                <View style={{margin: 15,marginTop: 2,paddingHorizontal: 0}}>
                  <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 0,marginTop: 2,paddingHorizontal: 15}}>
                  <Text >Percentage setting</Text>
                  <TextInput
                                style={{ flex: 0.9, paddingLeft: 20 }}
                                placeholder="%"
                                keyboardType="name-phone-pad"
                                onChangeText={text => {
                                   if(this.state.limit_type == "below" ){
                                        console.log(text)
                                        // console.log("bbbb", this.state.percentage_real)
                                        if(text > this.state.percentage_real){
                                           
                                            this.setState({
                                                percentage: this.state.percentage_real
                                              })
                                        }else{
                                            this.setState({
                                                percentage: text
                                              })
                                        }
                                    } else if(this.state.limit_type == "above"){
                                        if(text < this.state.percentage_real){
                                            this.setState({
                                                percentage: this.state.percentage_real
                                              })
                                        }else{
                                            this.setState({
                                                percentage: text
                                              })
                                        }
                                    }else{
                                        this.setState({
                                            percentage: text
                                          })
                                    }
                                   
                                }}
                                value={this.state.percentage }
                                
                            />
                 
              </View>
              {/* {Constant.rawNumber(this.state.amount) > this.state.bal ? ( */}
              <Text style={{color: 'grey'}} > Range {this.state.percentage}% and {this.state.limit_type} </Text>
               {/* ) : null}  */}
              </View>
                      ) : null}


                          {this.state.rate_setting != ""  ? (
                            <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,marginTop: 15,paddingHorizontal: 15}}>
                                <Text style={{flex: 0.1,paddingLeft: 1}} ></Text>
                                <Picker style={{flex: 0.9,paddingLeft: 150}}
                                    selectedValue={this.state.r_a_mount}
                                    onValueChange={(itemValue,itemPosition) => {
                                       
                                        this.calSum(this.state.amount, itemValue)
                                        this.setState({r_a_mount: itemValue,toIndex: itemPosition})
                                       
    
                                    }}   >
                                  <Picker.Item label="Amount" value="1" />
                                    <Picker.Item label="Recipient Amount" value="2" />
                                   
                                </Picker>
                            </View>
                        ) : null}

                      
                     {this.state.rate_setting != "" ? (
                <View style={{margin: 15,marginTop: 15,paddingHorizontal: 0}}>
                  <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 0,marginTop: 2,paddingHorizontal: 15}}>
                  <Text >{this.state.r_a_mount == 1 ? "Amount" : 'Receipient Amount'}</Text>
                  <TextInputMask style={{paddingLeft: 10,fontSize: 16}}
                      type={'money'}
                      placeholder={this.state.r_a_mount == 1 ? "Amount" : 'Receipient Amount'}
                      options={{
                          precision: 2,
                          separator: '.',
                          delimiter: ',',
                          unit: '',
                          suffixUnit: ''
                      }}
                      value={this.state.amount}
                      onChangeText={text => {
                        this.calSum(text, this.state.r_a_mount)
                            this.setState({
                                amount: text
                              })
                       
                          
                      }}
                      ref={(ref) => this.rateV = ref}
                  />
                  {/* {this.state.bal */}
                 
              </View>
              {Constant.rawNumber(this.state.amount) > this.state.bal ? (
              <Text style={{color: 'red'}} > Amount is more than availabe balance</Text>
               ) : null} 
              </View>
                      ) : null}






{Constant.rawNumber(this.state.r_amount_real) != "" && Constant.rawNumber(this.state.amount) < this.state.bal ? (
<View>                      
<View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, marginTop: 15, paddingHorizontal: 15 }}>
<Text>Amount :  {this.state.currencyFrom}  {Constant.numberFormate(this.state.amount_real)} </Text>
</View>
<View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, marginTop: 1, paddingHorizontal: 15 }}>
<Text>Recipient Amount :  {this.state.currency_id} {Constant.numberFormate(this.state.r_amount_real)}    </Text>
</View>
{/* {new Intl.NumberFormat().format(this.state.amount)} */}

<View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, marginTop: 0, paddingHorizontal: 15 }}>
<Text>Charges : {this.state.currencyFrom} {(this.state.amount_real * (this.state.percentage/100))}   </Text>
</View>
</View>
) : null}




                        

                        {/* {this.state.rate_setting != "" ? ( */}
                        {/* // <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, marginTop: 15, paddingHorizontal: 15 }}>
                        //     <TextInput
                        //         style={{ flex: 0.9, paddingLeft: 20 }}
                        //         placeholder="RECIPIENT AMOUNT"
                        //         keyboardType="phone-pad"
                        //         maxLength={16}
                        //         onChangeText={(recipient_amt)=>this.setState({recipient_amt})}
                        //         value={this.state.amount}
                        //     />
                          
                        // </View> */}
{/* //                         <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, marginTop: 25, paddingHorizontal: 15 }}>
// <Text>Recipient Amount :  {this.state.currency_id}  { this.state.cc_type == "dollar" ? Constant.numberFormate(Constant.rawNumber(this.state.amount) * (this.state.dollar_rate)) 
//                                 : Constant.numberFormate(Constant.rawNumber(this.state.amount) * (this.state.rate_setting))}   </Text>
// </View>
//                          ) : null} */}



{/* {this.state.amount >= 1 ? (
                        <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,marginTop: 2,paddingHorizontal: 15}}>
                            <Text style={{flex: 0.1,paddingLeft: 1}} ></Text>
                            <Picker style={{flex: 0.9,paddingLeft: 150}}
                                selectedValue={this.state.mode_payment}
                                onValueChange={(itemValue,itemPosition) => {
                                    this.setState({mode_payment: itemValue,toIndex: itemPosition})
                                    // this.onChargersGet(itemValue)

                                }}   >
                                <Picker.Item label="MODE OF PAYMENT" value="" />
                              
                               
                            </Picker>
                        </View>
                    ) : null} */}
 

 {this.state.rate_setting != "" ? (
                    <TouchableOpacity style={{paddingVertical: 15,backgroundColor: '#020cab',marginTop: 30,borderRadius: 50,marginHorizontal: 10,}} onPress={this.onPress}>
                        <Text style={{color: '#FFF',textAlign: 'center',fontSize: 16,fontFamily: 'Poppins-Bold',}}>Continue</Text>
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

