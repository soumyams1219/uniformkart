import React, { useState, useEffect } from "react";
import { Input, Button, Card, message, Form, Row, Col } from "antd";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { BASE_URL } from "../../utils/api";

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [address, setAddress] = useState({
    fullName: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    const token = localStorage.getItem("accessToken");

    const res = await axios.get( `${BASE_URL}/cart/get`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setCartItems(res.data.data);
  };
  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    if (user) {
      setAddress((prev) => ({
        ...prev,
        fullName: user.username || "",
        mobile: user.mobile || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleProceedToPayment = () => {

  if (
    !address.fullName ||
    !address.mobile ||
    !address.address ||
    !address.city ||
    !address.state ||
    !address.pincode
  ) {
    return message.warning("Please fill all fields");
  }

  // Save address temporarily
  localStorage.setItem(
    "shippingAddress",
    JSON.stringify(address)
  );

  // Navigate to payment page
  navigate("/user/payment");
};
  return (
    <div style={{ maxWidth: 800, margin: "40px auto" }}>
      <Card title="Checkout" style={{ borderRadius: 12 }}>
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Full Name">
                <Input
                  name="fullName"
                  value={address.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="phone Number">
                <Input
                  name="mobile"
                  value={address.mobile}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Address">
            <Input
              name="address"
              value={address.address}
              onChange={handleChange}
              placeholder="Street / House / Area"
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="City">
                <Input
                  name="city"
                  value={address.city}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="State">
                <Input
                  name="state"
                  value={address.state}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Pincode">
                <Input
                  name="pincode"
                  value={address.pincode}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>

          <Button
  type="primary"
  block
  size="large"
  style={{ marginTop: 20 }}
  onClick={handleProceedToPayment}
>
  Continue To Payment
</Button>
        </Form>
      </Card>
    </div>
  );
};

export default Checkout;
