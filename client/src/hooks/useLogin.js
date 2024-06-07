import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (userName, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://www.hash-view.com/api/user/login",
        {
          userName,
          password,
        }
      );

      // Assuming a successful response status is 200
      if (response.status === 200) {
        // Save the user in local storage
        localStorage.setItem("user", JSON.stringify(response.data));
        // Update the user in the context
        dispatch({ type: "LOGIN", payload: response.data });
        // Redirect the user to the dashboard or perform any other logic
      } else {
        // Handle non-200 responses
        setError(response.data.message || "Signup failed");
      }
    } catch (error) {
      // Handle any other errors (network errors, etc.)
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Return the error, loading state, and the signup function
  return { error, loading, login };
};
