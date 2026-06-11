import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar";
import FooterPage from "../../Components/FooterPage";

import { Link } from "react-router-dom";

import {
  Layout,
  Row,
  Col,
  Card,
  Button,
  Select,
  Input,
  Tag,
  message,
  Spin,
} from "antd";

import {
  ShoppingCartOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const { Content } = Layout;
const { Option } = Select;
import { BASE_URL } from "../../utils/api";

const Products = () => {

  // sample schools
  /*const [schools] = useState([
    {
      _id: "689123abc456def789123456",
      name: "Green Valley Public School",
    },

    {
      _id: "689123abc456def789123457",
      name: "Oxford International School",
    },

    {
      _id: "689123abc456def789123458",
      name: "St. Mary’s Higher Secondary School",
    },

    {
      _id: "689123abc456def789123459",
      name: "Sunrise Public School",
    },
  ]);*/
const [schools, setSchools] =
    useState([]);
  const [selectedSchool, setSelectedSchool] =
    useState("");

  const [products, setProducts] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [loading, setLoading] =
    useState(false);

    //get schools
  const fetchSchools = async () => {
    try {
      
      const response = await axios.get(`${BASE_URL}/schools/`);
      //console.log(response.data.data);
      setSchools(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // fetch products
  const fetchProducts = async () => {

    // do not fetch if school not selected
    if (!selectedSchool) {
      setProducts([]);
      return;
    }

    try {

      setLoading(true);

      const response = await axios.get(
        `${BASE_URL}/products/get-product`,
        {
          params: {
            search,
            category,
            school: selectedSchool,
          },
        }
      );

      setProducts(response.data.data);

    } catch (error) {

      console.log(error);

      message.error(
        "Failed to fetch products"
      );

    } finally {

      setLoading(false);

    }
  };

  // fetch when filters change
  useEffect(() => {
    fetchSchools();
    fetchProducts();

  }, [
    search,
    category,
    selectedSchool,
  ]);

  // load saved school
  useEffect(() => {

    const savedSchool =
      localStorage.getItem("school");

    if (savedSchool) {
      setSelectedSchool(savedSchool);
    }

  }, []);

  // school change
  const handleSchoolChange = (
    value
  ) => {

    setSelectedSchool(value);

    localStorage.setItem(
      "school",
      value
    );
  };

  // selected school name
  const selectedSchoolName =
    schools.find(
      (school) =>
        school._id === selectedSchool
    )?.name;

  return (
    <>
    <Layout
        style={{
          minHeight: "100vh",
        }}
      >

        <Navbar />
        <Content
          style={{
            padding: "30px",
            background: "#f5f5f5",
          }}
        >

          <Row gutter={[25, 25]}>

            {/* LEFT SIDEBAR */}
            <Col
              xs={24}
              sm={24}
              md={8}
              lg={6}
            >

              <Card
                style={{
                  borderRadius: 12,
                }}
              >

                <h2
                  style={{
                    marginBottom: 25,
                  }}
                >
                  Filters
                </h2>

                {/* School */}
                <div
                  style={{
                    marginBottom: 25,
                  }}
                >

                  <p
                    style={{
                      fontWeight: 600,
                      marginBottom: 8,
                    }}
                  >
                    Select School
                  </p>

                  <Select
                    placeholder="Select School"
                    style={{
                      width: "100%",
                    }}
                    value={
                      selectedSchool ||
                      undefined
                    }
                    onChange={
                      handleSchoolChange
                    }
                  >

                    {schools.map(
                      (school) => (
                        <Option
                          key={
                            school._id
                          }
                          value={
                            school._id
                          }
                        >
                          {school.name}
                        </Option>
                      )
                    )}

                  </Select>

                </div>

                {/* Search */}
                <div
                  style={{
                    marginBottom: 25,
                  }}
                >

                  <p
                    style={{
                      fontWeight: 600,
                      marginBottom: 8,
                    }}
                  >
                    Search
                  </p>

                  <Input
                    placeholder="Search products"
                    prefix={
                      <SearchOutlined />
                    }
                    value={search}
                    onChange={(e) =>
                      setSearch(
                        e.target.value
                      )
                    }
                  />

                </div>

                {/* Category */}
                <div>

                  <p
                    style={{
                      fontWeight: 600,
                      marginBottom: 8,
                    }}
                  >
                    Category
                  </p>

                  <Select
                    placeholder="Category"
                    style={{
                      width: "100%",
                    }}
                    allowClear
                    value={
                      category ||
                      undefined
                    }
                    onChange={(value) =>
                      setCategory(
                        value || ""
                      )
                    }
                  >

                    <Option value="Regular">
                      Regular
                    </Option>

                    <Option value="Sports">
                      Sports
                    </Option>

                    <Option value="Accessories">
                      Accessories
                    </Option>

                  </Select>

                </div>

              </Card>

            </Col>

            {/* RIGHT PRODUCT SECTION */}
            <Col
              xs={24}
              sm={24}
              md={16}
              lg={18}
            >

              {/* Heading */}
              <div
                style={{
                  marginBottom: 25,
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >

                <h2
                  style={{
                    margin: 0,
                  }}
                >
                  {selectedSchoolName
                    ? `${selectedSchoolName} Uniform Collection`
                    : "Select School"}
                </h2>

                {selectedSchool && (
                  <Tag
                    color="blue"
                    style={{
                      padding: "6px 14px",
                      fontSize: 14,
                    }}
                  >
                    {products.length} Products
                  </Tag>
                )}

              </div>

              {/* No School Selected */}
              {!selectedSchool ? (

                <div
                  style={{
                    textAlign: "center",
                    marginTop: 100,
                    fontSize: 20,
                    color: "#666",
                  }}
                >
                  Please select a school
                  to view uniforms
                </div>

              ) : loading ? (

                /* Loading */
                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "center",
                    marginTop: 100,
                  }}
                >
                  <Spin size="large" />
                </div>

              ) : (

                <>
                  {/* Product Grid */}
                  <Row gutter={[20, 20]}>

                    {products.map(
                      (product) => (

                        <Col
                          xs={24}
                          sm={12}
                          md={12}
                          lg={8}
                          xl={6}
                          key={product._id}
                        >

                          <Link
                            to={`/product-details/${product._id}`}
                            style={{
                              textDecoration:
                                "none",
                            }}
                          >

                            <Card
                              hoverable
                              style={{
                                borderRadius: 12,
                                overflow:
                                  "hidden",
                              }}
                              cover={
                                <img
                                  alt={
                                    product.name
                                  }
                                  src={`${product.images?.[0]}`}
                                  style={{
                                    height: 250,
                                    objectFit:
                                      "cover",
                                  }}
                                />
                              }
                            >

                              {/* Category */}
                              <Tag color="blue">
                                {
                                  product.category
                                }
                              </Tag>

                              {/* Name */}
                              <h3
                                style={{
                                  marginTop: 12,
                                  marginBottom: 8,
                                }}
                              >
                                {product.name}
                              </h3>

                              {/* Description */}
                              <p
                                style={{
                                  color: "#666",
                                  minHeight: 45,
                                }}
                              >
                                {
                                  product.description
                                }
                              </p>

                              {/* Price */}
                              <p
                                style={{
                                  fontSize: 18,
                                  fontWeight:
                                    "bold",
                                  color:
                                    "#1677ff",
                                }}
                              >
                                ₹
                                {
                                  product.price
                                }
                              </p>

                              {/* Sizes */}
                              <div
                                style={{
                                  marginBottom: 15,
                                }}
                              >

                                {product.variants
                                  ?.map(
                                    (
                                      variant
                                    ) =>
                                      variant.size
                                  )

                                  .filter(
                                    (
                                      size,
                                      index,
                                      array
                                    ) =>
                                      array.indexOf(
                                        size
                                      ) ===
                                      index
                                  )

                                  .map(
                                    (
                                      size,
                                      index
                                    ) => (
                                      <Tag
                                        key={
                                          index
                                        }
                                        color="blue"
                                      >
                                        {
                                          size
                                        }
                                      </Tag>
                                    )
                                  )}

                              </div>

                              {/* Button */}
                              <Button
                                type="primary"
                                block
                                icon={
                                  <ShoppingCartOutlined />
                                }
                              >
                                View Details
                              </Button>

                            </Card>

                          </Link>

                        </Col>
                      )
                    )}

                  </Row>

                  {/* Empty Products */}
                  {products.length ===
                    0 && (
                    <div
                      style={{
                        textAlign:
                          "center",
                        marginTop: 50,
                        fontSize: 18,
                        color: "#666",
                      }}
                    >
                      No products found
                    </div>
                  )}
                </>
              )}

            </Col>

          </Row>

        </Content>
     
</Layout>
      <FooterPage />
    </>
  );
};

export default Products;