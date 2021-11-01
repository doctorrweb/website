import React, { useEffect, Fragment } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useIntl, FormattedMessage } from 'react-intl'
import {
    LinkOutlined,
    ClockCircleOutlined,
} from '@ant-design/icons'
import { Breadcrumb, Layout, Row, Col, Divider, Timeline, Typography, Tag } from 'antd'
import moment from 'moment'
import { readOneProject } from '../../action/project'
import { readTranslatedPosts } from '../../action/post'

const NO_IMAGE = '/uploads/images-no-image-2020-05-22T18:41:03.460Z.jpg'

const { Content } = Layout
const { Title, Paragraph, Text } = Typography

const WorkItem = () => {

    const intl = useIntl()
    const dispatch = useDispatch()
    const { id } = useParams()

    const project = useSelector(state => state.projects.projects[0])
    const posts = useSelector(state => state.posts.posts)
    const lang = useSelector(state => state.locale.lang)
    
    useEffect(() => {
        console.log('project', project)
        console.log('posts', posts)
    })
    
    useEffect(() => {
        dispatch(readTranslatedPosts(id))
        dispatch(readOneProject(id))
    }, [])

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
                        <Title style={{ color: '#707070' }}>{intl.formatMessage({ id: 'work' }).toUpperCase()}</Title>
                    </Col>
                    <Col lg={14} md={14} sm={24} xs={24}>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/">{intl.formatMessage({id: 'home'})}</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to="/work">{intl.formatMessage({id: 'work'})}</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                {project.translations && project.translations[lang] ? project.translations[lang].title : project.title }
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col lg={16} md={24} sm={24} xs={24}>
                        <Title>
                            {project.translations && project.translations[lang] ? project.translations[lang].title : project.title }
                        </Title>
                        <img
                            src={project.image ? project.image.path : NO_IMAGE}
                            width="90%"
                            height={250}
                            style={{ objectFit: 'cover', marginTop: 10 }}
                        />
                        <Divider type="horizontal" />
                        <div>
                            <Text><FormattedMessage id='client' /></Text>:
                            <Text strong>{` ${project.client.name}`}</Text>
                        </div>
                        <div>
                            <Text>
                                <ClockCircleOutlined /> <FormattedMessage id='startdate' />
                            </Text>
                            : {renderDate(project.startDate)}
                            <Text>
                                <FormattedMessage id='enddate' />
                            </Text>: {renderDate(project.endDate)}
                        </div>
                        <div>
                            <Text>
                                <FormattedMessage id='category' />
                            </Text>:
                            <Text strong>{` ${project.category}`}</Text>
                        </div>
                        <div>
                            <Text>
                                <LinkOutlined /> <FormattedMessage id='link' />
                            </Text>
                            :
                            <Text code>
                                <a target="blank" href={project.link}>
                                    {` ${project.link}`}
                                </a>
                            </Text>
                        </div>
                        <Paragraph
                            style={{
                                paddingTop: 10,
                                paddingRight: 10,
                                textAlign: 'justify',
                            }}
                        >
                            {project.translations && project.translations[lang] ? project.translations[lang].description : project.description }
                        </Paragraph>
                    </Col>
                    <Col lg={8} md={24} sm={24} xs={24}>
                        <Title level={4} style={{ textAlign: 'center' }}>
                            <FormattedMessage id='project-timeline' />
                        </Title>
                        <Divider type="horizontal" />
                        <Timeline mode="left">
                            {posts.map((post) => (
                                <Timeline.Item
                                    key={post._id}
                                    label={
                                        <Tag
                                            icon={<ClockCircleOutlined />}
                                            color="orange"
                                        >
                                            {moment(
                                                post.creationDate
                                            ).format('LL')}
                                        </Tag>
                                    }
                                >
                                    {(lang !== 'en' && post.translations[lang]) ? post.translations[lang].title : post.title }
                                    <Link to={`/work/${id}/${post._id}`}>
                                        {' ...'}
                                    </Link>
                                </Timeline.Item>
                            ))}
                        </Timeline>
                    </Col>
                </Row>
            </Fragment>
        )
    }


    return (
        <Content>
            { project && renderContent()}
        </Content>
    )
}


export default WorkItem
