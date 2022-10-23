import React, { useState } from 'react'
import { Table } from "antd";
import { useQuery } from '@tanstack/react-query';
import { fetchServices } from '../../api';
import { Button, Flex, Input } from '@chakra-ui/react';
import "./styles.css";

function Services() {
    const [pageNumber, setPageNumber] = useState(1);
    const [isActive, setIsActive] = useState(true);
    const [query, setQuery] = useState("");

    const { data } = useQuery(["services", pageNumber,query, isActive], () => fetchServices(pageNumber,query, isActive));


    const click = () => {
        if (isActive) {
            setIsActive(false);
        } else {
            setIsActive(true);
        }
    }


    const columns = [
        {
            title: "Müşteri Adı/Soyadı",
            dataIndex: ["customer", "fullName"],
            key: "customer",
        },
        {
            title: "Telefon Numarası",
            dataIndex: ["customer", "phone"],
            key: "phone",
        },
        {
            title:"Email",
            dataIndex:["customer","email"],
            key:"email",
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
            render: (status) => <div className={status?"bg-green":"bg-red"}>{status ? 'Devam Ediyor' : 'Tamamlandı'}</div>,
        },

    ]


    return (
        <div>
            <Flex my={6} justifyContent={"center"}>
                <Input width={"30%"} onChange={(e) => setQuery(e.target.value)} />
            </Flex>

            <Table pagination={false} dataSource={data} columns={columns} rowKey="id" />
            <div>
                <Button onClick={() => setPageNumber(page => page - 1)} disabled={pageNumber === 1} > Önceki Sayfa </Button>
                <Button onClick={() => setPageNumber(page => page + 1)}  > Sonraki Sayfa </Button>
                <Button ml={20} colorScheme={"green"} onClick={click} >
                    {
                        isActive && (
                            <p>Bitenleri Göster</p>
                        )
                    }
                    {
                        !isActive && (
                            <p>Devam Edenleri Göster</p>
                        )
                    }
                </Button>
            </div>



        </div>
    )
}

export default Services