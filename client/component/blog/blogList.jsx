import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import {
    Layout,
    Col,
    Row,
    Typography,
    Breadcrumb,
    Button,
    Divider,
} from 'antd'
import { readAllPosts } from '../../action/post'
import BlogTable from './blogTable'

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

const BlogList = () => {
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.posts.posts)

    const [activeTab, setActiveTab] = useState('all')
    const [postList, setPostList] = useState([])

    useEffect(() => {
        dispatch(readAllPosts())
    }, [])

    useEffect(() => {
        const newArray = posts.filter((post) => post.category === activeTab)
        setPostList(newArray)
    }, [activeTab])

    return (
        <Content>
            <Row justify="space-between">
                <Col lg={14} md={14} sm={24} xs={24}>
                    <Title style={{ color: '#707070' }}>BLOG</Title>
                </Col>
                <Col lg={6} md={6} sm={24} xs={24}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="/"><FormattedMessage id='home' /></Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Blog</Breadcrumb.Item>
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
                        onClick={() => setActiveTab('all')}
                    >
                        <FormattedMessage id='all' />
                    </Button>
                </Col>
                <Col>
                    <Button
                        type="link"
                        style={
                            activeTab === 'professional'
                                ? activeMenuLinkStyle
                                : menuLinkStyle
                        }
                        ghost
                        onClick={() => setActiveTab('professional')}
                    >
                        <FormattedMessage id='professional' />
                    </Button>
                </Col>
                <Col>
                    <Button
                        type="link"
                        style={
                            activeTab === 'personal'
                                ? activeMenuLinkStyle
                                : menuLinkStyle
                        }
                        ghost
                        onClick={() => setActiveTab('personal')}
                    >
                        <FormattedMessage id='personal' />
                    </Button>
                </Col>
            </Row>
            <Divider type="horizontal" />
            <Row>
                <BlogTable data={activeTab === 'all' ? posts : postList} />
            </Row>
        </Content>
    )
}

export default BlogList
