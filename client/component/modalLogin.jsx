import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { Typography } from 'antd'
import { showModalLogin } from '../action/index'
import LoginForm from './loginForm'
import {useModal} from '../helper/utils'

const { Title } = Typography

const ModalLogin = () => {

    const visibility = useSelector(state => state.modalLogin.modalLogin)
    const dispatch = useDispatch(showModalLogin(false))
    const title = <Title level={4}><FormattedMessage id='login-form' /></Title>
    const component = <LoginForm />

    return useModal(title, component, visibility, dispatch)
}

export default ModalLogin