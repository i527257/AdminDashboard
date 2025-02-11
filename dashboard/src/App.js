import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './Pages/login/Login';
import Search from './Pages/search/Search';
import User from './Pages/user/User';
import Navbar from './Components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/search" element={<Search />} />
            <Route path="/user/:id" element={<User />} /> {/* Dynamic route for User */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
