import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput,StatusBar,Picker ,Alert} from 'react-native';
import Icon from '../common/icons';
import Theme from '../styles/Theme';
import Spinner from 'react-native-loading-spinner-overlay';
import Constant from "../components/Constant";
import AsyncStorage from '@react-native-community/async-storage';




export default class Send extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cus_name : this.props.navigation.getParam('cus_name', 'Name'),
            cus_phone: this.props.navigation.getParam('cus_phone', 'phone'),
            customer_id: this.props.navigation.getParam('customer_id', '0'),
            amount: this.props.navigation.getParam('amount', '0'),
            rate: this.props.navigation.getParam('rate', '0'),
            rate_type : this.props.navigation.getParam('rate_type', '1'),
            charges: this.props.navigation.getParam('charges', '0'),
            to: this.props.navigation.getParam('to', '0'),
            to_id: this.props.navigation.getParam('to_id', '0'),
            from: this.props.navigation.getParam('from', '0'),
            fromAgent: this.props.navigation.getParam('fromAgent', '0'),
            bank_id:this.props.navigation.getParam('bank_id', '0'),
            ch_type: this.props.navigation.getParam('ch_type','0'),
            due_amount: this.props.navigation.getParam('due_amount','0'),
            getCountry_id:this.props.navigation.getParam('getCountry_id','0'),
            ben_name:"",number_length:"",dial_code:"",
            message:"",
            ben_id:"",
            ben_bank:"",
            ben_acc:"",
            ben_phone:"",
            CountryList: [],
             BenList: [],
            BenIDList:"",
            personal_info_id:"",
            spinner: true,
            bal:"0.00",
            show: false,
       

         
         
        }
    
    }


    async componentDidMount() {

        this.setState({ wallet: await AsyncStorage.getItem('@wallet') ,
        personal_info_id: await AsyncStorage.getItem('@personal_info_id') ,
        getCurrency: await AsyncStorage.getItem('@getCurrency'),
        
    
     });
        
        try {
       
            const BenApiCall = await fetch(Constant.URL+Constant.getBEN+"/"+this.state.customer_id);
            const getBen = await BenApiCall.json();
        
            this.setState({BenList: getBen, spinner: false});
        } catch(err) {
            console.log("Error fetching data-----------", err);
        }
            //Get Country Details
            try {

                const CountryApi = await fetch(Constant.URL + Constant.getCountryMain + "/" + this.state.to_id);
                const getCountryN = await CountryApi.json();
                console.log("CountryData", getCountryN.data.dial_code)
                this.setState({ spinner: false ,dial_code:getCountryN.data.dial_code,number_length:getCountryN.data.number_length});
            } catch (err) {
                console.log("Error fetching data-----------", err);
            }
      
    
    }

    onTextChange(text) {
        var cleaned = ('' + text).replace(/\D/g, '')
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            var intlCode = (match[1] ? '+1 ' : ''),
                number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    
            this.setState({
                phoneNum: number
            });
    
            return;
        }
    
        this.setState({
            phoneNum: text
        });
    }

    handleClose = () => {

        this.setState({ show: false })
     }

    onPressShow = async () => {
   
    const { ben_id} = this.state;
    if( ben_id <=0){
        Alert.alert("Please Select A Beneficiary.");
    }else {
        
        try {
       
            const BenIDApiCall = await fetch(Constant.URL+Constant.getBENID+"/"+this.state.ben_id);
            const getBenID = await BenIDApiCall.json();
       
            this.setState({BenIDList: getBenID, spinner: false});
            
            if(ben_id=="New")
            {
                
                if(this.state.ben_bank =="" || this.state.ben_acc=="" || this.state.ben_name=="" ){
                Alert.alert("Enter Beneficiary Details");
                return false
                }

            }else{
               
            this.setState({ben_id: this.state.BenIDList.data.ben_id,
                ben_name: this.state.BenIDList.data.ben_name, 
                ben_phone: this.state.BenIDList.data.ben_phone,
                ben_bank: this.state.BenIDList.data.ben_bank, 
                ben_acc: this.state.BenIDList.data.ben_acct, 
                 spinner: false});
            }
            
        } catch(err) {
            console.log("Error fetching data-----------", err);
        }
         this.props.navigation.navigate("agent",{
            cus_name: this.state.cus_name,
            cus_phone:this.state.cus_phone,
            customer_id: this.state.customer_id,
            amount:this.state.amount,
            rate:this.state.rate,
            charges:this.state.charges,
            to:this.state.to,
            to_id:this.state.to_id,
            from:this.state.from,
            ben_name:this.state.ben_name,
            ben_id:this.state.ben_id,
            ben_bank:this.state.ben_bank,
            ben_acc:this.state.ben_acc,
            ben_phone:this.state.ben_phone,
            message:this.state.message,
            fromAgent:this.state.fromAgent,
            rate_type:this.state.rate_type,
            bank_id:this.state.bank_id,
            ch_type: this.state.ch_type,
            due_amount: this.state.due_amount,
            getCountry_id:this.state.getCountry_id,
            
         })
    
        }
    }
    

    render() {
       
      
        return (
            <View style={{ flex: 1, backgroundColor: Theme.bgcolor }}>
                 <Spinner
                visible={this.state.spinner}
                overlayColor={'rgba(0, 0, 0, 0.50)'}
                />
            <StatusBar backgroundColor="#020cab" barStyle="light-content" />
                <View style={styles.headContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon family="MaterialIcons" name="arrow-back" size={25} color="#FFF" />
                    </TouchableOpacity>
        <Text style={styles.headTxt}> Add Beneficiary {this.state.cus_name}   </Text>
                </View>
                <ScrollView>
                    <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: 'lightgray', alignItems: 'center' }}>
                        <View style={styles.imgContainer}>
                            <Image style={styles.userimg} source={require('../assets/img/boy.png')} />
                        </View>
                        <View style={styles.userdetails}>
                            <Text style={{ fontSize: 18, color: '#000', fontFamily: 'Poppins-Light' }}>{this.state.cus_name}</Text>
                            <Text style={{ fontSize: 12, color: '#000', fontFamily: 'Poppins-Thin' }}>{this.state.cus_phone}</Text>
                        </View>
                       
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, paddingHorizontal: 15 }}>
                    <Picker  style={{ flex: 0.9, paddingLeft: 150 }}  
                            selectedValue={this.state.ben_id}  
                            onValueChange={(itemValue, itemPosition) => this.setState({ben_id: itemValue, ben_idIndex: itemPosition})}   > 
                            
                             <Picker.Item label=" SELECT BENEFICIARY" value="0"/> 
                             <Picker.Item label=" CREATE NEW BENEFICIARY" value="New" /> 
                             {
                                this.state.BenList.map( (x)=>{
                                return <Picker.Item label={x.ben_name +" - "+ x.ben_phone }  value={x.ben_id} />
                                })
                                } 
                            </Picker> 
                          
                    </View>
                 
