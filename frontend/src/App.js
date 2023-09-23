import React from 'react'
import './App.css'
import Navbar from './component/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import SignUp from './component/SignUp';
import Privatecomponent from './component/Privatecomponent';
import Login from './component/Login';

import Productlist from './component/Productlist';
import Products from './component/Products';
import Update from './component/Update';
import Home from './component/Home';


function App() {
  return (
    <>
    
    <BrowserRouter>
        <div>
          <Navbar/>
    
          <Routes>
            <Route element={<Privatecomponent/>} >
            <Route exact path='/' element={<Productlist/>} />
            <Route exact path='/add' element={<Products/>} />
            <Route exact path='/update/:id' element={<Update/>} />
            </Route>
            <Route exact path='/home' element={<Home/>}/>
            <Route exact path='/sign' element={<SignUp/>} />
            <Route exact path='/login' element={<Login/>} />

           

          </Routes>
        </div>
      </BrowserRouter>

    </>

  );
}

export default App;
