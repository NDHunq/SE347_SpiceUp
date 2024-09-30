import React from "react";
import Header from "../../../widget/top";
import { useNavigate } from "react-router";
import {Button,Table,Space,Typography  } from 'antd';
import './order.css'
import { useState } from "react";
const { Text } = Typography;

const OrderHistory = () => {
  const navigate = useNavigate();
  const columns = [
    {
      title: 'ORDER ID',
      dataIndex: 'id',
      render: (text) => <a>{text}</a>,
      width: '15%'
    },
    {
      title:'DATE',
      dataIndex:'date',
      width: '20%',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'TOTAL',
      dataIndex: 'total_numProduct',
      width: '30%',
      render: ([total,numProduct]) => <a><b>${total} </b>({numProduct} Product{numProduct>1?'s':''})</a>,
    },
    {
      dataIndex: 'id',
      key: 'action',
      align:'right',
      width: '35%',
      render: (id, record) => (
        <a>
          <Text
            type="success"
            onClick={() => navigate(`/account/order/${id}`)}
          >
            View Details
          </Text>
        </a>
      ),
    },
  ];
  const [orders,setOrders] = useState([
    {
      id: 1,
      date: '4 April, 2021',
      total_numProduct: [300,3],
    },
    {
      id: 2,
      date: '4 April, 2021',
      total_numProduct: [200,4],
    },
    {
      id: 3,
      date: '4 April, 2021',
      total_numProduct: [100,1],
    },
  ]);
  
  return (
    <di >
      <Table
        columns={columns}
        dataSource={orders}
        className="margint8px"
        size="small"
        bordered
        title={() => <h4>Order History</h4>}
      />

    </di>
  );
};

export default OrderHistory;
