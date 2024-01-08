import React from 'react';
import { NativeModules, Button } from 'react-native';

const { CalendarModule } = NativeModules;

const NewModuleButton: React.FC = () => {
    const onPress = () => {
        // Asegúrate de que los argumentos pasados a createCalendarEvent sean del tipo correcto
        CalendarModule.createCalendarEvent('testName', 'testLocation');
    };

    return (
        <Button
            title="Click to invoke your native module!"
            color="#841584"
            onPress={onPress}
        />
    );
};

export default NewModuleButton;
