import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Modal, Button, notification } from 'antd'
import { useDispatch } from 'react-redux'
import { resetError, resetResponse } from '../action'


const useCustomModal = (title, component, visibility, setVisibility) => {

    return (
        <Modal
            visible={visibility}
            title={title}
            style={{ top: 100 }}
            width={750}
            onCancel={() => setVisibility(false)}
            footer={[
                <Button key="Back" onClick={() => setVisibility(false)}>
                    <FormattedMessage id="cancel" />
                </Button>
            ]}
        >
            {component}
        </Modal>
    )
}

const useCustomMediaFormModal = (title, component, visibility, setVisibility) => {


    return (
        <Modal
            visible={visibility}
            title={title}
            style={{ top: 100 }}
            width={750}
            onCancel={() => setVisibility(false)}
            footer={[
                <Button key="Back" onClick={() => setVisibility(false)}>
                    <FormattedMessage id="cancel" />
                </Button>
            ]}
        >
            {component}
        </Modal>
    )
}

const useValuesToSend = (values) => {
    let map = new Map()
    for (let [key, value] of Object.entries(values)) {
        if (value !== undefined) {
            map.set(key, value)
        }
    }
    return Object.fromEntries(map)
}

const useNotification = (status) => {
    const dispatch = useDispatch()
    const intl = useIntl()

    if (status >= 400 ) {
        notification['error']({
            message: `${intl.formatMessage({ id: `error-${status}` })}`
        })
        dispatch(resetError())
    }
    if (status >= 200) {
        notification['success']({
            message: `${intl.formatMessage({ id: `success-${status}` })}`
        })
        dispatch(resetResponse())
    }
} 

const capitalizeUtils = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export { 
    useCustomModal, 
    useCustomMediaFormModal,
    useValuesToSend,
    useNotification,
    capitalizeUtils
}