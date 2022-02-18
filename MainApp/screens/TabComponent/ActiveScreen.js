import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView,StatusBar,Picker,Alert} from "react-native";
import Icon from '../../common/icons';
import LinearGradient from 'react-native-linear-gradient';
import { Table, Row, Rows } from 'react-native-table-component';
import Theme from '../../styles/Theme';
import Spinner from 'react-native-loading-spinner-overlay';
import Constant from "../../components/Constant";
import AsyncStorage from '@react-native-community/async-storage';

export default class ActiveScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            CountryList: [],
            currentLabel: 'Select your currency',
            rateType:1,
            from:"",
            to:"",
            amount:"",
            rate:"",
            spinner: true,
            switchValue: false ,
            showRate: false,
            tableHead: ['Type','Dollar', 'C/Rate', 'Local'],
            tableData: [
                ['','', '',''],
                ['','', '',''],
            ]
        };
    }

    async componentDidMount() {

        try {
       
            // const CountryApiCall = await fetch(Constant.URL+Constant.getCOUNTRY);
            // const getCountry = await CountryApiCall.json();
            // console.log("getCountry",getCountry)
            // this.setState({CountryList: getCountry, spinner: false});
        } catch(err) {
            console.log("Error fetching data-----------", err);
        }
    }


    onPressRate = () => {
        this.setState({ spinner: true });
    // post method
    // fetch(Constant.URL+Constant.getRATE,{
    //   method: 'POST',
    //   body: JSON.stringify({ 
    //         amount: this.state.amount,
    //         rateType: this.state.rateType,
    //         to: this.state.to,
    //         from: this.state.from})
    //     })
    //     .then((response) => response.json())
    //     .then((result) => {
    //         console.log("allrest",result);
    //   this.setState({
    //           spinner: false,
    //       dataSource: result,
    //     });
    
    //     console.log(this.state.dataSource.data);
    //     if(this.state.dataSource.code==200){
         
    //     this.setState({rate:this.state.dataSource.data.rate ,
    //         amt:this.state.dataSource.data.amount,
    //         from_currency:this.state.dataSource.data.from_currency,
    //         to_currency:this.state.dataSource.data.to_currency,
    //         tableData:[['*',this.state.dataSource.data.dollar_rate_1 ,this.state.dataSource.data.cov_rate,this.state.dataSource.data.local_rate_1],['÷',this.state.dataSource.data.dollar_rate_2,this.state.dataSource.data.cov_rate,this.state.dataSource.data.local_rate_2]],
    //         spinner: false ,
    //         showRate: true });
    //     console.log("rate",this.state.dataSource.data);
        
    //     }else{
    //       this.setState({ spinner: false });
    //       Alert.alert(this.state.dataSource.data.message);
    //     }
        
    //    }).catch(function (error) {
    //     this.setState({ spinner: false });
    //    console.log("-------- error ------- "+error);
    //    alert("result:"+error)
    //    });
    
    //end post method
        
      }



    send = () => {
        this.props.navigation.navigate("LoginScreen");
    }
    render() {
  
        return (
            <View style={{ flex: 1, backgroundColor: Theme.bgcolor }}>
             <Spinner
                visible={this.state.spinner}
                overlayColor={'rgba(0, 0, 0, 0.8)'}
                />
              <StatusBar backgroundColor="#020cab" barStyle="light-content" />
                <ScrollView>
                    <View style={styles.headContainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Icon family="MaterialIcons" name="arrow-back" size={25} color="#FFF" />
                        </TouchableOpacity>
                        <Text style={styles.headTxt}>Rate Center</Text>
                    </View>

                    <View style={styles.transferbox}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }} >
        <Text style={styles.paidTxt}> Rate Center Conversation </Text>
                            
                        </View>
                    
                     
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, paddingHorizontal: 15 }}>
                             <Text  style={{ flex: 0.9, paddingLeft: 10 }} >From</Text>  
                            <Picker  style={{ flex: 0.9, paddingLeft: 130 }}  
                            selectedValue={this.state.from}  
                            onValueChange={(itemValue, itemPosition) => this.setState({from: itemValue, fromIndex: itemPosition})} >
                            {
                            this.state.CountryList.map( (v)=>{
                            return <Picker.Item label={v.country +" - "+ v.currency }  value={v.country_id} />
                            })
                            } 
 
                            </Picker>  
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, paddingHorizontal: 15 }}>
                            <Text  style={{ flex: 0.9, paddingLeft: 10 }} >To</Text> 
                            <Picker  style={{ flex: 0.9, paddingLeft: 130 }}  
                            selectedValue={this.state.to}  
                            onValueChange={(itemValue, itemPosition) => this.setState({to: itemValue, toIndex: itemPosition})}   >  
                            {
                                this.state.CountryList.map( (v)=>{
                                return <Picker.Item label={v.country +" - "+ v.currency }  value={v.country_id} />
                                })
                                } 
                            </Picker> 
                        </View>
                     

                        {this.state.showRate ? ( <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 10  }} >
                        {/* <Icon style={{ padding: 1 }} family="Feather" name="arrow-down" size={30} color="#020cab" /> */}
                            
                        <View style={styles.container}>
                            <Table borderStyle={{borderWidth: 1, borderColor: '#c8e1ff'}}>
                            <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
                            <Rows data={this.state.tableData} textStyle={styles.text} />
                            </Table>
                        </View>

                        </TouchableOpacity> ): null}


                        <TouchableOpacity style={{ marginHorizontal: 20, paddingVertical: 20 }} onPress={this.onPressRate}>
                        <View style={styles.signContainer}>
                                <Text style={styles.signinTxt}>Get  Rate</Text>
                            </View>
                        </TouchableOpacity> 

                    
                        
                    </View>
            
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#020cab',
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
        paddingHorizontal: 15,
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
        padding: 10,
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
    pickerStyle:{  
        height: 150,  
        width: "80%",  
        color: '#344953',  
        justifyContent: 'center',  
    } ,
    container: { flex: 1, padding: 10, paddingRight:2, paddingTop: 30, backgroundColor: '#fff',  },
    head: { height: 40, backgroundColor: '#f1f8ff' },

    text: { margin: 6}
})

