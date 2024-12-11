import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color} from 'react-native-elements/dist/helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StudentList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;
  const fetchProducts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
      );
      const data = await response.json();
      console.log('dsfdsfdfdsfd', data);
      if (data?.products?.length > 0) {
        setProducts(prevProducts => [...prevProducts, ...data.products]);
        setHasMore(data.products.length === limit);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };
  const logOut = async () => {
    try {
      const res = await AsyncStorage.removeItem('email');
      const ress = await AsyncStorage.removeItem('password');
      console.log('first', res, ress);
    } catch (error) {}
  };
  useEffect(() => {
    fetchProducts();
  }, [skip]);
  const loadMoreData = () => {
    if (hasMore) {
      setSkip(prevSkip => prevSkip + limit);
    }
  };
  const renderItem = ({item}) => (
    console.log('gf', item),
    (
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{uri: item.thumbnail}}
          style={{height: 100, width: 100}}
        />
        <View style={{justifyContent: 'center'}}>
          <Text>{item.title}</Text>
          <Text>{item.category}</Text>
        </View>
      </View>
    )
  );
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}>
        <Text style={{alignSelf: 'center', fontSize: 20}}>Products</Text>
        {/* <Text
          style={{alignSelf: 'center', fontSize: 20, color: 'red'}}
          onPress={logOut}>
          Log out
        </Text> */}
      </View>
      {loading && products?.length === 0 ? (
        <ActivityIndicator />
      ) : (
        <>
          <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            onEndReached={loadMoreData}
          />
          {loading && (
            <ActivityIndicator
              size="large"
              style={{
                height: 50,
                width: 50,
                marginVertical: 20,
                alignSelf: 'center',
              }}
            />
          )}
        </>
      )}
    </View>
  );
};

export default StudentList;

const styles = StyleSheet.create({});
