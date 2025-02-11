import { createContext, useContext, useState, useEffect, useMemo } from "react";
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token')); 
  const [loggedInUser, setLoggedInUserState] = useState(JSON.parse(localStorage.getItem('loggedInUser'))); 

  const updateToken = (newToken) => {
    setToken(newToken);
  };

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/User/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoggedInUserState(response.data); 
      localStorage.setItem('loggedInUser', JSON.stringify(response.data)); 
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      setLoggedInUserState(null);  
      localStorage.removeItem('loggedInUser');
    }
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem('token', token); 
      fetchUserData(token);  
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token');
      setLoggedInUserState(null);
      localStorage.removeItem('loggedInUser');
    }
  }, [token]);

  const logout = () => {
    setToken(null);  
    setLoggedInUserState(null);  
    localStorage.removeItem("token"); 
    localStorage.removeItem("loggedInUser");  
  };

  const contextValue = useMemo(() => ({
    token,
    updateToken,
    loggedInUser,
    setLoggedInUser: setLoggedInUserState,
    logout, 
  }), [token, loggedInUser]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
