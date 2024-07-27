

import React, { useContext } from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { MainContext } from '../Service/context/context';

const Index = () => {

    const {user}=useContext(MainContext)
   
    
    return (
        <View>
          <Text>  This is root Home </Text>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Index;

