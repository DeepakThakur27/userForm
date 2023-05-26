import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { UserForm } from './UserForm';
import { Otp } from './Otp';
import { Home } from './Home';


function App() {
  return (
    <>
      <Router>

        <Routes>
          <Route exact path='/' element={< UserForm />}></Route>
          <Route exact path='/otp' element={< Otp />}></Route>
          <Route exact path='/home' element={< Home />}></Route>
        </Routes>

      </Router>
    </>
    // <UserForm />
    // <Otp />
  );
}

export default App;
