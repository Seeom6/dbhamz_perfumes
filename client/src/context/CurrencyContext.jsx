import React, { createContext, useEffect, useState } from "react";
import { useGetMe } from './../utils/Api/AuthenticationEndPoint';

// Create a context for currency
export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [isLogin , setIsLogin] = useState(false)
  const [userData , setUserData] = useState({})
  const [currency, setCurrency] = useState("KWD"); // Default currency

  const updateCurrency = (newCurrency) => {
    setCurrency(newCurrency);
  };

  const {data : myAuth  , isSuccess , isError} = useGetMe()

  useEffect(()=>{
    if(isError){
      setIsLogin(false)
    }
    if(isSuccess){
      setIsLogin(true)
      setUserData(myAuth)
    }
  },[myAuth , isSuccess , isError])

  return (
    <CurrencyContext.Provider value={{ currency, updateCurrency ,userData , isLogin }}>
      {children}
    </CurrencyContext.Provider>
  );
};