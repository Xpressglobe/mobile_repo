import React, { Component } from 'react';
import { View, Text, Image, StyleSheet ,Alert} from 'react-native';
import ThemeStyle from '../styles/Theme';
import { NavigationActions, StackActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import Constant from "../components/Constant";
import AsyncStorage from '@react-native-community/async-storage';

import CountriesList from "../components/countries.json";
import NetInfo from "@react-native-community/netinfo";

// Subscribe

export default class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            isLoggedIn : 0,
            dataSource:[],
        };
    
    }

    async componentWillMount() {
        const isLoggedIn = await AsyncStorage.getItem('@isLoggedIn');
        const personal_info_id= await AsyncStorage.getItem('@personal_info_id');
        if (isLoggedIn) {
          this.setState({
            isLoggedIn,
            personal_info_id,
          });
        }
        
      }

    
  

    componentDidMount() {
        var timer = setTimeout(() => {
            this.setState({
                visible: !this.state.visible
            });

            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'SliderScreen' })],
            });
          
              //Check Network
              NetInfo.fetch().then(state => {
          
                console.log("Connection type", state.type);
                console.log("Is connected??", state.isConnected);
                if(!state.isConnected)
                { 
                console.log("Is connected??", false);
                this.props.navigation.navigate("NoNetworkScreen");
                }else{
          
          //Check Network --
            console.log("isLoggedIn",this.state.isLoggedIn)
            if(this.state.isLoggedIn=='1'){
            //LOAD DATA FROM D

           
            (async () => {
               
                let token=   await AsyncStorage.getItem("@token");
               
                try
                 {

                    const headers = {
                        "Authorization": "Bearer "+ token,
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    };

                    const UsersApiCall = await fetch(Constant.URL+Constant.getUSER,{
                        method: "GET",
                        headers,
                    });
                    
                    let getUser1= await UsersApiCall.json();
                    // console.log(getUser1);
                    this.setState({dataSource: getUser1});
                } catch(err) {
                    console.log("Error fetching data-----------", err);
                }
             
                if(this.state.dataSource.data){

                    const headers = {
                        "Authorization": "Bearer "+ token,
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    };

                  
              console.log(this.state.dataSource.data.wallet_country_id)
                    const dataSource1 =  fetch(Constant.URL + "countries/" + this.state.dataSource.data.wallet_country_id + "/currencies", {
                      method: "GET",
                      headers,
                  }).then(response => response.json()).then((result) => {
              
                   
                    // this.props.getAgentCurrency(result.data[0])
                    this.setState({ getCurrency: result.data[0], spinner: false });
                    Constant.SetAsyncValue('@getCurrency', result.data[0]);
                    // console.log("sdszasssssd", this.state.dataSource.data.wallet_country.dial_code);
                 
                     Constant.SetAsyncValue('@isLoggedIn', '1'),
                     Constant.SetAsyncValue('@email', this.state.dataSource.data.email),
                     Constant.SetAsyncValue('@first_name', this.state.dataSource.data.first_name),
                     Constant.SetAsyncValue('@last_name', this.state.dataSource.data.last_name),
                     Constant.SetAsyncValue('@phone', this.state.dataSource.data.phone),
                    //  Constant.SetAsyncValue('@country', this.state.dataSource.data.country),
                    //  Constant.SetAsyncValue('@commission_settings', this.state.dataSource.data.commission_setting),
                     Constant.SetAsyncValue('@personal_info_id', this.state.dataSource.data.personal_info_id.toString()),
                     Constant.SetAsyncValue('@store_vid', this.state.dataSource.data.store_vid),
                    
                     Constant.SetAsyncValue('@getFrom', this.state.dataSource.data.wallet_country_id.toString()),
                    
                    //  Constant.SetAsyncValue('@profit_rate', this.state.dataSource.data.profit_rate)
                     Constant.SetAsyncValue('@dial_code',  this.state.dataSource.data.wallet_country.dial_code)
                     Constant.SetAsyncValue('@number_length', this.state.dataSource.data.number_length)
                    
                          
               var county =     this.findArrayElementByTitle(CountriesList,this.state.dataSource.data.wallet_country.dial_code);
            //    console.log(county.isoCode)
                    
               Constant.SetAsyncValue('@dial_country',county.isoCode.toString())
              
                   
                    //Local Store
                  
                this.props.navigation.navigate("TabNav", {
                    first_name: this.state.dataSource.data.first_name,
                    last_name: this.state.dataSource.data.last_name,
                    email: this.state.dataSource.data.email,
                    getCurrency: this.state.getCurrency,
                    phone: this.state.dataSource.data.phone,
                    dial_code: this.state.dataSource.data.country.dial_code,
                    userInfo: this.state.dataSource.data,
                    personal_info_id: this.state.dataSource.data.personal_info_id,
                    getFrom: this.state.dataSource.data.wallet_country_id,
                    dial_country:  this.findArrayElementByTitle(CountriesList, this.state.dataSource.data.country.dial_code).toString()
                });

            });
            }else{
                this.props.navigation.navigate("LoginScreen") 
            }

            })();

            }else{
                
            this.props.navigation.dispatch(resetAction);
            }
//Check Network ""
            }
     });
        }, 2000);
    }

    findArrayElementByTitle(array, title) {
       
        return array.find((element) => {
           
          return element.dialCode === title;
        })
      }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <LinearGradient colors={['#fc0f84', '#020cab']}
                    start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={{ flex: 1 }}>
                    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                        <Image style={styles.logo} source={require("./../assets/img/logo.png")} />
                        <Text style={{color:'#FFF',fontSize:40,fontFamily:'Poppins-Bold'}}>Xpress Logistics</Text>
                    </View>
                </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logo: {
        width: 90,
        height: 90,
        resizeMode: "contain",
        marginBottom: 5    },
})