import React, { useState, useEffect, Fragment } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FormattedMessage, useIntl } from 'react-intl'
import { LinkOutlined, ClockCircleOutlined, StepBackwardOutlined } from '@ant-design/icons'
import {
    Breadcrumb,
    Layout,
    Row,
    Col,
    Divider,
    Timeline,
    Typography,
    Tag,
    Button,
} from 'antd'
import moment from 'moment'
import { readPost } from '../../action/post'
import { readOneProject } from '../../action/project'


const { Content } = Layout
const { Title, Paragraph, Text } = Typography

const WorkPost = () => {

    const intl = useIntl()
    const dispatch = useDispatch()
    const history = useHistory()
    const { id, postId } = useParams()

    // const projects = useSelector((state) => state.projects.projects)

    const post = useSelector(state => state.posts.posts[0])
    const project = useSelector(state => state.projects.projects[0] )
    const lang = useSelector(state => state.locale.lang)

    const [newPostId, setNewPostId] = useState(postId)

    useEffect(() => {
        console.log('post', post)
        console.log('project', project)
        console.log('id', id)
        console.log('postId', postId)
    })

    useEffect(() => {
        dispatch(readPost(postId))
        dispatch(readOneProject(id))
    }, [])

    
    useEffect(() => {
        dispatch(readPost(newPostId))
        dispatch(readOneProject(id))
    }, [newPostId])

    const htmlDecode = (content) => {
        let e = document.createElement('div')
        e.innerHTML = content
        return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue
    }

    const renderDate = (value) => {
        if (value) {
            return <Tag color='orange'>{moment(value).format('LL')}</Tag>
        }

        if (!value) {
            return <Tag color="magenta"><FormattedMessage id="to-determine" /></Tag>
        }
    }

    const renderContent = () => {
        return (
            <Fragment>
                <Row justify="space-between" style={{ margin: '2% 1.5em 0' }}>
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <Title style={{ color: '#707070' }}>
                            {intl.formatMessage({id: 'work'}).toUpperCase()}
                        </Title>
                    </Col>
                    <Col lg={18} md={18} sm={24} xs={24}>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/"><FormattedMessage id='home' /></Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to="/work"><FormattedMessage id='work' /></Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to={`/work/${id}`}>
                                    {project.translations[lang] ? project.translations[lang].title : project.title }
                                </Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                {post.translations[lang] ? post.translations[lang].title : post.title}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col lg={16} md={16} sm={24} xs={24}>
                        <Title level={2} style={{ color: '#707070' }}>
                            {` ${intl.formatMessage({id: 'project'})}: ${post.project.title}`}
                        </Title>
                        <div>
                            <Text>
                                <ClockCircleOutlined /> <FormattedMessage id='startdate' />
                            </Text>
                            : {renderDate(post.project.startDate)}
                            <Text><FormattedMessage id='enddate' /></Text>: {renderDate(post.project.endDate)}
                        </div>
                        <div>
                            <Text><FormattedMessage id='project' /></Text>:
                            <Text strong>{` ${post.project.category}`}</Text>
                        </div>
                        <div>
                            <Text>
                                <LinkOutlined /> <FormattedMessage id='link' />
                            </Text>
                                :
                            <Text code>
                                <a target="blank" href={post.project.link}>
                                    {` ${post.project.link}`}
                                </a>
                            </Text>
                        </div>
                        <Divider orientation="right">
                            <Button
                                size="small"
                                type="primary"
                                icon={<StepBackwardOutlined />}
                                onClick={() => history.goBack()}
                            >
                                <FormattedMessage id='back-to-project' />
                            </Button>
                        </Divider>
                        <Divider><FormattedMessage id='current-step' /></Divider>
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
                                    __html: post.translations[lang] ? htmlDecode(post.translations[lang].content) : htmlDecode(post.content) ,
                                }}
                            />
                        </Paragraph>
                    </Col>
                    <Col lg={8} md={8} sm={24} xs={24}>
                        <Title level={3} style={{ textAlign: 'center' }}>
                            <FormattedMessage id='project-timeline' />
                        </Title>
                        <Divider type="horizontal" /> 
                        <Timeline mode="left">
                            {project &&
                                project.posts.map((item) => (
                                    <Timeline.Item
                                        key={item._id}
                                        color={
                                            item._id === newPostId
                                                ? 'gray'
                                                : 'orange'
                                        }
                                        label={
                                            <Tag
                                                icon={<ClockCircleOutlined />}
                                                color={
                                                    item._id === newPostId
                                                        ? 'default'
                                                        : 'orange'
                                                }
                                            >
                                                {moment(
                                                    item.creationDate
                                                ).format('LL')}
                                            </Tag>
                                        }
                                    >
                                        <span
                                            style={
                                                item._id === newPostId
                                                    ? { color: '#707070' }
                                                    : null
                                            }
                                        >
                                            {item.title}
                                        </span>
                                        {item._id !== newPostId && (
                                            <Button
                                                type="link"
                                                onClick={() =>
                                                    setNewPostId(item._id)
                                                }
                                            >
                                                {' ...'}
                                            </Button>
                                        )}
                                    </Timeline.Item>
                                ))}
                        </Timeline>
                    </Col>
                </Row>
                <Row></Row>
            </Fragment>
        )
    }

    return (
        <Content>
            { (post && project) && renderContent() }
        </Content>
    )
}

export default WorkPost
