import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FormattedMessage, useIntl } from 'react-intl'
import {
    Layout,
    Col,
    Row,
    Typography,
    Breadcrumb,
    Button,
    Divider,
} from 'antd'
import {
    HighlightOutlined,
    ReadOutlined,
    GlobalOutlined,
    MobileOutlined,
    LaptopOutlined,
    TableOutlined,
} from '@ant-design/icons'
import { readAllTutorials } from '../../action/tutorial'
import TutorialTable from './tutorialTable'

const { Content } = Layout
const { Title } = Typography

const menuLinkStyle = {
    fontSize: '1.5em',
    lineHeight: '1em',
    fontWeight: 'bold',
    margin: '.5em',
    textTransform: 'uppercase',
}

const activeMenuLinkStyle = {
    fontSize: '1.5em',
    lineHeight: '1em',
    fontWeight: 'bold',
    margin: '.5em',
    textTransform: 'uppercase',
    color: '#FF9900',
}

const TutoList = () => {

    const intl = useIntl()
    const dispatch = useDispatch()
    const tutorials = useSelector((state) => state.tutorials.tutorials)

    const [activeTab, setActiveTab] = useState('all')
    const [tutoList, setTutoList] = useState([])

    useEffect(() => {
        dispatch(readAllTutorials())
    }, [])

    useEffect(() => {
        const newArray = tutorials.filter(
            (tuto) => tuto.category === activeTab
        )
        setTutoList(newArray)
    }, [activeTab])

    return (
        <Content>
            <Row justify="space-between">
                <Col lg={14} md={14} sm={24} xs={24}>
                    <Title style={{ color: '#707070' }}>
                        {intl.formatMessage({id: 'tutorial'}).toUpperCase()}
                    </Title>
                </Col>
                <Col lg={6} md={6} sm={24} xs={24}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/"><FormattedMessage id='home' /></Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item><FormattedMessage id='tutorial' /></Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row justify="space-around">
                <Col>
                    <Button
                        type="link"
                        style={
                            activeTab === 'all'
                                ? activeMenuLinkStyle
                                : menuLinkStyle
                        }
                        ghost
                        icon={<TableOutlined />}
                        onClick={() => setActiveTab('all')}
                    >
                        {` ${intl.formatMessage({id: 'all'})}`}
                    </Button>
                </Col>
                <Col>
                    <Button
                        type="link"
                        style={
                            activeTab === 'graphic'
                                ? activeMenuLinkStyle
                                : menuLinkStyle
                        }
                        ghost
                        icon={<HighlightOutlined />}
                        onClick={() => setActiveTab('graphic')}
                    >
                        Graphic
                    </Button>
                </Col>
                <Col>
                    <Button
                        type="link"
                        style={
                            activeTab === 'edition'
                                ? activeMenuLinkStyle
                                : menuLinkStyle
                        }
                        ghost
                        icon={<ReadOutlined />}
                        onClick={() => setActiveTab('edition')}
                    >
                        Edition
                    </Button>
                </Col>
                <Col>
                    <Button
                        type="link"
                        style={
                            activeTab === 'web'
                                ? activeMenuLinkStyle
                                : menuLinkStyle
                        }
                        ghost
                        icon={<GlobalOutlined />}
                        onClick={() => setActiveTab('web')}
                    >
                        Web
                    </Button>
                </Col>
                <Col>
                    <Button
                        type="link"
                        style={
                            activeTab === 'mobile'
                                ? activeMenuLinkStyle
                                : menuLinkStyle
                        }
                        ghost
                        icon={<MobileOutlined />}
                        onClick={() => setActiveTab('mobile')}
                    >
                        Mobile
                    </Button>
                </Col>
                <Col>
                    <Button
                        type="link"
                        style={
                            activeTab === 'desktop'
                                ? activeMenuLinkStyle
                                : menuLinkStyle
                        }
                        ghost
                        icon={<LaptopOutlined />}
                        onClick={() => setActiveTab('desktop')}
                    >
                        Desktop
                    </Button>
                </Col>
            </Row>
            <Divider type="horizontal" />
            <Row>
                <TutorialTable
                    data={activeTab === 'all' ? tutorials : tutoList}
                />
            </Row>
        </Content>
    )
}

export default TutoList
