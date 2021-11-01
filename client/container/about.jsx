import React, { useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { Layout, Col, Row, Typography, Breadcrumb, Anchor, Divider } from 'antd'
import { useIntl, FormattedMessage } from 'react-intl'
import { readAllPosts } from '../action/post'

const { Content, Sider } = Layout
const AnchorLink = Anchor.Link
const { Title } = Typography

const About = () => {

    const intl = useIntl()
    const location = useLocation()
    const dispatch = useDispatch()

    const posts = useSelector(state => state.posts.posts)
    const lang = useSelector(state => state.locale.lang)

    useEffect(() => {
        dispatch(readAllPosts())
    }, [])

    const htmlDecode = (content) => {
        let e = document.createElement('div')
        e.innerHTML = content
        return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue
    }

    const renderPost = (title, hash) => {
        const post = posts.find(post => post.title === title)
        if (post) {
            return (
                <Fragment>
                    <Row
                        justify="space-between"
                        style={{ marginTop: 50 }}
                        id={hash}
                    >
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <Title level={3} style={{ color: '#FF9900' }}>
                                {post.translations && post.translations[lang]
                                    ? post.translations[lang].title
                                    : post.title}
                            </Title>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: post.translations && post.translations[lang]
                                        ? htmlDecode(post.translations[lang].content)
                                        : htmlDecode(post.content),
                                }}
                            />
                        </Col>
                    </Row>
                    <Row justify="space-between" style={{ marginTop: 50 }}>
                        <Col lg={24} md={24} sm={24} xs={24}>
                            <img
                                src={post.image && post.image.path}
                                width="100%"
                                height={350}
                                style={{ objectFit: 'cover', marginTop: 10 }}
                            />
                        </Col>
                    </Row>
                </Fragment>
            )
        }
    }

    return (
        <Layout
            style={{
                margin: '10%',
            }}
        >
            <Content
                style={{
                    marginRight: '2%'
                }}
            >
                <Row
                    justify="space-between"
                    style={{ margin: '25px 16px 0' }}
                    align="middle"
                >
                    <Col lg={14} md={14} sm={24} xs={24}>
                        <Title style={{ color: '#707070' }}>
                            {intl
                                .formatMessage({ id: 'about-me' })
                                .toUpperCase()}
                        </Title>
                    </Col>
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/">
                                    {intl.formatMessage({ id: 'home' })}
                                </Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                {intl.formatMessage({ id: 'about-me' })}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                {posts && renderPost('The little story', 'theLittleStory')}
                <Row justify="center" style={{ marginTop: 50 }}>
                    <Col lg={18} md={18} sm={24} xs={24}>
                        <blockquote>
                            “{intl.formatMessage({ id: 'quote-zeitoun' })}”
                        </blockquote>
                        <em>Jean Zeitoun, {intl.formatMessage({ id: 'title-zeitoun' })}</em>
                    </Col>
                </Row>
                {posts && renderPost('What\'s up doctorr ?', 'doctorr')}
                <Divider type='horizontal' />
                {posts && renderPost('My Philosophy', 'myPhilosophy')}
                <Row justify="center" style={{ marginTop: 50 }}>
                    <Col lg={18} md={18} sm={24} xs={24}>
                        <blockquote>
                            “{intl.formatMessage({ id: 'quote-burgress' })}“
                        </blockquote>
                        <em>Wades Burgress, {intl.formatMessage({ id: 'title-burgress' })}</em>
                    </Col>
                </Row>
                {posts && renderPost('My Stack', 'myStack')}
                <Divider type='horizontal' />
                {posts && renderPost('My Vision', 'myVision')}
            </Content>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                style={{
                    backgroundColor: 'transparent'
                }}
            >
                <Anchor
                    affix={true}
                    offsetTop={150}
                    style={{
                        backgroundColor: 'transparent'
                    }}
                >
                    <AnchorLink href={`#${location.pathname}#theLittleStory`} title={<FormattedMessage id="thelittlestory" />} />
                    <AnchorLink href={`#${location.pathname}#doctorr`} title={<FormattedMessage id="whatsupdoctor" />} />
                    <AnchorLink href={`#${location.pathname}#myPhilosophy`} title={<FormattedMessage id="my-philosophy" />} />
                    <AnchorLink href={`#${location.pathname}#myStack`} title={<FormattedMessage id="my-stack" />} />
                    <AnchorLink href={`#${location.pathname}#myVision`} title={<FormattedMessage id="my-vision" />} />
                </Anchor>
            </Sider>
        </Layout>
    )
}

export default About