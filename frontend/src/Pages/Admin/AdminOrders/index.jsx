import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Table, Tag, Select, message } from "antd";
import { AuthContext } from "../../../Context/AuthContext";
import { BASE_URL } from "../../../utils/api";

const { Option } = Select;

const AdminOrders = () => {
  const { token } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);

  // fetch all orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/order/all-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(res.data.data);
    } catch (err) {
      console.log(err);
      message.error("Failed to load orders");
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  // update status
  const handleStatusChange = async (value, record) => {
    try {
      await axios.put(
        `${BASE_URL}/order/update-status/${record._id}`,
        { orderStatus: value },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      message.success("Status updated");

      fetchOrders(); // refresh
    } catch (err) {
      console.log(err);
      message.error("Update failed");
    }
  };

  // status color
  const getStatusColor = (status) => {
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

  // table columns
  const columns = [
    {
      title: "Order ID",
      render: (_, record) => record._id.slice(-6),
    },
    {
      title: "User",
      render: (_, record) => (
        <div>
          <div>{record.user?.username}</div>
          <div style={{ fontSize: 12, color: "#888" }}>
            {record.user?.email}
          </div>
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "totalAmount",
      render: (amt) => `₹${amt}`,
    },
    {
      title: "Status",
      render: (_, record) => (
        <>
          <Tag color={getStatusColor(record.orderStatus)}>
            {record.orderStatus}
          </Tag>

          {/* 🔥 dropdown */}
          <Select
            defaultValue={record.orderStatus}
            style={{ width: 140, marginLeft: 10 }}
            onChange={(value) => handleStatusChange(value, record)}
          >
            <Option value="Placed">Placed</Option>
            <Option value="Processing">Processing</Option>
            <Option value="Shipped">Shipped</Option>
            <Option value="Delivered">Delivered</Option>
            <Option value="Cancelled">Cancelled</Option>
          </Select>
        </>
      ),
    },
    {
      title: "Date",
      render: (_, record) => new Date(record.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>All Orders</h2>

      <Table columns={columns} dataSource={orders} rowKey="_id" />
    </div>
  );
};

export default AdminOrders;
