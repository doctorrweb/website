import React, { useEffect, Fragment } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FormattedMessage } from 'react-intl'
// import { LinkOutlined, ClockCircleOutlined } from '@ant-design/icons'
import {
    Breadcrumb,
    Layout,
    Row,
    Col,
    Divider,
    Typography,
} from 'antd'
import { readPost } from '../../action/post'

const NO_IMAGE = '/uploads/images-no-image-2020-05-22T18:41:03.460Z.jpg'

const { Content } = Layout
const { Title, Paragraph, Text } = Typography

const BlogItem = () => {

    const dispatch = useDispatch()
    const { id } = useParams()

    const post = useSelector((state) => state.posts.posts[0])
    const lang = useSelector(state => state.locale.lang)

    useEffect(() => {
        dispatch(readPost(id))
    }, [])

    const htmlDecode = (content) => {
        let e = document.createElement('div')
        e.innerHTML = content
        return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue
    }

    const renderContent = () => {
        return (
            <Fragment>
                <Row justify="space-between" style={{ margin: '2% 1.5em 0' }}>
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <Title style={{ color: '#707070' }}>BLOG</Title>
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/"><FormattedMessage id='home' /></Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to="/blog">Blog</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>{post.translations && post.translations[lang] ? post.translations[lang].title : post.title}</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col lg={24} md={24} sm={24} xs={24}>
                        <Title>{post.translations && post.translations[lang] ? post.translations[lang].title : post.title}</Title>
                        <img
                            src={post.image ? post.image.path : NO_IMAGE}
                            width="90%"
                            height={250}
                            style={{ objectFit: 'cover', marginTop: 10 }}
                        />
                        <Divider type="horizontal" />
                       
                        <div>
                            <Text><FormattedMessage id='category' /></Text>:{' '}
                            <Text strong>{post.category}</Text>
                        </div>
                        <Paragraph
                            style={{
                                paddingTop: 10,
                                paddingRight: 10,
                                textAlign: 'justify',
                            }}
                        >
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: post.translations && post.translations[lang] ? htmlDecode(post.translations[lang].content) : htmlDecode(post.content),
                                }}
                            />
                        </Paragraph>
                    </Col>
                </Row>
            </Fragment>
        )
    }

    return (
        <Content>
            { post && renderContent() }
        </Content>
    )
}

export default BlogItem
