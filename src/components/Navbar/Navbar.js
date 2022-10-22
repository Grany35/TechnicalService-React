import {
    Button, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Input
} from '@chakra-ui/react'
import axios from "axios";
import { notification } from 'antd';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './styles.css';
import { customerValidations, serviceValidations } from './validations';

function Navbar() {

    const [users, setUser] = useState([]);

    const formikCustomer = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            address: "",
            phone: "",
        },
        validationSchema: customerValidations,
        onSubmit: async (values, bag) => {
            try {
                await axios.post("http://localhost:5049/api/Customers", values).then(({ data }) => setUser(data)).then(() => onServiceOpen()).then(onCustomerClose)
            } catch (error) {
                console.log("error", error);
            }
        }
    })

    const formikService = useFormik({
        enableReinitialize: true,
        initialValues: {
            customerId: users.id,
            customerDescription: "",
        },
        validationSchema: serviceValidations,
        onSubmit: async (values, bag) => {

            try {
                await axios.post("http://localhost:5049/api/ServiceInformations", values)
                notification.success({
                    message: "Başarılı",
                    description: "Servi Kaydı Başlatıldı...",
                    duration: 5,
                    placement: 'bottomRight',
                })
            } catch (error) {
                notification.error({
                    message: "Hata!",
                    description: error.message,
                    duration: 5,
                    placement: 'bottomRight',
                })
            }

        }
    })

    useEffect(() => {
        console.log("useefect", users.id)
    }, [users])

    const { isOpen: isCustomerOpen, onOpen: onCustomerOpen, onClose: onCustomerClose } = useDisclosure()
    const { isOpen: isServiceOpen, onOpen: onServiceOpen, onClose: onServiceClose } = useDisclosure()
    return (
        <>
            <nav className='nav'>
                <div className="left">
                    <div className="logo">
                        <Link to={"/"}>Anasayfa</Link>
                    </div>
                    <div className='services'>
                        <Link to={"/services"}>Servisler</Link>
                    </div>
                </div>
                <div className="right">

                    <Link>
                        <Button variant={"outline"} onClick={onCustomerOpen} mr={3} colorScheme={"blue"}>
                            Müşteri Kaydet
                        </Button>
                    </Link>

                    <Link>
                        <Button variant={"outline"} mr={3} colorScheme={"yellow"}>
                            Müşteri Ara
                        </Button>
                    </Link>

                    <Link>
                        <Button variant={"outline"} onClick={onServiceOpen} colorScheme={"red"}>
                            Servis Girişi
                        </Button>
                    </Link>

                </div>
            </nav>

            {/* Müşteri Ekleme Alanı */}
            <Modal isOpen={isCustomerOpen} onClose={onCustomerClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={"center"} color={"red"}>Müşteri Kayıt Ekranı</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>

                        <form onSubmit={formikCustomer.handleSubmit}>

                            <FormControl>
                                <FormLabel>Telefon Numarası</FormLabel>
                                <Input maxLength={10} placeholder='5xxxxxxxxx' name='phone' onChange={formikCustomer.handleChange} onBlur={formikCustomer.handleBlur} value={formikCustomer.values.phone} />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Ad / Soyad</FormLabel>
                                <Input name='fullName' onChange={formikCustomer.handleChange} onBlur={formikCustomer.handleBlur} value={formikCustomer.values.fullName} />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Email Adresi</FormLabel>
                                <Input placeholder='xxx@yyy.zzz' name='email' onChange={formikCustomer.handleChange} onBlur={formikCustomer.handleBlur} value={formikCustomer.values.email} />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Adresi</FormLabel>
                                <Input name='address' onChange={formikCustomer.handleChange} onBlur={formikCustomer.handleBlur} value={formikCustomer.values.address} />
                            </FormControl>
                        </form>
                    </ModalBody>
                    <ModalFooter mt={2}>
                        <Button colorScheme='blue' mr={3} onClick={formikCustomer.handleSubmit}>
                            Müşteriyi Kaydet Ve Servis İşlemine Devam Et
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>



            <Modal isOpen={isServiceOpen} onClose={onServiceClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={"center"} color={"red"}>Servis Giriş Ekranı</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={formikService.handleSubmit}>
                            {
                                users && (
                                    <FormControl>
                                        <FormLabel> Telefon Numarası </FormLabel>
                                        <Input disabled value={users.phone || ''} />
                                    </FormControl>
                                )
                            }





                            <FormControl mt={3}>
                                <FormLabel>Müşteri Açıklaması</FormLabel>
                                <Input name='customerDescription' onChange={formikService.handleChange} onBlur={formikService.handleBlur} value={formikService.values.customerDescription} />
                            </FormControl>
                        </form>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => {
                            formikService.handleSubmit();
                        }}>
                            Servisi Başlat
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Navbar