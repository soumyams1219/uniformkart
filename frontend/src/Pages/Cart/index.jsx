import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Typography, message, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/api";

const { Title } = Typography;

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const res = await axios.get( `${BASE_URL}/cart/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(res.data.data);
    } catch (error) {
      console.log(error);
      message.error("Failed to load cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (itemId) => {
    try {
      const token = localStorage.getItem("accessToken");

      await axios.delete( `${BASE_URL}/cart/remove`, {
        data: { itemId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      message.success("Item removed");
      fetchCart();
    } catch (error) {
      console.log(error);
      message.error("Failed to remove item");
    }
  };

  const handleIncrease = async (item) => {
    const variant = item.product?.variants?.find(
      (v) => v.size === item.size && v.color === item.color,
    );

    const stock = variant?.stock || 1;

    if (item.quantity >= stock) {
      return message.warning("Cannot exceed stock");
    }

    try {
      const token = localStorage.getItem("accessToken");

      await axios.put(
         `${BASE_URL}/cart/update-quantity`,
        {
          itemId: item._id,
          quantity: item.quantity + 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchCart(); // refresh from DB
    } catch (error) {
      message.error("Failed to update quantity");
    }
  };

  const handleDecrease = async (item) => {
    if (item.quantity <= 1) {
      return message.warning("Minimum quantity is 1");
    }

    try {
      const token = localStorage.getItem("accessToken");

      await axios.put(
         `${BASE_URL}/cart/update-quantity`,
        {
          itemId: item._id,
          quantity: item.quantity - 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchCart(); // refresh
    } catch (error) {
      message.error("Failed to update quantity");
    }
  };
  return (
    <div style={{ padding: "30px", maxWidth: 900, margin: "auto" }}>
      <Card style={{ borderRadius: 10 }}>
        <Title level={3}>My Cart</Title>

        {cartItems.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <>
            {/* VERTICAL CART LIST */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {cartItems.map((item) => {
                const variant = item.product?.variants?.find(
                  (v) => v.size === item.size && v.color === item.color,
                );

                const stock = variant?.stock || 1;

                return (
                  <Card key={item._id} style={{ borderRadius: 10 }}>
                    <div style={{ display: "flex", gap: 20 }}>
                      {/* IMAGE */}
                      <img
                        src={`${item.product?.images?.[0]}`}
                        alt={item.product?.name}
                        style={{
                          width: 140,
                          height: 140,
                          objectFit: "cover",
                          borderRadius: 10,
                        }}
                      />

                      {/* DETAILS */}
                      <div style={{ flex: 1 }}>
                        <h3 style={{ marginBottom: 5 }}>
                          {item.product?.name}
                        </h3>

                        <p>
                          <b>Size:</b> {item.size}
                        </p>
                        <p>
                          <b>Color:</b> {item.color}
                        </p>

                        <p>
                          <b>Price:</b> ₹{item.product?.price}
                        </p>

                        <p>
                          <b>Total:</b> ₹{item.product?.price * item.quantity}
                        </p>

                        {/* ACTIONS ROW */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: 10,
                          }}
                        >
                          <Space>
                            <Button
                              danger
                              onClick={() => handleDecrease(item)}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </Button>

                            <span style={{ fontWeight: 600 }}>
                              {item.quantity}
                            </span>

                            <Button
                              type="primary"
                              onClick={() => handleIncrease(item)}
                              disabled={item.quantity >= stock}
                            >
                              +
                            </Button>
                          </Space>

                          <a
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => handleRemove(item._id)}
                          >
                            Remove
                          </a>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* GRAND TOTAL */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 30,
                alignItems: "center",
              }}
            >
              <h2>
                Grand Total: ₹
                {cartItems.reduce((acc, item) => {
                  return acc + item.product?.price * item.quantity;
                }, 0)}
              </h2>
              <Button
                type="primary"
                onClick={() => navigate("/user/checkout")}
                disabled={cartItems.length === 0}
              >
                Buy
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default Cart;
