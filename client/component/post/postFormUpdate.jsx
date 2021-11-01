import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
    Form,
    Input,
    Select,
    Button,
    Radio,
    notification
} from 'antd'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { CKEditor } from 'ckeditor4-react'
import { resetResponse, resetError, resetRequestType } from '../../action'
import { updatePost } from '../../action/post'
import { readAllTutorials } from '../../action/tutorial'
import { readAllProjects } from '../../action/project'
import { readAllImages } from '../../action/image'

const { Option } = Select

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 3 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 21 }
    }
}
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 21,
            offset: 3
        }
    }
}

const PostFormUpdate = ({ itemToUpdate, initialValues }) => {

    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    const intl = useIntl()
    const dispatch = useDispatch()

    const [content, setContent] = useState('')
    const [relation, setRelation] = useState('')

    const errorStatus = useSelector(state => state.error.status)
    const responseStatus = useSelector(state => state.response.status)
    const requestType = useSelector(state => state.requestType.status)
    const lang = useSelector(state => state.locale.lang)
    const posts = useSelector(state => state.posts.posts)
    const tutorials = useSelector(state => state.tutorials.tutorials)
    const projects = useSelector(state => state.projects.projects)
    const images = useSelector(state => state.images.images)


    useEffect(() => {
        if (itemToUpdate === '') {
            setContent('')
            form.resetFields()
        }
        if (itemToUpdate !== '') {
            let initialData = posts.find(post => post._id === itemToUpdate)
            setContent(initialData.content)
            form.setFieldsValue({ 
                ...initialData,
                image: initialData.image && initialData.image._id,
                project: initialData.project ? initialData.project._id : null,
                formation: initialData.formation ? initialData.formation._id : null,
                relationItem: findoutRelatedItem(initialData)
            })
        }
    })

    // To disable submit button at the beginning.
    useEffect(() => {
        dispatch(readAllTutorials())
        dispatch(readAllProjects())
        dispatch(readAllImages())
        forceUpdate()
    }, [])

    useEffect(() => {
        requestNotification()
    }, [errorStatus, responseStatus, requestType])

    const requestNotification = () => {
        if (errorStatus !== null && requestType === 'update-post') {
            notification['error']({
                message: 'An error occured',
                description: 'We couldn\'t update this post'
            })
            dispatch(resetError())
            dispatch(resetRequestType())
        }
        if (responseStatus >= 200 && requestType === 'update-post') {
            notification['success']({
                message: 'Post updated Successfully',
                description: 'Click on \'details\' to see the updated post'
            })
            dispatch(resetResponse())
            dispatch(resetRequestType())
        }
    }

    const ckeditor4Handler = value => {
        setContent(value)
    }

    const onFinish = (values) => {
        dispatch(updatePost(itemToUpdate, {
            ...values, 
            lang: lang, 
            content: content
        }))
        setContent('')
    }

    const onFinishFailed = errorInfo => {
        notification['error']({
            message: `${intl.formatMessage({ id: 'login-fail' })}`,
            description: errorInfo
        })
    }

    const handleRelationChange = (e) => {
        setRelation(e.target.value)
        if (relation === 'project') {
            form.resetFields(['project'])
        }
        if (relation === 'tutorial') {
            form.resetFields(['tutorial'])
        }
    }


    const findoutRelatedItem = (item) => {
        let result = {}
        if (item.relation === 'project') {
            const newItem = projects.find(project => project._id === item.project)
            Object.assign(result, newItem)
        }
        if (item.relation === 'tutorial') {
            const newItem = tutorials.find(tutorial => tutorial._id === item.formation)
            Object.assign(result, newItem)
        }
        return result.title
    }

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="post"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                name="title"
                label={
                    <span>
                        <FormattedMessage id="title" />
                    </span>
                }
                rules={[
                    {
                        required: true,
                        message: 'Please input the title!',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label={
                    <span>
                        <FormattedMessage id="content" />
                    </span>
                }
                name="content"
            >
                <CKEditor
                    onBeforeLoad={(CKEDITOR) =>
                        (CKEDITOR.disableAutoInline = true)
                    }
                    onChange={(e) => ckeditor4Handler(e.editor.getData())}
                    data={itemToUpdate === '' ? '' : initialValues.content}
                />
            </Form.Item>

            <Form.Item
                label="Related to"
                name="relation"
                rules={[
                    {
                        required: true,
                        message: 'Please input the title!',
                        whitespace: true,
                    },
                ]}
            >
                <Radio.Group
                    //defaultValue="blog"
                    buttonStyle="solid"
                    onChange={(e) => handleRelationChange(e)}
                >
                    <Radio.Button value="blog">Blog</Radio.Button>
                    <Radio.Button value="tutorial">
                        <FormattedMessage id="tutorial" />
                    </Radio.Button>
                    <Radio.Button value="project">
                        <FormattedMessage id="project" />
                    </Radio.Button>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                    prevValues.relation !== currentValues.relation
                }
            >
                {({ getFieldValue }) =>
                    getFieldValue('relation') === 'tutorial' ? (
                        <Form.Item label="Tutorial" name="formation">
                            <Select
                                allowClear
                                showSearch
                                // onChange={(value, option) => onChangeRelationItem(value, option)}
                            >
                                {tutorials.map((tuto) => (
                                    <Option key={tuto._id} value={tuto._id}>
                                        {tuto.title}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    ) : null
                }
            </Form.Item>
            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                    prevValues.project !== currentValues.project
                }
            >
                {({ getFieldValue }) =>
                    getFieldValue('relation') === 'project' ? (
                        <Form.Item label="Project" name="project">
                            <Select
                                allowClear
                                showSearch
                                // onChange={(value, option) => onChangeRelationItem(value, option)}
                            >
                                {projects.map((project) => (
                                    <Option
                                        key={project._id}
                                        value={project._id}
                                    >
                                        {project.title}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    ) : null
                }
            </Form.Item>

            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                    prevValues.project !== currentValues.project
                }
            >
                {({ getFieldValue }) =>
                    getFieldValue('relation') === 'project' ? (
                        <Form.Item label="Project Step" name="projectStep">
                            <Select
                                allowClear
                                showSearch
                                // onChange={(value, option) => onChangeRelationItem(value, option)}
                            >
                                <Option key="1" value="concept">Concept</Option>
                                <Option key="2" value="development">Development</Option>
                                <Option key="3" value="deployment">Deployment</Option>
                                <Option key="4" value="review">Review</Option>
                                <Option key="5" value="bug">Bug</Option>
                            </Select>
                        </Form.Item>
                    ) : null
                }
            </Form.Item>

            <Form.Item
                name="category"
                label={
                    <span>
                        <FormattedMessage id="category" />
                    </span>
                }
            >
                <Select allowClear>
                    <Option value="professional">
                        <FormattedMessage id="professional" />
                    </Option>
                    <Option value="personal">
                        <FormattedMessage id="personal" />
                    </Option>
                </Select>
            </Form.Item>

            <Form.Item label="Status" name="status">
                <Radio.Group buttonStyle="solid">
                    <Radio.Button value="pending">Pending</Radio.Button>
                    <Radio.Button value="active">Active</Radio.Button>
                    <Radio.Button value="trash">Trash</Radio.Button>
                </Radio.Group>
            </Form.Item>

            <Form.Item name="image" label={<FormattedMessage id="image" />}>
                <Select
                    allowClear
                    showSearch
                    // onChange={(value, option) => onChangeRelationItem(value, option)}
                >
                    {images.map((img) => (
                        <Option key={img._id} value={img._id}>
                            <img src={img.path} width={30} /> {` ${img.name}`}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item shouldUpdate={true} {...tailFormItemLayout}>
                {() => (
                    <Button
                        block
                        type="primary"
                        htmlType="submit"
                        disabled={
                            !form.isFieldsTouched([
                                'title',
                                'subtitle',
                                'category',
                            ]) ||
                            form
                                .getFieldsError()
                                .filter(({ errors }) => errors.length).length
                        }
                    >
                        <FormattedMessage id="update" />
                    </Button>
                )}
            </Form.Item>
        </Form>
    )
}

PostFormUpdate.propTypes = {
    itemToUpdate: PropTypes.string,
    initialValues: PropTypes.object
}

export default PostFormUpdate


