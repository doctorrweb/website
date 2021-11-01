import React, { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Dropdown, Button, Menu, Modal, Typography, Tag } from 'antd'
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { deleteTranslation } from '../../action/translation'
import { ModalTranslationFormProvider } from '../../helper/modalFormProvider'

const { confirm } = Modal
const { Paragraph } = Typography

const renderAction = (text, record) => {
    const intl = useIntl()
    const dispatch = useDispatch()

    const modalForm = useContext(ModalTranslationFormProvider)

    const showConfirm = () => {
        confirm({
            title: `${intl.formatMessage({ id: 'delete-conf' })}`,
            content: `${intl.formatMessage({ id: 'irreversible' })}`,
            icon: <ExclamationCircleOutlined />,
            okText: `${intl.formatMessage({ id: 'yes' })}`,
            cancelText: `${intl.formatMessage({ id: 'no' })}`,
            onOk() {
                return dispatch(deleteTranslation(record.key))
            },
        })
    }

    const setFormCb = () => {
        modalForm.setVisibility(true)
        modalForm.setItemToUpdate(record.key)
    }

    /*
   
    */

    return (
        <Dropdown
            overlay={
                <Menu>
                    <Menu.Item key="1">
                        <a href="#">Details</a>
                    </Menu.Item>
                    <Menu.Item onClick={() => setFormCb()} key="2">
                        <FormattedMessage id="update" />
                    </Menu.Item>
                    <Menu.Item key="3" onClick={() => showConfirm(record.key)}>
                        <FormattedMessage id="delete" />
                    </Menu.Item>
                </Menu>
            }
            trigger={['click']}
        >
            <Button type="primary" ghost>
                <FormattedMessage id="action" /> <DownOutlined />
            </Button>
        </Dropdown>
    )
}

const renderlang = (lang) => {
    switch (lang) {
    case 'fr':
        return <img src="/img/lang-fr.png" width="20" />
    case 'de':
        return <img src="/img/lang-de.png" width="20" />
    default:
        return <img src="/img/lang-en.png" width="20" />
    }
}
const renderStatus = (status) => {
    switch (status) {
    case true:
        return <Tag color="green">Completed</Tag>
    default:
        return <Tag color="orange">Not completed</Tag>
    }
}

const renderRelatedItem = (trans) => {
    switch (trans.relation) {
    case 'project':
        return <Paragraph>{trans.project}</Paragraph>
    case 'formation':
        return <Paragraph>{trans.formation}</Paragraph>
    case 'client':
        return <Paragraph>{trans.client}</Paragraph>
    default:
        return <Paragraph>{trans.post}</Paragraph>
    }
}

const renderTitle = (record) => {
    switch (record.relation) {
    case 'client':
        return <Paragraph>{record.name}</Paragraph>
    default:
        return <Paragraph>{record.title}</Paragraph>
    }
}

const columns = {
    translationTable: [
        {
            title: <FormattedMessage id="title" />,
            width: 150,
            dataIndex: ['title', 'name'],
            key: 'title',
            fixed: 'left',
            render: (value, record) => renderTitle(record)
        },
        {
            title: <FormattedMessage id="relation" />,
            width: 40,
            dataIndex: 'relation',
            key: 'relation',
            filters: [
                { text: 'Post', value: 'post' },
                { text: 'Project', value: 'project' },
                { text: 'Tutorial', value: 'tutorial' },
            ],
            onFilter: (value, record) => record.category.includes(value),
        },
        {
            title: 'Related Item',
            width: 130,
            dataIndex: ['post', 'project', 'formation', 'client'],
            key: 'relatedItem',
            render: (text, record) => renderRelatedItem(record),
        },
        {
            title: <FormattedMessage id="lang" />,
            width: 40,
            dataIndex: 'lang',
            key: 'lang',
            filters: [
                { text: <FormattedMessage id="lang-fr" />, value: 'fr' },
                { text: <FormattedMessage id="lang-de" />, value: 'de' },
            ],
            onFilter: (value, record) => record.category.includes(value),
            render: (text) => renderlang(text),
        },
        {
            title: 'Completed',
            width: 50,
            dataIndex: 'completed',
            key: 'completed',
            filters: [
                { text: <FormattedMessage id="yes" />, value: 'yes' },
                { text: <FormattedMessage id="no" />, value: 'no' },
            ],
            onFilter: (value, record) => record.category.includes(value),
            render: (text, record) => renderStatus(record.completed),
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
