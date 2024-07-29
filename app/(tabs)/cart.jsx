import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { cartData } from './data';
import Icon from 'react-native-vector-icons/FontAwesome';

const Cart = () => {
  const [cart, setCart] = useState(cartData);

  const increaseQuantity = (id) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decreaseQuantity = (id) => {
    setCart(cart.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.item,{borderWidth:1,borderColor:"black",borderRadius:10}]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={[styles.details,{padding:3,}]}>
        <Text style={styles.productName}>{item.productName}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>{item.price} RS.</Text>
        <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
            <Icon name="plus-circle" size={30} color="green" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
            <Icon name="minus-circle" size={30} color="orange" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removeItem(item.id)}>
            <Icon name="trash" size={30} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
        <View><Text  style={{ fontSize:20,fontWeight:600,textAlign:"center",marginBottom:10}}>Cart Items</Text></View>
      <TouchableOpacity onPress={clearCart} style={styles.clearCartButton}>
        <Icon name="trash" size={30} color="red" />
        <Text style={styles.clearCartText}>Clear Cart</Text>
      </TouchableOpacity>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <View style={styles.subtotal}>
        <Text style={styles.subtotalText}>Subtotal: ${getSubtotal().toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 20,
    
    alignItems:"center",
    paddingStart:0
  },
  image: {
    width: 100,
    height: "100%",
    marginRight: 10,
    borderRadius:10,
    borderEndEndRadius:0
  },
  details: {
    flex: 1,
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
  price: {
    fontSize: 16,
    color: 'green',
  },
  quantity: {
    fontSize: 14,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  clearCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  clearCartText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  subtotal: {
    marginTop: 20,
    alignItems: 'center',
  },
  subtotalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Cart;
