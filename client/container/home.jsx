import React from 'react'
import { Divider, Row, Col } from 'antd'
import Intro from '../component/intro'
import Technos from '../component/technos'

const bgImgUri = 'img/background-code.png'

const Home = () => {
    return (
        <div
            className="content"
            style={{
                height: '100%',
                overflow: 'hidden',
                backgroundImage: `url(${bgImgUri})`,
                backgroundSize: 'cover'
            }}
        >
            <Intro />
            <Row
                justify="space-around"
                align="bottom"
                style={{
                    position: 'fixed',
                    bottom: 100,
                    width: '100%'
                }}
                className="stack"
            >
                <Col
                    lg={{ span: 24 }}
                    md={{ span: 24 }}
                    sm={{ span: 0 }}
                    xs={{ span: 0 }}
                >
                    <Divider 
                        orientation="right" 
                        style={{ 
                            color: '#333', 
                            fontWeight: 'normal',
                        }}
                    >
                        My Stack 
                    </Divider>
                    <Technos />
                </Col>
            </Row>
        </div>
    )
}

export default Home