import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'expo-router';
import { MainContext } from '../Service/context/context';

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
  mobile: Yup.string().matches(/^\d{10}$/, 'Mobile number must be 10 digits').required('Mobile number is required'),
  avatar: Yup.mixed().required('Image is required'),
});

const Register = () => {
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const {RegisterUser}=useContext(MainContext)
  const router = useRouter();

  const pickImage = async (setFieldValue) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setFieldValue('avatar', result.assets[0].uri);
    }
  };

  const handleRegister = async (values) => {
    const formData = new FormData();
    formData.append('firstname', values.firstname);
    formData.append('lastname', values.lastname);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('mobile', values.mobile);
    if (values.avatar) {
      formData.append('avatar', {
        uri: values.avatar,
    
      });
    }

 RegisterUser(formData)

  
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Formik
        initialValues={{ firstname: '', lastname: '', email: '', password: '', mobile: '', avatar: '' }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
          <View>
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
            
            <View style={styles.passwordContainer}>
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
                <Text>{showPassword ? 'Hide' : 'Show'}</Text>
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
            
            <Button title="Pick an image from gallery" onPress={() => pickImage(setFieldValue)} />
            {touched.avatar && errors.avatar && <Text style={styles.error}>{errors.avatar}</Text>}
            {image && (
              <View style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.image} />
              </View>
            )}
            
            <Button title="Register" onPress={handleSubmit} />
            <TouchableOpacity onPress={() => router.replace('/auth/login')} style={styles.loginLink}>
              <Text>If you are already a user, Login</Text>
            </TouchableOpacity>
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
    padding: 16,
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  showButton: {
    position: 'absolute',
    right: 10,
    top: 10,
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
  loginLink: {
    marginTop: 20,
    alignSelf: 'flex-end',
  },
});

export default Register;
