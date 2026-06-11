import "./login.css";
import { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { BASE_URL } from "../../utils/api";

axios.defaults.withCredentials = true; //ensure refreshtoken cookie is sent automatically

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setUser, setToken } = useContext(AuthContext); //access context setter

  console.log(login);

  const onInput = (e, name) => {
    setLogin({ ...login, [name]: e.target.value });
  };

  const onButton = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/user-login`,
        login,
        {
          withCredentials: true,
        },
      );
      const { accessToken, user } = response.data;
      console.log(user);

      localStorage.setItem("accessToken", response.data.accessToken);
      setToken(response.data.accessToken);

      message.success("Login successful");

      setUser(user);
      if (user.role === "user") {
        navigate("/");
      } else {
        navigate("/admin");
      }

      setLogin({
        email: "",
        password: "",
      });
      console.log(response);
    } catch (error) {
      console.error("login error", error);

      if (error.response && error.response.data.message) {
        message.error(error.response.data.message);
      } else {
        message.error("Something went wrong");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Decorative circles */}
        <div className="deco-circle deco-circle--top" />
        <div className="deco-circle deco-circle--bottom" />

        <div className="login-inner">
          {/* Header */}
          <span className="login-tag">Welcome back</span>
          <div className="">
            <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px 0 20px",
  }}
>
  <img
    src="/projectLogo.png"
    alt="logo"
    style={{
      width: "180px",
      maxWidth: "100%",
      height: "auto",
      objectFit: "contain",
    }}
  />
</div>
          </div>
          <h1 className="login-title">Sign in to your account</h1>
          <p className="login-subtitle">Enter your credentials to continue.</p>

          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()}>
            {/* Email */}
            <div className="field-group">
              <label className="field-label">Email address</label>
              <div className="field-input-wrap">
                <svg
                  className="field-icon"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <input
                  className="field-input"
                  type="email"
                  placeholder="you@example.com"
                  value={login.email}
                  onChange={(e) => onInput(e, "email")}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="field-group">
              <label className="field-label">Password</label>
              <div className="field-input-wrap">
                <svg
                  className="field-icon"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  className="field-input"
                  type="password"
                  placeholder="••••••••"
                  value={login.password}
                  onChange={(e) => onInput(e, "password")}
                  required
                />
              </div>
            </div>

            {/* Forgot */}
            <span className="forgot-link">Forgot password?</span>

            {/* Submit */}
            <button type="button" className="login-btn" onClick={onButton}>
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              Sign In
            </button>

            
            
            {/* Sign up link */}
            <div className="divider" style={{ margin: "1.25rem 0 0" }}>
              <span className="divider-line" />
            </div>
            <p className="signup-row">
              New user?{" "}
              <Link to="/signup" className="signup-link">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
