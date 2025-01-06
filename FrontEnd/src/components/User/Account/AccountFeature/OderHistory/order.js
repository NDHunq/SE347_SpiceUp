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
  
  const [userId,setUserId]=useState(localStorage.getItem("user_id"));
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    // try {
    //   const decodedData = jwtDecode(token);
    //   setUserId(decodedData.id); 
    //   strToken += token;

    // } catch (error) {
    //   console.error("Invalid token:", error);
    //   navigate("/signin"); 
    // }

    if(!token)
      navigate("/signin")
  }, [token, navigate]);
  const fetchOrders = async (page) => {
    try {
      const response = await instance.get(`api/v1/order?user_id=${userId}&page=${page}&limit=${limit}`, {
        headers: { 
          Authorization: `Bearer ${token}` 
        }
      });
      console.log(response.data.data)
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
      dataIndex: "_id",
      render: (text) => <a>{text}</a>,
      width: "15%",
    },
    {
      title: "DATE",
      dataIndex: "date_ordered",
      width: "20%",
      render: (text) => {
        const date = new Date(text); // Convert string to Date object
        const readableDate = date.toLocaleString(); // Format the date into a readable string
        return <a>{readableDate}</a>;
      }
    },
    {
      title: "TOTAL",
      dataIndex: "order_items_post",
      width: "30%",
      render: (order_items_post) => {
        const numProduct = Array.isArray(order_items_post) ? order_items_post.length : 0; // Kiểm tra nếu là mảng, lấy length
        return (
          <a>
            <b>{numProduct}</b> Product{numProduct > 1 ? "s" : ""}
          </a>
        );
      },
    },
    {
      dataIndex: "_id",
      key: "action",
      align: "right",
      width: "35%",
      render: (_id) => (
        <Text type="success" onClick={() => navigate(`/account/order/${_id}`)}>
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
