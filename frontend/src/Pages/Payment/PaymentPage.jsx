import React, { useEffect, useState } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Row,
  Col,
  Divider,
  message,
} from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/api";

const PaymentPage = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get address from localStorage
  const shippingAddress = JSON.parse(
    localStorage.getItem("shippingAddress")
  );

  // Fetch cart
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const res = await axios.get(`${BASE_URL}/cart/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(res.data.data || []);

    } catch (error) {
      console.log(error);
      message.error("Failed to load cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
  if (!shippingAddress) {
    navigate("/user/checkout");
  }
}, []);
  // Total Amount
  const totalAmount = cartItems.reduce(
  (total, item) =>
    total +
    (item.product?.price || 0) *
      (item.quantity || 1),
  0
);

  // Handle payment & order creation
  const handlePayment = async (values) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("accessToken");

      // Dummy payment success
      message.success("Payment Successful");

      // Create order
      const res = await axios.post(
        `${BASE_URL}/order/create-order`,
        {
          shippingAddress,
          paymentMethod: "Card Payment",
          paymentStatus: "Paid",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear temporary address
      localStorage.removeItem("shippingAddress");

      // Navigate to order summary
      navigate(`/user/order-summary/${res.data.data._id}`);

    } catch (error) {
      console.log(error);
      message.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 1100, margin: "40px auto" }}>
      <Row gutter={24}>

        {/* Card Payment Form */}
        <Col xs={24} md={14}>
          <Card
            title="Card Payment"
            style={{ borderRadius: 12 }}
          >
            <Form layout="vertical" onFinish={handlePayment}>

              {/* Card Holder */}
              <Form.Item
                label="Card Holder Name"
                name="cardName"
                rules={[
                  {
                    required: true,
                    message: "Enter card holder name",
                  },
                ]}
              >
                <Input placeholder="John Doe" />
              </Form.Item>

              {/* Card Number */}
              <Form.Item
                label="Card Number"
                name="cardNumber"
                rules={[
                  {
                    required: true,
                    message: "Enter card number",
                  },
                  {
                    len: 16,
                    message: "Card number must be 16 digits",
                  },
                ]}
              >
               <Input
  maxLength={16}
  placeholder="1234567812345678"
  onChange={(e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
  }}
/>
              </Form.Item>

              <Row gutter={16}>

                {/* Expiry */}
                <Col span={12}>
                  <Form.Item
                    label="Expiry Date"
                    name="expiry"
                    rules={[
                      {
                        required: true,
                        message: "Enter expiry date",
                      },
                    ]}
                  >
                    <Input placeholder="MM/YY" />
                  </Form.Item>
                </Col>

                {/* CVV */}
                <Col span={12}>
                  <Form.Item
                    label="CVV"
                    name="cvv"
                    rules={[
                      {
                        required: true,
                        message: "Enter CVV",
                      },
                      {
                        min: 3,
                        max: 4,
                        message: "Invalid CVV",
                      },
                    ]}
                  >
                    <Input.Password
  maxLength={4}
  placeholder="123"
  onChange={(e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
  }}
/>
                  </Form.Item>
                </Col>

              </Row>

              {/* Pay Button */}
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={loading}
                style={{ marginTop: 20 }}
              >
                Pay ₹{totalAmount}
              </Button>

            </Form>
          </Card>
        </Col>

        {/* Order Summary */}
<Col xs={24} md={10}>
  <Card
    title="Order Summary"
    style={{ borderRadius: 12 }}
  >
    {cartItems.length === 0 ? (
      <p>No items in cart</p>
    ) : (
      <>
        {cartItems.map((item, index) => (
          <div key={index} style={{ marginBottom: 20 }}>

            <Row gutter={12} align="middle">

              {/* Product Image */}
              <Col span={6}>
                <img
                  src={item.product?.images?.[0]}
                  alt={item.product?.productName}
                  style={{
                    width: "100%",
                    height: 70,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              </Col>

              {/* Product Details */}
              <Col span={12}>
                <h4 style={{ marginBottom: 4 }}>
                  {item.product?.productName}
                </h4>

                <p style={{ marginBottom: 2 }}>
                  Size: {item.size || "N/A"}
                </p>

                <p style={{ marginBottom: 2 }}>
                  Color: {item.color || "N/A"}
                </p>

                <p style={{ marginBottom: 2 }}>
                  Qty: {item.quantity}
                </p>

                <p style={{ marginBottom: 0 }}>
                  ₹{item.product?.price}
                </p>
              </Col>

              {/* Subtotal */}
              <Col span={6} style={{ textAlign: "right" }}>
                <h4>
                  ₹
                  {(item.product?.price || 0) *
                    (item.quantity || 1)}
                </h4>
              </Col>

            </Row>

            <Divider />

          </div>
        ))}

        {/* Shipping Address */}
        <div style={{ marginTop: 20 }}>
          <h3>Shipping Address</h3>

          <p style={{ marginBottom: 4 }}>
            {shippingAddress?.fullName}
          </p>

          <p style={{ marginBottom: 4 }}>
            {shippingAddress?.mobile}
          </p>

          <p style={{ marginBottom: 4 }}>
            {shippingAddress?.address}
          </p>

          <p style={{ marginBottom: 4 }}>
            {shippingAddress?.city},
            {" "}
            {shippingAddress?.state}
          </p>

          <p>
            {shippingAddress?.pincode}
          </p>
        </div>

        <Divider />

        {/* Total */}
        <Row justify="space-between">
          <Col>
            <h3>Total</h3>
          </Col>

          <Col>
            <h3>₹{totalAmount}</h3>
          </Col>
        </Row>
      </>
    )}
  </Card>
</Col>

      </Row>
    </div>
  );
};

export default PaymentPage;