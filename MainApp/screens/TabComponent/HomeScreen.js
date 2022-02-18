import React, { Component,useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Alert, TouchableOpacity, BackHandler, Dimensions } from 'react-native';
import Icon from '../../common/icons';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import Theme from '../../styles/Theme';
import Constant from "../../components/Constant";
import {connect} from "react-redux";
import Spinner from 'react-native-loading-spinner-overlay';
import { NavigationEvents } from 'react-navigation';
import messaging from '@react-native-firebase/messaging';


const { width } = Dimensions.get('window');


class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            size: { width, height: 150 },
            bannerImg: [
                { img: require('../../assets/img/banner1.jpg') },
                { img: require('../../assets/img/banner2.png') },
                { img: require('../../assets/img/banner3.jpg') },
            ],
            email: this.props.navigation.getParam('email', 'Email'),
            phone: this.props.navigation.getParam('phone', 'Phone'),
            first_name: this.props.navigation.getParam('first_name', 'First Name'),
            last_name: this.props.navigation.getParam('last_name', 'Last Name'),
            getCurrency: this.props.navigation.getParam('getCurrency', 'Currency'),
            wallet: this.props.navigation.getParam('wallet', '0.00'),
            personal_info_id: this.props.navigation.getParam('personal_info_id', '0'),
            getFrom:this.props.navigation.getParam('getFrom', '0'),
            c_wallet: 0,

        }
       
    }

    onButtonPress = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        // then navigate
        navigate('NewScreen');
      }
      
      handleBackButton = () => {
       Alert.alert(
           'Exit App',
           'Are you sure you want to exit this application?', [{
               text: 'Cancel',
               onPress: () => console.log('Cancel Pressed'),
               style: 'cancel'
           }, {
               text: 'OK',
               onPress: () => BackHandler.exitApp()
           }, ], {
               cancelable: false
           }
        )
        return true;
      } 

    async bal() {

let token=   await AsyncStorage.getItem("@token");
let currency=   await AsyncStorage.getItem("@getCurrency");
console.log("nice ",currency);
        this.setState({ spinner: true,
         });
        try {

            const headers = {
                "Authorization": "Bearer "+token,
                "Content-Type": "application/json",
                "Accept": "application/json",
            };

           

          
      
              

                   const dataSource =    fetch(Constant.URL + Constant.getAgBal + "/" + currency, {
                      method: "GET",
                      headers,
                  }).then(response => response.json()).then((result) => {
            
                    console.log("allrest",result.data);
      
                    // const dataSourc = await BalApiCall.json();
      
                    // AsyncStorage.setItem('@wallet',result.data.customer_balance.tostring())
                
                    this.props.getCustomerWallet(result.data.customer_balance)
                    this.props.getAgentWallet(result.data.agent_balance)
                    this.props.getAgentCurrency(currency)
                    this.setState({ wallet: result.data.agent_balance, c_wallet: result.data.customer_balance, spinner: false });
            
                   
                  });

            // const BalApiCall = await fetch(Constant.URL + Constant.getAgBal + "/" + this.state.personal_info_id+"/"+this.state.getFrom+"/"+2);
            // const dataSource = await BalApiCall.json();
            // await AsyncStorage.setItem('@wallet', dataSource.bal)
            // this.props.getCustomerWallet(dataSource.c_bal)
            // this.props.getAgentWallet(dataSource.bal)
            // this.props.getAgentCurrency(this.state.getCurrency)
            // this.setState({ wallet: dataSource.bal, c_wallet: dataSource.c_bal, spinner: false });
        } catch (err) {
            console.log("Error fetching data-----------", err);
            this.setState({ spinner: false });
        }
    }



    async componentDidMount() {
      this.bal()
      this.getFcmToken();
      //BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
       // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
      }



      //get Push Token 
      getFcmToken = async () => {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            // this.updateToken (fcmToken)
        //  console.log("Your Firebase Token is:", fcmToken);
        } else {
         console.log("Failed", "No token received");
        }
      }


//  updateToken (fc_token){
//           // post method
//           fetch(Constant.URL + Constant.UpdateToken, {
//             method: 'POST',
//             body: JSON.stringify({
//                 token: fc_token,
//                 personal_info_id: this.state.personal_info_id,
              
//             })
//         })
//             .then((response) => response.json())
//             .then((result) => {
//                 this.setState({
//                     spinner: false,
//                 });

