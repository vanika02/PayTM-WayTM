import React from "react";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import  Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import Update from "./pages/Update";

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/update' element={<Update />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/send' element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
