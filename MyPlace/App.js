import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    loadMarkers();
  }, []);

  const loadMarkers = async () => {
    try {
      const savedMarkers = await AsyncStorage.getItem('markers');
      if (savedMarkers) setMarkers(JSON.parse(savedMarkers));
    } catch (error) {
      Alert.alert('Error', 'Failed to load markers');
    }
  };

  const handleLongPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    Alert.prompt(
        'New Place',
        'Enter the name of this place',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Save',
            onPress: (title) => addMarker(title, latitude, longitude),
          },
        ],
        'plain-text'
    );
  };

  const addMarker = async (title, latitude, longitude) => {
    const newMarker = { title, latitude, longitude, key: Math.random().toString() };
    const updatedMarkers = [...markers, newMarker];
    setMarkers(updatedMarkers);
    try {
      await AsyncStorage.setItem('markers', JSON.stringify(updatedMarkers));
    } catch (error) {
      Alert.alert('Error', 'Failed to save marker');
    }
  };

  return (
      <View style={styles.container}>
        <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onLongPress={handleLongPress}
        >
          {markers.map((marker) => (
              <Marker
                  key={marker.key}
                  coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                  title={marker.title}
              />
          ))}
        </MapView>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default App;
