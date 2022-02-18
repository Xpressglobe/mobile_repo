import {combineReducers} from 'redux';

import Nav from './navReducers';
import {usersWallet,agentWallet,agentCurrency} from './wallet';


const AppReducers=combineReducers({
    nav:Nav,
    userW:usersWallet,
    agentW:agentWallet,
    agentC:agentCurrency
});

 
export default AppReducers;