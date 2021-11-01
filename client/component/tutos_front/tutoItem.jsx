import React, { Fragment, useEffect } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useIntl, FormattedMessage } from 'react-intl'
import { FileTextOutlined, YoutubeFilled, YoutubeOutlined } from '@ant-design/icons'
import {
    Breadcrumb,
    Layout,
    Row,
    Col,
    Divider,
    List,
    Card,
    Tabs,
    Typography,
} from 'antd'
import moment from 'moment'
import ReactPlayer from 'react-player'
import { readOneTutorial } from '../../action/tutorial'

const NO_IMAGE = '/uploads/images-no-image-2020-05-22T18:41:03.460Z.jpg'
const { Content } = Layout
const { TabPane } = Tabs
const { Title, Paragraph, Text } = Typography

const TutoItem = () => {

    const intl = useIntl()
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()

    const tutorial = useSelector((state) => state.tutorials.tutorials[0])


    useEffect(() => {
        dispatch(readOneTutorial(id))
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
                        <Title style={{ color: '#707070' }}>
                            {intl.formatMessage({id: 'tutorial'}).toUpperCase()}
                        </Title>
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/"><FormattedMessage id='home' /></Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to="/tutorial"><FormattedMessage id='tutorial' /></Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>{tutorial.title}</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col lg={14} md={24} sm={24} xs={24}>
                        <Title style={{ color: '#FF9900' }}>{tutorial.title}</Title>
                        <img
                            src={tutorial.image ? tutorial.image.path : NO_IMAGE}
                            width="90%"
                            height={250}
                            style={{ objectFit: 'cover', marginTop: 10 }}
                        />
                        <div>
                            <Text>{`${intl.formatMessage({id: 'category'})} `}</Text>:
                            <Text strong>{tutorial.category}</Text>
                        </div>
                        <Divider type="horizontal" />
                        <Paragraph
                            style={{
                                paddingTop: 10,
                                paddingRight: 10,
                                textAlign: 'justify',
                            }}
                        >
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: tutorial ? htmlDecode(tutorial.content) : null,
                                }}
                            />
                        </Paragraph>
                    </Col>
                    <Col lg={10} md={24} sm={24} xs={24}>
                        <Title level={4} style={{ textAlign: 'center' }}>
                            <FormattedMessage id='tutorial-list' />
                        </Title>
                        <Divider type="horizontal" />
                        <Tabs defaultActiveKey="1" tabPosition="left">
                            <TabPane
                                tab={
                                    <span>
                                        <YoutubeOutlined />
                                        <FormattedMessage id='video' />
                                    </span>
                                }
                                key="1"
                            >
                                <List
                                    grid={{
                                        gutter: 16,
                                        column: 1,
                                    }}
                                    dataSource={tutorial.videos}
                                    size="small"
                                    pagination={{
                                        onChange: (page) => {
                                            console.log(page)
                                        },
                                        pageSize: 2,
                                        size: 'small',
                                    }}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <ReactPlayer
                                                // style={{ marginRight: 400 }}
                                                url={item.path}
                                                width={320}
                                                height={220}
                                                playing={false}
                                                playIcon={<YoutubeFilled />}
                                                controls
                                            />
                                        </List.Item>
                                    )}
                                />
                            </TabPane>
                            <TabPane
                                tab={
                                    <span>
                                        <FileTextOutlined />
                                        <FormattedMessage id='post' />
                                    </span>
                                }
                                key="2"
                            >
                                <List
                                    grid={{
                                        gutter: 16,
                                        column: 1,
                                    }}
                                    dataSource={tutorial.posts}
                                    size="small"
                                    pagination={{
                                        onChange: (page) => {
                                            console.log(page)
                                        },
                                        pageSize: 6,
                                        size: 'small',
                                    }}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <Card
                                                hoverable
                                                bordered={true}
                                                size="small"
                                                onClick={() =>
                                                    history.push(
                                                        `/tutorial/${id}/${item._id}`
                                                    )
                                                }
                                            >
                                                <h3
                                                    style={{ color: '#FF9900' }}
                                                >
                                                    {item.title}
                                                </h3>
                                                <div>
                                                    {`Published ${moment(
                                                        item.creationDate
                                                    ).fromNow()}`}
                                                </div>
                                            </Card>
                                        </List.Item>
                                    )}
                                />
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
                <Row></Row>
            </Fragment>
        )
    }

    return (
        <Content>
            { tutorial && renderContent() }
        </Content>
    )
}

export default TutoItem
