import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Table, Typography } from "antd";
import {jwtDecode} from "jwt-decode";
import instance from "../../../../../utils/axiosCustomize";
import "./order.css";

const { Text } = Typography;

const OrderHistory = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  
  const [userId,setUserId]=useState(null);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    if (!token) {
      navigate("/signin"); 
    } else {
      try {
        const decodedData = jwtDecode(token);
        setUserId(decodedData.id); 
      } catch (error) {
        console.error("Invalid token:", error);
        navigate("/signin"); 
      }
    }
  }, [token, navigate]);
  const fetchOrders = async (page) => {
    try {
      const response = await instance.get("api/v1/order", {
        params: { userId, page, limit },
      });
      setOrders(response.data.data.orders);

      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  const columns = [
    {
      title: "ORDER ID",
      dataIndex: "id",
      render: (text) => <a>{text}</a>,
      width: "15%",
    },
    {
      title: "DATE",
      dataIndex: "date",
      width: "20%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "TOTAL",
      dataIndex: "total_numProduct",
      width: "30%",
      render: ([total, numProduct]) => (
        <a>
          <b>${total}</b> ({numProduct} Product{numProduct > 1 ? "s" : ""})
        </a>
      ),
    },
    {
      dataIndex: "id",
      key: "action",
      align: "right",
      width: "35%",
      render: (id) => (
        <Text type="success" onClick={() => navigate(`/account/order/${id}`)}>
          View Details
        </Text>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={orders.map((order) => ({ ...order, key: order.id }))}
        className="margint20px"
        size="small"
        bordered
        title={() => <h4>Order History</h4>}
        pagination={{
          current: page,
          pageSize: limit,
          total: totalPages * limit,
          onChange: setPage,
        }}
      />
    </div>
  );
};

export default OrderHistory;
