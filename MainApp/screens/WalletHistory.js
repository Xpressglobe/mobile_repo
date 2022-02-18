import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList,StatusBar } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../common/icons';
import Theme from "../styles/Theme";
import Spinner from 'react-native-loading-spinner-overlay';
import Constant from "../components/Constant";
import AsyncStorage from '@react-native-community/async-storage';


export default class WalletHistory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customerList: [ ],
            spinner: true,
            personal_info_id:"",
            cus_img: "../assets/img/boy.png",
            c_type : this.props.navigation.getParam('c_type', '0'),
        }
    }

    async componentDidMount() {
        this.setState({ personal_info_id: await AsyncStorage.getItem('@personal_info_id')}); 
       
        try {
   
            const CustomerApiCall = await fetch(Constant.URL+Constant.getOTHERWALLET+"/"+this.state.personal_info_id);
            const getCustomer = await CustomerApiCall.json();
           
            this.setState({customerList: getCustomer, spinner: false});
        } catch(err) {
            console.log("Error fetching data-----------", err);
        }
    }

    _renderTransfer(rowdata) {
        return (
            <TouchableOpacity>
                <View style={styles.transferbox}>
                    <View style={styles.flexrow}>
                        <View style={styles.imgContainer}>
                        <Icon family="FontAwesome" name="money"  size={22} />
                        </View>
                        <View style={styles.flexrow}>
                            <View style={styles.userdetails}>
                                <Text style={{fontSize: 15,color: '#000',fontFamily: 'Poppins-Light'}}>{rowdata.item.cur_x}</Text>
                                <Text style={{ fontSize: 20, color: '#000', fontFamily: 'Poppins-Thin' }}>{Constant.numberFormate(rowdata.item.c_bal)}</Text>
                            </View>
                        </View>
                        <View style={styles.paymentsty}>
                           
                            <Text style={styles.debited}>{rowdata.item.cur_x}</Text>
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
        <Text style={styles.headTxt}>Wallet Balance </Text>
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
        fontSize: 20, 
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