import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input, Button, notification } from 'antd'
import { FormattedMessage, useIntl } from 'react-intl'
import { loginUser, showModalLogin, resetError, resetResponse} from '../action'

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
}
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
}

const LoginForm = () => {

    const [form] = Form.useForm()
    const [, forceUpdate] = useState()
    const intl = useIntl()
    const dispatch = useDispatch()

    // to be sure that the login notification doesn't trigger
    const modalLogin = useSelector(state => state.modalLogin.modalLogin)
    //  with the 200 status of get requests

    const errorStatus = useSelector(state => state.error.status)
    const responseStatus = useSelector(state => state.response.status)

    // To disable submit button at the beginning.
    useEffect(() => {
        forceUpdate({})
    }, [])

    useEffect(() => {
        loginNotification()
    }, [errorStatus, responseStatus])

    
    const loginNotification = () => {
        if (errorStatus == 401) {
            notification['error']({
                message: `${intl.formatMessage({ id: 'login-fail' })}`
            })
            dispatch(resetError())
        }
        if (responseStatus == 200 && modalLogin) {
            notification['success']({
                message: `${intl.formatMessage({ id: 'login-success' })}`
            }) 
            dispatch(showModalLogin(false))
            dispatch(resetResponse())
        }
    }

    const onFinish = ({email, password}) => {
        dispatch(loginUser({ email, password }))
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
        <Form
            {...layout}
            name="login"
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label={<FormattedMessage id='username' />}
                name="email"
                rules={[
                    {
                        type: 'email',
                        message: `${intl.formatMessage({ id: 'input-inv-email' })}`,
                    },
                    {
                        required: true,
                        message: `${intl.formatMessage({ id: 'input-email' })}`,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label={<FormattedMessage id='password' />}
                name="password"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: `${intl.formatMessage({ id: 'input-password' })}`,
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label={<FormattedMessage id='confirmation-password' />}
                name="confirm"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: `${intl.formatMessage({ id: 'input-conf-password' })}`,
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve()
                            }
                            return Promise.reject(`${intl.formatMessage({ id: 'password-mismatch' })}`)
                        },
                    }),
                ]}
                
            >
                <Input.Password />
            </Form.Item>
            

            <Form.Item shouldUpdate={true} {...tailLayout}>
                {() => (
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={
                            !form.isFieldsTouched(true) ||
                            form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                        onClick={() => dispatch(showModalLogin(!modalLogin))}
                        block
                    >
                        <FormattedMessage id='submit' />
                    </Button>
                )}
            </Form.Item>
        </Form>
    )
}

export default LoginForm