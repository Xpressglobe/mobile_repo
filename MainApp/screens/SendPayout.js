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



export default class Send extends Component {
    constructor(props) {
        super(props)
        this.state = {
           
            charges: "0",
            to: 0,
            rate: "",
            country_id: 0,
            CountryList: [],
            currentLabel: 'Select your currency',
            personal_info_id: "",
            spinner: true,
            bal: "0.00",
            r_bal: 0,
            BankList: [],
            dataSource: [],
            PercentList: [],
            bank_id: 0,ch_type: 2,value: 0,trans_type: "",
            trans_type : "",
            currencyList: [],
            date: "",
            currencyFrom: ""



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

  

    // async onChargersGet(to) {

    //     //gET Bank
    //     this.setState({spinner: true});
    //     try {

    //         const ChargesGet = await fetch(Constant.URL + Constant.getCharges + "/" + this.state.getFrom + "/" + to);
    //         const dataSource = await ChargesGet.json();
    //         this.setState({get_charges: dataSource,spinner: false});
    //         if (dataSource == 1) {
    //             this.setState({ch_type: 0,charges: 0});
    //         }

    //     } catch (err) {
    //         // console.log("Error fetching data-----------",err);
    //     }
    // }


    onPress = async () => {

        console.log(this.state.currencyFrom);

        if (this.state.date == "") {
            Alert.alert("No Date Selected.");
            return false
        }

        if (this.state.trans_type == "") {
            Alert.alert("No Transaction Type Selected.");
            return false
        }

        if (this.state.rate_type == "") {
            Alert.alert("No Rate Type Selected.");
            return false
        }

        if (this.state.currencyFrom == "") {
            Alert.alert("No Currency From Selected.");
            return false
        }

        this.props.navigation.navigate('SendContacts',
        { 
            date: this.state.date,
            trans_type: this.state.trans_type,
            rate_type: this.state.rate_type,
            currencyFrom: this.state.currencyFrom
        }
        );

       

       
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
                    <Text style={styles.headTxt}>Send Payout</Text>
                </View>
                <ScrollView>
                    

                <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,marginTop: 20,paddingHorizontal: 15}}>
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


                    
                    <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,marginTop: 2,paddingHorizontal: 15}}>
                            <Text style={{flex: 0.1,paddingLeft: 1}} ></Text>
                            <Picker style={{flex: 0.9,paddingLeft: 150}}
                                selectedValue={this.state.trans_type}
                                onValueChange={(itemValue,itemPosition) => {
                                    this.state.trans_type = itemValue;
                                    this.setState({trans_type: itemValue,toIndex: itemPosition})
                                    // this.onChargersGet(itemValue)

                                }}   >
                                <Picker.Item label="TRANSACTION TYPE" value="" />
                                <Picker.Item label="Direct" value="direct" />
                                <Picker.Item label="Dollar" value="dollar" />

                            </Picker>
                        </View>

                        {this.state.trans_type == "dollar" ? (
                         <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,marginTop: 2,paddingHorizontal: 15}}>
                         <Text style={{flex: 0.1,paddingLeft: 1}} ></Text>
                         <Picker style={{flex: 0.9,paddingLeft: 150}}
                             selectedValue={this.state.rate_type}
                             onValueChange={(itemValue,itemPosition) => {
                                this.state.rate_type = itemValue;
                                 this.setState({rate_type: itemValue,toIndex: itemPosition})
                                 // this.onChargersGet(itemValue)

                             }}   >
                             <Picker.Item label="RATE TYPE" value="" />
                             <Picker.Item label="Dollar Normal" value="normal" />
                             <Picker.Item label="Dollar Exchange" value="exchange" />
                             <Picker.Item label="Dollar RMB" value="rmb" />

                         </Picker>
                     </View>

                      

                        ) :    
                    
                        <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,marginTop: 2,paddingHorizontal: 15}}>
                        <Text style={{flex: 0.1,paddingLeft: 1}} ></Text>
                        <Picker style={{flex: 0.9,paddingLeft: 150}}
                            selectedValue={this.state.rate_type}
                            onValueChange={(itemValue,itemPosition) => {
                                this.state.rate_type = itemValue;
                                this.setState({rate_type: itemValue,toIndex: itemPosition})
                                // this.onChargersGet(itemValue)

                            }}   >
                            <Picker.Item label="RATE TYPE" value="" />
                            <Picker.Item label="Direct Normal" value="normal" />
                            <Picker.Item label="Direct Exchange" value="exchange" />
                            <Picker.Item label="Direct RMB" value="rmb" />

                        </Picker>
                    </View>
                      
                        }


                    
                  
                        <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,marginTop: 2,paddingHorizontal: 15}}>
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
                   

                    <TouchableOpacity style={{paddingVertical: 15,backgroundColor: '#020cab',marginTop: 30,borderRadius: 50,marginHorizontal: 10,}} onPress={this.onPress}>
                        <Text style={{color: '#FFF',textAlign: 'center',fontSize: 16,fontFamily: 'Poppins-Bold',}}>Proccess</Text>
                    </TouchableOpacity>
                    <View style={{margin: 20}}></View>
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

