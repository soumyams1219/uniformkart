import "./SignUp.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/api";

const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    phone: "",
    role: "user",
  });
  const navigate = useNavigate();

  console.log(user);

  const onInput = (e, name) => {
    setUser({ ...user, [name]: e.target.value });
  };

  const onButton = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      message.error("Invalid email format");
      return;
    }

    if (user.password.length < 6) {
      message.error("Password must be at least 6 characters");
      return;
    }

    if (user.password !== user.confirmpassword) {
      message.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/user/user-create`,
        user,
      );

      message.success("Signup successful");
      navigate("/login");

      setUser({
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
        phone: "",
        role: "user",
      });
    } catch (error) {
      console.log(error);

      if (error.response && error.response.data.message) {
        message.error(error.response.data.message);
      } else {
        message.error("Signup failed");
      }
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        {/* Decorative circles */}
        <div className="deco-circle deco-circle--top" />
        <div className="deco-circle deco-circle--bottom" />

        <div className="signup-inner">
          {/* Header */}
          <span className="signup-tag">Get started</span>
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
          <h1 className="signup-title">Create your account</h1>
          <p className="signup-subtitle">
            Fill in the details below to get started.
          </p>

          <form onSubmit={onButton}>
            {/* Row: Username + Phone */}
            <div className="field-row">
              <div className="field-group">
                <label className="field-label">Username</label>
                <div className="field-input-wrap">
                  <svg
                    className="field-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <input
                    className="field-input"
                    type="text"
                    placeholder="john_doe"
                    value={user.username}
                    onChange={(e) => onInput(e, "username")}
                    required
                  />
                </div>
              </div>

              <div className="field-group">
                <label className="field-label">Phone</label>
                <div className="field-input-wrap">
                  <svg
                    className="field-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.18 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.55 5.55l.96-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <input
                    className="field-input"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={user.phone}
                    onChange={(e) => onInput(e, "phone")}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="field-group">
              <label className="field-label">Email address</label>
              <div className="field-input-wrap">
                <svg
                  className="field-icon"
                  width="16"
                  height="16"
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
                  value={user.email}
                  onChange={(e) => onInput(e, "email")}
                  required
                />
              </div>
            </div>

            {/* Row: Password + Confirm Password */}
            <div className="field-row">
              <div className="field-group">
                <label className="field-label">Password</label>
                <div className="field-input-wrap">
                  <svg
                    className="field-icon"
                    width="16"
                    height="16"
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
                    value={user.password}
                    onChange={(e) => onInput(e, "password")}
                    required
                  />
                </div>
              </div>

              <div className="field-group">
                <label className="field-label">Confirm Password</label>
                <div className="field-input-wrap">
                  <svg
                    className="field-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <input
                    className="field-input"
                    type="password"
                    placeholder="••••••••"
                    value={user.confirmpassword}
                    onChange={(e) => onInput(e, "confirmpassword")}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" className="signup-btn">
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
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
              </svg>
              Create Account
            </button>

            {/* Divider */}
            <div className="su-divider">
              <span className="su-divider-line" />
              <span className="su-divider-text">already have an account?</span>
              <span className="su-divider-line" />
            </div>

            {/* Login link */}
            <p className="login-row">
              <Link to="/login" className="login-link">
                Sign in instead
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
