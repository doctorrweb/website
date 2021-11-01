import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
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
import { updateClient } from '../../action/client'
import { readAllImages } from '../../action/image'

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

const ClientFormUpdate = ({ itemToUpdate }) => {
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    const intl = useIntl()
    const dispatch = useDispatch()

    const errorStatus = useSelector(state => state.error.status)
    const requestType = useSelector((state) => state.requestType.status)
    const responseStatus = useSelector(state => state.response.status)
    const clients = useSelector(state => state.clients.clients)
    const images = useSelector(state => state.images.images)

    useEffect(() => {
        if (itemToUpdate === '') {
            form.resetFields()
        }
        if (itemToUpdate !== '') {
            let initialData = clients.filter(client => client._id === itemToUpdate)
            form.setFieldsValue({ ...initialData[0] })
        }
    })

    // To disable submit button at the beginning.
    useEffect(() => {
        dispatch(readAllImages())
        forceUpdate({})
    }, [])

    useEffect(() => {
        requestNotification()
    }, [errorStatus, responseStatus])

    const requestNotification = () => {
        if (errorStatus !== null && requestType === 'update-client') {
            notification['error']({
                message: 'An error occured',
                description: 'We couldn\'t update this client',
            })
            dispatch(resetError())
            dispatch(resetRequestType())
        }
        if (responseStatus >= 200 && requestType === 'update-client') {
            notification['success']({
                message: 'Client updated Successfully',
                description: 'Click on \'details\' to see the new client',
            })
            dispatch(resetResponse())
            dispatch(resetRequestType())
        }
    }

    const onFinish = values => {
        const valuesToSend = useValuesToSend(values)
        dispatch(updateClient(itemToUpdate, {
            ...valuesToSend
        }))
    }

    const onFinishFailed = errorInfo => {
        notification['error']({
            message: `${intl.formatMessage({ id: 'login-fail' })}`,
            description: errorInfo
        })
    }

    return (
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
                    <span><FormattedMessage id='name' /></span>
                }
                rules={[
                    {
                        required: true,
                        message: 'Please input your surname!',
                        whitespace: true
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="description"
                label={
                    <span><FormattedMessage id='description' /></span>
                }
            >
                <TextArea rows={3} />
            </Form.Item>

            <Form.Item
                name="category"
                label={
                    <span><FormattedMessage id='category' /></span>
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
                            form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >
                        <FormattedMessage id='create' />
                    </Button>
                )}
            </Form.Item>
        </Form>
    )
}

ClientFormUpdate.propTypes = {
    itemToUpdate: PropTypes.string
}

export default ClientFormUpdate


