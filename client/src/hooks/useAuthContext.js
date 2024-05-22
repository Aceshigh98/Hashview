import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Custom hook to use the AuthContext
export const useAuthContext = () => {
  // Get the context
  const context = useContext(AuthContext);
  // If the context is undefined, throw an error
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
};
