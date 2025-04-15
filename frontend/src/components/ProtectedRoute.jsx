import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import the AuthContext hook
import { db } from "../../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { user } = useAuth(); // Use AuthContext to get user data

  useEffect(() => {
    if (user) {
      const checkUserStatus = async () => {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists() || !userDoc.data().paid) {
          navigate("/register");
        }
      };

      checkUserStatus();
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  // Render children if user is valid
  return user ? children : null;
}