//             }).catch(function (error) {
//                 console.log("-------- error ------- " + error);
              
//             });

//  }
   

    _renderBannerItems(rowData) {
        return (
            <TouchableOpacity style={{ paddingHorizontal: 5 }} onPress={this.ReloadScreen} >
                <Image source={rowData.item.img} style={{ width: 350, height: 120, resizeMode: 'stretch' }} />
            </TouchableOpacity>
        )
    }

    render() {
      
        return (
            <View style={{ flex: 1, backgroundColor: Theme.bgcolor }}>
                <Spinner
                    visible={this.state.spinner}
                    overlayColor={'rgba(0, 0, 0, 0.50)'}
                />
                <NavigationEvents
              onWillFocus={() => {
              
              }}
              />

                <ScrollView>
                    <LinearGradient colors={['#fc0f84', '#020cab']}
                        start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={styles.linerSty}>
                        <View style={styles.headerContainer}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.userImg}>
                                    <Image style={styles.imgSty} source={require("../../assets/img/profile.jpg")} />
                                </View>
                                <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 20, color: '#FFF', fontFamily: 'Poppins-Light' }}>{this.state.first_name} {this.state.last_name} </Text>
                                    <Text style={{ color: '#FFF', fontFamily: 'Poppins-Light' }}>{this.state.email}</Text>
                                </View>
                            </View>
                            <View style={{ margin: 10 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("Notifi")}>
                                    <Icon family="FontAwesome" name="bell-o" size={23} color="#FFF" />
                                    <Text style={styles.notifisty}>0</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </LinearGradient>
                    <View style={[styles.transferbox, { marginTop: -75 }]}>
                        <TouchableOpacity >
                            <View style={styles.balance}>
                                <Text style={{ fontSize: 15, fontWeight: "bold", color: '#000' }}>Agent Bal:</Text>
                                <Text style={{ fontSize: 20, fontWeight: "bold", color: '#000' }}>{this.props.agentC} {Constant.numberFormate(this.props.agentW)}</Text>
                            </View>
                            <View style={styles.balance}>
                                <Text style={{ fontSize: 10, color: '#DF8600' }}>Customers Bal:</Text>
                                <Text style={{ fontSize: 15, color: '#DF8600' }}>{this.props.agentC} {Constant.numberFormate(this.props.userW)}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 0.5, margin: 10 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("SendPayOut")}>
                                    <LinearGradient colors={['#fc0f84', '#020cab']}
                                        start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={styles.gradsty}>
                                        <View style={{ padding: 5, alignItems: 'center', }}>
                                            <View style={styles.transfer}>
                                                <Icon family="FontAwesome" name="send-o" size={20} />
                                            </View>
                                        </View>
                                    </LinearGradient>
        <Text style={styles.paytypesty}>Send </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 0.5, margin: 10 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("CreditContacts")}>
                                    <LinearGradient colors={['#fc0f84', '#020cab']}
                                        start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={styles.gradsty} >
                                        <View style={{ padding: 5, alignItems: 'center', }}>
                                            <View style={styles.transfer}>
                                                <Icon family="AntDesign" name="export2" size={23} />
                                            </View>
                                        </View>
                                    </LinearGradient>
                                    <Text style={styles.paytypesty}>Credit</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 0.5, margin: 10 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("Contacts")} >
                                    <LinearGradient colors={['#fc0f84', '#020cab']}
                                        start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={styles.gradsty}>
                                        <View style={{ padding: 5, alignItems: 'center', }}>
                                            <View style={styles.transfer}>
                                                <Icon family="Entypo" name="users" size={22} />
                                            </View>
                                        </View>
                                    </LinearGradient>
                                    <Text style={styles.paytypesty}>Customer</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 0.5, margin: 10 }}>
                              
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("RateCenter")}>
                                    <LinearGradient colors={['#fc0f84', '#020cab']}
                                        start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={styles.gradsty}>
                                        <View style={{ padding: 5, alignItems: 'center', }}>
                                            <View style={styles.transfer}>
                                                <Icon family="Feather" name="activity" size={20} />
                                            </View>
                                        </View>
                                    </LinearGradient>
                                    <Text style={styles.paytypesty}>Rate Center</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>


                    <View style={[styles.transferbox2, { marginTop: -2 }]}>

                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 0.5, margin: 10 }}>
                            
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("Payout")}>
                                    <LinearGradient colors={['#fc0f84', '#020cab']}
                                        start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={styles.gradsty}>
                                        <View style={{ padding: 5, alignItems: 'center', }}>
                                            <View style={styles.transfer}>
                                                <Icon family="FontAwesome" name="arrow-down" size={20} />
                                            </View>
                                        </View>
                                    </LinearGradient>
                                    <Text style={styles.paytypesty}>Payout Center</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ flex: 0.5, margin: 10 }}>
                            
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("ProcessPayout")}>
                                    <LinearGradient colors={['#fc0f84', '#020cab']}
                                        start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={styles.gradsty}>
                                        <View style={{ padding: 5, alignItems: 'center', }}>
                                            <View style={styles.transfer}>
                                                <Icon family="FontAwesome" name="arrow-down" size={20} />
                                            </View>
                                        </View>
                                    </LinearGradient>
                                    <Text style={styles.paytypesty}>Process Payout </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ flex: 0.5, margin: 10 }}>
                            
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("")}>
                                <LinearGradient colors={['#fc0f84', '#020cab']}
                                    start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={styles.gradsty}>
                                    <View style={{ padding: 5, alignItems: 'center', }}>
                                        <View style={styles.transfer}>
                                            <Icon family="FontAwesome" name="arrow-down" size={20} />
                                        </View>
                                    </View>
                                </LinearGradient>
                                <Text style={styles.paytypesty}>Pending Payout</Text>
                            </TouchableOpacity>
                        </View>
                            {/* <View style={{ flex: 0.5, margin: 10 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("", {
                                    history: 1,
                                })}>
                                    <LinearGradient colors={['#fc0f84', '#020cab']}
                                        start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={styles.gradsty} >
                                        <View style={{ padding: 5, alignItems: 'center', }}>
                                            <View style={styles.transfer}>
                                                <Icon family="FontAwesome" name="arrow-up" size={23} />
                                            </View>
                                        </View>
                                    </LinearGradient>
                                    <Text style={styles.paytypesty}> Remit</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 0.5, margin: 10 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("")} >
                                    <LinearGradient colors={['#fc0f84', '#020cab']}
                                        start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={styles.gradsty}>
                                        <View style={{ padding: 5, alignItems: 'center', }}>
                                            <View style={styles.transfer}>
                                                <Icon family="FontAwesome" name="money"  size={22} />
                                            </View>
                                        </View>
                                    </LinearGradient>
                                    <Text style={styles.paytypesty}>Collection</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 0.5, margin: 10 }}>
                            
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Credit", {
                        income:1,
                        })}>
                                    <LinearGradient colors={['#fc0f84', '#020cab']}
                                        start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={styles.gradsty}>
                                        <View style={{ padding: 5, alignItems: 'center', }}>
                                            <View style={styles.transfer}>
                                                <Icon family="Feather" name="trending-up" size={20} />
                                            </View>
                                        </View>
                                    </LinearGradient>
                                    <Text style={styles.paytypesty}>Payment</Text>
                                </TouchableOpacity>
                               
                            </View> */}

                        </View>
                    </View>

                    {/* <View style={[styles.transferbox2, { marginTop: -2 }]}>

                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 0.5, margin: 10 }}>
                            
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("ExpenseType")}>
                                    <LinearGradient colors={['#fc0f84', '#020cab']}
                                        start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={styles.gradsty}>
                                        <View style={{ padding: 5, alignItems: 'center', }}>
                                            <View style={styles.transfer}>
                                                <Icon family="FontAwesome" name="compass" size={20} />
                                            </View>
                                        </View>
                                    </LinearGradient>
                                    <Text style={styles.paytypesty}>Expenses</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 0.5, margin: 10 }}>
                            
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("ExpenseType", {
                                    transfer: 1,
                                })}>
                                    <LinearGradient colors={['#fc0f84', '#020cab']}
                                        start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={styles.gradsty} >
                                        <View style={{ padding: 5, alignItems: 'center', }}>
                                            <View style={styles.transfer}>
                                                <Icon family="Feather" name="link" size={23} />
                                            </View> 
                                        </View>
                                    </LinearGradient>
                                    <Text style={styles.paytypesty}>Transfer</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 0.5, margin: 10 }}>
                            
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("TransferReceive")} >
                                    <LinearGradient colors={['#fc0f84', '#020cab']}
                                        start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={styles.gradsty}>
                                        <View style={{ padding: 5, alignItems: 'center', }}>
                                            <View style={styles.transfer}>
                                                <Icon family="Feather" name="shuffle" size={22} />
                                            </View>
                                        </View>
                                    </LinearGradient>
                                    <Text style={styles.paytypesty}>Received</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 0.5, margin: 10 }}>
                            
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("ExpenseType",{
                                 transfer:3
                                })} > 
                           
                                    <LinearGradient colors={['#fc0f84', '#020cab']}
                                        start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={styles.gradsty}>
                                        <View style={{ padding: 5, alignItems: 'center', }}>
                                            <View style={styles.transfer}>
                                                <Icon family="Feather" name="briefcase" size={20} />
                                            </View>
                                        </View>
                                    </LinearGradient>
                                    <Text style={styles.paytypesty}>Cash Return</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View> */}
 

                    <View>
                        <Text style={styles.promoSty}></Text>

                    </View>
                </ScrollView >
            </View >
        );
    }
}
const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    notifisty: {
        borderRadius: 10,
        backgroundColor: '#FFF',
        fontSize: 8,
        textAlign: 'center',
        width: 15,
        padding: 2,
        marginTop: -30,
        marginLeft: 10,
        margin: 5
    },
    linerSty: {
        flex: 1,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        height: 180
    },
    imgSty: {
        width: 70,
        height: 70,
        resizeMode: "contain"
    },
    userImg: {
        width: 75,
        height: 75,
        borderRadius: 75 / 2,
        borderColor: '#FFF',
        borderWidth: 3,
        overflow: "hidden",
    },
    curSty: {
        color: 'gray',
        fontFamily: 'Poppins-Medium'
    },
    balSty: {
        color: '#fcad50',
        fontFamily: 'Poppins-Bold',
        fontSize: 17
    },
    balance: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        paddingBottom: 10,
        padding: 10
    },
    transfer: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
    },
    gradsty: {
        borderRadius: 10,
        paddingVertical: 5
    },
    paytypesty: {
        textAlign: 'center',
        paddingTop: 10,
        fontSize: 10,
        color: '#000',
        fontFamily: 'Poppins-Medium'
    },
    transferbox: {
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: 30,
        borderRadius: 1,
        elevation: 2,
        shadowColor: 'lightgrey',
        shadowOffset: { width: -0.5, height: 0.5 },
        shadowOpacity: 0.2,
        shadowRadius: 1
    },
    transferbox2: {
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: 30,
        borderRadius: 0,
        elevation: 2,
        shadowColor: 'lightgrey',
        shadowOffset: { width: -0.5, height: 0.5 },
        shadowOpacity: 0.2,
        shadowRadius: 1
    },
    shoppingCotainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 40,
        marginVertical: 10,
    },
    shoppingbody: {
        flex: 0.6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    shoppingtxt: {
        backgroundColor: '#FFF',
        padding: 10,
        alignItems: 'center',
        borderRadius: 50,
    },
    shoptxt: {
        fontFamily: 'Poppins-Regular',
        paddingLeft: 15,
        fontSize: 13
    },
    notifiheader: {
        flex: 0.2,
        backgroundColor: "#fff",
        margin: 10,
        overflow: "hidden",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        elevation: 10,
        shadowColor: 'lightgrey',
        shadowOffset: { width: -0.5, height: 0.5 },
        shadowOpacity: 0.2,
        shadowRadius: 1
    },
    debited: {
        fontSize: 8,
        paddingVertical: 2,
        color: 'green',
        textAlign: 'center'
    },
    userimg: {
        width: 40,
        height: 40,
        resizeMode: "contain"
    },
    userdetails: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center'
    },
    paymentsty: {
        flex: 0.4,
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },
    promoSty: {
        fontFamily: 'Poppins-Bold',
        marginHorizontal: 20,
        margin: 5,
        fontSize: 16
    },
})

function  mapStateProps(state){
    return{
        userW:state.userW,
        agentW:state.agentW,
        agentC:state.agentC
    }
 }

 function mapDispatchProps(dispatch){
    
    return{
     getCustomerWallet: (response) => dispatch({
        type: 'CUSTOMER_WALLET',
        payload: response
     }),
     getAgentWallet: (response) => dispatch({
         type: 'AGENT_WALLET',
         payload: response
        }),
    
    getAgentCurrency: (response) => dispatch({
        type: 'AGENT_CURRENCY',
        payload: response
        }),
    }
 }


export default connect(mapStateProps,mapDispatchProps)(HomeScreen)