import React from 'react';
import { AppProvider } from './context/AppContext';
import { MainApp } from './MainApp';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
};

export default App;
