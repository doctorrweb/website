import React, { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Dropdown, Button, Menu, Modal, Typography, Divider, Tag } from 'antd'
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { deleteClient } from '../../action/client'
import { ModalClientFormProvider } from '../../helper/modalFormProvider'

const { confirm } = Modal
const { Paragraph } = Typography

const renderDesc = (text, record) => {
    return <Paragraph ellipsis={{ rows: 2 }}>{record.description}</Paragraph>
}

const renderAction = (text, record) => {

    const intl = useIntl()
    const dispatch = useDispatch()

    const modalForm = useContext(ModalClientFormProvider)

    const showConfirm = () => {
        confirm({
            title: `${intl.formatMessage({ id: 'delete-conf' })}`,
            content: `${intl.formatMessage({ id: 'irreversible' })}`,
            icon: <ExclamationCircleOutlined />,
            okText: `${intl.formatMessage({ id: 'yes' })}`,
            cancelText: `${intl.formatMessage({ id: 'no' })}`,
            onOk() {
                return dispatch(deleteClient(record.key))
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

const renderlang = (record) => {
    return (
        <div>
            {(record.de || record.fr) && <img src="/img/lang-en.png" width="20" />}
            {(record.de || record.fr) && <Divider type="vertical" />}
            {record.fr && <img src="/img/lang-fr.png" width="20" />}
            {(record.de && record.fr) && <Divider type="vertical" />}
            {record.de && <img src="/img/lang-de.png" width="20" />}
            {!record.de && !record.fr && <Tag color="orange"><FormattedMessage id="not-translated" /></Tag>}
        </div>
    )
}

const columns = {
    clientTable: [
        {
            title: <FormattedMessage id="name" />,
            width: 100,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },
        {
            title: <FormattedMessage id="description" />,
            width: 200,
            dataIndex: 'description',
            key: 'description',
            render: (text, record) => renderDesc(text, record),
        },
        {
            title: <FormattedMessage id="category" />,
            width: 75,
            dataIndex: 'category',
            key: 'category',
            filters: [
                { text: 'international', value: 'international' },
                { text: 'company', value: 'company' },
                { text: 'individual', value: 'individual' },
                { text: 'organisation', value: 'organisation' },
                { text: 'government', value: 'government' },
                { text: 'ngo', value: 'ngo' },
                { text: 'other', value: 'other' },
            ],
            onFilter: (value, record) => record.category.includes(value),
        },
        {
            title: <FormattedMessage id="lang" />,
            width: 50,
            dataIndex: ['fr', 'de'],
            key: 'lang',
            render: (text, record) => renderlang(record),
        },
        {
            title: <FormattedMessage id="action" />,
            key: 'operation',
            fixed: 'right',
            width: 50,
            render: (text, record) => renderAction(text, record),
        },
    ],
}

export default columns


