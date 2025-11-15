import { createContext, useContext, useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import api from "../../Services/SalesPulse-backend";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================ FETCH LOGGED-IN VENDOR ==================
  const verifyUser = useCallback(async () => {
    const token = Cookies.get("auth_token");

    if (!token) {
      setVendor(null);
      setLoading(false);
      return;
    }

    try {
      const res = await api.get("/api/infoAbout/me", { withCredentials: true });
      setVendor(res.data.vendor || null);
    } catch (err) {
      console.log("Auth Check Failed", err);
      setVendor(null);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);
  // ==========================================================

  // ================ LOGIN FUNCTION (same name as before) ==================
  const setAuthlogin = async (email, password) => {
    try {
      const res = await api.post(
        "/api/vendor/login",
        { email, password },
        { withCredentials: true }
      );

      setVendor(res.data.vendor || null);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message };
    }
  };
  // =======================================================================

  // Logout
  const logout = () => {
    Cookies.remove("auth_token");
    setVendor(null);
  };

  // Refresh vendor after creating store
  const refreshVendor = async () => {
    setLoading(true);
    await verifyUser(); // uses same logic as login/refresh
  };

  // Check store existence
  const hasStore = !!vendor?.storeId;

  return (
    <AuthContext.Provider
      value={{
        vendor,
        setAuthlogin,    // old login name restored
        logout,
        loading,
        isAuthenticated: !!vendor,
        hasStore,
        refreshVendor,   // new fn for store updates
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
