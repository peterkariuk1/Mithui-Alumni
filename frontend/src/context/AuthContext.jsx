// Import React hooks and Firebase functions
import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig"; // Import your Firebase auth config

// 1. Create the context (used to share auth state with the whole app)
const AuthContext = createContext();

// 2. Create the AuthProvider component that wraps the whole app
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Track the currently logged-in user

  // 3. Run this once when the component mounts to check if a user is logged in
  useEffect(() => {
    // Listen to auth state changes (user logs in or out)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update the user state when the auth state changes
    });

    // 4. Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // 5. Function to log the user out
  const logout = async () => {
    try {
      await signOut(auth); // Firebase sign out function
    } catch (error) {
      console.error("Logout error:", error); // Log any error
    }
  };

  // 6. Provide the user and logout function to all child components
  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 7. Custom hook to access the AuthContext from any component
export function useAuth() {
  return useContext(AuthContext);
}
