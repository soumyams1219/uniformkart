import React from "react";

import Navbar from "../../Components/Navbar";
import FooterPage from "../../Components/FooterPage";

import {
  Layout,
  Row,
  Col,
  Card,
  Typography,
  Form,
  Input,
  Button,
} from "antd";

import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const { Content } = Layout;

const { Title, Paragraph, Text } =
  Typography;

const Contact = () => {

  const onFinish = (values) => {

    console.log(values);

  };

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

          {/* Heading */}
          <div
            style={{
              textAlign: "center",
              marginBottom: 40,
            }}
          >
            <Title level={2}>
              Contact Us
            </Title>

            <Paragraph>
              We'd love to hear from you.
              Feel free to contact us for
              any queries related to school
              uniforms and orders.
            </Paragraph>
          </div>

          <Row gutter={[30, 30]}>
            
            {/* Left Section */}
            <Col xs={24} lg={10}>
              <Card
                style={{
                  borderRadius: 20,
                  height: "100%",
                }}
              >
                <Title level={3}>
                  Get In Touch
                </Title>

                <div
                  style={{
                    marginTop: 30,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 15,
                      marginBottom: 25,
                    }}
                  >
                    <PhoneOutlined
                      style={{
                        fontSize: 24,
                        color: "#1677ff",
                      }}
                    />

                    <div>
                      <Text strong>
                        Phone
                      </Text>

                      <br />

                      <Text>
                        +91 9876543210
                      </Text>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: 15,
                      marginBottom: 25,
                    }}
                  >
                    <MailOutlined
                      style={{
                        fontSize: 24,
                        color: "#1677ff",
                      }}
                    />

                    <div>
                      <Text strong>
                        Email
                      </Text>

                      <br />

                      <Text>
                        support@uniformkart.com
                      </Text>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: 15,
                    }}
                  >
                    <EnvironmentOutlined
                      style={{
                        fontSize: 24,
                        color: "#1677ff",
                      }}
                    />

                    <div>
                      <Text strong>
                        Address
                      </Text>

                      <br />

                      <Text>
                        Kochi, Kerala, India
                      </Text>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>

            {/* Right Section */}
            <Col xs={24} lg={14}>
              <Card
                style={{
                  borderRadius: 20,
                }}
              >
                <Title level={3}>
                  Send Message
                </Title>

                <Form
                  layout="vertical"
                  onFinish={onFinish}
                  style={{
                    marginTop: 20,
                  }}
                >

                  <Form.Item
                    label="Full Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message:
                          "Please enter your name",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter your name"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message:
                          "Please enter your email",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter your email"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Message"
                    name="message"
                    rules={[
                      {
                        required: true,
                        message:
                          "Please enter your message",
                      },
                    ]}
                  >
                    <Input.TextArea
                      rows={5}
                      placeholder="Enter your message"
                    />
                  </Form.Item>

                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    block
                    style={{
                      borderRadius: 10,
                    }}
                  >
                    Send Message
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
        </Content>

        <FooterPage />
      </Layout>
    </>
  );
};

export default Contact;