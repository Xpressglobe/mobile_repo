import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList,StatusBar } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../common/icons';
import Theme from "../styles/Theme";

import Spinner from 'react-native-loading-spinner-overlay';
import Constant from "../components/Constant";
import AsyncStorage from '@react-native-community/async-storage';


export default class ReceiveContacts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customerList: [ ],
            spinner: true,
            personal_info_id:"",
            cus_img: "../assets/img/boy.png",
            c_type : this.props.navigation.getParam('c_type', '0'),
            income_type : this.props.navigation.getParam('income_type', '0'),
            transaction : this.props.navigation.getParam('transaction', ''),
            text: '',
        }
        this.arrayholder = [];
    }


    SearchFilterFunction(text) {
       
        const newData = this.arrayholder.filter(function(item) {
          //applying filter for the inserted text in search bar
          const itemData = `${item.cus_name.toUpperCase()} ${item.cus_phone.toUpperCase()} `;
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });

        this.setState({
          customerList: newData,
          text: text,
        });
      }

    async componentDidMount() {
        this.setState({ personal_info_id: await AsyncStorage.getItem('@personal_info_id'),
        getFrom: await AsyncStorage.getItem('@getFrom'),
    }); 
       
        try {
   
            const CustomerApiCall = await fetch(Constant.URL+Constant.getCUSTOMERS+"/"+this.state.personal_info_id+"/"+this.state.getFrom);
            const getCustomer = await CustomerApiCall.json();
           
            this.setState({customerList: getCustomer, spinner: false},
                function() {
                    this.arrayholder = getCustomer;
                  } 
                );
        } catch(err) {
            console.log("Error fetching data-----------", err);
        }
    }

    _renderTransfer(rowdata) {
        return (
            
            <TouchableOpacity onPress={()=>this.props.navigation.navigate(this.state.transaction, {
                cus_name: rowdata.item.cus_name,
                cus_phone: rowdata.item.cus_phone,
                customer_id: rowdata.item.customer_id,
                c_type:this.state.c_type,
                income_type:this.state.income_type,
                income:this.state.income,
              
              })} >
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row'}}>
                        <View style={styles.imgContainer}>
                            <Image style={styles.userimg} source={require('../assets/img/boy.png')} />
                        </View>
                        <View style={styles.userdetails}>
                            <Text style={{ fontSize: 18, color: '#000',fontFamily: 'Poppins-Light' }}>{rowdata.item.cus_name}</Text>
                            <Text style={{ fontSize: 10, color: '#000',fontFamily: 'Poppins-Thin' }}>{rowdata.item.cus_phone}</Text>
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
        <Text style={styles.headTxt}> Customers Details </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, paddingHorizontal: 15 }}>
                        <Icon family="Feather" name="search" size={25} />
                        <TextInput style={{ paddingLeft: 10, fontSize: 16 }}
                           
                            placeholder="Quick Search"
                            onChangeText={text => this.SearchFilterFunction(text)}
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
});