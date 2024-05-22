import React, { createContext, useReducer, useEffect } from "react";

// AuthContext
export const AuthContext = createContext();

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };

    case "LOGOUT":
      return { user: null };

    default:
      return state;
  }
};

// AuthContextProvider component
export const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, { user: null });

  // Check if the user is logged in
  // If the user is logged in, update the user in the context
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
