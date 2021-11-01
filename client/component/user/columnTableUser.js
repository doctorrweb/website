import React, { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Dropdown, Button, Menu, Modal } from 'antd'
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser } from '../../action/user'
import { ModalUserFormProvider } from '../../helper/modalFormProvider'

const { confirm } = Modal

const renderAction = (text, record) => {

    const intl = useIntl()
    const dispatch = useDispatch()

    const modalForm = useContext(ModalUserFormProvider)
    const me = useSelector(state => state.currentUser.user)

    const showConfirm = () => {
        confirm({
            title: `${intl.formatMessage({ id: 'delete-conf' })}`,
            content: `${intl.formatMessage({ id: 'irreversible' })}`,
            icon: <ExclamationCircleOutlined />,
            okText: `${intl.formatMessage({ id: 'yes' })}`,
            cancelText: `${intl.formatMessage({ id: 'no' })}`,
            onOk() {
                return dispatch(deleteUser(record.key))
            }
        })
    }

    const setFormCb = () => {
        modalForm.setVisibility(true)
        modalForm.setItemToUpdate(record.key)
    }

    /*
   
    */

    return (
        <Dropdown overlay={
            <Menu>
                <Menu.Item key="1">
                    <a href="#">
                        Details
                    </a>
                </Menu.Item>
                <Menu.Item
                    onClick={() => setFormCb()}
                    key="2"
                >
                    <FormattedMessage id='update' />
                </Menu.Item>
                <Menu.Item
                    key="3"
                    onClick={() => showConfirm(record.key)}
                    disabled={record.key == me.sub}
                >
                    <FormattedMessage id='delete' />
                </Menu.Item>
            </Menu>
        } trigger={['click']}>
            <Button type="primary" ghost >
                <FormattedMessage id="action" /> <DownOutlined />
            </Button>

        </Dropdown>
    )
}


const columns = {
    userTable: [
        {
            title: <FormattedMessage id='surname' />,
            width: 150,
            dataIndex: 'surname',
            key: 'surname',
            fixed: 'left'
        },
        {
            title: <FormattedMessage id='firstname' />,
            width: 50,
            dataIndex: 'firstname',
            key: 'firstname'
        },
        {
            title: 'E-mail',
            width: 75,
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: <FormattedMessage id='connexion-type' />,
            width: 50,
            dataIndex: 'connexiontype',
            key: 'connexiontype',
        },
        {
            title: 'Role',
            width: 75,
            dataIndex: 'role',
            key: 'role',
            filters: [
                { text: 'suscriber', value: 'suscriber' },
                { text: 'manager', value: 'manager' },
                { text: 'administrator', value: 'administrator' }
            ],
            onFilter: (value, record) => record.role.includes(value)
        },
        {
            title: <FormattedMessage id='action' />,
            key: 'operation',
            fixed: 'right',
            width: 50,
            render: (text, record) => renderAction(text, record),
        },
    ]
}

export default columns


