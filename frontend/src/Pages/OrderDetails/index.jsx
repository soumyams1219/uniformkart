import React, { useEffect, useState } from "react";
import FooterPage from "../../Components/FooterPage";
import axios from "axios";
import { BASE_URL } from "../../utils/api";
import {
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Spin,
  message,
  Divider,
  Steps,
  Image,
  Layout,
  Button,
} from "antd";

import {
  ShoppingOutlined,
  CalendarOutlined,
  CreditCardOutlined,
  EnvironmentOutlined,
  CheckCircleOutlined,
  TruckOutlined,
  ClockCircleOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import { useParams } from "react-router-dom";

const { Title, Text } = Typography;
const { Content } = Layout;

const OrderDetails = () => {

  const { id } = useParams();

  const [order, setOrder] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  // fetch order details
  const fetchOrderDetails =
    async () => {

      try {

        setLoading(true);
         const token = localStorage.getItem("accessToken");
        const response =
          await axios.get(
            `${BASE_URL}/order/order-details/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

        setOrder(
          response.data.data
        );

      } catch (error) {

        console.log(error);

        message.error(
          "Failed to fetch order details"
        );

      } finally {

        setLoading(false);

      }
    };

  useEffect(() => {

    fetchOrderDetails();

  }, [id]);

  // status steps
  const statusSteps = {
    Placed: 0,
    Processing: 1,
    Shipped: 2,
    Delivered: 3,
  };

  // status colors
  const getStatusColor = (
    status
  ) => {

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

          {loading ? (

            <div
              style={{
                display: "flex",
                justifyContent:
                  "center",
                alignItems: "center",
                minHeight: "60vh",
              }}
            >
              <Spin size="large" />
            </div>

          ) : (

            order && (

              <Row gutter={[24, 24]}>

                {/* LEFT SECTION */}
                <Col
                  xs={24}
                  lg={16}
                >

                  {/* Order Header */}
                  <Card
                    bordered={false}
                    style={{
                      borderRadius: 20,
                      overflow: "hidden",
                      marginBottom: 24,
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
                        padding: "25px",
                        color: "#fff",
                      }}
                    >

                      <Row
                        justify="space-between"
                        align="middle"
                        gutter={[20, 20]}
                      >

                        <Col
                          xs={24}
                          md={16}
                        >

                          <div
                            style={{
                              display: "flex",
                              alignItems:
                                "center",
                              gap: 18,
                            }}
                          >

                            <div
                              style={{
                                width: 70,
                                height: 70,
                                borderRadius:
                                  "50%",
                                background:
                                  "rgba(255,255,255,0.2)",
                                display: "flex",
                                justifyContent:
                                  "center",
                                alignItems:
                                  "center",
                              }}
                            >
                              <ShoppingOutlined
                                style={{
                                  fontSize: 30,
                                  color: "#fff",
                                }}
                              />
                            </div>

                            <div>

                              <Title
                                level={3}
                                style={{
                                  color:
                                    "#fff",
                                  margin: 0,
                                }}
                              >
                                Order #
                                {order._id.slice(
                                  -6
                                )}
                              </Title>

                              <Text
                                style={{
                                  color:
                                    "#e6f4ff",
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

                        <Col
                          xs={24}
                          md={8}
                          style={{
                            textAlign:
                              "right",
                          }}
                        >

                          <Tag
                            color={getStatusColor(
                              order.orderStatus
                            )}
                            style={{
                              padding:
                                "8px 18px",
                              borderRadius: 20,
                              fontSize: 14,
                              fontWeight: 600,
                            }}
                          >
                            {
                              order.orderStatus
                            }
                          </Tag>

                          <Title
                            level={2}
                            style={{
                              color:
                                "#fff",
                              marginTop: 12,
                              marginBottom: 0,
                            }}
                          >
                            ₹
                            {
                              order.totalAmount
                            }
                          </Title>

                        </Col>

                      </Row>

                    </div>

                    {/* Tracking Section */}
                    <div
                      style={{
                        padding: "30px",
                      }}
                    >

                      <Title
                        level={4}
                        style={{
                          marginBottom: 25,
                        }}
                      >
                        Order Tracking
                      </Title>

                      {order.orderStatus !==
                      "Cancelled" ? (

                        <Steps
                          current={
                            statusSteps[
                              order
                                .orderStatus
                            ]
                          }
                          responsive
                          items={[
                            {
                              title:
                                "Placed",
                              icon: (
                                <CheckCircleOutlined />
                              ),
                            },

                            {
                              title:
                                "Processing",
                              icon: (
                                <ClockCircleOutlined />
                              ),
                            },

                            {
                              title:
                                "Shipped",
                              icon: (
                                <TruckOutlined />
                              ),
                            },

                            {
                              title:
                                "Delivered",
                              icon: (
                                <HomeOutlined />
                              ),
                            },
                          ]}
                        />

                      ) : (

                        <div
                          style={{
                            background:
                              "#fff1f0",
                            border:
                              "1px solid #ffa39e",
                            padding:
                              "15px 20px",
                            borderRadius: 12,
                          }}
                        >
                          <Text
                            strong
                            style={{
                              color:
                                "#cf1322",
                            }}
                          >
                            This order has
                            been cancelled
                          </Text>
                        </div>

                      )}

                    </div>

                  </Card>

                  {/* Products */}
                  <Card
                    bordered={false}
                    style={{
                      borderRadius: 20,
                      boxShadow:
                        "0 6px 20px rgba(0,0,0,0.06)",
                    }}
                  >

                    <Title
                      level={4}
                      style={{
                        marginBottom: 25,
                      }}
                    >
                      Ordered Products
                    </Title>

                    {order.items.map(
                      (
                        item,
                        index
                      ) => (

                        <div
                          key={index}
                        >

                          <Row
                            gutter={[
                              20,
                              20,
                            ]}
                            align="middle"
                          >

                            {/* Product */}
                            <Col
                              xs={24}
                              sm={16}
                            >

                              <div
                                style={{
                                  display:
                                    "flex",
                                  gap: 18,
                                  alignItems:
                                    "center",
                                }}
                              >

                                <Image
                                  preview={
                                    false
                                  }
                                  src={`${item.image}`}
                                  width={
                                    95
                                  }
                                  height={
                                    95
                                  }
                                  style={{
                                    borderRadius: 14,
                                    objectFit:
                                      "cover",
                                  }}
                                />

                                <div>

                                  <Title
                                    level={
                                      5
                                    }
                                    style={{
                                      marginBottom: 6,
                                    }}
                                  >
                                    {
                                      item.name
                                    }
                                  </Title>

                                  <Text type="secondary">
                                    Size :
                                    {" "}
                                    <b>
                                      {
                                        item.size
                                      }
                                    </b>
                                  </Text>

                                  <br />

                                  <Text type="secondary">
                                    Color :
                                    {" "}
                                    <b>
                                      {
                                        item.color
                                      }
                                    </b>
                                  </Text>

                                  <br />

                                  <Text type="secondary">
                                    Quantity :
                                    {" "}
                                    <b>
                                      {
                                        item.quantity
                                      }
                                    </b>
                                  </Text>

                                </div>

                              </div>

                            </Col>

                            {/* Price */}
                            <Col
                              xs={24}
                              sm={8}
                              style={{
                                textAlign:
                                  "right",
                              }}
                            >

                              <Title
                                level={4}
                                style={{
                                  color:
                                    "#1677ff",
                                  margin: 0,
                                }}
                              >
                                ₹
                                {item.price *
                                  item.quantity}
                              </Title>

                            </Col>

                          </Row>

                          {index !==
                            order.items
                              .length -
                              1 && (
                            <Divider />
                          )}

                        </div>
                      )
                    )}

                  </Card>

                </Col>

                {/* RIGHT SECTION */}
                <Col
                  xs={24}
                  lg={8}
                >

                  {/* Shipping */}
                  <Card
                    bordered={false}
                    style={{
                      borderRadius: 20,
                      marginBottom: 24,
                      boxShadow:
                        "0 6px 20px rgba(0,0,0,0.06)",
                    }}
                  >

                    <Title level={4}>
                      <EnvironmentOutlined />{" "}
                      Shipping Address
                    </Title>

                    <Divider />

                    <div
                      style={{
                        lineHeight: 2,
                      }}
                    >

                      <Text strong>
                        {
                          order
                            .shippingAddress
                            .fullName
                        }
                      </Text>

                      <br />

                      <Text>
                        {
                          order
                            .shippingAddress
                            .mobile
                        }
                      </Text>

                      <br />

                      <Text>
                        {
                          order
                            .shippingAddress
                            .address
                        }
                      </Text>

                      <br />

                      <Text>
                        {
                          order
                            .shippingAddress
                            .city
                        }
                        ,
                        {" "}
                        {
                          order
                            .shippingAddress
                            .state
                        }
                      </Text>

                      <br />

                      <Text>
                        {
                          order
                            .shippingAddress
                            .pincode
                        }
                      </Text>

                    </div>

                  </Card>

                  {/* Payment */}
                  <Card
                    bordered={false}
                    style={{
                      borderRadius: 20,
                      boxShadow:
                        "0 6px 20px rgba(0,0,0,0.06)",
                    }}
                  >

                    <Title level={4}>
                      <CreditCardOutlined />{" "}
                      Payment Details
                    </Title>

                    <Divider />

                    <div
                      style={{
                        marginBottom: 18,
                        display: "flex",
                        justifyContent:
                          "space-between",
                      }}
                    >

                      <Text type="secondary">
                        Payment Method
                      </Text>

                      <Text strong>
                        {
                          order.paymentMethod
                        }
                      </Text>

                    </div>

                    <div
                      style={{
                        marginBottom: 18,
                        display: "flex",
                        justifyContent:
                          "space-between",
                      }}
                    >

                      <Text type="secondary">
                        Payment Status
                      </Text>

                      <Tag color="green">
                        {
                          order.paymentStatus
                        }
                      </Tag>

                    </div>

                    <Divider />

                    <div
                      style={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        alignItems:
                          "center",
                      }}
                    >

                      <Title
                        level={5}
                        style={{
                          margin: 0,
                        }}
                      >
                        Total Amount
                      </Title>

                      <Title
                        level={3}
                        style={{
                          margin: 0,
                          color:
                            "#1677ff",
                        }}
                      >
                        ₹
                        {
                          order.totalAmount
                        }
                      </Title>

                    </div>

                    

                  </Card>

                </Col>

              </Row>
            )
          )}

        </Content>

    

      <FooterPage />
    </>
  );
};

export default OrderDetails;