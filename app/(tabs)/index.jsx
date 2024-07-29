import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, Image, TouchableOpacity, Button, Modal, ScrollView } from 'react-native';
import { MainContext } from '../Service/context/context';
import { FontAwesome } from '@expo/vector-icons'; // Ensure you have expo/vector-icons installed
import Checkbox from 'react-native-elements'; // Ensure you have expo-checkbox installed
import AsyncStorage from "@react-native-async-storage/async-storage";

const Index = () => {
  const { user, getProducts, product, category, CategoryGet } = useContext(MainContext);
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if (!product) {
      getProducts();
    } else {
      setFilteredProducts(product);
    }
  }, [product]);

  // useEffect(() => {
  //   if (!category) {
  //     CategoryGet();
  //   }
  // }, [category]);

  const addToCart = (product) => {
    // Handle add to cart functionality
    console.log(`${product.name} added to cart`);
  };

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
    filterProducts(search, selectedCategories);
  };

  const filterProducts = (searchTerm, selectedCats) => {
    const filtered = product.filter(p => 
      (selectedCats.length === 0 || selectedCats.includes(p.category)) &&
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleSearchChange = (text) => {
    setSearch(text);
    filterProducts(text, selectedCategories);
  };

useEffect(()=>{
if(!product){
  getProducts()
}
},[product])


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Products</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search products"
          value={search}
          onChangeText={handleSearchChange}
        />
        <TouchableOpacity onPress={() => setIsFilterVisible(true)}>
          <FontAwesome name="filter" size={24} color="black" style={styles.filterIcon} />
        </TouchableOpacity>
      </View>
      {
        product.length>0?(
          <FlatList
          data={Object.keys[product]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.product}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price} RS.</Text>
                <Button title="Add to Cart" onPress={() => addToCart(item)} />
              </View>
            </View>
          )}
        />
        ):(
          <Text>No Product Found</Text>
        )

      }
   
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFilterVisible}
        onRequestClose={() => setIsFilterVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Filter by Category</Text>
            <ScrollView>
              {category && category.map((cat, index) => (
                <View key={index} style={styles.checkboxContainer}>
                  <Checkbox
                    value={selectedCategories.includes(cat.name)}
                    onValueChange={() => toggleCategory(cat.name)}
                  />
                  <Text style={styles.checkboxLabel}>{cat.name}</Text>
                </View>
              ))}
            </ScrollView>
            <Button title="Close" onPress={() => setIsFilterVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  filterIcon: {
    marginLeft: 10,
  },
  product: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: 'green',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
  },
});

export default Index;
