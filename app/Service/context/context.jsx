import React, { createContext, useEffect, useState } from 'react';
import { StyleSheet, View,ToastAndroid } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const MainContext=createContext()
const Context = ({children}) => {
const [product,setProduct]=useState('')
const [user,setUser]=useState('')
const localpath='https://orange-keys-hear.loca.lt'


const UserLogin = async (values) => {
  try {
    const res = await axios.post(`${localpath}/api/users/login`, values);

    if (res.status === 200) {
      console.log(res.data);
      ToastAndroid.show(res.data.message, ToastAndroid.SHORT);

      // Store the token in AsyncStorage
      await AsyncStorage.setItem('token', res.data.token);

      // Confirm the token is set by retrieving it
      const token = await AsyncStorage.getItem('token');
      console.log('Stored token:', token);

      return true;
    } else {
      ToastAndroid.show('Login failed', ToastAndroid.SHORT);
      console.log("Login failed");
      return false;
    }
  } catch (err) {
    console.log(err.response?.data?.message || err.message);
    ToastAndroid.show('Login failed', ToastAndroid.SHORT);
    return false;
  }
};

const RegisterUser=async(formData)=>{

    try {
        const res = await axios.post(
          ` ${localpath}/api/users/register`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (res.status == 200) {
       
          ToastAndroid.show('Registered Succesfully', ToastAndroid.SHORT);
         
          return true;
        } else {
       
          console.log("Registration failed");
          ToastAndroid.show('Registered Failed', ToastAndroid.SHORT);
          return false;
        }
      } catch (err) {
        ToastAndroid.show(`${err?.response?.data?.message || err.message}`, ToastAndroid.SHORT);
        console.log(err.response?.data?.message || err.message);
        console.log(err)
      
        return false;
      }
}

const getProducts = async (categoryval = '', searchterm = '') => {
  setProgress(true);

  try {
    let res = await axios.get('http://localhost:5000/api/products/', {
      params: {
        category: categoryval !== 'all' ? categoryval : '', // Default to empty if 'all'
        searchTerm: searchterm
      }
    });


    if (res.status === 200) {
      setProgress(false);
      setProduct(res.data.products);
      console.log(res);
      return true;
    } else {
      setProgress(false);
      return false;
    }
  } catch (err) {
    console.log(err);
    setProgress(false);
    return false;
  }
};









    return (
        <MainContext.Provider value={{product,getProducts,user,UserLogin,RegisterUser}}>
                {children}
        </MainContext.Provider>
    
    );
}

const styles = StyleSheet.create({})

export default Context;
