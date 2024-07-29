import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'expo-router';
import { MainContext } from '../Service/context/context';
import Spinner from 'react-native-loading-spinner-overlay';


const Login = ({ navigation }) => {

const {UserLogin}=useContext(MainContext)
const router =useRouter()
const [spinner,setSpinner]=useState(false)

  const validationSchema = Yup.object().shape({
    // email: Yup.string().email('Invalid email address').required('Email is required'),
    // password: Yup.string().required('Password is required'),
  });

  const handleLogin = async(values) => {
    setSpinner(true)
    // Add your login logic here (e.g., API call)
   const login=await UserLogin(values)
   if(login){
    setSpinner(false)
    router.navigate('/(tabs)/')
   }
   else{
    setSpinner(false)
   }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
          color='#202020'
          
        />
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              secureTextEntry
            />
            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            <Button title="Login" onPress={handleSubmit} />
            <TouchableOpacity onPress={()=>{router.replace('/auth/register')} } style={{ marginTop:20,alignSelf:"flex-end"}}><Text>If you are new Register first</Text></TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#202020'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
  },
});

export default Login;
