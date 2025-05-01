import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import the AuthContext hook
import { db } from "../../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get current authenticated user

  useEffect(() => {
    if (user) {
      const checkUserRole = async () => {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
          navigate("/unauthorized");
          return;
        }

        const userData = userDoc.data();


        if (userData.role === "admin") {

          return;
        }

        navigate("/unauthorized");
      };

      checkUserRole();
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  return user ? children : null;
}
