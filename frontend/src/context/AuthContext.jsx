import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig.js";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Tracks current user
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [error, setError] = useState(null); // Tracks error state

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Stop loading when auth state is determined
    }, (err) => {
      setError(err.message);
      setLoading(false); // Stop loading on error
    });

    return () => unsubscribe(); // Cleanup function
  }, []);

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      setError(error.message); // Handle logout errors
    }
  };

  // If still loading, render nothing or a loading indicator-We will try and implement react toastify for a spinner....
  // if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook for using Auth
export function useAuth() {
  return useContext(AuthContext);
}
