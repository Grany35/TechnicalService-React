import React, {  useState } from 'react'
import { Table } from "antd";
import { useQuery } from '@tanstack/react-query';
import { fetchServices } from '../../api';
import { Button } from '@chakra-ui/react';
import "./styles.css";

function Services() {
    const [pageNumber, setPageNumber] = useState(1);
    const [isActive, setIsActive] = useState(true);

    const { data } = useQuery(["services", pageNumber, isActive], () => fetchServices(pageNumber, isActive));


    const click=()=>{
        if (isActive) {
            setIsActive(false);
        }else{
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
        <div>
            <Table pagination={false} dataSource={data} columns={columns} rowKey="id" />
            <div>
            <Button onClick={() => setPageNumber(page => page - 1)} disabled={pageNumber === 1} > Önceki Sayfa </Button>
            <Button onClick={() => setPageNumber(page => page + 1)}  > Sonraki Sayfa </Button>
            <Button ml={20} className='rigth' colorScheme={"green"} onClick={click} >
                {
                    isActive &&(
                       <p>Bitenleri Göster</p> 
                    )
                }
                {
                    !isActive&&(
                        <p>Devam Edenleri Göster</p> 
                    )
                }
                </Button>
            </div>
            


        </div>
    )
}

export default Services