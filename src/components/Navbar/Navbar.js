import { Button } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css';

function Navbar() {
    return (
        <nav className='nav'>
            <div className="left">
                <div className="logo">
                    <Link to={"/"}>Anasayfa</Link>
                </div>
            </div>
            <div className="right">

                <Link>
                    <Button mr={3} colorScheme={"blue"}>
                        Müşteri Kaydet
                    </Button>
                </Link>

                <Link>
                <Button mr={3} colorScheme={"yellow"}>
                    Müşteri Ara
                </Button>
                </Link>

                <Link>
                    <Button colorScheme={"green"}>
                        Servis Girişi
                    </Button>
                </Link>
                
            </div>
        </nav>
    )
}

export default Navbar