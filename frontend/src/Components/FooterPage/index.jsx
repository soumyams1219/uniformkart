import React from "react";
import { Layout, Row, Col, Typography, Space } from "antd";

import {
  FacebookFilled,
  InstagramFilled,
  MailFilled,
  PhoneFilled,
} from "@ant-design/icons";

const { Footer } = Layout;
const { Title, Text } = Typography;

const FooterPage = () => {
  return (
    <Footer
      style={{
        background: "#001529",
        color: "#fff",
        padding: "50px 30px 20px",
      }}
    >
      <Row gutter={[30, 30]}>
        {/* Logo & About */}
        <Col xs={24} md={8}>
          <Title level={3} style={{ color: "#fff" }}>
            UniformKart
          </Title>

          <Text style={{ color: "#d9d9d9" }}>
            Multi-school uniform ecommerce platform for easy and secure uniform
            shopping.
          </Text>
        </Col>

        {/* Quick Links */}
        <Col xs={24} md={8}>
          <Title level={4} style={{ color: "#fff" }}>
            Quick Links
          </Title>

          <Space direction="vertical" size={10}>
            <a
              href="/"
              style={{
                color: "#d9d9d9",
              }}
            >
              Home
            </a>

            <a
              href="/"
              style={{
                color: "#d9d9d9",
              }}
            >
              Products
            </a>

            <a
              href="/"
              style={{
                color: "#d9d9d9",
              }}
            >
              About
            </a>

            <a
              href="/"
              style={{
                color: "#d9d9d9",
              }}
            >
              Contact
            </a>
          </Space>
        </Col>

        {/* Contact */}
        <Col xs={24} md={8}>
          <Title level={4} style={{ color: "#fff" }}>
            Contact
          </Title>

          <Space direction="vertical" size={12}>
            <Text style={{ color: "#d9d9d9" }}>
              <MailFilled /> support@uniformkart.com
            </Text>

            <Text style={{ color: "#d9d9d9" }}>
              <PhoneFilled /> +91 9876543210
            </Text>

            <Space size={15}>
              <FacebookFilled
                style={{
                  fontSize: 22,
                  cursor: "pointer",
                }}
              />

              <InstagramFilled
                style={{
                  fontSize: 22,
                  cursor: "pointer",
                }}
              />
            </Space>
          </Space>
        </Col>
      </Row>

      {/* Bottom */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          marginTop: 30,
          paddingTop: 20,
          textAlign: "center",
        }}
      >
        <Text style={{ color: "#d9d9d9" }}>
          © 2026 UniformKart. All Rights Reserved.
        </Text>
      </div>
    </Footer>
  );
};

export default FooterPage;
