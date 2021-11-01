import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Typography, notification, Modal } from 'antd'
import { Link } from 'react-router-dom'
import { FormattedMessage, useIntl } from 'react-intl'
import {
    // CaretRightFilled,
    // MailOutlined,
    PoweroffOutlined,
} from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { useCustomModal } from '../helper/utils'
import LoginForm from './loginForm'
import { showMainMenu, logoutUser } from '../action'
import SocialNetwork from './socialNetwork'

const { Title } = Typography
const { confirm } = Modal

const btnStyle = {
    width: '12em',
    margin: '.5em',
    borderRadius: '8px',
    fontSize: '1.2em'
}

const menuLinkStyle = {
    fontSize: '2.2em',
    lineHeight: '1em',
    fontWeight: 'bold',
    margin: '.5em',
    textTransform: 'uppercase'
}

const MenuContent = () => {
    const menuVisibility = useSelector(state => state.mainMenu.menuVisibility)
    const isLoggedIn = useSelector(state => state.authentication.isLoggedIn)
    const responseStatus = useSelector(state => state.response.status)

    
    const intl = useIntl()
    const dispatch = useDispatch()

    const [modalVisibility, setModalVisibility] = useState(false)

    useEffect(() => {
        renderModal()
    }, [modalVisibility])

    useEffect(() => {
        if (responseStatus == 200) {
            setModalVisibility(false)
        }
    }, [responseStatus])

    const title = <Title level={4}>Login Form</Title>
    const component = <LoginForm />

    const logout = () => {
        dispatch(logoutUser(!isLoggedIn))
        notification['success']({
            message: `${intl.formatMessage({ id: 'logout-success' })}`
        })
    }

    const showConfirm = () => {
        confirm({
            title: `${intl.formatMessage({ id: 'auth-disc' })}`,
            okText: `${intl.formatMessage({ id: 'yes' })}`,
            cancelText: `${intl.formatMessage({ id: 'no' })}`,
            onOk() {
                return (
                    logout()
                )
            }
        })
    }

    const btnAction = () => {
        isLoggedIn ? showConfirm() : setModalVisibility(!modalVisibility)
    }

    const renderModal = () => {
        return useCustomModal(title, component, modalVisibility, setModalVisibility)
    }

    return (
        <Row 
            justify="space-around"
            style={{
                marginTop: '1%'
            }}
        >
            <Col>
                <Button
                    type='link'
                    style={menuLinkStyle}
                    ghost
                    onClick={() => dispatch(showMainMenu(!menuVisibility))}
                >
                    <Link to='/' >
                        <FormattedMessage id='home' />
                    </Link>
                </Button>
                <br />
                <Button
                    type='link'
                    style={menuLinkStyle}
                    ghost
                    onClick={() => dispatch(showMainMenu(!menuVisibility))}
                >
                    <Link to='/about' >
                        <FormattedMessage id='about-me' />
                    </Link>
                </Button>
                <br />
                <Button
                    type='link'
                    style={menuLinkStyle}
                    ghost
                    onClick={() => dispatch(showMainMenu(!menuVisibility))}
                >
                    <Link to='/work' >
                        <FormattedMessage id='work' />
                    </Link>
                </Button>
                <br />
                <Button
                    type='link'
                    style={menuLinkStyle}
                    ghost
                    onClick={() => dispatch(showMainMenu(!menuVisibility))}
                >
                    <Link to='/blog' >
                        Blog
                    </Link>
                </Button>
                <br />
                <Button
                    type='link'
                    style={menuLinkStyle}
                    ghost
                    onClick={() => dispatch(showMainMenu(!menuVisibility))}
                >
                    <Link to='/tutorial' >
                        <FormattedMessage id='tutorial' />
                    </Link>
                </Button>
                
            </Col>
            <Col style={{
                marginTop: '2em'
            }}>
                
                {/* <Button 
                    size='large' 
                    style={btnStyle} 
                    icon={<CaretRightFilled />}
                    onClick={() => dispatch(showMainMenu(!menuVisibility))}
                >
                    <FormattedMessage id='quick-tour' />
                </Button>
                <br />
                <Link to='/project'>
                    <Button 
                        size='large' 
                        style={btnStyle}
                        onClick={() => dispatch(showMainMenu(!menuVisibility))}
                    >
                        <FormattedMessage id='submit-project' />
                    </Button>
                </Link>
                <br /> */}
                <a href={'mailto: doctorrweb@gmail.com'}>
                    <Button size='large'
                        style={btnStyle}
                        // icon={<MailOutlined />}
                        // onClick={() => dispatch(showMainMenu(!menuVisibility))}
                    >
                        <FormattedMessage id='keep-in-touch' />
                    </Button>
                </a>
                <br />
                {
                    isLoggedIn === false ? null 
                        : 
                        <Link to='/dashboard'>
                            <Button size='large'
                                style={btnStyle}
                                onClick={() => dispatch(showMainMenu(!menuVisibility))}
                            >
                                <FormattedMessage id='dashboard' />
                            </Button>
                        </Link>
                }
                <br />
                <Button icon={<PoweroffOutlined />} size='large' style={btnStyle} onClick={() => btnAction()}>
                    {isLoggedIn ? ` ${intl.formatMessage({ id: 'logout' })}` : ` ${intl.formatMessage({ id: 'login' })}`}
                </Button>
                { renderModal() }
                <SocialNetwork />
            </Col>
            
        </Row>
    )
}

export default MenuContent