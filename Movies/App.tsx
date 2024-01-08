// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MoviesListScreen from './MovieListScreen';
import MovieDetailScreen from './MovieDetailScreen';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="MoviesList" component={MoviesListScreen} />
                <Stack.Screen name="MovieDetails" component={MovieDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
