import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Divider,
  Tag,
  Spin,
  Empty,
} from "antd";
import {
  CheckCircleOutlined,
  ShoppingOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../utils/api";

const OrderSummary = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(true);

  // Fetch order details
  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem("accessToken");
console.log(id);
      const res = await axios.get(
        `${BASE_URL}/order/order-details/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrder(res.data.data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (!order) {
    return (
      <div style={{ marginTop: 100 }}>
        <Empty description="Order not found" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1100, margin: "40px auto" }}>

      {/* Success Message */}
      <Card
        style={{
          marginBottom: 24,
          borderRadius: 12,
          textAlign: "center",
        }}
      >
        <CheckCircleOutlined
          style={{
            fontSize: 70,
            color: "#52c41a",
            marginBottom: 16,
          }}
        />

        <h1>Order Placed Successfully!</h1>

        <p>
          Thank you for shopping with UniformKart
        </p>

        <Tag color="green" style={{ padding: "6px 12px" }}>
          Payment Successful
        </Tag>
      </Card>

      <Row gutter={24}>

        {/* Order Items */}
        <Col xs={24} md={16}>
          <Card
            title="Ordered Items"
            style={{ borderRadius: 12 }}
          >

            {order.items?.map((item, index) => (

              <div key={index} style={{ marginBottom: 20 }}>

                <Row gutter={16} align="middle">

                  {/* Image */}
                  <Col span={5}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: 90,
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                    />
                  </Col>

                  {/* Details */}
                  <Col span={13}>

                    <h3 style={{ marginBottom: 6 }}>
                      {item.name}
                    </h3>

                    <p style={{ marginBottom: 4 }}>
                      Size: {item.size}
                    </p>

                    <p style={{ marginBottom: 4 }}>
                      Color: {item.color}
                    </p>

                    <p style={{ marginBottom: 0 }}>
                      Qty: {item.quantity}
                    </p>

                  </Col>

                  {/* Price */}
                  <Col
                    span={6}
                    style={{ textAlign: "right" }}
                  >

                    <h3>
                      ₹
                      {item.price * item.quantity}
                    </h3>

                  </Col>

                </Row>

                <Divider />

              </div>

            ))}

          </Card>
        </Col>

        {/* Order Info */}
        <Col xs={24} md={8}>

          {/* Shipping */}
          <Card
            title="Shipping Address"
            style={{
              borderRadius: 12,
              marginBottom: 20,
            }}
          >

            <p>
              <strong>
                {order.shippingAddress?.fullName}
              </strong>
            </p>

            <p>
              {order.shippingAddress?.mobile}
            </p>

            <p>
              {order.shippingAddress?.address}
            </p>

            <p>
              {order.shippingAddress?.city},
              {" "}
              {order.shippingAddress?.state}
            </p>

            <p>
              {order.shippingAddress?.pincode}
            </p>

          </Card>

          {/* Payment */}
          <Card
            title="Payment Details"
            style={{ borderRadius: 12 }}
          >

            <Row justify="space-between">
              <Col>Payment Method</Col>

              <Col>
                <strong>
                  {order.paymentMethod}
                </strong>
              </Col>
            </Row>

            <Divider />

            <Row justify="space-between">
              <Col>Payment Status</Col>

              <Col>
                <Tag color="green">
                  {order.paymentStatus}
                </Tag>
              </Col>
            </Row>

            <Divider />

            <Row justify="space-between">
              <Col>Order Status</Col>

              <Col>
                <Tag color="blue">
                  {order.orderStatus}
                </Tag>
              </Col>
            </Row>

            <Divider />

            <Row justify="space-between">
              <Col>
                <h3>Total</h3>
              </Col>

              <Col>
                <h2>
                  ₹{order.totalAmount}
                </h2>
              </Col>
            </Row>

          </Card>

          {/* Buttons */}
          <div style={{ marginTop: 20 }}>

            <Button
              type="primary"
              block
              icon={<ShoppingOutlined />}
              style={{ marginBottom: 12 }}
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </Button>

            <Button
              block
              icon={<OrderedListOutlined />}
              onClick={() => navigate("/user/order-history")}
            >
              View My Orders
            </Button>

          </div>

        </Col>

      </Row>
    </div>
  );
};

export default OrderSummary;