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
import { useFormik } from 'formik';
import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css';
import { customerValidations } from './validations';

function Navbar() {
    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            address: "",
            phone: "",
        },
        validationSchema: customerValidations,
        onSubmit:async(values,bag)=>{
           axios.post("http://localhost:5049/api/Customers",values);

            formik.resetForm();
        }
    })

    const { isOpen: isCustomerOpen, onOpen: onCustomerOpen, onClose: onCustomerClose } = useDisclosure()
    const { isOpen: isServiceOpen, onOpen: onServiceOpen, onClose: onServiceClose } = useDisclosure()
    return (
        <>
            <nav className='nav'>
                <div className="left">
                    <div className="logo">
                        <Link to={"/"}>Anasayfa</Link>
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
                    <ModalHeader textAlign={"center"} color={"red"}>Müşteri Giriş Ekranı</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>

                        <form onSubmit={formik.handleSubmit}>
                            <FormControl>
                                <FormLabel>Telefon Numarası</FormLabel>
                                <Input maxLength={10} placeholder='5xxxxxxxxx' name='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Ad / Soyad</FormLabel>
                                <Input name='fullName' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.fullName} />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Email Adresi</FormLabel>
                                <Input placeholder='xxx@yyy.zzz' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Adresi</FormLabel>
                                <Input name='address' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address} />
                            </FormControl>
                        </form>
                    </ModalBody>
                    <ModalFooter mt={3}>
                        <Button colorScheme='blue' mr={3} onClick={formik.handleSubmit}>
                            Müşteriyi Kaydet
                        </Button>
                        <Button onClick={() => {
                            onServiceOpen();
                            onCustomerClose();
                        }} variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>



            <Modal isOpen={isServiceOpen} onClose={onServiceClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={"center"} color={"red"}>Servis Giriş Ekranı</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        denemeeeee
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onServiceClose}>
                            Kapat
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Navbar