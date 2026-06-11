import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { message, Table, Select, Input, Button } from "antd";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { BASE_URL } from "../../../utils/api";
import "./Product.css";

const { Option } = Select;

const AdminProduct = () => {
  const { token } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    school: "",
    variants: [{ size: "", color: "", stock: "" }],
  });

  const [products, setProducts] = useState([]);
  const [schools, setSchools] = useState([]);
  const [editId, setEditId] = useState(null);
  const [images, setImages] = useState([]);
  
  const [oldImages, setOldImages] = useState([]);

  // ---------------- INPUT ----------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ---------------- FETCH SCHOOLS ----------------
  const fetchSchools = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/schools`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSchools(res.data.data);
    } catch (err) {
      message.error("Failed to load schools");
    }
  };

  // ---------------- FETCH PRODUCTS ----------------
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/products/get-product`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(res.data.data);
    } catch (err) {
      message.error("Failed to load products");
    }
  };

  useEffect(() => {
    if (token) {
      fetchSchools();
      fetchProducts();
    }
  }, [token]);

  // ---------------- IMAGE CHANGE ----------------
  
  const handleVariantChange = (index, field, value) => {
    const updated = [...form.variants];
    updated[index][field] = value;

    setForm({ ...form, variants: updated });
  };
  const addVariant = () => {
    setForm({
      ...form,
      variants: [...form.variants, { size: "", color: "", stock: "" }],
    });
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const productData = {
      name: form.name,
      description: form.description,
      price: form.price,
      category: form.category,
      school: form.school,
      variants: form.variants,

      // convert string URL to array
      images: images || [],
    };

    if (editId) {

      await axios.put(
        `${BASE_URL}/products/update-product/${editId}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success("Product updated");

      setEditId(null);

    } else {

      await axios.post(
        `${BASE_URL}/products/product-create`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success("Product created");
    }

    // Reset form
    setForm({
      name: "",
      description: "",
      price: "",
      category: "",
      school: "",
      variants: [
        {
          size: "",
          color: "",
          stock: "",
        },
      ],
    });

    setImages([]);

    fetchProducts();

  } catch (err) {

    console.log(err);

    message.error("Error saving product");
  }
};

  // ---------------- DELETE ----------------
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/products/delete-product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      message.success("Deleted");
      fetchProducts();
    } catch (err) {
      message.error("Delete failed");
    }
  };

  // ---------------- EDIT ----------------
  const handleEdit = (record) => {

  setForm({
    name: record.name,
    description: record.description,
    price: record.price,
    category: record.category,
    school: record.school?._id,

    variants: record.variants?.length
      ? record.variants.map((v) => ({
          size: v.size || "",
          color: v.color || "",
          stock: v.stock || "",
        }))
      : [
          {
            size: "",
            color: "",
            stock: "",
          },
        ],
  });

  // set image URL separately
 setImages(record.images || []);

  setEditId(record._id);

  setOldImages(record.images || []);
};
  // ---------------- TABLE ----------------
  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Price", dataIndex: "price" },
    { title: "Category", dataIndex: "category" },
    {
      title: "School",
      dataIndex: ["school", "name"],
    },
    {
      title: "Variants",
      render: (_, record) =>
        record.variants?.length
          ? record.variants.map((v, i) => (
              <div key={i} style={{ fontSize: 12 }}>
                {v.size} | {v.color} | Stock: {v.stock}
              </div>
            ))
          : "No Variants",
    },
    {
      title: "Image",
      render: (_, record) =>
        record.images?.length ? (
          <img
            src={`${record.images[0]}`}
            alt="product"
            width="50"
            onError={(e) => (e.target.style.display = "none")}
          />
        ) : (
          "No Image"
        ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <>
          <a onClick={() => handleEdit(record)}>Edit</a>{" "}
          <a onClick={() => handleDelete(record._id)}>Delete</a>
        </>
      ),
    },
  ];

  return (
    <div className="product-container">
      <h2>Create Product</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="product-form">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
        />

        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
        />

        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
        />

        {/* CATEGORY */}
        <Select
          value={form.category || undefined}
          onChange={(value) => setForm({ ...form, category: value })}
          placeholder="Select Product Category"
        >
          <Option value="Regular">Regular</Option>
          <Option value="Sports">Sports</Option>
          <Option value="Accessories">Accessories</Option>
        </Select>

        {/* SCHOOL DROPDOWN */}
        <Select
          value={form.school || undefined}
          onChange={(value) => setForm({ ...form, school: value })}
          placeholder="Select School"
        >
          {schools.map((s) => (
            <Option key={s._id} value={s._id}>
              {s.name}
            </Option>
          ))}
        </Select>

        {/* VARIANTS  */}
        <h4>Variants</h4>

        {form.variants.map((v, index) => (
          <div
            key={index}
            style={{ display: "flex", gap: 10, marginBottom: 10 }}
          >
            <Input
              placeholder="Size (e.g. M)"
              value={v.size}
              onChange={(e) =>
                handleVariantChange(index, "size", e.target.value)
              }
            />

            <Input
              placeholder="Color (e.g. Red)"
              value={v.color}
              onChange={(e) =>
                handleVariantChange(index, "color", e.target.value)
              }
            />

            <Input
              type="number"
              placeholder="Stock"
              value={v.stock}
              onChange={(e) =>
                handleVariantChange(index, "stock", e.target.value)
              }
            />
          </div>
        ))}

        <Button type="button" onClick={addVariant}>
          + Add Variant
        </Button>
        {/* OLD IMAGES PREVIEW (ADD THIS HERE) */}
        {oldImages.length > 0 && (
          <div style={{ marginBottom: 10 }}>
            <p>Current Images:</p>
            {oldImages.map((img, i) => (
              <img
                key={i}
                src={img}
                width="60"
                style={{ marginRight: 10 }}
              />
            ))}
          </div>
        )}

        {/* IMAGES */}
       
    <h4>Product Images</h4>

<Input.TextArea
  rows={4}
  placeholder="Enter image URLs separated by commas"
  value={images.join(",")}
  onChange={(e) =>
    setImages(
      e.target.value
        .split(",")
        .map((img) => img.trim())
        .filter((img) => img !== "")
    )
  }
/>

{/* IMAGE PREVIEW */}
<div
  style={{
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 15,
  }}
>
  {images.map((img, index) => (
    <img
      key={index}
      src={img}
      alt="preview"
      width="100"
      height="100"
      style={{
        objectFit: "cover",
        borderRadius: 8,
        border: "1px solid #ddd",
      }}
      onError={(e) => {
        e.target.style.display = "none";
      }}
    />
  ))}
</div>


        <button type="submit">
          {editId ? "Update Product" : "Create Product"}
        </button>
      </form>

      {/* TABLE */}
      <Table
        columns={columns}
        dataSource={products}
        rowKey="_id"
        style={{ marginTop: 30 }}
      />
    </div>
  );
};

export default AdminProduct;
