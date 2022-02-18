import AsyncStorage from '@react-native-community/async-storage';
//const URL = "http://192.168.88.68/king/portal/";
//const URL = "http://192.168.1.168/king/portal/";
const URL = "https://test.xpressglobe.com/api/";
// ./gradlew assembleRelease
// const URL = "https://kingokagroup.com/";

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

const LOGIN = "login";
const SENDCODE = "users/emails/send-code";
const VERIFYCODE = "users/emails/verify-code";
const getCOUNTRY = "countries";
const getRATE = "rates";
const addCUSTOMER = "customers";
const updateCUSTOMER = "customers/";
const getCUSTOMERS = "customers";
const getUSER = "me";
const getMarkupSetting = "settings/markup";
const getRateSetting = "settings/rates";
const getPecentageRate = "settings/percentages/";
const getTRANSFER = "payouts";


const addCREDIT = "MobileApi/addCredit";
const getCusBal = "customers";
const getAgBal = "me/wallet-balance";
const getHistory = "MobileApi/getHistory";
const getBEN = "MobileApi/getBen";
const getBENID = "MobileApi/getBenID";
const getAGENT = "MobileApi/getAgent";
const addTRANSFER = "MobileApi/addTransfer"

const CPAYOUT = "MobileApi/Cpayout";
const RPAYOUT = "MobileApi/Rpayout";
const TRPAYOUT = "MobileApi/TRpayout";
const getBANKS = "MobileApi/getBanks";
const getBanksExclude = "MobileApi/getBanksExclude";
const getPERCENT = "settings/percentages";
const getOTHERWALLET = "MobileApi/OtherWallet";
const addINCOME = "MobileApi/addIncome";
const addEXPENSES = "MobileApi/addExpenses";
const addAgentTransfer = "MobileApi/addAgentTransfer";
const TransferPending = "MobileApi/TransferPending";
const ConfirmTransfer = "MobileApi/ConfirmTransfer";
const debitWallet = "MobileApi/debitWallet";
const debtorPay = "MobileApi/debtorPay";
const getCountryMain = "MobileApi/getCountryMain";
const TransHistory = "MobileApi/TransHistory";
const UpdateToken = "MobileApi/UpdateToken";
const getAgentCountryWallet = "MobileApi/getAgentCountryWallet"
const getProfitRate = "MobileApi/getProfitRate";
const getRateSet = "MobileApi/getRateSet";
const getRateSetUSD = "MobileApi/getRateSetUSD";
const getCharges = "leApi/getCharges";


export default {
    headers,
    URL,
    LOGIN,
    SENDCODE,
    VERIFYCODE,
    getCOUNTRY,
    getRATE,
    addCUSTOMER,
    updateCUSTOMER,
    getCUSTOMERS,
    getUSER,
    getMarkupSetting,
    getRateSetting,
    getPecentageRate,




    addCREDIT,
    getCusBal,
    getHistory,
    getBEN,
    getBENID,
    getAGENT,
    addTRANSFER,
    getTRANSFER,
    CPAYOUT,
    RPAYOUT,
    TRPAYOUT,
    getBANKS,
    getAgBal,
    getPERCENT,
    getOTHERWALLET,
    addINCOME,
    addEXPENSES,
    addAgentTransfer,
    TransferPending,
    ConfirmTransfer,
    debitWallet,
    debtorPay,
    getCountryMain,
    TransHistory,
    UpdateToken,
    getAgentCountryWallet,
    getProfitRate,
    getRateSet,
    getRateSetUSD,
    getBanksExclude,
    getCharges,

    numberFormate(price,sign = "") {

        //return '' + x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        if (price == "") {
            return 0.00
        }
        const pieces = parseFloat(price).toFixed(2).split('')
        let ii = pieces.length - 3
        while ((ii -= 3) > 0) {
            pieces.splice(ii,0,',')
        }
        return sign + pieces.join('')

    },





    rawNumber(x) {
        if (x == 0) {
            return x
        } else {
            return parseFloat(x.replace(/,/g,''))
        }

    },
    async removeAsyncValue(key) {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        } catch (exception) {
            return false;
        }
    },
    async SetAsyncValue(key,value) {
        try {
            await AsyncStorage.setItem(key,value);
        } catch (e) {
            return false;
        }
    },

    async GetAsyncValue(key) {
        try {
          return  await AsyncStorage.getItem(key);
        
        } catch (e) {
            return false;
        }
    },


    CheckRoundUP(num) {
        if ((num % 1) > 0.5) {
            return num
        } else {
            return num
        }

    },

    naiveRound(num,decimalPlaces = 0) {
        if (decimalPlaces == 0) {
            return num
        } else if (decimalPlaces == 1) {
            return Math.trunc(num)
        } else {
            var p = Math.pow(10,decimalPlaces);
            return Math.round(num * p) / p;
        }
    }


};