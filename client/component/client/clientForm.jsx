import React, { useState, useEffect } from 'react'
import {
    Form,
    Input,
    Select,
    Button,
    notification
} from 'antd'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { resetResponse, resetError, resetRequestType } from '../../action'
import { useValuesToSend } from '../../helper/utils'
import { createClient } from '../../action/client'
import { readAllImages } from '../../action/image'
import ModalImageBox from '../modalImageBox'

const { Option } = Select
const { TextArea } = Input

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
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

const ClientForm = () => {
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    // Visible Media Box 
    const [visibleMediaBox, setVisibleMediaBox] = useState(false)

    const intl = useIntl()
    const dispatch = useDispatch()

    const errorStatus = useSelector(state => state.error.status)
    const responseStatus = useSelector(state => state.response.status)
    const requestType = useSelector(state => state.requestType.status)

    const images = useSelector(state => state.images.images)

    // To disable submit button at the beginning.
    useEffect(() => {
        dispatch(readAllImages())
        forceUpdate({})
    }, [])

    useEffect(() => {
        requestNotification()
    }, [errorStatus, responseStatus])

    const requestNotification = () => {
        if (errorStatus !== null && requestType === 'create-client') {
            notification['error']({
                message: 'An error occured',
                description: 'We couldn\'t create this client'
            })
            dispatch(resetError())
            dispatch(resetRequestType())
        }
        if (responseStatus >= 200 && requestType === 'create-client') {
            notification['success']({
                message: 'Client created Successfully',
                description: 'Click on \'details\' to see the new client'
            })
            dispatch(resetResponse())
            dispatch(resetRequestType())
        }
    }

    // handle ModalMediaBox Visibility

    const hideModalImageBox = () => {
        setVisibleMediaBox(false)
    }
    // handle ModalMediaBox Visibility

    const onFinish = values => {
        const valuesToSend = useValuesToSend(values)
        dispatch(createClient({
            ...valuesToSend
        }))
        form.resetFields()
        
    }

    const onFinishFailed = errorInfo => {
        notification['error']({
            message: `${intl.formatMessage({ id: 'login-fail' })}`,
            description: errorInfo
        })
        form.resetFields()
    }

    return (
        <Form.Provider
            onFormFinish={(name, { values, forms }) => {
                if (name === 'userForm') {
                    const { client } = forms
                    const users = client.getFieldValue('users') || []
                    client.setFieldsValue({
                        users: [...users, values],
                    })
                    setVisibleMediaBox(false)
                }
            }}
        >
            <Form
                {...formItemLayout}
                form={form}
                name="client"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
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
                            message: 'Please input your surname!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

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

                <Form.Item
                    name="category"
                    label={
                        <span>
                            <FormattedMessage id="category" />
                        </span>
                    }
                >
                    <Select
                        //placeholder="Select a option and change input text above"
                        allowClear
                    >
                        <Option value="international">international</Option>
                        <Option value="company">company</Option>
                        <Option value="individual">individual</Option>
                        <Option value="organisation">organisation</Option>
                        <Option value="government">government</Option>
                        <Option value="ngo">ngo</Option>
                        <Option value="other">other</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="image"
                    label={<FormattedMessage id="image" />}
                >
                    <Select
                        allowClear
                        showSearch
                    // onChange={(value, option) => onChangeRelationItem(value, option)}
                    >
                        {images.map(
                            img => (
                                <Option key={img._id} value={img._id} >
                                    <img src={img.path} width={30} /> {` ${img.name}`}
                                </Option>
                            )
                        )}
                    </Select>
                </Form.Item>
            
                <Form.Item shouldUpdate={true} {...tailFormItemLayout}>
                    {() => (
                        <Button
                            block
                            type="primary"
                            htmlType="submit"
                            disabled={
                                !form.isFieldTouched('name') ||
                  form.getFieldsError().filter(({ errors }) => errors.length)
                      .length
                            }
                        >
                            <FormattedMessage id="create" />
                        </Button>
                    )}
                </Form.Item>
            </Form>
            <ModalImageBox visible={visibleMediaBox} onCancel={hideModalImageBox} />
        </Form.Provider>
    )
}

export default ClientForm


