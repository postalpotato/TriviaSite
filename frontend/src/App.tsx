import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { AppProvider } from './providers/app';
import { AppRoutes } from './routes';
import { getCSRF } from './lib/auth';

function App() {
  
  return (
    <AppProvider>
      <AppRoutes/>
    </AppProvider>
  );
}

export default App;
