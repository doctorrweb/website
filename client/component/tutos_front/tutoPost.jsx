import React, { useState, useEffect, Fragment } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { FormattedMessage, useIntl } from 'react-intl'
import { useSelector, useDispatch } from 'react-redux'
import {
    FileTextOutlined,
    YoutubeFilled,
    YoutubeOutlined,
    StepBackwardOutlined
} from '@ant-design/icons'
import {
    Breadcrumb,
    Layout,
    Row,
    Col,
    Divider,
    List,
    Typography,
    Tag,
    Button,
    Tabs,
    Card
} from 'antd'
import moment from 'moment'
import ReactPlayer from 'react-player'
import { readPost } from '../../action/post'
import { readOneTutorial } from '../../action/tutorial'

const { Content } = Layout
const { TabPane } = Tabs
const { Title, Paragraph, Text } = Typography

const TutoPost = () => {

    const intl = useIntl()
    const dispatch = useDispatch()
    const history = useHistory()
    const { id, postId } = useParams()

    // const projects = useSelector((state) => state.projects.projects)

    const post = useSelector((state) => state.posts.posts[0])
    const tutorial = useSelector((state) => state.tutorials.tutorials[0])

    const [newPostId, setNewPostId] = useState(postId)

    useEffect(() => {
        dispatch(readPost(postId))
        dispatch(readOneTutorial(id))

    }, [])


    useEffect(() => {
        dispatch(readPost(newPostId))
        dispatch(readOneTutorial(id))
    }, [newPostId])

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
                            {`${intl.formatMessage({id: 'tutorial'}).toUpperCase()}`}
                        </Title>
                    </Col>
                    <Col lg={18} md={18} sm={24} xs={24}>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/"><FormattedMessage id='home' /></Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to="/tutorial"><FormattedMessage id='tutorial' /></Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to={`/tutorial/${id}`}>
                                    {post.formation.title}
                                </Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>{post.title}</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col lg={16} md={16} sm={24} xs={24}>
                        <Title level={2} style={{ color: '#707070' }}>
                            {` ${intl.formatMessage({id: 'project'})}: ${post.formation.title}`}
                        </Title>
                        <div>
                            <Text><FormattedMessage id='category' /></Text>:{' '}
                            <Text strong>{post.formation.category}</Text>
                        </div>

                        <Divider orientation="right">
                            <Button
                                size="small"
                                type="primary"
                                icon={<StepBackwardOutlined />}
                                onClick={() => history.goBack()}
                            >
                                <FormattedMessage id='back-to-tutorial' />
                            </Button>
                        </Divider>
                        <Divider><FormattedMessage id='post' /></Divider>
                        <Title level={1}>{post.title} </Title>
                        <Tag color="orange">
                            {moment(post.creationDate).format('LL')}
                        </Tag>
                        <img
                            src={post.image.path}
                            width="90%"
                            height={250}
                            style={{ objectFit: 'cover', marginTop: 30 }}
                        />
                        <Paragraph
                            style={{
                                paddingTop: 10,
                                paddingRight: 10,
                                textAlign: 'justify',
                            }}
                        >
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: htmlDecode(post.content),
                                }}
                            />
                        </Paragraph>
                    </Col>
                    <Col lg={8} md={8} sm={24} xs={24}>
                        <Title level={3} style={{ textAlign: 'center' }}>
                            <FormattedMessage id='tutorial-list' />
                        </Title>
                        <Divider type="horizontal" />
                        <Tabs defaultActiveKey="2" tabPosition="left">
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
                                    dataSource={tutorial && tutorial.videos}
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
                                    dataSource={tutorial && tutorial.posts}
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
                                                    setNewPostId(item._id)
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

    return <Content>{post && renderContent()}</Content>
}

export default TutoPost
