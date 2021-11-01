import React from 'react'
import { Col, Drawer, Row, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { showMainMenu, toggleBtn } from '../action'
import { HeartOutlined, CoffeeOutlined } from '@ant-design/icons'
import Logo from './logo'
import MenuContent from './menuContent'
import CustomFooter from '../container/customFooter'

const bgImgUri = 'img/video-menu-bg.gif'
const { Title } = Typography

const MainMenu = () => {

    const dispatch = useDispatch()
    const menuVisibility = useSelector(state => state.mainMenu.menuVisibility)

    const handleClose = () => {
        dispatch(showMainMenu(false))
        dispatch(toggleBtn(false))
    }

    return (
        <Drawer
            title={<Logo />}
            placement="bottom"
            headerStyle={{
                padding: 15,
                backgroundColor: 'rgba(0, 0, 0, .9)',
            }}
            style={{
                
            }}
            drawerStyle={{
                backgroundImage: `url(${bgImgUri})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}
            bodyStyle={{
                backgroundColor: 'rgba(0, 0, 0, .9)'
            }}
            closable={true}
            onClose={() => handleClose()}
            visible={menuVisibility}
            height="100%"
            footer={<CustomFooter />}
            footerStyle={{
                backgroundColor: 'rgba(0, 0, 0, .9)',
            }}
        >
            <MenuContent />
            <Row 
                justify="center"
                style={{ marginTop: '10%' }}
            >
                <Col>
                    <Title level={4} style={{textAlign: 'center' }}>
                        <FormattedMessage 
                            id="accroch" 
                            values={{
                                love: <HeartOutlined />,
                                coffee: <CoffeeOutlined />
                            }}
                        />
                    </Title>
                </Col>
            </Row>
        </Drawer>
    )
}

export default MainMenu
