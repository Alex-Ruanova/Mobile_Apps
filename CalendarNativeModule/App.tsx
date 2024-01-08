import React from 'react';
import { View } from 'react-native';
import NewModuleButton from './NewModuleButton'; // Ajusta la ruta según corresponda

const App: React.FC = () => {
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <NewModuleButton />
      </View>
  );
};

export default App;
