import React, { useEffect, useState } from "react";
import FooterPage from "../../Components/FooterPage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/api";
import {
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Spin,
  message,
  Button,
  Avatar,
  Layout,
  Empty,
  Divider,
} from "antd";

import {
  ShoppingOutlined,
  CalendarOutlined,
  CreditCardOutlined,
  EyeOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Content } = Layout;

const OrderHistory = () => {

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // fetch orders
  const fetchOrders = async () => {

    try {

      setLoading(true);
       const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        `${BASE_URL}/order/my-orders`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setOrders(response.data.data);

    } catch (error) {

      console.log(error);

      message.error("Failed to fetch orders");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchOrders();

  }, []);

  // status colors
  const getStatusColor = (status) => {

    switch (status) {

      case "Placed":
        return "blue";

      case "Processing":
        return "orange";

      case "Shipped":
        return "purple";

      case "Delivered":
        return "green";

      case "Cancelled":
        return "red";

      default:
        return "default";
    }
  };

  return (
    <>
      

        <Content
          style={{
            padding: "30px",
          }}
        >

          {/* Top Header */}
          <div
            style={{
              marginBottom: 30,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 15,
            }}
          >
            <div>

              <Title
                level={2}
                style={{
                  marginBottom: 0,
                }}
              >
                My Orders
              </Title>

              <Text type="secondary">
                Track your school uniform purchases
              </Text>

            </div>

            <div
              style={{
                background: "#fff",
                padding: "12px 20px",
                borderRadius: 12,
                boxShadow:
                  "0 2px 10px rgba(0,0,0,0.05)",
              }}
            >
              <Text strong>
                Total Orders :
              </Text>{" "}
              {orders.length}
            </div>
          </div>

          {/* Loading */}
          {loading ? (

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "60vh",
              }}
            >
              <Spin size="large" />
            </div>

          ) : orders.length === 0 ? (

            <div
              style={{
                background: "#fff",
                borderRadius: 20,
                padding: "80px 20px",
              }}
            >
              <Empty
                description="No Orders Found"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </div>

          ) : (

            <Row gutter={[24, 24]}>

              {orders.map((order) => (

                <Col xs={24} key={order._id}>

                  <Card
                    bordered={false}
                    style={{
                      borderRadius: 20,
                      overflow: "hidden",
                      boxShadow:
                        "0 6px 20px rgba(0,0,0,0.06)",
                    }}
                    bodyStyle={{
                      padding: 0,
                    }}
                  >

                    {/* Top Banner */}
                    <div
                      style={{
                        background:
                          "linear-gradient(to right, #1677ff, #4096ff)",
                        padding: "20px 25px",
                        color: "#fff",
                      }}
                    >
                      <Row
                        justify="space-between"
                        align="middle"
                        gutter={[20, 20]}
                      >

                        {/* Order Info */}
                        <Col xs={24} md={16}>

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 15,
                            }}
                          >

                            <Avatar
                              size={60}
                              icon={<ShoppingOutlined />}
                            />

                            <div>

                              <Title
                                level={4}
                                style={{
                                  color: "#fff",
                                  margin: 0,
                                }}
                              >
                                Order #
                                {order._id.slice(-6)}
                              </Title>

                              <Text
                                style={{
                                  color: "#e6f4ff",
                                }}
                              >
                                <CalendarOutlined />{" "}
                                {new Date(
                                  order.createdAt
                                ).toLocaleDateString()}
                              </Text>

                            </div>

                          </div>

                        </Col>

                        {/* Status */}
                        <Col
                          xs={24}
                          md={8}
                          style={{
                            textAlign: "right",
                          }}
                        >

                          <Tag
                            color={getStatusColor(order.orderStatus)}
                            style={{
                              padding: "6px 16px",
                              borderRadius: 20,
                              fontSize: 14,
                              fontWeight: 600,
                            }}
                          >
                            {order.orderStatus}
                          </Tag>

                          <Title
                            level={3}
                            style={{
                              color: "#fff",
                              marginTop: 10,
                              marginBottom: 0,
                            }}
                          >
                            ₹{order.totalAmount}
                          </Title>

                        </Col>

                      </Row>
                    </div>

                    {/* Products */}
                    <div
                      style={{
                        padding: "25px",
                      }}
                    >

                      {order.items.map((item, index) => (

                        <div key={index}>

                          <Row
                            gutter={[20, 20]}
                            align="middle"
                          >

                            {/* Product Image + Info */}
                            <Col xs={24} sm={16}>

                              <div
                                style={{
                                  display: "flex",
                                  gap: 15,
                                  alignItems: "center",
                                }}
                              >

                                <img
                                  src={`${item.image}`}
                                  alt={item.name}
                                  style={{
                                    width: 90,
                                    height: 90,
                                    objectFit: "cover",
                                    borderRadius: 12,
                                    border:
                                      "1px solid #f0f0f0",
                                  }}
                                />

                                <div>

                                  <Title
                                    level={5}
                                    style={{
                                      marginBottom: 5,
                                    }}
                                  >
                                    {item.name}
                                  </Title>

                                  <Text type="secondary">
                                    Size :
                                    {" "}
                                    <b>{item.size}</b>
                                  </Text>

                                  <br />

                                  <Text type="secondary">
                                    Color :
                                    {" "}
                                    <b>{item.color}</b>
                                  </Text>

                                </div>

                              </div>

                            </Col>

                            {/* Qty & Price */}
                            <Col
                              xs={12}
                              sm={4}
                            >

                              <div>

                                <Text type="secondary">
                                  Quantity
                                </Text>

                                <br />

                                <Text strong>
                                  x{item.quantity}
                                </Text>

                              </div>

                            </Col>

                            <Col
                              xs={12}
                              sm={4}
                              style={{
                                textAlign: "right",
                              }}
                            >

                              <div>

                                <Text type="secondary">
                                  Price
                                </Text>

                                <br />

                                <Text
                                  strong
                                  style={{
                                    fontSize: 16,
                                    color: "#1677ff",
                                  }}
                                >
                                  ₹{item.price}
                                </Text>

                              </div>

                            </Col>

                          </Row>

                          {index !==
                            order.items.length - 1 && (
                            <Divider />
                          )}

                        </div>
                      ))}

                      {/* Bottom Section */}
                      <Row
                        gutter={[20, 20]}
                        justify="space-between"
                        align="middle"
                        style={{
                          marginTop: 25,
                        }}
                      >

                        {/* Payment + Address */}
                        <Col xs={24} md={16}>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 8,
                            }}
                          >

                            <Text type="secondary">
                              <CreditCardOutlined />{" "}
                              Payment :
                              {" "}
                              <b>
                                {order.paymentStatus}
                              </b>
                            </Text>

                            <Text type="secondary">
                              <EnvironmentOutlined />{" "}
                              Shipping :
                              {" "}
                              {
                                order.shippingAddress
                                  ?.city
                              }
                            </Text>

                          </div>

                        </Col>

                        {/* Buttons */}
                        <Col
                          xs={24}
                          md={8}
                          style={{
                            textAlign: "right",
                          }}
                        >

                          <Button
                            type="primary"
                            size="large"
                            icon={<EyeOutlined />}
                            style={{
                              borderRadius: 10,
                              height: 45,
                              padding:
                                "0 25px",
                            }}
                            onClick={() =>
                              navigate(
                                `/user/order-details/${order._id}`
                              )
                            }
                          >
                            View Details
                          </Button>

                        </Col>

                      </Row>

                    </div>

                  </Card>

                </Col>
              ))}

            </Row>
          )}
        </Content>
      
      <FooterPage />
    </>
  );
};

export default OrderHistory;