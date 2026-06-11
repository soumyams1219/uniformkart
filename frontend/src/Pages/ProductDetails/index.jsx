import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import FooterPage from "../../components/FooterPage";
import {
  Row,
  Col,
  Card,
  Image,
  Typography,
  Select,
  Button,
  Tag,
  Spin,
  message,
  Layout,
  InputNumber,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";

import { useParams } from "react-router-dom";

const { Title, Text } = Typography;
const { Option } = Select;
import { BASE_URL } from "../../utils/api";

const ProductDetails = () => {
  const { id } = useParams();
const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(false);

  const [selectedSize, setSelectedSize] = useState("");

  const [selectedColor, setSelectedColor] = useState("");

  const [mainImage, setMainImage] = useState("");

  const [quantity, setQuantity] = useState(1);

  // fetch product
  const fetchProduct = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${BASE_URL}/products/get-product-id/${id}`,
      );

      setProduct(response.data.data);
    } catch (error) {
      console.log(error);

      message.error("Failed to fetch product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // default image
  useEffect(() => {
    if (product?.images?.length > 0) {
      setMainImage(product.images[0]);
    }
  }, [product]);

  // unique sizes
  const sizes = [...new Set(product?.variants?.map((variant) => variant.size))];

  // colors based on size
  const colors = selectedSize
    ? [
        ...new Set(
          product?.variants
            ?.filter((variant) => variant.size === selectedSize)
            ?.map((variant) => variant.color),
        ),
      ]
    : [];

  // selected variant
  const selectedVariant = product?.variants?.find(
    (variant) =>
      variant.size === selectedSize && variant.color === selectedColor,
  );

  // reset quantity when variant changes
  useEffect(() => {
    setQuantity(1);
  }, [selectedVariant]);

  // add to cart
  const handleAddToCart = async () => {
    try {
      let token = localStorage.getItem("accessToken");
        console.log("token",token);
        if (!token) {
          navigate("/login");
          return;
        }
      // validation
      if (!selectedSize) {
        return message.warning("Please select size");
      }

      if (!selectedColor) {
        return message.warning("Please select color");
      }

      if (!quantity || quantity < 1) {
        return message.warning("Invalid quantity");
      }

      // loading message
      message.loading({
        content: "Adding to cart...",
        key: "cart",
      });

      // api call
      
      const response = await axios.post(
        `${BASE_URL}/cart/add`,

        {
          productId: product._id,

          size: selectedSize,

          color: selectedColor,

          quantity,
        },

        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );

      // success
      message.success({
        content: response.data.message,
        key: "cart",
      });

      console.log(response.data);
      
    } catch (error) {
      console.log(error);

      message.error({
        content: error.response?.data?.message || "Failed to add cart",

        key: "cart",
      });
    }
  };

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Navbar />

        <div
          style={{
            padding: "40px",
            background: "#f5f5f5",
            minHeight: "100vh",
          }}
        >
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 100,
              }}
            >
              <Spin size="large" />
            </div>
          ) : (
            product && (
              <Card
                style={{
                  borderRadius: 12,
                }}
              >
                <Row gutter={[40, 40]}>
                  {/* Images */}
                  <Col xs={24} md={12}>
                    {/* Main Image */}
                    <Image
                      src={`${mainImage}`}
                      width="100%"
                      style={{
                        borderRadius: 12,
                        objectFit: "cover",
                      }}
                    />

                    {/* Thumbnail Images */}
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        marginTop: 15,
                        flexWrap: "wrap",
                      }}
                    >
                      {product.images?.map((image, index) => (
                        <Image
                          key={index}
                          preview={false}
                          onClick={() => setMainImage(image)}
                          src={`${image}`}
                          width={90}
                          height={90}
                          style={{
                            borderRadius: 8,
                            objectFit: "cover",
                            cursor: "pointer",
                            border:
                              mainImage === image
                                ? "2px solid #1677ff"
                                : "1px solid #ddd",
                          }}
                        />
                      ))}
                    </div>
                  </Col>

                  {/* Product Details */}
                  <Col xs={24} md={12}>
                    <Tag color="blue">{product.category}</Tag>

                    <Title level={2}>{product.name}</Title>

                    <Text type="secondary">{product.description}</Text>

                    <Title
                      level={3}
                      style={{
                        marginTop: 20,
                        color: "#1677ff",
                      }}
                    >
                      ₹{product.price}
                    </Title>

                    {/* Size Selector */}
                    <div
                      style={{
                        marginTop: 25,
                      }}
                    >
                      <Text strong>Select Size</Text>

                      <Select
                        placeholder="Choose Size"
                        size="large"
                        value={selectedSize || undefined}
                        style={{
                          width: "100%",
                          marginTop: 8,
                        }}
                        onChange={(value) => {
                          setSelectedSize(value);

                          setSelectedColor("");
                        }}
                      >
                        {sizes.map((size) => (
                          <Option key={size} value={size}>
                            {size}
                          </Option>
                        ))}
                      </Select>
                    </div>

                    {/* Color Selector */}
                    <div
                      style={{
                        marginTop: 20,
                      }}
                    >
                      <Text strong>Select Color</Text>

                      <Select
                        placeholder="Choose Color"
                        size="large"
                        disabled={!selectedSize}
                        value={selectedColor || undefined}
                        style={{
                          width: "100%",
                          marginTop: 8,
                        }}
                        onChange={(value) => setSelectedColor(value)}
                      >
                        {colors.map((color) => (
                          <Option key={color} value={color}>
                            {color}
                          </Option>
                        ))}
                      </Select>
                    </div>

                    {/* Quantity */}
                    <div
                      style={{
                        marginTop: 20,
                      }}
                    >
                      <Text strong>Quantity</Text>

                      <br />

                      <InputNumber
                        min={1}
                        max={selectedVariant?.stock || 1}
                        value={quantity}
                        onChange={(value) => setQuantity(value)}
                        style={{
                          marginTop: 10,
                          width: 120,
                        }}
                      />
                    </div>

                    {/* Stock */}
                    {selectedVariant && (
                      <div
                        style={{
                          marginTop: 20,
                        }}
                      >
                        {selectedVariant.stock > 0 ? (
                          <Tag color="green">
                            In Stock : {selectedVariant.stock}
                          </Tag>
                        ) : (
                          <Tag color="red">Out Of Stock</Tag>
                        )}
                      </div>
                    )}

                    {/* Add To Cart */}
                    {/*<Button
                      onClick={handleAddToCart}
                      type="primary"
                      size="large"
                      icon={<ShoppingCartOutlined />}
                      style={{
                        marginTop: 30,
                        width: "100%",
                        height: 50,
                        borderRadius: 8,
                      }}
                      
                    >
                     Add To Cart
                    </Button>*/}
                    <Button
                      onClick={handleAddToCart}
                      type="primary"
                      size="large"
                      icon={<ShoppingCartOutlined />}
                      style={{
                        marginTop: 30,
                        width: "100%",
                        height: 50,
                        borderRadius: 8,
                      }}
                      disabled={
                        !selectedSize ||
                        !selectedColor ||
                        !selectedVariant ||
                        selectedVariant.stock === 0
                      }
                    >
                      {!selectedSize
                        ? "Select Size"
                        : !selectedColor
                          ? "Select Color"
                          : selectedVariant?.stock === 0
                            ? "Out Of Stock"
                            : "Add To Cart"}
                    </Button>
                  </Col>
                </Row>
              </Card>
            )
          )}
        </div>
      </Layout>
      <FooterPage />
    </>
  );
};

export default ProductDetails;
