import React from 'react';
import './App.css';
import { NextUIProvider } from '@nextui-org/react';
import Layout from './components/layout';
import { Outlet } from "react-router-dom";

function App() {
  return (
    <NextUIProvider>
      <Layout>
        <Outlet />
      </Layout>
    </NextUIProvider>
  );
}

export default App;
