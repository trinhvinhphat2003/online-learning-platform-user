// AuthContext.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';

// Tạo context
export const AuthContext = createContext();

// Tạo provider
export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null)
  const [session, setSession] = useState(null)

  useEffect(() => {
    const checkUserSession = async () => {
      const userDataAsync = await AsyncStorage.getItem('userData');
      const sessionAsync = await AsyncStorage.getItem('session');
      if (userData !== null && sessionAsync !== null) {
        const sessionAfterParse = JSON.parse(sessionAsync);
        const userDataAfterParse = JSON.parse(userDataAsync);
        const currentTime = new Date().getTime();
        console.log(session.time > currentTime)
        if (session.time > currentTime) {
          setUserData(userDataAfterParse);
          setToken(sessionAfterParse);
          setIsLogin(true);
        }
      }
      console.log("Async")
      console.log(JSON.stringify(JSON.parse(userDataAsync), undefined, 4))
      console.log(JSON.stringify(JSON.parse(sessionAsync), undefined, 4))
    };

    checkUserSession();
  }, []);

  const login = async () => {
    // console.log(JSON.stringify(userData, undefined, 4))
    // console.log(JSON.stringify(session, undefined, 4))
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
    await AsyncStorage.setItem('session', JSON.stringify(session));
    // const userDataAsync = await AsyncStorage.getItem('userData');
    // const sessionAsync = await AsyncStorage.getItem('session');
    // console.log(JSON.stringify(JSON.parse(userDataAsync), undefined, 4))
    // console.log(JSON.stringify(JSON.parse(sessionAsync), undefined, 4))
    setIsLogin(true);
  };

  const logout = () => {
    setIsLogin(false);
  };

  return (
    <AuthContext.Provider value={{ isLogin, login, logout, setIsLogin, userData, setUserData, setSession, session }}>
      {children}
    </AuthContext.Provider>
  );
};