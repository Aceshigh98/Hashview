import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  // Get the dispatch function from the context
  const { dispatch } = useAuthContext();
  const logout = () => {
    // Remove the user from local storage
    localStorage.removeItem("user");
    // Update the user in the context
    dispatch({ type: "LOGOUT" });
    // Redirect the user to the login page or perform any other logic
  };

  return { logout };
};
