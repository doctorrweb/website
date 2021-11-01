import React from 'react'
import { Row, Col } from 'antd'

const logos = [
    'javascript',
    'nodejs',
    'express',
    'react',
    'graphql',
    'mongodb',
]

const Technos = () => {

    const renderLogo = () =>
        logos.map((logo) => (
            <Col
                key={logo}
                lg={{ span: 2 }}
                md={{ span: 2 }}
                sm={{ span: 1 }}
                xs={{ span: 1 }}
            >
                <img 
                    src={`img/${logo}.svg`} 
                    height={logo === 'express' ? 22 : 30} 
                    style={{ paddingRight: 50 }} 
                />
            </Col>
        ))

    return (
        <Row 
            justify="space-around"
        >
            {renderLogo()}
        </Row>
    )
    
}

export default Technos