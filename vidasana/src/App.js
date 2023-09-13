import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './views/Login';
import Welcome from './views/Welcome';
import Layout from './views/Layout';
import Ejercicios from './pages/Ejercicios';
import AgregarEjercicio from './pages/AgregarEjercicio';
import Home from './pages/Home';

const App = () => {
  return <div>
    <Routes>
      <Route path="/" element={<Welcome/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/admin" element={<Layout/>}>
        <Route path="/admin" element={<Home/>}/>
        <Route path="lista-ejercicios" element={<Ejercicios/>}/>
        <Route path="agregar-ejercicio" element={<AgregarEjercicio/>}/>
      </Route>
      <Route path="*" element={<Welcome/>} />
    </Routes>
  </div>
};

export default App;
