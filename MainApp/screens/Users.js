import React, { Component, useState  } from "react";
import { View, Text, TextInput, CheckBox, StyleSheet, Image, TouchableOpacity, ScrollView, Alert,StatusBar,Picker } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../common/icons';
import Theme from "../styles/Theme";
import Spinner from 'react-native-loading-spinner-overlay';
import Constant from "../components/Constant";
import CountriesList from "../components/countries.json";
import AsyncStorage from '@react-native-community/async-storage';
import PhoneInput from 'react-native-phone-number-input';
import {SCLAlert,SCLAlertButton} from 'react-native-scl-alert';


export default class Users extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
             isPrepaid: false,
            spinner: false,
            dataSource:'',
            cus_name:  this.props.navigation.getParam('cus_name',''),
            cus_phone:  this.props.navigation.getParam('cus_phone',''),
            cus_adr:  this.props.navigation.getParam('cus_adr',''),
            cus_email:  this.props.navigation.getParam('cus_email',''),
            personal_info_id:"",
            dial_code_co: "",
            
            Smessage:"",
            customer_id : this.props.navigation.getParam('customer_id',''),
            phoneNumber: this.props.navigation.getParam('cus_phone',''),
            isChecked: false,
            phoneInput: "",
            Amessage:"",cus_phone:"",cus_phone_o:"",dial_code:"",number_length:"",dial_co:"",
            CountryList:[],CountryData:[]
        };

       
       
       
    }

    async componentDidMount() {
       
        this.setState({ personal_info_id: await AsyncStorage.getItem('@personal_info_id') ,
        getFrom: await AsyncStorage.getItem('@getFrom'),
        dial_codee: await AsyncStorage.getItem('@dial_code'),
        dial_code_co: await AsyncStorage.getItem('@dial_country'),
        });

        console.log(this.state.dial_code)
    
    }

     findArrayElementByTitle(array, title) {
        return array.find((element) => {
          return element.dialCode === title;
        })
      }

   


  

    onPressCustomer = async() => {

     
       
        const cus_name = this.state.cus_name;
        const cus_phone =  this.state.cus_phone;
        const cus_email = this.state.cus_email;
        const address = this.state.cus_adr;
        // const dial_co = this.state.setphoneNumber== undefined ? "+234" : this.state.setphoneNumber;
        // const dial_code = this.state.setphoneNumber== undefined ? "+234" : this.state.setphoneNumber;
        const dial_co = this.state.dial_code_co;
        const dial_code =this.state.dial_codee;
    // console.log(dial_code);
    if(cus_name == ""){
        Alert.alert("Full Name is required.");
    }else if(cus_phone.length < 7){
        Alert.alert("Provide a valid phone number");
    }else if(address ==""){
        Alert.alert("Provide a valid Address");
    }
    else {
        let token=   await AsyncStorage.getItem("@token");
        const headers = {
            "Authorization": "Bearer "+ token,
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

             // post method
             this.setState({ spinner: true });
    fetch(Constant.URL+Constant.addCUSTOMER,{
        method: 'POST',
        headers,
        body: JSON.stringify({ 
              cus_name: cus_name,
              cus_phone: cus_phone,
              dial_code:dial_code,
              dial_co:dial_co,
              cus_email:cus_email,
            //   personal_info_id: this.state.personal_info_id,
              is_third_party:this.state.isChecked,
              cus_adr: address})
          })
          .then((response) =>
          response.json())
        .then((result) => {
            console.log(result);
        this.setState({
                spinner: false,
             dataSource: result, 
          });
      
        //   console.log(this.state.dataSource.data);
          if(this.state.dataSource.message=="Create Succeeded"){
     
          this.setState({ spinner: false,Sshow: true ,Smessage:this.state.dataSource.message });
          }else{
            this.setState({ spinner: false,show: true ,Amessage:this.state.dataSource.message });
          }
          
         }).catch(function (error) {
          this.setState({ spinner: false });
         console.log("-------- error ------- "+error);
         alert("result:"+error)
         });
      
    //   end post method
        }
    }

    onPressUpdateCustomer = async() => {

        // {this.state.dial_code_co} {this.state.dial_codee}
       
        const cus_name = this.state.cus_name;
        const cus_phone =  this.state.cus_phone;
        const cus_email = this.state.cus_email;
        const address = this.state.cus_adr;
        // const dial_co = this.state.setphoneNumber== undefined ? "+234" : this.state.setphoneNumber;
        // const dial_code = this.state.setphoneNumber== undefined ? "+234" : this.state.setphoneNumber;
        const dial_co = this.state.dial_code_co;
        const dial_code =this.state.dial_codee;
    // console.log( await AsyncStorage.getItem('@token'));
    if(cus_name == ""){
        Alert.alert("Full Name is required.");
    }else if(cus_phone.length < 9){
        Alert.alert("Provide a valid phone number");
    }else if(address ==""){
        Alert.alert("Provide a valid Address");
    }
    else {
        let token=   await AsyncStorage.getItem("@token");
        const headers = {
            "Authorization": "Bearer "+ token,
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

             // post method
             this.setState({ spinner: true });
    fetch(Constant.URL+Constant.updateCUSTOMER+this.state.customer_id,{
        method: 'PUT',
        headers,
        body: JSON.stringify({ 
              cus_name: cus_name,
              cus_phone: cus_phone,
              dial_code:dial_code,
              dial_co:dial_co,
              cus_email:cus_email,
            //   personal_info_id: this.state.personal_info_id,
              is_third_party:this.state.isChecked,
              cus_adr: address})
          })
          .then((response) =>
          response.json())
        .then((result) => {
            console.log(result);
        this.setState({
                spinner: false,
             dataSource: result, 
          });
      
        //   console.log(this.state.dataSource.data);
          if(this.state.dataSource.message=="Update succeeded"){
     
          this.setState({ spinner: false,Sshow: true ,Smessage:this.state.dataSource.message });
          }else{
            this.setState({ spinner: false,show: true ,Amessage:this.state.dataSource.message });
          }
          
         }).catch(function (error) {
          this.setState({ spinner: false });
         console.log("-------- error ------- "+error);
         alert("result:"+error)
         });
      
    //   end post method
        }
    }

    onPressDeleteCustomer = async() => {

     
        let token=   await AsyncStorage.getItem("@token");
        const headers = {
            "Authorization": "Bearer "+ token,
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

             // post method
             this.setState({ spinner: true });
    fetch(Constant.URL+Constant.updateCUSTOMER+this.state.customer_id,{
        method: 'DELETE',
        headers,
      
          })
          .then((response) => {

            this.setState({ spinner: false,Sshow: true ,Smessage:"Customer deleted succeeded" });

          })
       
   
    }



    send = () => {
        // this.props.navigation.navigate("Users");
    }


    render() {
       
        return (
            <View style={{ flex: 1, backgroundColor: Theme.bgcolor }}>
                 <Spinner
                    visible={this.state.spinner}
                    overlayColor={'rgba(0, 0, 0, 0.5)'}
                    />
              <StatusBar backgroundColor="#020cab" barStyle="light-content" />
                <ScrollView>
                    <View style={styles.headContainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Icon family="MaterialIcons" name="arrow-back" size={25} color="#FFF" />
                        </TouchableOpacity>
                        {this.state.customer_id == '' && 
        <Text style={styles.headTxt}>Add New Customer </Text>}

{this.state.customer_id != '' && 
        <Text style={styles.headTxt}>Update Customer </Text>}
                    </View>

                    <View style={styles.transferbox}>
                   
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }} >
                        {this.state.customer_id == '' && <Text style={styles.paidTxt}>Add New Customer   </Text> }
                        {this.state.customer_id != '' && <Text style={styles.paidTxt}>Update Customer  </Text> }
                         
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, marginTop: 2, paddingHorizontal: 15 }}>
                            <TextInput
                                style={{ flex: 0.9, paddingLeft: 20 }}
                                placeholder="Customer Full Name"
                                keyboardType="name-phone-pad"
                                onChangeText={(cus_name)=>this.setState({cus_name})}
                                value={this.state.cus_name}
                                
                            />
                          
                        </View>
                        {/* <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, marginTop: 2, paddingHorizontal: 15 }}>
                            
                            <TextInput
                                value={this.state.dial_code}
                                
                            />
                            <TextInput
                                style={{ flex: 0.9, paddingLeft: 20 }}
                                placeholder="Phone"
                                keyboardType="phone-pad"
                                maxLength={16}
                                onChangeText={(cus_phone)=>this.setState({cus_phone})}
                                value={this.state.cus_phone}
                            />
                           
                        </View> */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15,marginTop:2, paddingHorizontal: 1 }}>
                    
                                                            {/* <PhoneInput
                                    ref={this.state.phoneInput}
                                    style={{ flex: 0.2, paddingLeft: 0 }}  
                                    selectedValue={this.state.dial_co}
                                    defaultValue={this.state.dial_co}
                                    defaultCode={this.state.dial_code_co || 'US'}
                                    layout="first"
                                   
                                    containerStyle={styles.phoneContainer}
                                    textContainerStyle={styles.textInput}
                                    
                                    onChangeFormattedText={text => {
                                        console.log(text);
                                        // {(cus_phone)=>this.setState({cus_phone})}
                                    this.state.setphoneNumber =text;
                                    }}

                                    withDarkTheme
                                /> */}
                                <Text style={{  paddingLeft: 20, fontWeight: '800',  }}  >{this.state.dial_code_co} {this.state.dial_codee}</Text>
                            <TextInput
                                style={{ flex: 0.9, paddingLeft: 20 }}
                                placeholder="Phone Number"
                                keyboardType="phone-pad"
                                maxLength={16}
                                onChangeText={(cus_phone)=>this.setState({cus_phone})}
                                value={this.state.cus_phone}
                            />
                        
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, marginTop: 2, paddingHorizontal: 15 }}>
                            <TextInput
                                style={{ flex: 0.9, paddingLeft: 20 }}
                                placeholder="Email"
                                keyboardType="name-phone-pad" 
                                onChangeText={(cus_email)=>this.setState({cus_email})}
                                value={this.state.cus_email}
                            />
                          
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, marginTop: 2, paddingHorizontal: 15 }}>
                            <TextInput
                                style={{ flex: 0.9, paddingLeft: 20 }}
                                placeholder="Address"
                                keyboardType="name-phone-pad" 
                                onChangeText={(cus_adr)=>this.setState({cus_adr})}
                                value={this.state.cus_adr}
                            />
                          
                        </View>
                        {this.state.customer_id == '' && 
                        <View  style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 0, margin: 15, marginTop: 2, paddingHorizontal: 0 }}>
                        <View style={styles.checkboxContainer}>
                        <CheckBox
      value={this.state.isChecked}
      onValueChange={() => this.setState({ isChecked: !this.state.isChecked })}
    />
        <Text style={styles.label}>Is Third-party account?</Text>
      </View>
                
                        </View> }

                        {this.state.customer_id == '' && 
                        <TouchableOpacity style={{ marginHorizontal: 20, paddingVertical: 20 }} onPress={this.onPressCustomer}>
                            <View style={styles.signContainer}>
                                <Text style={styles.signinTxt}>Add Customer</Text>
                            </View>
                        </TouchableOpacity> }

                        {this.state.customer_id != '' && 
                         <View style={{ alignItems: 'center', margin: 0,marginTop:2, paddingHorizontal: 1 }}>
                         
                        <TouchableOpacity style={{ marginHorizontal: 10, paddingVertical: 20 }} onPress={this.onPressUpdateCustomer}>
                            <View style={styles.signContainer}>
                                <Text style={styles.signinTxt}>Update Customer</Text>
                            </View>
                        </TouchableOpacity> 
                        
                        
                        <TouchableOpacity style={{ marginHorizontal: 10, paddingVertical: 20 }} onPress={this.onPressDeleteCustomer}>
                            <View style={styles.deleteContainer}>
                                <Text style={styles.signinTxt}>Delete Customer</Text>
                            </View>
                        </TouchableOpacity>
                        </View>}

                        
                    </View> 
                    <View style={{margin: 20}}>
                       
                    </View>

             <SCLAlert
                        theme="danger"
                        show={this.state.show}
                        title="Error Message"
                        subtitle={this.state.Amessage}
                        onRequestClose={() => {
                            this.setState({ show: false })
                            }}
                        >
                            
                 
          <SCLAlertButton theme="danger" onPress={() => {
                            this.setState({ show: false })
                            }} >Close</SCLAlertButton>
        </SCLAlert>
                    <SCLAlert
                        theme="success"
                        show={this.state.Sshow}
                        title="Successful Message"
                        subtitle={this.state.Smessage}
                        onRequestClose={() => {
                            this.setState({ Sshow: false })
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
        fontWeight: '600',
        marginHorizontal: 20
    },
    transferbox: {
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginVertical:10,
        borderRadius: 15,
    },
    notifiContainer: {
        flex: 1,
        backgroundColor: 'white',
        marginVertical: 5,
        marginHorizontal: 15,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 13,
        elevation: 1,
        shadowColor: 'lightgrey',
        shadowOffset: { width: -0.5, height: 0.5 },
        shadowOpacity: 0.1,
        shadowRadius: 1
    },
    paidTxt: {
        fontSize: 18,
        color: '#000',
        fontWeight: '400',
        paddingVertical: 20,
        paddingHorizontal: 30
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
    container: {
        paddingHorizontal: 20,
    },
    txtStl: {
        flex: 0.9,
        color: 'black',
        paddingLeft: 5,
    },
    headertxt: {
        color: 'white',
        fontSize: 20,
        fontWeight: "600",
        paddingVertical: 20,
    },
    txtSignup: {
        color: 'white',
        textAlign: 'center',
    },
    forgettxt: {
        color: 'white',
        textAlign: 'right',
        marginVertical: 10
    },
    signContainer: {
        backgroundColor: '#020cab',
        padding: 17,
        borderRadius: 50
    },
    deleteContainer: {
        backgroundColor: '#f11111',
        padding: 17,
        borderRadius: 50
    },
    signinTxt: {
        textAlign: 'center',
        fontWeight: '600',
        color: '#FFF',
        fontSize: 16
    },
    acTxt: {
        paddingLeft: 15,
        marginVertical: 10
    },
    phoneContainer: {
        width: '20%',
        height: 50,
        fontSize: 12,
        backgroundColor: '#fff'
      },
      textInput: {
        paddingVertical: 0,
      },
      checkboxContainer: {
        flexDirection: "row",
        marginBottom: 0,
      },
      checkbox: {
        alignSelf: "center",
      },
      label: {
        margin: 8,
      },
})

