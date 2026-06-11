import React, {
  useState,
  useContext,useEffect
} from "react";

import {
  Layout,
  Menu,
  Button,
  Badge,
  Dropdown,
  Drawer,
  Grid,
} from "antd";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../utils/api";

const { Header } = Layout;

const { useBreakpoint } = Grid;

const Navbar = () => {

  const navigate = useNavigate();

  const {
    user,
    logout,
  } = useContext(AuthContext);

  const screens =
    useBreakpoint();
const [cartCount, setCartCount] = useState(0);
  const [open, setOpen] =
    useState(false);

  // logout
  const handleLogout = () => {

    logout();

    navigate("/");
  };
  //get cart count
  const fetchCartCount = async () => {
  try {

    const token =
      localStorage.getItem("accessToken");

    const res = await axios.get(
      `${BASE_URL}/cart/get`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const items = res.data.data || [];

    // Total quantity count
    const totalCount = items.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );
console.log('cart count',cartCount);
    setCartCount(totalCount);

  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  fetchCartCount();
}, []);

  // dropdown menu
  const profileItems = [
    {
      key: "1",

      label: (
        <Link to="/user/profile">
          My Account
        </Link>
      ),
    },

    {
      key: "2",

      label: (
        <Link to="/user/order-history">
          My Orders
        </Link>
      ),
    },

    {
      key: "3",

      label: (
        <span
          onClick={
            handleLogout
          }
        >
          Logout
        </span>
      ),
    },
  ];

  // menu items
  const guestMenu = [
    {
      key: "1",

      label: (
        <Link to="/">
          Home
        </Link>
      ),
    },
     {
      key: "2",

      label: (
        <Link to="/products">
          Products
        </Link>
      ),
    },
    {
      key: "3",

      label: (
        <Link to="/about">
          About
        </Link>
      ),
    },

    {
      key: "4",

      label: (
        <Link to="/contact">
          Contact
        </Link>
      ),
    },
  ];

  const userMenu = [
    {
      key: "1",

      label: (
        <Link to="/products">
          Products
        </Link>
      ),
    },

    {
      key: "2",

      label: (
        <Link to="/user/order-history">
          My Orders
        </Link>
      ),
    },
  ];

  const menuItems = user
    ? userMenu
    : guestMenu;

  return (
    <>
      <Header
        style={{
          background: "#fff",
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          padding:
            screens.md
              ? "0 30px"
              : "0 15px",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.05)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >

        {/* Logo */}
        {/*<Link
          to="/"
          style={{
            textDecoration:
              "none",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#1677ff",
              fontWeight: "800",
              fontSize:
                screens.md
                  ? "30px"
                  : "22px",
            }}
          >
            UniformKart
          </h2>
        </Link>*/}
        <img src="/projectLogo.png" alt="logo"  style={{
              margin: 0,
              width:"350px",height:"200px"
            }}/>

        {/* Desktop Menu */}
        {screens.md && (
          <Menu
            mode="horizontal"
            style={{
              flex: 1,
              justifyContent:
                "center",
              borderBottom:
                "none",
              minWidth: 0,
            }}
            items={menuItems}
          />
        )}

        {/* Right Side */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: screens.md
              ? 20
              : 12,
          }}
        >

          {/* Cart */}
          <Badge count={cartCount}>
            <Link to="/user/cart">
              <ShoppingCartOutlined
                style={{
                  fontSize:
                    screens.md
                      ? 22
                      : 20,
                  color: "#000",
                }}
              />
            </Link>
          </Badge>

          {/* Desktop Auth Buttons */}
          {screens.md && (
            <>
              {!user ? (
                <>
                  <Link to="/login">
                    <Button>
                      Login
                    </Button>
                  </Link>

                  <Link to="/signup">
                    <Button type="primary">
                      Signup
                    </Button>
                  </Link>
                </>
              ) : (
                <Dropdown
                  menu={{
                    items:
                      profileItems,
                  }}
                  placement="bottomRight"
                >
                  <div
                    style={{
                      display:
                        "flex",
                      alignItems:
                        "center",
                      gap: 8,
                      cursor:
                        "pointer",
                    }}
                  >
                    <UserOutlined
                      style={{
                        fontSize: 22,
                      }}
                    />

                    <span>
                      {
                        user.username
                      }
                    </span>
                  </div>
                </Dropdown>
              )}
            </>
          )}

          {/* Mobile Menu Button */}
          {!screens.md && (
            <Button
              type="text"
              icon={
                <MenuOutlined
                  style={{
                    fontSize: 22,
                  }}
                />
              }
              onClick={() =>
                setOpen(true)
              }
            />
          )}
        </div>
      </Header>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() =>
          setOpen(false)
        }
        open={open}
      >

        {/* Mobile Menu */}
        <Menu
          mode="vertical"
          items={menuItems}
          style={{
            borderRight: "none",
          }}
        />

        <div
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection:
              "column",
            gap: 12,
          }}
        >

          {!user ? (
            <>
              <Link to="/login">
                <Button
                  block
                  onClick={() =>
                    setOpen(false)
                  }
                >
                  Login
                </Button>
              </Link>

              <Link to="/signup">
                <Button
                  type="primary"
                  block
                  onClick={() =>
                    setOpen(false)
                  }
                >
                  Signup
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/customer/profile">
                <Button
                  block
                  icon={
                    <UserOutlined />
                  }
                  onClick={() =>
                    setOpen(false)
                  }
                >
                  My Account
                </Button>
              </Link>

              <Link to="/customer/order-history">
                <Button
                  block
                  onClick={() =>
                    setOpen(false)
                  }
                >
                  My Orders
                </Button>
              </Link>

              <Button
                danger
                block
                onClick={
                  handleLogout
                }
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;