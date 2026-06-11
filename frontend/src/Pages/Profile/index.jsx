import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { BASE_URL } from "../../utils/api";

import {
  Layout,
  Card,
  Form,
  Input,
  Button,
  Row,
  Col,
  Typography,
  message,
  Spin,
} from "antd";

import FooterPage from "../../Components/FooterPage";

const { Content } = Layout;

const { Title } = Typography;

const Profile = () => {

  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  // input change
  const userInput = (
    e,
    name
  ) => {

    setData({
      ...data,
      [name]: e.target.value,
    });
  };

  // get profile
  const profileEdit = async () => {

    try {

      setLoading(true);

      let token =
        localStorage.getItem(
          "accessToken"
        );

      const response =
        await axios.get(
          `${BASE_URL}/user/user-view`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },

            withCredentials: true,
          }
        );

      setData(
        response.data
      );

    } catch (error) {

      console.log(error);

      message.error(
        "Failed to load profile"
      );

    } finally {

      setLoading(false);
    }
  };

  // update profile
  const profileUpdate = async (
    e
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      let token =
        localStorage.getItem(
          "accessToken"
        );

      await axios.put(
        `${BASE_URL}/user/user-update`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },

          withCredentials: true,
        }
      );

      message.success(
        "Profile updated successfully"
      );

      let role =
        localStorage.getItem(
          "role"
        );

      if (
        role === "user"
      ) {

        navigate(
          "/user/profile"
        );

      } else {

        navigate(
          "/user/profile"
        );
      }

    } catch (error) {

      console.log(error);

      message.error(
        "Profile update failed"
      );

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    profileEdit();

  }, []);

  return (
    <>

        <Content
          style={{
            padding: "40px 20px",
          }}
        >

          <Row justify="center">

            <Col
              xs={24}
              sm={22}
              md={16}
              lg={10}
            >

              <Card
                style={{
                  borderRadius: 12,
                  boxShadow:
                    "0 2px 10px rgba(0,0,0,0.08)",
                }}
              >

                <Title
                  level={3}
                  style={{
                    textAlign:
                      "center",
                    marginBottom: 30,
                  }}
                >
                  Edit Profile
                </Title>

                {loading ? (

                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "center",
                      padding: 30,
                    }}
                  >
                    <Spin size="large" />
                  </div>

                ) : (

                  <Form
                    layout="vertical"
                    onSubmitCapture={
                      profileUpdate
                    }
                  >

                    {/* Username */}
                    <Form.Item
                      label="Username"
                    >

                      <Input
                        size="large"
                        placeholder="Enter username"
                        value={
                          data.username
                        }
                        onChange={(e) =>
                          userInput(
                            e,
                            "username"
                          )
                        }
                      />

                    </Form.Item>

                    {/* Email */}
                    <Form.Item
                      label="Email"
                    >

                      <Input
                        size="large"
                        placeholder="Enter email"
                        value={
                          data.email
                        }
                        onChange={(e) =>
                          userInput(
                            e,
                            "email"
                          )
                        }
                      />

                    </Form.Item>

                    {/* Contact */}
                    <Form.Item
                      label="Contact"
                    >

                      <Input
                        size="large"
                        placeholder="Enter contact number"
                        value={
                          data.phone
                        }
                        onChange={(e) =>
                          userInput(
                            e,
                            "phone"
                          )
                        }
                      />

                    </Form.Item>

                    {/* Button */}
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      size="large"
                      loading={
                        loading
                      }
                      style={{
                        height: 45,
                        borderRadius: 8,
                        marginTop: 10,
                      }}
                    >
                      Update Profile
                    </Button>

                  </Form>
                )}
              </Card>

            </Col>

          </Row>

        </Content>

      

      <FooterPage />
    </>
  );
};

export default Profile;