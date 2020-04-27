import React , {createContext , useReducer} from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

//initial state
const initialState={
    transactions: [],
    error:null,
    loading:true
};

//create global context
export const GlobalContext = createContext(initialState);

//provider component
export const GlobalProvider = ({children}) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //actions

  async function getTransaction(){
      try {
        const res= await axios.get('/api/v1/transactions');
        dispatch({
          type:'GET_TRANSACTION',
          payload:res.data.data
        });
      } catch (err) {
        dispatch({
          type:'TRANSACTION_ERROR',
          payload:err.response.data.error
        });
      }
  }

 async function deleteTransaction(id){
    try {
      await axios.delete(`/api/v1/transactions/${id}`);
      dispatch({
        type : 'DELETE_TRANSACTION',
        payload:id
      });
    } catch (err) {
      dispatch({
        type:'TRANSACTION_ERROR',
        payload:err.response.data.error
      });
    }
  }

  async function addTransaction(transaction){
   const config = {
     headers : {
       'Content-Type':'application/json'
     }
   }
   try {
     const res=await axios.post('/api/v1/transactions',transaction,config);

     dispatch({
      type : 'ADD_TRANSACTION',
      payload: res.data.data
    });
   } catch (err) {
    dispatch({
      type:'TRANSACTION_ERROR',
      payload:err.response.data.error
    });
   }
    
  }
  

  return(
    <GlobalContext.Provider value={{
      transactions:state.transactions,
      error:state.error,
      loading:state.loading,
      getTransaction,
      deleteTransaction,
      addTransaction
      }}>
      {children}
    </GlobalContext.Provider>
  );
}
