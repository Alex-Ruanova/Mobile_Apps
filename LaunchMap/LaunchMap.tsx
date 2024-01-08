import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const LaunchMap = () => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter latitude"
                keyboardType="numeric"
                value={latitude}
                onChangeText={setLatitude}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter longitude"
                keyboardType="numeric"
                value={longitude}
                onChangeText={setLongitude}
            />
            <MapView
                style={styles.map}
                region={{
                    latitude: parseFloat(latitude) || 0,
                    longitude: parseFloat(longitude) || 0,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
            {/* Add Map Markers or other components here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '80%',
    },
    map: {
        width: '100%',
        height: '70%',
    },
});

export default LaunchMap;
