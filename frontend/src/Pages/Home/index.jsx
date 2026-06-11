import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/api";
import {
  Layout,
  Row,
  Col,
  Card,
  Button,
  Typography,
  Tag,
  Carousel,message
} from "antd";

import {
  ShoppingCartOutlined,
  SafetyCertificateOutlined,
  TruckOutlined,
  StarFilled,
  CheckCircleFilled,
} from "@ant-design/icons";

import { Link } from "react-router-dom";

import Navbar from "../../Components/Navbar";
import FooterPage from "../../Components/FooterPage";
import axios from "axios";

const { Content } = Layout;

const { Title, Paragraph, Text } =
  Typography;

const Home = () => {
  const [featured,setFeatured] = useState([]);

  
  //get featured products
  const featuredProducts = async () => {
    try {

      

      const response = await axios.get(
        `${BASE_URL}/products/get-featured-product`
      );

      setFeatured(response.data.data);

    } catch (error) {

      console.log(error);

      message.error(
        "Failed to fetch products"
      );

    } 
  };
useEffect(()=>{
  featuredProducts();
});

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
          background: "#f5f5f5",
        }}
      >
        <Navbar />

        <Content>

          {/* HERO SECTION */}
          <div
            style={{
              background:
                "linear-gradient(135deg,#1677ff,#69b1ff)",
              padding:
                "60px 20px",
            }}
          >
            <Row
              gutter={[40, 40]}
              align="middle"
              style={{
                maxWidth: 1300,
                margin: "auto",
              }}
            >

              {/* LEFT */}
              <Col xs={24} lg={12}>

                <Tag
                  color="gold"
                  style={{
                    padding:
                      "6px 14px",
                    borderRadius: 20,
                    marginBottom: 20,
                    fontSize: 14,
                  }}
                >
                  Trusted By Schools
                </Tag>

                <Title
                  style={{
                    color: "#fff",
                    fontSize: 50,
                    marginBottom: 20,
                    lineHeight: 1.2,
                  }}
                >
                  School Uniforms Made Easy
                </Title>

                <Paragraph
                  style={{
                    color: "#fff",
                    fontSize: 18,
                    lineHeight: 1.8,
                    maxWidth: 550,
                  }}
                >
                  Shop quality school
                  uniforms, sportswear,
                  shoes, and accessories
                  from your selected school
                  with easy online ordering.
                </Paragraph>

                <div
                  style={{
                    display: "flex",
                    gap: 15,
                    flexWrap: "wrap",
                    marginTop: 30,
                  }}
                >
                  <Link to="/products">
                    <Button
                      type="primary"
                      size="large"
                      icon={
                        <ShoppingCartOutlined />
                      }
                      style={{
                        height: 50,
                        padding:
                          "0 30px",
                        borderRadius: 10,
                        background:
                          "#fff",
                        color:
                          "#1677ff",
                        fontWeight:
                          "600",
                        border: "none",
                      }}
                    >
                      Shop Now
                    </Button>
                  </Link>

                  <Link to="/about">
                    <Button
                      size="large"
                      style={{
                        height: 50,
                        padding:
                          "0 30px",
                        borderRadius: 10,
                        background:
                          "transparent",
                        border:
                          "1px solid #fff",
                        color: "#fff",
                      }}
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>

                {/* FEATURES */}
                <div
                  style={{
                    display: "flex",
                    gap: 20,
                    flexWrap: "wrap",
                    marginTop: 40,
                  }}
                >
                  <div>
                    <CheckCircleFilled
                      style={{
                        color: "#fff",
                        marginRight: 8,
                      }}
                    />

                    <Text
                      style={{
                        color: "#fff",
                      }}
                    >
                      Premium Quality
                    </Text>
                  </div>

                  <div>
                    <CheckCircleFilled
                      style={{
                        color: "#fff",
                        marginRight: 8,
                      }}
                    />

                    <Text
                      style={{
                        color: "#fff",
                      }}
                    >
                      Fast Delivery
                    </Text>
                  </div>

                  <div>
                    <CheckCircleFilled
                      style={{
                        color: "#fff",
                        marginRight: 8,
                      }}
                    />

                    <Text
                      style={{
                        color: "#fff",
                      }}
                    >
                      Easy Returns
                    </Text>
                  </div>
                </div>
              </Col>

              {/* RIGHT */}
              <Col xs={24} lg={12}>
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop"
                  alt="Uniform"
                  style={{
                    width: "100%",
                    borderRadius: 25,
                    maxHeight: 550,
                    objectFit: "cover",
                    boxShadow:
                      "0 10px 30px rgba(0,0,0,0.2)",
                  }}
                />
              </Col>
            </Row>
          </div>

          {/* FEATURES SECTION */}
          <div
            style={{
              padding: "70px 20px",
              maxWidth: 1300,
              margin: "auto",
            }}
          >
            <div
              style={{
                textAlign: "center",
                marginBottom: 50,
              }}
            >
              <Title level={2}>
                Why Choose UniformKart
              </Title>

              <Paragraph
                style={{
                  maxWidth: 700,
                  margin: "auto",
                  color: "#666",
                  fontSize: 16,
                }}
              >
                We provide a smooth and
                reliable shopping experience
                for parents and students.
              </Paragraph>
            </div>

            <Row gutter={[24, 24]}>

              {/* CARD 1 */}
              <Col xs={24} sm={12} lg={8}>
                <Card
                  hoverable
                  style={{
                    borderRadius: 20,
                    textAlign: "center",
                    height: "100%",
                  }}
                >
                  <SafetyCertificateOutlined
                    style={{
                      fontSize: 50,
                      color: "#1677ff",
                      marginBottom: 20,
                    }}
                  />

                  <Title level={4}>
                    Premium Quality
                  </Title>

                  <Paragraph>
                    Durable and comfortable
                    school uniforms with
                    excellent fabric quality.
                  </Paragraph>
                </Card>
              </Col>

              {/* CARD 2 */}
              <Col xs={24} sm={12} lg={8}>
                <Card
                  hoverable
                  style={{
                    borderRadius: 20,
                    textAlign: "center",
                    height: "100%",
                  }}
                >
                  <TruckOutlined
                    style={{
                      fontSize: 50,
                      color: "#52c41a",
                      marginBottom: 20,
                    }}
                  />

                  <Title level={4}>
                    Fast Delivery
                  </Title>

                  <Paragraph>
                    Quick order processing
                    and doorstep delivery
                    across locations.
                  </Paragraph>
                </Card>
              </Col>

              {/* CARD 3 */}
              <Col xs={24} sm={12} lg={8}>
                <Card
                  hoverable
                  style={{
                    borderRadius: 20,
                    textAlign: "center",
                    height: "100%",
                  }}
                >
                  <ShoppingCartOutlined
                    style={{
                      fontSize: 50,
                      color: "#fa8c16",
                      marginBottom: 20,
                    }}
                  />

                  <Title level={4}>
                    Easy Shopping
                  </Title>

                  <Paragraph>
                    Search and filter
                    products by school,
                    category, and size.
                  </Paragraph>
                </Card>
              </Col>
            </Row>
          </div>

          {/* FEATURED PRODUCTS */}
          <div
            style={{
              padding: "70px 20px",
              background: "#fff",
            }}
          >
            <div
              style={{
                maxWidth: 1300,
                margin: "auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 20,
                  marginBottom: 40,
                }}
              >
                <div>
                  <Title level={2}>
                    Featured Products
                  </Title>

                  <Paragraph>
                    Popular school uniform
                    collections
                  </Paragraph>
                </div>

                <Link to="/products">
                  <Button type="primary">
                    View All
                  </Button>
                </Link>
              </div>

              <Row gutter={[24, 24]}>
                {featured.map(
                  (product) => (
                    <Col
                      xs={24}
                      sm={12}
                      md={12}
                      lg={6}
                      key={product.id}
                    >
                      <Card
                        hoverable
                        style={{
                          borderRadius: 20,
                          overflow:
                            "hidden",
                        }}
                        cover={
                          <img
                            src={`${product.images?.[0]}`}
                            alt={
                              product.name
                            }
                            style={{
                              height: 280,
                              objectFit:
                                "cover",
                            }}
                          />
                        }
                      >
                        <Tag color="blue">
                          {
                            product.category
                          }
                        </Tag>

                        <Title
                          level={5}
                          style={{
                            marginTop: 12,
                          }}
                        >
                          {
                            product.name
                          }
                        </Title>

                        <div
                          style={{
                            display: "flex",
                            justifyContent:
                              "space-between",
                            alignItems:
                              "center",
                            marginTop: 15,
                          }}
                        >
                          <Title
                            level={4}
                            style={{
                              margin: 0,
                              color:
                                "#1677ff",
                            }}
                          >
                            ₹
                            {
                              product.price
                            }
                          </Title>
                             <Link
                                                        to="/products"
                                                        
                                                      >
                          <Button
                            type="primary"
                            shape="round"
                          >
                            Buy
                          </Button>
                          </Link>
                        </div>
                      </Card>
                    </Col>
                  )
                )}
              </Row>
            </div>
          </div>

          {/* TESTIMONIAL */}
          <div
            style={{
              padding: "70px 20px",
              maxWidth: 1000,
              margin: "auto",
            }}
          >
            <Title
              level={2}
              style={{
                textAlign: "center",
                marginBottom: 40,
              }}
            >
              What Parents Say
            </Title>

            <Carousel autoplay>

              <div>
                <Card
                  style={{
                    borderRadius: 20,
                    textAlign: "center",
                    padding: 20,
                  }}
                >
                  <StarFilled
                    style={{
                      color: "#faad14",
                      fontSize: 24,
                    }}
                  />

                  <Paragraph
                    style={{
                      marginTop: 20,
                      fontSize: 16,
                    }}
                  >
                    "Very easy to order
                    school uniforms online.
                    Quality is excellent and
                    delivery was fast."
                  </Paragraph>

                  <Text strong>
                    - Parent Customer
                  </Text>
                </Card>
              </div>

              <div>
                <Card
                  style={{
                    borderRadius: 20,
                    textAlign: "center",
                    padding: 20,
                  }}
                >
                  <StarFilled
                    style={{
                      color: "#faad14",
                      fontSize: 24,
                    }}
                  />

                  <Paragraph
                    style={{
                      marginTop: 20,
                      fontSize: 16,
                    }}
                  >
                    "The school selection and
                    product filtering features
                    are very useful."
                  </Paragraph>

                  <Text strong>
                    - Happy Parent
                  </Text>
                </Card>
              </div>
            </Carousel>
          </div>

        </Content>

        <FooterPage />
      </Layout>
    </>
  );
};

export default Home;