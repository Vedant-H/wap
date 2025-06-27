import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router-dom for navigation

// 1. Create the Auth Context
const AuthContext = createContext(null);

// 2. Custom Hook to consume the Auth Context easily
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// 3. Auth Provider Component
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate(); // For redirecting on logout/auth issues

    // State to hold user data and authentication status
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // To manage initial auth loading

    // Base URL for your authentication API
    const AUTH_API_BASE_URL = "http://localhost:3000/api/auth";

    // Function to set authentication state (user and token)
    const setAuthState = useCallback((userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        if (userData && authToken) {
            localStorage.setItem('currentUser', JSON.stringify(userData));
            localStorage.setItem('authToken', authToken);
            // Set default Authorization header for all Axios requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
        } else {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('authToken');
            delete axios.defaults.headers.common['Authorization'];
        }
    }, []);

    // Effect to initialize auth state from localStorage on app load
    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        const storedToken = localStorage.getItem('authToken');

        if (storedUser && storedToken) {
            try {
                const userData = JSON.parse(storedUser);
                setAuthState(userData, storedToken);
            } catch (error) {
                console.error("Failed to parse stored user data:", error);
                // Clear corrupted data
                setAuthState(null, null);
            }
        }
        setIsLoading(false); // Authentication check is complete
    }, [setAuthState]);

    // Login function
    const login = async (email, password) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${AUTH_API_BASE_URL}/login`, { email, password });
            const { token: receivedToken, user: userData } = response.data;
            setAuthState(userData, receivedToken);
            return { success: true, message: "Login successful!" };
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
            setAuthState(null, null); // Clear any lingering state
            return { success: false, message: error.response?.data?.message || "Login failed. Please check your credentials." };
        } finally {
            setIsLoading(false);
        }
    };

    // Register function (optional, if you want it directly in context)
    const register = async (username, email, password) => {
        console.log(username,email,password);
        setIsLoading(true);
        try {
            const response = await axios.post(`${AUTH_API_BASE_URL}/register`, { username, email, password });
            console.log(response);
            // For registration, you might not get a token immediately, typically user then logs in
            return { success: true, message: response.data.message || "Registration successful! Please login." };
        } catch (error) {
            console.error("Registration failed:", error.response?.data || error.message);
            return { success: false, message: error.response?.data?.message || "Registration failed. User may already exist." };
        } finally {
            setIsLoading(false);
        }
    };

    // ... inside AuthProvider
// const register = async (username, email, password) => {
//     setIsLoading(true);
//     try {
//         const response = await axios.post(`${AUTH_API_BASE_URL}/register`, { username, email, password });
//         const { token: receivedToken, user: userData, message } = response.data; // Destructure token and user from response

//         if (receivedToken && userData) {
//             setAuthState(userData, receivedToken); // Auto-login if backend returns token
//             return { success: true, message: message || "Registration successful! You are now logged in." };
//         } else {
//             // If backend doesn't auto-login, just return success message
//             return { success: true, message: message || "Registration successful! Please login." };
//         }
//     } catch (error) {
//         console.error("Registration failed:", error.response?.data || error.message);
//         setAuthState(null, null); // Clear any lingering state
//         return { success: false, message: error.response?.data?.message || "Registration failed. Please try again." };
//     } finally {
//         setIsLoading(false);
//     }
// };

    // Logout function
    const logout = useCallback(() => {
        setAuthState(null, null);
        navigate('/login'); // Redirect to login page on logout
    }, [setAuthState, navigate]);

    // Check if the user is authenticated
    const isAuthenticated = !!user && !!token;

    const authContextValue = {
        user,
        token,
        isAuthenticated,
        isLoading,
        login,
        register, // Include register if you plan to use it this way
        logout,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};