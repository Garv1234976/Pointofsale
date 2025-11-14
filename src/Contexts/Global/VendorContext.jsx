import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import api from "../../Services/SalesPulse-backend";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check login on page refresh
  useEffect(() => {
    const token = Cookies.get("auth_token");

    if (token) {
      verifyUser();
    } else {
      setLoading(false);
    }
  }, []);

  const verifyUser = async () => {
    try {
      const res = await api.get("/api/infoAbout/me", {
        withCredentials: true, // send cookies
      });
      setVendor(res.data.vendor);
      
    } catch (err) {
      console.log("Auth Check Failed");
      setVendor(null);
    }
    setLoading(false);
  };

  const setAuthlogin = async (email, password) => {
    try {
      const res = await api.post(
        "/api/vendor/login",
        { email, password },
        { withCredentials: true }
      );

      setVendor(res.data.vendor);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message };
    }
  };

  const logout = () => {
    Cookies.remove("auth_token");
    setVendor(null);
  };

  return (
    <AuthContext.Provider
      value={{
        vendor,
        setAuthlogin,
        logout,
        loading,
        isAuthenticated: !!vendor,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
