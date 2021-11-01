import React from 'react'
import { Col, Carousel, Typography } from 'antd'

const { Title } = Typography

const bgImgUri = 'img/home-ill.png'

const LastPost = () => {
    return (
        <Col 
            lg={{ span: 10 }} 
            md={{ span: 10 }} 
            sm={{ span: 0 }} 
            xs={0}
        >
            <Title 
                level={2}
                style={{ color: 'orange' }}
            >
                LATEST POSTS
            </Title>
            <Carousel dotPosition="right">
                <div>
                    <div>
                        <h3>
                            Section 1.10.32 du De Finibus Bonorum et Malorum de
                            Ciceron (45 av. J.-C.)
                        </h3>
                        <p>
                            Le Lorem Ipsum est simplement du faux texte employé
                            dans la composition et la mise en page avant
                            impression.
                        </p>
                    </div>
                    <div>
                        <h3>
                            Le passage de Lorem Ipsum standard, utilisé depuis
                            1500
                        </h3>
                        <p>
                            Le Lorem Ipsum est simplement du faux texte employé
                            dans la composition et la mise en page avant
                            impression.
                        </p>
                    </div>
                </div>
                <div>
                    <img src={bgImgUri} />
                </div>
            </Carousel>
        </Col>
    )
}

export default LastPost