import React from 'react'
import { Row, Col } from 'antd'
import MenuIcon from '../component/menuIcon'
import Logo from '../component/logo'

const NavBar = () => {

    
    
    return (
        <Row type="flex" justify="space-between" align="middle">
            <Col
                md={3}
                sm={3}
                xs={4}
                style={{ textAlign: 'left', paddingTop: 27 }}
                className="logo"
            >
                <Logo />
            </Col>
            <Col md={3} sm={3} xs={3} style={{ textAlign: 'right' }}>
                <MenuIcon  />
            </Col>
        </Row>
    )
}

export default NavBar