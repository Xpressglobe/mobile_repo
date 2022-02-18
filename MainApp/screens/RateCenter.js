import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList,StatusBar } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../common/icons';
import Theme from "../styles/Theme";
import Spinner from 'react-native-loading-spinner-overlay';
import Constant from "../components/Constant";
import AsyncStorage from '@react-native-community/async-storage';


export default class RateCenter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rateList: [],
            spinner: true,
            personal_info_id:"",
            cus_img: "../assets/img/boy.png",
            c_type : this.props.navigation.getParam('c_type', '8'),
            text: '',
        }
        this.arrayholder = [];
    }


    SearchFilterFunction(text) {
        // console.log()
       const newData = this.arrayholder.filter(function(item) {
          //applying filter for the inserted text in search bar
          const itemData = `${item.tr_date} ${item.currency} `;
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });

        this.setState({
          rateList: newData,
          text: text,
        });
      }

    async componentDidMount() {
        this.setState({ personal_info_id: await AsyncStorage.getItem('@personal_info_id'),
        // getFrom: await AsyncStorage.getItem('@getFrom'),
        token: await AsyncStorage.getItem("@token"),
    }); 
       
    

        try {

            const headers = {
                "Authorization": "Bearer "+ this.state.token,
                "Content-Type": "application/json",
                "Accept": "application/json",
            };

           
  
            const RateListApiCall = await fetch(Constant.URL+Constant.getRATE,
                {
                    method: "GET",
                    headers,
                });
            const getRateList = await RateListApiCall.json();
              
            this.setState({rateList: getRateList.data, spinner: false},
                function() {
                    this.arrayholder = getRateList.data;
                  } 
                
                );
        } catch(err) {
            console.log("Error fetching data-----------", err);
        }
    }

    _renderTransfer(rowdata) {
        return (
            <TouchableOpacity 
            // onPress={()=>this.props.navigation.navigate("Users", {
            //     cus_name: rowdata.item.cus_name,
            //     cus_phone: rowdata.item.cus_phone,
            //     cus_email: rowdata.item.cus_email,
            //     cus_adr: rowdata.item.cus_adr,
            //     dial_code: rowdata.item.dial_code,
            //     customer_id: rowdata.item.customer_id,
            //     cc_type:this.state.c_type,
            
              
            //   })}
               >
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row'}}>
                        <View style={styles.imgContainer}>
                            <Image style={styles.userimg} source={require('../assets/img/study.png')} />
                        </View>
                        <View style={styles.userdetails}>
                            <Text style={{ fontSize: 16, color: '#000',fontFamily: 'Poppins-Light' }}>{rowdata.item.country.country} [{rowdata.item.currency}]</Text>
                            <Text style={{ fontSize: 10, color: '#000',fontFamily: 'Poppins-Thin' }}>{rowdata.item.tr_date}</Text>
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
        <Text style={styles.headTxt}>Rate List </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 10, paddingHorizontal: 9 }}>
                        <Icon family="Feather" name="search" size={25} />
                        <TextInput style={{ paddingLeft: 10, fontSize: 16,  flex: 1.6, }}
                           
                            placeholder="Quick Search"
                            onChangeText={text => this.SearchFilterFunction(text)}
                            autoCorrect={false}  
                        />
 
<TouchableOpacity style={{ marginHorizontal: 2, paddingVertical: 8,  alignItems: 'center' }} onPress={() => this.props.navigation.navigate("AddRate")}>
                            <View style={styles.signContainer}>
                                <Text style={styles.signinTxt}>ADD</Text>
                            </View>
                        </TouchableOpacity>
                </View>
                <ScrollView>
                    <FlatList
                        data={this.state.rateList}
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
        backgroundColor: "#020cab",
        marginHorizontal: 10,
        marginVertical: 10,
        width: 30,
        height: 30,
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
    signContainer: {
        backgroundColor: '#020cab',
        padding: 13,
        borderRadius: 50
    },
    signinTxt: {
        textAlign: 'center',
        fontWeight: '600',
        color: '#FFF',
        fontSize: 14
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