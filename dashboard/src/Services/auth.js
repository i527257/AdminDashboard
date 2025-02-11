import API from "./api";

// Register function - No token required for registration
export const register = async (userData) => {
  try {
    // Sending the request without Authorization header
    const response = await API.post("/auth/register", userData);  // Send the request without a token
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error registering user");
  }
};

// Login function - No token required for login
export const login = async (displayname, password) => {
  try {
    const { data } = await API.post("/auth/authenticate", { displayname, password });
    localStorage.setItem("token", data.token);  // Save JWT for future requests
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error logging in");
  }
};
