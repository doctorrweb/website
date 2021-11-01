import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, Button, notification, Radio } from 'antd'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { resetResponse, resetError, resetRequestType } from '../../action'
import { useValuesToSend } from '../../helper/utils'
import {CKEditor} from 'ckeditor4-react'
import { updateTranslation, readAllTranslations } from '../../action/translation'
import { readAllTutorials } from '../../action/tutorial'
import { readAllProjects } from '../../action/project'
import { readAllPosts } from '../../action/post'
import { readAllClients } from '../../action/client'

const { Option } = Select
const { TextArea } = Input

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
}
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 21,
            offset: 3,
        },
    },
}

const TranslationFormUpdate = ({ itemToUpdate }) => {
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    // Visible Media Box
    const [content, setContent] = useState('')
    const [relation, setRelation] = useState('')

    const intl = useIntl()
    const dispatch = useDispatch()

    const errorStatus = useSelector((state) => state.error.status)
    const responseStatus = useSelector((state) => state.response.status)
    const requestType = useSelector((state) => state.requestType.status)
    const tutorials = useSelector((state) => state.tutorials.tutorials)
    const projects = useSelector((state) => state.projects.projects)
    const posts = useSelector((state) => state.posts.posts)
    const clients = useSelector((state) => state.clients.clients)
    const translations = useSelector((state) => state.translations.translations)

    useEffect(() => {

        if (itemToUpdate === '') {
            form.resetFields()
        }

        if (itemToUpdate !== '') {
            let initialData = translations.find(trans => trans._id === itemToUpdate)

            form.setFieldsValue({ 
                ...initialData,
                client: initialData.client ? initialData.client._id : null,
                post: initialData.post ? initialData.post._id : null,
                project: initialData.project ? initialData.project._id : null,
                formation: initialData.formation ? initialData.formation._id : null
            })
            setRelation(initialData.relation)
        }

    }, [itemToUpdate])

    // To disable submit button at the beginning.
    useEffect(() => {
        dispatch(readAllTranslations())
        dispatch(readAllTutorials())
        dispatch(readAllProjects())
        dispatch(readAllPosts())
        dispatch(readAllClients())
        forceUpdate({})
    }, [])

    useEffect(() => {
        requestNotification()
    }, [errorStatus, responseStatus])

    const requestNotification = () => {
        if (errorStatus !== null && requestType === 'update-translation') {
            notification['error']({
                message: 'An error occured',
                description: 'We couldn\'t update this translation',
            })
            dispatch(resetError())
            dispatch(resetRequestType())
        }
        if (responseStatus >= 200 && requestType === 'update-translation') {
            notification['success']({
                message: 'Translation created Successfully',
                description: 'Click on \'details\' to see the new translation',
            })
            dispatch(resetResponse())
            dispatch(resetRequestType())
            setRelation('')
        }
    }

    const ckeditor4Handler = (value) => {
        setContent(value)
    }

    const handleRelationChange = (e) => {
        setRelation(e.target.value)
    }

    const onFinish = (values) => {
        const valuesToSend = useValuesToSend(values)
        dispatch(
            updateTranslation(itemToUpdate, {
                ...valuesToSend,
                content: (relation === 'formation' || relation === 'post') && content,
                relation
            })
        )
    }

    const onFinishFailed = (errorInfo) => {
        notification['error']({
            message: `${intl.formatMessage({ id: 'login-fail' })}`,
            description: errorInfo,
        })
    }

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="translation"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Related to"
                name="relation"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Radio.Group
                    buttonStyle="solid"
                    onChange={(e) => handleRelationChange(e)}
                >
                    <Radio.Button value="post">Post</Radio.Button>
                    <Radio.Button value="formation">
                        <FormattedMessage id="tutorial" />
                    </Radio.Button>
                    <Radio.Button value="project">
                        <FormattedMessage id="project" />
                    </Radio.Button>
                    <Radio.Button value="client">
                        <FormattedMessage id="client" />
                    </Radio.Button>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                label="Lang"
                name="lang"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Radio.Group buttonStyle="solid">
                    <Radio.Button value="fr">
                        <FormattedMessage id="lang-fr" />
                    </Radio.Button>
                    <Radio.Button value="de">
                        <FormattedMessage id="lang-de" />
                    </Radio.Button>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                    prevValues.project !== currentValues.project
                }
            >
                {({ getFieldValue }) =>
                    getFieldValue('relation') === 'post' ||
                    getFieldValue('relation') === 'project' ||
                    getFieldValue('relation') === 'formation' ? (
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
                                    },
                                ]}
                            >
                                <Input />
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
                    getFieldValue('relation') === 'client' ? (
                        <Form.Item
                            name="name"
                            label={
                                <span>
                                    <FormattedMessage id="name" />
                                </span>
                            }
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
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
                    getFieldValue('relation') === 'formation' ||
                    getFieldValue('relation') === 'post' ? (
                            <Form.Item
                                name="content"
                                label={
                                    <span>
                                        <FormattedMessage id="content" />
                                    </span>
                                }
                            >
                                <CKEditor
                                    onBeforeLoad={(CKEDITOR) =>
                                        (CKEDITOR.disableAutoInline = true)
                                    }
                                    onChange={(e) =>
                                        ckeditor4Handler(e.editor.getData())
                                    }
                                    data={content}
                                />
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
                    getFieldValue('relation') === 'project' ||
                    getFieldValue('relation') === 'client' ? (
                            <Form.Item
                                name="description"
                                label={
                                    <span>
                                        <FormattedMessage id="description" />
                                    </span>
                                }
                            >
                                <TextArea rows={3} />
                            </Form.Item>
                        ) : null
                }
            </Form.Item>

            <Form.Item
                disabled
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                    prevValues.relation !== currentValues.relation
                }
            >
                {({ getFieldValue }) =>
                    getFieldValue('relation') === 'post' ? (
                        <Form.Item
                            label="Post"
                            name="post"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                allowClear
                                showSearch
                                // onChange={(value, option) => onChangeRelationItem(value, option)}
                            >
                                {posts.map((post) => (
                                    <Option key={post._id} value={post._id}>
                                        {post.title}
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
                    prevValues.relation !== currentValues.relation
                }
            >
                {({ getFieldValue }) =>
                    getFieldValue('relation') === 'formation' ? (
                        <Form.Item
                            label="Tutorial"
                            name="formation"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
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
                    prevValues.relation !== currentValues.relation
                }
            >
                {({ getFieldValue }) =>
                    getFieldValue('relation') === 'client' ? (
                        <Form.Item
                            label="Client"
                            name="client"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select allowClear showSearch disabled>
                                {clients.map((client) => (
                                    <Option key={client._id} value={client._id}>
                                        {client.name}
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
                        <Form.Item
                            label="Project"
                            name="project"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
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
                label="Completed"
                name="completed"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Radio.Group buttonStyle="solid">
                    <Radio.Button value={true}>
                        <FormattedMessage id="yes" />
                    </Radio.Button>
                    <Radio.Button value={false}>
                        <FormattedMessage id="no" />
                    </Radio.Button>
                </Radio.Group>
            </Form.Item>

            <Form.Item shouldUpdate={true} {...tailFormItemLayout}>
                {() => (
                    <Button
                        block
                        type="primary"
                        htmlType="submit"
                        disabled={
                            !form.isFieldsTouched([
                                'relation',
                                'title',
                                'lang',
                                'completed',
                            ]) ||
                            form
                                .getFieldsError()
                                .filter(({ errors }) => errors.length).length
                        }
                    >
                        <FormattedMessage id="create" />
                    </Button>
                )}
            </Form.Item>
        </Form>
    )
}

TranslationFormUpdate.propTypes = {
    itemToUpdate: PropTypes.string,
}

export default TranslationFormUpdate
