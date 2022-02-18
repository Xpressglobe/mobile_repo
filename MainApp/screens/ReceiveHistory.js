import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList,StatusBar } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../common/icons';
import Theme from "../styles/Theme";

import Spinner from 'react-native-loading-spinner-overlay';
import Constant from "../components/Constant";
import AsyncStorage from '@react-native-community/async-storage';


export default class ReceiveHistory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customerList: [ ],
            cus_name : this.props.navigation.getParam('cus_name', 'Name'),
            customer_id: this.props.navigation.getParam('customer_id', '0'),
            spinner: true,
            personal_info_id:"",
            cus_img: "../assets/img/boy.png"
        }
    }

    async componentDidMount() {
        this.setState({ getCurrency: await AsyncStorage.getItem('@getCurrency')}); 
        try {
   
            const CustomerApiCall = await fetch(Constant.URL+Constant.getHistory+"/"+this.state.customer_id);
            const getCustomer = await CustomerApiCall.json();
          
            this.setState({customerList: getCustomer, spinner: false});
        } catch(err) {
            console.log("Error fetching data-----------", err);
        }
    }

    _renderTransfer(rowdata) {
        return (
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("")} >
                <View style={styles.transferbox}>
                    <View style={styles.flexrow}>
                        <View style={styles.imgContainer}>
                            <Image style={styles.userimg} source={require('../assets/img/boy.png')} />
                        </View>
                        <View style={styles.flexrow}>
                            <View style={styles.userdetails}>
                            <Text style={{fontSize: 15,color: '#000',fontFamily: 'Poppins-Light'}}>{this.state.cus_name}</Text>
                                <Text style={{fontSize: 10,color: '#000',fontFamily: 'Poppins-Light'}}>{rowdata.item.msg}</Text>
                                <Text style={{ fontSize: 9, color: '#000', fontFamily: 'Poppins-Thin' }}>{rowdata.item.c_type} Transfer</Text>
                                <Text style={{ fontSize: 9, color: '#000', fontFamily: 'Poppins-Thin' }}>{rowdata.item.s_date}</Text>
                            </View>
                        </View>
                        <View style={styles.paymentsty}>
                            <Text style={styles.amountSty}>{this.state.getCurrency} {rowdata.item.amount}</Text>
                            <Text >{rowdata.item.t_type}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Theme.bgcolor }}>
                 <Spinner
                    visible={this.state.spinner}
                    overlayColor={'rgba(0, 0, 0, 0.25)'}
                    />
                    
               <StatusBar backgroundColor="#020cab" barStyle="light-content" />
                <View style={styles.headContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon family="MaterialIcons" name="arrow-back" size={25} color="#FFF" />
                    </TouchableOpacity>
        <Text style={styles.headTxt}>Credit History {this.state.cus_name}</Text>
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
    container: {
        paddingHorizontal: 20,
    },
    txtStl: {
        flex: 0.9,
        color: 'black',
        paddingLeft: 5,
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
        paddingLeft:10,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: 'lightgray'
    },
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
});