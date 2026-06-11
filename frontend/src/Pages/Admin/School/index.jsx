import { useState, useEffect } from "react";
import axios from "axios";
import { message, Table } from "antd";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { BASE_URL } from "../../../utils/api";
import "./School.css";

const School = () => {
  const { token } = useContext(AuthContext);
  console.log("TOKEN FROM CONTEXT:", token);
  const [form, setForm] = useState({
    name: "",
    address: "",
    logo: "",
    contactEmail: "",
    contactPhone: "",
  });

  const [schools, setSchools] = useState([]);
  const [editId, setEditId] = useState(null);

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // fetch schools
  const fetchSchools = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/schools`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setSchools(res.data.data);
    } catch (error) {
      console.log(error);
      message.error("Error fetching schools");
    }
  };

  useEffect(() => {
    if (token) {
      fetchSchools();
    }
  }, [token]);

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("FORM DATA SENT:", form);

    try {
      if (editId) {
        await axios.put(`${BASE_URL}/schools/${editId}`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        message.success("School updated successfully");
        setEditId(null);
      } else {
        await axios.post(`${BASE_URL}/schools`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        message.success("School created successfully");
      }

      setForm({
        name: "",
        address: "",
        logo: "",
        contactEmail: "",
        contactPhone: "",
      });

      fetchSchools();
    } catch (error) {
      console.log(error);
      message.error("Error saving school");
    }
  };

  // delete
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/schools/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      message.success(res.data.message);
      fetchSchools();
    } catch (error) {
      console.log(error);
      message.error("Error deleting school");
    }
  };

  // edit
  const handleEdit = (record) => {
    setForm({
      name: record.name,
      address: record.address,
      logo: record.logo,
      contactEmail: record.contactEmail,
      contactPhone: record.contactPhone,
    });

    setEditId(record._id);
  };

  // table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "contactEmail",
    },
    {
      title: "Phone",
      dataIndex: "contactPhone",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Logo",
      dataIndex: "logo",
      render: (text) =>
        text ? (
          <img
            src={text}
            alt="logo"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
        ) : (
          "No Logo"
        ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <>
          <a onClick={() => handleEdit(record)} style={{ marginRight: 10 }}>
            Edit
          </a>
          <a onClick={() => handleDelete(record._id)}>Delete</a>
        </>
      ),
    },
  ];

  return (
    <div className="school-container">
      <h2 className="school-title">Create School</h2>

      {/* FORM */}
      <form className="school-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="School Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="contactEmail"
          placeholder="Email"
          value={form.contactEmail}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="contactPhone"
          placeholder="Phone"
          value={form.contactPhone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />

        <input
          type="text"
          name="logo"
          placeholder="Logo URL"
          value={form.logo}
          onChange={handleChange}
        />

        <button type="submit">{editId ? "Update School" : "Add School"}</button>
      </form>

      {/* TABLE */}
      <div style={{ marginTop: "30px" }}>
        <h3>Schools</h3>
        <Table columns={columns} dataSource={schools} rowKey="_id" />
      </div>
    </div>
  );
};

export default School;
