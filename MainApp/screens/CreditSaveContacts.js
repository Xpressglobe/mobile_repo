import React,{Component} from 'react';
import {View,Text,ScrollView,StyleSheet,TouchableOpacity,Image,TextInput,StatusBar,Picker,Alert} from 'react-native';
import Icon from '../common/icons';
import Theme from '../styles/Theme';
import Spinner from 'react-native-loading-spinner-overlay';
import Constant from "../components/Constant";
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-datepicker'

import {TextInputMask} from 'react-native-masked-text'
import {SCLAlert,SCLAlertButton} from 'react-native-scl-alert'



export default class CreditSaveContacts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cus_name: this.props.navigation.getParam('cus_name','Name'),
            cus_phone: this.props.navigation.getParam('cus_phone','phone'),
            customer_id: this.props.navigation.getParam('customer_id','0'),
            date: "",
            currencyFrom: "",
            amount: 0,
            pin: "",
            currencyList: [],
            depositor_detail: "",
            spinner: true,
            Smessage:"",Amessage:"",



        }

    }
    async componentDidMount() {

        this.setState({spinner: true});
        this.setState({
            personal_info_id: await AsyncStorage.getItem('@personal_info_id'),
            getCurrency: await AsyncStorage.getItem('@getCurrency'),
            getFrom: await AsyncStorage.getItem('@getFrom'),
            token: await AsyncStorage.getItem("@token"),
            date: new Date(),

        });

  
        const headers = {
            "Authorization": "Bearer "+ this.state.token,
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

       

     

      

        try {

            const CountryApiCall = await fetch(Constant.URL + Constant.getCOUNTRY + "/" + this.state.getFrom + "/currencies",
            {
                method: "GET",
                headers,
            });
            const getCountry = await CountryApiCall.json();
            console.log("getCountry",getCountry)
            this.setState({currencyList: getCountry.data,spinner: false});
        } catch (err) {
            console.log("Error fetching data-----------",err);
        }

       
    }

    handleClose = () => {
        this.setState({show: false})
    }

  


    onPress = async () => {

        console.log(this.state.currencyFrom);

        if (this.state.date == "") {
            Alert.alert("No Date Selected.");
            return false
        }

       else if (this.state.amount == "") {
            Alert.alert("No Amouhnt Selected.");
            return false
        }

        else if (this.state.pin.length != 4) {
            Alert.alert("Pin must be 4 Characters.");
            return false
        }

       else if (this.state.currencyFrom == "") {
            Alert.alert("No Currency From Selected.");
            return false
        }

        else {
            this.setState({spinner: true});

            const headers = {
                "Authorization": "Bearer "+ this.state.token,
                "Content-Type": "application/json",
                "Accept": "application/json",
            };

            await fetch(Constant.URL + Constant.updateCUSTOMER + this.state.customer_id + "/credits/cash",{
                method: 'POST',
                body: JSON.stringify({
                    amount: Constant.rawNumber(this.state.amount),
                    cur_from: this.state.currencyFrom,
                    date: this.state.date,
                    pin: this.state.pin,
                    msg: this.state.depositor_detail,
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
                            this.setState({spinner: false,Sshow: true ,Amessage:"Unexpected Error!" });
                        }
    
                       
                    }

                    // if (this.state.dataSource.errors == 200) {
                    //     this.setState({spinner: false});

                    // } else {
                    //     this.setState({spinner: false});
                    //     Alert.alert(this.state.dataSource.data.message);
                    // }


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
                    <Text style={styles.headTxt}>Send Credit {this.state.cus_name} Wallet</Text>
                </View>
                <ScrollView>
                    
                <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,marginTop: 20,paddingHorizontal: 15}}>
                            <Text style={{flex: 0.1,paddingLeft: 1}} ></Text>
                            <Picker style={{flex: 0.9,paddingLeft: 150}}
                                selectedValue={this.state.currencyFrom}
                                onValueChange={(itemValue,itemPosition) => {
                                    this.state.currencyFrom = itemValue;
                                    this.setState({to: itemValue,toIndex: itemPosition})
                                   

                                }}   >
                                {/* <Picker.Item label="CURRENCY FROM" value="0" /> */}
                                {
                                    this.state.currencyList.map((v) => {
                                         return <Picker.Item label={v} value={v} />
                                    })
                                }
                            </Picker>
                        </View>

                      

                        <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,marginTop: 2,paddingHorizontal: 15}}>
                  {/* <Text >Amount</Text> */}
                  <TextInputMask style={{paddingLeft: 10,fontSize: 16}}
                      type={'money'}
                      placeholder="Amount"
                      options={{
                          precision: 2,
                          separator: '.',
                          delimiter: ',',
                          unit: '',
                          suffixUnit: ''
                      }}
                      value={this.state.amount}
                      onChangeText={text => {
                          this.setState({
                            amount: text
                          })
                      }}
                      ref={(ref) => this.rateV = ref}
                  />
              </View>

             

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

                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, marginTop: 2, paddingHorizontal: 15 }}>
                            <TextInput
                                style={{ flex: 0.9, paddingLeft: 20 }}
                                placeholder="Add Depositor Details"
                                keyboardType="name-phone-pad" 
                                onChangeText={(cus_adr)=>this.setState({depositor_detail})}
                                value={this.state.depositor_detail}
                            />
                          
                        </View>


                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15,marginTop:2, paddingHorizontal: 1 }}>
                         
                           
                       
                            <TextInput
                            style={{ flex: 0.9, paddingLeft: 20 }}
                            placeholder="Pin "
                           
                            secureTextEntry={true}
                            maxLength={16}
                            onChangeText={(pin)=>this.setState({pin})}
                            value={this.state.pin}
                            />



                            </View>


               

                      


                    
                  
                     
                   

                    <TouchableOpacity style={{paddingVertical: 15,backgroundColor: '#020cab',marginTop: 30,borderRadius: 50,marginHorizontal: 10,}} onPress={this.onPress}>
                        <Text style={{color: '#FFF',textAlign: 'center',fontSize: 16,fontFamily: 'Poppins-Bold',}}>Save</Text>
                    </TouchableOpacity>
                    <View style={{margin: 20}}></View>

                    <SCLAlert
                        theme="danger"
                        show={this.state.Sshow}
                        title="Error Message"
                        subtitle={this.state.Amessage}
                        onRequestClose={() => {
                            this.setState({ Sshow: false })
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

