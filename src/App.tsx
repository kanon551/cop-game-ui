import React from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './utils/Layout';
import Home from './pages/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ChooseCops from './pages/ChooseCops';
import ChooseCity from './pages/ChooseCity';
import ChooseVehicle from './pages/ChooseVehicle';


function App() {
  return (
    <div>
      <Router>
            <Routes>
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/selectCops" element={<Layout><ChooseCops /></Layout>} />
              <Route path="/selectCity" element={<Layout><ChooseCity /></Layout>} />
              <Route path='/selectVehicle' element={<Layout><ChooseVehicle /></Layout>} />
            </Routes>
      </Router>
    </div>
  );
}

export default App;
