import React from 'react'
import { Table } from "antd";
import { useQuery } from '@tanstack/react-query';
import { fetchServices } from '../../api';

function Services() {

    const { data } = useQuery(["services"], fetchServices);



    console.log(data);


    const columns = [
        {
            title: "Müşteri Adı/Soyadı",
            dataIndex: ["customer", "fullName"],
            key: "customer",
        },
        {
            title: "Müşteri Adı/Soyadı",
            dataIndex: ["customer", "phone"],
            key: "phone",
        },
        {
            title: "Müşteri Açıklaması",
            key: "customerDescription",
            dataIndex: "customerDescription",
        },
        {
            title: "Durumu",
            key: "status",
            dataIndex: "status",
            render: (status) => <div>{status ? 'Devam Ediyor' : 'Tamamlandı'}</div>,
        },

    ]


    return (
        <div >
            <Table  dataSource={data} columns={columns} rowKey="id" />
        </div>
    )
}

export default Services