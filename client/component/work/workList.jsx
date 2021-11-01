import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useIntl } from 'react-intl'
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
import { readAllProjects } from '../../action/project'
import WorkTable from './workTable'

const { Content } = Layout
const { Title } = Typography

const menuLinkStyle = {
    fontSize: '1.2em',
    lineHeight: '1em',
    fontWeight: 'bold',
    margin: '.5em',
    textTransform: 'uppercase',
}

const activeMenuLinkStyle = {
    fontSize: '1.2em',
    lineHeight: '1em',
    fontWeight: 'bold',
    margin: '.5em',
    textTransform: 'uppercase',
    color: '#FF9900',
}

const filters = [
    { elmt: 'graphic', text: 'Graphic', icon: <HighlightOutlined /> },
    { elmt: 'edition', text: 'Edition', icon: <ReadOutlined /> },
    { elmt: 'web', text: 'Web', icon: <GlobalOutlined /> },
    { elmt: 'mobile', text: 'Mobile', icon: <MobileOutlined /> },
    { elmt: 'desktop', text: 'Desktop', icon: <LaptopOutlined /> }
]

const WorkList = () => {

    const intl = useIntl()
    const dispatch = useDispatch()

    const projects = useSelector((state) => state.projects.projects)


    const [activeTab, setActiveTab] = useState('all')
    const [projectlist, setProjectList] = useState([])


    useEffect(() => {
        dispatch(readAllProjects())
    }, [])

    useEffect(() => {
        const newArray = projects.filter(
            (project) => project.category === activeTab
        )
        setProjectList(newArray)
    }, [activeTab])

    const renderfilters = () =>

        filters.map(({ elmt, icon, text }) => (
            <Col
                key={elmt}
                lg={{ span: 4 }}
                md={{ span: 8 }}
                sm={{ span: 12 }}
                xs={{ span: 12 }}
            >
                <Button
                    type="link"
                    style={
                        activeTab === elmt ? activeMenuLinkStyle : menuLinkStyle
                    }
                    ghost
                    icon={icon}
                    onClick={() => setActiveTab(elmt)}
                >
                    {text}
                </Button>
            </Col>
        ))

    return (
        <Content 
        >
            <Row 
                justify="space-between" 
            >
                <Col lg={14} md={14} sm={24} xs={24}>
                    <Title style={{ color: '#707070' }}>{intl.formatMessage({id: 'work'})}</Title>
                </Col>
                <Col lg={6} md={6} sm={24} xs={24}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/">{intl.formatMessage({id: 'home'})}</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>{intl.formatMessage({id: 'work'})}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row justify="space-around">
                <Col
                >
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
                        {intl.formatMessage({id: 'all'})}
                    </Button>
                </Col>
                {renderfilters()}
            </Row>
            <Divider type="horizontal" />
            <Row>
                <WorkTable
                    data={activeTab === 'all' ? projects : projectlist}
                />
            </Row>
        </Content>
    )
}

export default WorkList
