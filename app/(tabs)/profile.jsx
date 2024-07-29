import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required('First name is required'),
  lastname: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  mobile: Yup.string().required('Mobile number is required'),
});

const UserProfile = () => {
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    mobile: '',
    avatar: '',
  });

  useEffect(() => {
    // Fetch user data from API
    axios.get('https://api.example.com/user')
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleUpdate = (values) => {
    // Update user data via API
    axios.put('https://api.example.com/user', values)
      .then(response => {
        alert('Profile updated successfully');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Formik
      initialValues={user}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={handleUpdate}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <Image source={{ uri: "data:image/jpeg;base64,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" }} style={styles.avatar} />
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
          />
          {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Mobile"
            onChangeText={handleChange('mobile')}
            onBlur={handleBlur('mobile')}
            value={values.mobile}
          />
          {touched.mobile && errors.mobile && <Text style={styles.error}>{errors.mobile}</Text>}
          <Button title="Update" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default UserProfile;
