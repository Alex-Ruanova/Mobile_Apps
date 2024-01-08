import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Button, View, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WeatherForecast from './WeatherForecast'; // Ensure this path is correct

type City = {
  id: number;
  name: string;
  key?: number;
};

const App = () => {
  const [cityName, setCityName] = useState<string>('');
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    storeData();
  }, [cities]);

  const addCity = () => {
    if (cityName.trim()) {
      const newCity: City = { id: Math.random(), name: cityName };
      setCities([...cities, newCity]);
      setCityName('');
    }
  };

  const refreshCityWeather = (city: City) => {
    setCities(cities.map(c => c.id === city.id ? { ...c, key: Math.random() } : c));
  };

  const deleteCity = (cityId: number) => {
    setCities(cities.filter(c => c.id !== cityId));
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('@cities', JSON.stringify(cities));
    } catch (e) {
      console.log("Cities saving error!");
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@cities');
      if(value !== null) {
        setCities(JSON.parse(value));
      }
    } catch (e) {
      console.log("Cities loading error!");
    }
  };

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
              style={styles.input}
              onChangeText={setCityName}
              value={cityName}
              placeholder="Enter city name"
          />
          <Button title="Add City" onPress={addCity} />
        </View>
        <ScrollView>
          {cities.map((city) => (
              <WeatherForecast
                  key={city.id.toString()}
                  city={city}
                  onRefresh={refreshCityWeather}
                  onDelete={deleteCity}
              />
          ))}
        </ScrollView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginRight: 10,
    borderRadius: 4,
  },
});

export default App;