{this.state.ben_id=="New" ? (  <View >
    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, marginTop: 2, paddingHorizontal: 15 }}>
                            <TextInput
                                style={{ flex: 0.9, paddingLeft: 20 }}
                                placeholder="Beneficiary Name"
                                keyboardType="name-phone-pad"
                                onChangeText={(ben_name)=>this.setState({ben_name})}
                                value={this.state.ben_name}
                                
                            />
                          
                        </View>
                        
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, marginTop: 2, paddingHorizontal: 15 }}>
                            <TextInput
                                style={{ flex: 0.9, paddingLeft: 20 }}
                                placeholder="Beneficiary Bank Name"
                                keyboardType="name-phone-pad" 
                                onChangeText={(ben_bank)=>this.setState({ben_bank})}
                                value={this.state.ben_bank}
                            />
                          
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, marginTop: 2, paddingHorizontal: 15 }}>
                            <TextInput
                                style={{ flex: 0.9, paddingLeft: 20 }}
                                placeholder="Beneficiary Account Number"
                                keyboardType="phone-pad"
                                onChangeText={(ben_acc)=>this.setState({ben_acc})}
                                value={this.state.ben_acc}
                                maxLength={25}
                            />
                          
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, marginTop: 2, paddingHorizontal: 15 }}>
                        <TextInput
                                value={this.state.dial_code}
                            />
                            <TextInput
                                style={{ flex: 0.9, paddingLeft: 20 }}
                                placeholder="Beneficiary Phone (optional)"
                                keyboardType="phone-pad"
                                maxLength={16}
                                onChangeText={(ben_phone)=>this.setState({ben_phone})}
                                value={this.state.ben_phone}
                            />
                           
                        </View>

                </View>  ): null}

                     
                        
                <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, marginTop: 2, paddingHorizontal: 15 }}>
                        <TextInput style={{ flex: 1, paddingLeft: 10, fontSize: 16, fontFamily:'Poppins-ExtraLightItalic' }}
                            keyboardType='email-address'
                            placeholder="Add a message (Optional)"
                            onChangeText={(message)=>this.setState({message})}
                            value={this.state.message}
                        />
                    </View>

               

                 <TouchableOpacity style={{ paddingVertical: 10, backgroundColor: '#020cab', marginTop: 30, borderRadius: 50, marginHorizontal: 30 }} onPress={this.onPressShow}>
                            <Text style={{ color: '#FFF', textAlign: 'center', fontSize: 16 ,  fontFamily: 'Poppins-Bold',}}>CONTINUE </Text>
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
        shadowOffset: { width: -0.5, height: 0.5 },
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