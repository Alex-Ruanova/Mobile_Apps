import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import useAxios from 'axios-hooks';

type City = {
    id: number;
    name: string;
    // Additional key to trigger re-render
    key?: number;
};

const WeatherForecast = ({ city, onRefresh, onDelete }: { city: City, onRefresh: (city: City) => void, onDelete: (cityId: number) => void }) => {
    const API_KEY = '5eb78cda8033a521c192c1bee70d27a2';
    const URL = 'https://api.openweathermap.org/data/2.5/weather?q=';

    const [{ data, loading, error }, refetch] = useAxios(
        `${URL}${city.name}&appid=${API_KEY}&units=metric`
    );

    // Function to determine the emoji based on the weather condition
    const getWeatherEmoji = (weatherCondition: string) => {
        switch (weatherCondition.toLowerCase()) {
            case 'clear':
                return '☀️';
            case 'clouds':
                return '☁️';
            case 'rain':
                return '🌧️';
            case 'snow':
                return '❄️';
            default:
                return '🌫️';
        }
    };

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error loading weather forecast!</Text>;

    return (
        <View style={styles.card}>
            <Text style={styles.title}>{city.name} {data && getWeatherEmoji(data.weather[0].main)}</Text>
            {data && (
                <>
                    <Text>Main: {data.weather[0].main}</Text>
                    <Text>Temp: {data.main.temp} °C</Text>
                    <Text>Feels like: {data.main.feels_like} °C</Text>
                    <Text>Humidity: {data.main.humidity}%</Text>
                    <Text>Pressure: {data.main.pressure} hPa</Text>
                    <Text>Max Temp: {data.main.temp_max} °C</Text>
                    <Text>Min Temp: {data.main.temp_min} °C</Text>
                </>
            )}
            <View style={styles.buttonContainer}>
                <Button title="Update" onPress={() => onRefresh(city)} />
                <Button title="Delete" onPress={() => onDelete(city.id)} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 6,
        padding: 15,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
});

export default WeatherForecast;
