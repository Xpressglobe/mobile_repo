
const usersWallet = (state = "0.00", action) => {
    switch(action.type) {
       case 'CUSTOMER_WALLET' :
          if (action.payload) {
             return action.payload
          }
       default :
          return state;
    }
   
 }

 const agentWallet = (state = "0.00", action) => {
    switch(action.type) {
       case 'AGENT_WALLET' :
          if (action.payload) {
             return action.payload
          }
       default :
          return state;
    }
   
 }
 
 export{
     usersWallet,
     agentWallet,
 };