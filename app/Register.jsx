import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  firstname: Yup.string().min(3, 'First name must be at least 3 characters').required('First name is required'),
  lastname: Yup.string().min(3, 'Last name must be at least 3 characters').required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[!@#\$%\^&\*]/, 'Password must contain at least one special character')
    .required('Password is required'),
  mobile: Yup.string().required('Mobile number is required'),
  image: Yup.string().required('Image is required'),
});

const Register = () => {
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const pickImage = async (setFieldValue) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setFieldValue('image', result.assets[0].uri);
    }
  };

  const handleRegister = (values) => {
    // Add your registration logic here (e.g., API call)
    Alert.alert('Registration Successful', JSON.stringify({ ...values, image }, null, 2));
  };

  return (
    <ScrollView>
      <Formik
        initialValues={{ firstname: '', lastname: '', email: '', password: '', mobile: '', image: '' }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
          <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              onChangeText={handleChange('firstname')}
              onBlur={handleBlur('firstname')}
              value={values.firstname}
            />
            {touched.firstname && errors.firstname && <Text style={styles.error}>{errors.firstname}</Text>}
            
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              onChangeText={handleChange('lastname')}
              onBlur={handleBlur('lastname')}
              value={values.lastname}
            />
            {touched.lastname && errors.lastname && <Text style={styles.error}>{errors.lastname}</Text>}
            
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
            
            <View style={[styles.passwordContainer,{marginBottom:"0"}]} >
              <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={!showPassword}
              />
            

              <TouchableOpacity
                style={styles.showButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color="black" />
              </TouchableOpacity>
            </View>
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
            
            
            <TextInput
              style={styles.input}
              placeholder="Mobile"
              onChangeText={handleChange('mobile')}
              onBlur={handleBlur('mobile')}
              value={values.mobile}
              keyboardType="phone-pad"
            />
            {touched.mobile && errors.mobile && <Text style={styles.error}>{errors.mobile}</Text>}
            <View style={{marginBottom:10}}>
            <Button title="Pick an image from gallery"  onPress={() => pickImage(setFieldValue)}  /></View>
            {touched.image && errors.image && <Text style={styles.error}>{errors.image}</Text>}
            {image && (
              <View style={[styles.imageContainer,{marginBottom:10}]}>
                <Image source={{ uri: image }} style={styles.image} />
              </View>
            )}
            
            <Button title="Register" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: "30%"
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
    width: '100%',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  showButton: {
    position: 'absolute',
    right: 10,
    top:10
  },
  imageContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  error: {
    fontSize: 12,
    color: 'red',
    marginBottom: 8,
  },
});

export default Register;
