import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { UserForm } from './UserForm';
import { Otp } from './Otp';
import { Home } from './Home';
import { LogOut } from './LogOut';
import { Protected } from './Protected';
import { Header } from './Header';
function App() {

  return (
    <>
      <Router>

        <Routes>
          <Route exact path='/' element={< UserForm />}></Route>
          <Route path='/otp' element={< Otp />}></Route>
          <Route path='/logOut' element={< LogOut />}></Route>

          <Route path="/home" element={

            <Protected  >
              <Header />
              <Home />
            </Protected>
          } />

        </Routes>
      </Router>
    </>
  );
}

export default App;
