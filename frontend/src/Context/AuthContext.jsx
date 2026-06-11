import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/api";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [loading, setLoading] = useState(true);

  const refreshAccessToken = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/auth/refresh-token`, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", res.data.accessToken);
      setToken(res.data.accessToken);
      setUser(res.data.user);
      return res.data.accessToken;
    } catch (error) {
      console.log("Error refreshing access token:", error);
      localStorage.removeItem("accessToken");
      setToken(null);
      setUser(null);
      return null;
    }
  };

  const fetchUser = async () => {
    try {
      let token = localStorage.getItem("accessToken");

      if (!token) {
        token = await refreshAccessToken();
        if (!token) {
          setLoading(false);
          return;
        }
      }
      setToken(token);

      const res = await axios.get(`${BASE_URL}/user/user-view`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching user:", error);

      if (error.response?.status === 401) {
        // token expired, try refreshing once
        const newToken = await refreshAccessToken();
        if (newToken) {
          try {
            const res = await axios.get(
              `${BASE_URL}/user/user-view`,
              {
                headers: { Authorization: `Bearer ${newToken}` },
                withCredentials: true,
              },
            );
            setUser(res.data);
          } catch {
            setUser(null);
          }
        }
      } else {
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
       `${BASE_URL}/auth/user-logout`,
        {},
        { withCredentials: true },
      );

      localStorage.removeItem("accessToken");
      setToken(null);
      setUser(null);
      message.success("Logged out successfully");

      // if (navigate)
      navigate("/login");
    } catch (error) {
      console.error("logout error:", error);
      message.error("Logout failed");
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        setToken,
        loading,
        logout,
        setUser,
        refreshAccessToken,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
