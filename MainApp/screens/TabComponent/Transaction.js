import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList,TextInput } from 'react-native';
import Theme from '../../styles/Theme';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from '../../common/icons';
import Constant from "../../components/Constant";
import AsyncStorage from '@react-native-community/async-storage';
export default class TransferScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customerList: [ ],
            spinner: true,
            personal_info_id:"",
            cus_img: "../../assets/img/boy.png"
        }
    }

    async componentDidMount() {
        this.setState({
            personal_info_id: await AsyncStorage.getItem('@personal_info_id'),
            getCurrency: await AsyncStorage.getItem('@getCurrency'),
            getFrom: await AsyncStorage.getItem('@getFrom'),
            token: await AsyncStorage.getItem("@token"),


        });
        // try {
   
        //     const CustomerApiCall = await fetch(Constant.URL+Constant.TransHistory+"/"+this.state.personal_info_id+"/"+this.state.getFrom);
        //     const getCustomer = await CustomerApiCall.json();
          
        //     this.setState({customerList: getCustomer, spinner: false});
        // } catch(err) {
        //     console.log("Error fetching data-----------", err);
        // }

        const headers = {
            "Authorization": "Bearer "+ this.state.token,
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

       

       

      

        try {

            const CustomerApiCall = await fetch(Constant.URL + "credits/cash",
            {
                method: "GET",
                headers,
            });
            const getCustomer = await CustomerApiCall.json();
          
            console.log("getCustomer",getCustomer)
          
          
            this.setState({customerList: getCustomer.data, spinner: false});
        } catch (err) {
            console.log("Error fetching data-----------",err);
        }
    }
 _renderTransfer(rowdata) {
        return (
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("")} >
                <View style={styles.transferbox}>
                    <View style={styles.flexrow}>
                        <View style={styles.imgContainer}>
                            <Image style={styles.userimg} source={require('../../assets/img/boy.png')} />
                        </View>
                        <View style={styles.flexrow}>
                            <View style={styles.userdetails}>
                            <Text style={{fontSize: 15,color: '#000',fontFamily: 'Poppins-Light'}}>{rowdata.item.cus_name}</Text>
                                <Text style={{fontSize: 10,color: '#000',fontFamily: 'Poppins-Light'}}>{rowdata.item.c_ref}</Text>
                                {rowdata.item.type == 4 ? (
                              
                                <Text style={{ fontSize: 9, color: 'orange', fontFamily: 'Poppins-Thin' }}>Cash  Return </Text>
                            
                                ):null}
                                {rowdata.item.type == 0 && rowdata.item.status == 0  ? (
                                <Text style={{ fontSize: 9, color: 'orange', fontFamily: 'Poppins-Thin' }}> Cash Send Pending </Text>
                                ):null}
                                 {rowdata.item.type == 0 && rowdata.item.status == 1  ? (
                                <Text style={{ fontSize: 9, color: 'green', fontFamily: 'Poppins-Thin' }}> Cash Send </Text>
                                ):null}
                                  {rowdata.item.status == 2 ? (
                                <Text style={{ fontSize: 9, color: 'red', fontFamily: 'Poppins-Thin' }}> Cash Reverse </Text>
                                ):null}
                                  {rowdata.item.type == 1 ? (
                                <Text style={{ fontSize: 9, color: 'green', fontFamily: 'Poppins-Thin' }}> Cash Credit to Customer </Text>
                                ):null}
                                 {rowdata.item.type == 6 ? (
                                <Text style={{ fontSize: 9, color: 'orange', fontFamily: 'Poppins-Thin' }}> Cash Borrow </Text>
                                ):null}
                                {rowdata.item.type == 3 ? (
                                <Text style={{ fontSize: 9, color: 'orange', fontFamily: 'Poppins-Thin' }}> Cash Income </Text>
                                ):null}
                                   {rowdata.item.type == 7 ? (
                                <Text style={{ fontSize: 9, color: 'orange', fontFamily: 'Poppins-Thin' }}> Cash Expenses </Text>
                                ):null}
                                {rowdata.item.type == 5 ? (
                                <Text style={{ fontSize: 9, color: 'orange', fontFamily: 'Poppins-Thin' }}> Cash Transfer </Text>
                                ):null}

                                <Text style={{ fontSize: 9, color: '#000', fontFamily: 'Poppins-Thin' }}>{rowdata.item.a_date}</Text>
                            </View>
                        </View>
                        <View style={styles.paymentsty}>
                            <Text style={styles.amountSty}>{this.state.getCurrency} {rowdata.item.amount}</Text>
                            <Text style={{ fontSize: 9, color: 'red', fontFamily: 'Poppins-Thin' }}>{rowdata.item.reason}</Text>
                            {/* <Text >{rowdata.item.t_type}</Text> */}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Theme.bgcolor }}>
                <View style={{ padding: 10, paddingLeft: 15 }}>
                    <Text style={{ fontSize: 18, fontFamily: 'Poppins-Bold' }}>Transaction History</Text>
                </View>
                
                <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, paddingHorizontal: 15 }}>
                        <Icon family="Feather" name="search" size={25} />
                        <TextInput style={{ paddingLeft: 10, fontSize: 16 }}
                           
                            placeholder="Quick Search"
                            // onChangeText={text => this.searchFilterFunction(text)}
                            autoCorrect={false}  
                        />
                </View>
                <ScrollView>
                    <FlatList
                         data={this.state.customerList}
                         renderItem={this._renderTransfer.bind(this)}
                    />
                </ScrollView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    flexrow: {
        flex: 1,
        flexDirection: 'row'
    },
    transferbox: {
        flex: 1,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 15
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
    debited: {
        fontSize: 10,
        paddingVertical: 2,
        color: 'green',
        textAlign: 'center',
        fontFamily:'Poppins-Regular'
    },
    amountSty:{ 
        color: '#fcad50', 
        fontSize: 14, 
        fontFamily: 'Poppins-Light' 
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
        flex: 0.9,
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    }

})