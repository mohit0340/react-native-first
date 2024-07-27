import React, { createContext, useState } from 'react';
import { StyleSheet, View,ToastAndroid } from 'react-native';
import axios from "axios";

export const MainContext=createContext()
const Context = ({children}) => {
const [product,setProduct]=useState('')
const [user,setUser]=useState('')
const localpath='192.168.1.10'


const LoginUser=()=>{

}

const RegisterUser=async(formData)=>{
    try {
        const res = await axios.post(
          `http://localhost:5000/api/users/register`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (res.status === 200) {
       
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





    return (
        <MainContext.Provider value={{product,user,LoginUser,RegisterUser}}>
                {children}
        </MainContext.Provider>
    
    );
}

const styles = StyleSheet.create({})

export default Context;
