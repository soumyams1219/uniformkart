import React from "react";

import Navbar from "../../Components/Navbar";
import FooterPage from "../../Components/FooterPage";

import {
  Layout,
  Row,
  Col,
  Card,
  Typography,
  Button,
} from "antd";

import {
  ShoppingOutlined,
  SafetyCertificateOutlined,
  TruckOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const { Content } = Layout;

const { Title, Paragraph } =
  Typography;

const About = () => {
  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
          background: "#f5f5f5",
        }}
      >
        <Navbar />

        <Content
          style={{
            padding: "40px 20px",
          }}
        >

          {/* Hero Section */}
          <Card
            bordered={false}
            style={{
              borderRadius: 20,
              marginBottom: 30,
              background:
                "linear-gradient(135deg, #1677ff, #69b1ff)",
              color: "#fff",
            }}
          >
            <Row
              align="middle"
              gutter={[30, 30]}
            >
              <Col xs={24} md={14}>
                <Title
                  level={1}
                  style={{
                    color: "#fff",
                    marginBottom: 10,
                  }}
                >
                  About UniformKart
                </Title>

                <Paragraph
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    lineHeight: 1.8,
                  }}
                >
                  UniformKart is an online
                  school uniform shopping
                  platform that helps parents
                  and students easily purchase
                  school uniforms, sportswear,
                  and accessories from their
                  selected school.
                </Paragraph>

                <Button
                  type="primary"
                  size="large"
                  style={{
                    background: "#fff",
                    color: "#1677ff",
                    border: "none",
                    fontWeight: "600",
                  }}
                >
                  Explore Products
                </Button>
              </Col>

              <Col xs={24} md={10}>
                <img
                  src="https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop"
                  alt="School Uniform"
                  style={{
                    width: "100%",
                    borderRadius: 20,
                    height: 320,
                    objectFit: "cover",
                  }}
                />
              </Col>
            </Row>
          </Card>

          {/* Features */}
          <Title
            level={2}
            style={{
              textAlign: "center",
              marginBottom: 30,
            }}
          >
            Why Choose Us
          </Title>

          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} lg={6}>
              <Card
                hoverable
                style={{
                  borderRadius: 18,
                  textAlign: "center",
                  height: "100%",
                }}
              >
                <ShoppingOutlined
                  style={{
                    fontSize: 45,
                    color: "#1677ff",
                    marginBottom: 15,
                  }}
                />

                <Title level={4}>
                  Easy Shopping
                </Title>

                <Paragraph>
                  Browse school-specific
                  uniform collections with
                  simple filters and search.
                </Paragraph>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card
                hoverable
                style={{
                  borderRadius: 18,
                  textAlign: "center",
                  height: "100%",
                }}
              >
                <SafetyCertificateOutlined
                  style={{
                    fontSize: 45,
                    color: "#52c41a",
                    marginBottom: 15,
                  }}
                />

                <Title level={4}>
                  Quality Products
                </Title>

                <Paragraph>
                  High-quality uniforms with
                  comfortable fabrics and
                  durable stitching.
                </Paragraph>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card
                hoverable
                style={{
                  borderRadius: 18,
                  textAlign: "center",
                  height: "100%",
                }}
              >
                <TruckOutlined
                  style={{
                    fontSize: 45,
                    color: "#fa8c16",
                    marginBottom: 15,
                  }}
                />

                <Title level={4}>
                  Fast Delivery
                </Title>

                <Paragraph>
                  Quick order processing and
                  doorstep delivery for all
                  school products.
                </Paragraph>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card
                hoverable
                style={{
                  borderRadius: 18,
                  textAlign: "center",
                  height: "100%",
                }}
              >
                <TeamOutlined
                  style={{
                    fontSize: 45,
                    color: "#722ed1",
                    marginBottom: 15,
                  }}
                />

                <Title level={4}>
                  Parent Friendly
                </Title>

                <Paragraph>
                  Easy ordering experience for
                  parents with order tracking
                  and support.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </Content>

        <FooterPage />
      </Layout>
    </>
  );
};

export default About;