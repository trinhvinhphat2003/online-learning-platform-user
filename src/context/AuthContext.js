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
      if (userDataAsync !== null && sessionAsync !== null) {
        const sessionAfterParse = JSON.parse(sessionAsync);
        const userDataAfterParse = JSON.parse(userDataAsync);
        const currentTime = new Date().getTime();
        console.log(sessionAfterParse.expires_at > currentTime)
        if (sessionAfterParse.expires_at > currentTime) {
          setUserData(userDataAfterParse);
          setSession(sessionAfterParse);
          setIsLogin(true);
        }
      }
      console.log("Async")
      console.log(JSON.stringify(JSON.parse(userDataAsync), undefined, 4))
      console.log(JSON.stringify(JSON.parse(sessionAsync), undefined, 4))
    };

    checkUserSession();
  }, []);

  const login = async (userInfo, sessionInfo) => {
    setUserData(userInfo);
    setSession(sessionInfo)
    console.log(JSON.stringify(userInfo, undefined, 4))
    console.log(JSON.stringify(sessionInfo, undefined, 4))
    await AsyncStorage.setItem('userData', JSON.stringify(userInfo));
    await AsyncStorage.setItem('session', JSON.stringify(sessionInfo));
    const userDataAsync = await AsyncStorage.getItem('userData');
    const sessionAsync = await AsyncStorage.getItem('session');
    console.log(JSON.stringify(JSON.parse(userDataAsync), undefined, 4))
    console.log(JSON.stringify(JSON.parse(sessionAsync), undefined, 4))
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