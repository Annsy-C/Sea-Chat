import React from 'react';
import './App.css';
import { NextUIProvider } from '@nextui-org/react';
import Layout from './components/layout';
import { useOutlet } from "react-router-dom";
import AuthContextProvider from './context/authContext';
import Auth from './pages/auth';

function App() {
  const outlet = useOutlet();
  return (
    <NextUIProvider>
      <AuthContextProvider>
        <Layout>
          {outlet || <Auth/>}
        </Layout>
      </AuthContextProvider>
    </NextUIProvider>
  );
}

export default App;
