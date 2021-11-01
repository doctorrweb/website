import React, { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Dropdown, Button, Menu, Modal, Tag, Divider } from 'antd'
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { deleteTutorial } from '../../action/tutorial'
import { ModalTutorialFormProvider } from '../../helper/modalFormProvider'

const { confirm } = Modal

const renderAction = (text, record) => {

    const intl = useIntl()
    const dispatch = useDispatch()

    const modalForm = useContext(ModalTutorialFormProvider)

    const showConfirm = () => {
        confirm({
            title: `${intl.formatMessage({ id: 'delete-conf' })}`,
            content: `${intl.formatMessage({ id: 'irreversible' })}`,
            icon: <ExclamationCircleOutlined />,
            okText: `${intl.formatMessage({ id: 'yes' })}`,
            cancelText: `${intl.formatMessage({ id: 'no' })}`,
            onOk() {
                return dispatch(deleteTutorial(record.key))
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


const renderStatus = (text) => {
    switch (text) {
    case 'trash':
        return (
            <Tag color="red">
                <FormattedMessage id={text} />
            </Tag>
        )
    case 'active':
        return (
            <Tag color="green">
                <FormattedMessage id={text} />
            </Tag>
        )
    default:
        return (
            <Tag color="orange">
                <FormattedMessage id={text} />
            </Tag>
        )
    }
}

const columns = {
    tutorialTable: [
        {
            title: <FormattedMessage id="title" />,
            width: 175,
            dataIndex: 'title',
            key: 'title',
            fixed: 'left',
        },
        {
            title: <FormattedMessage id="category" />,
            width: 30,
            dataIndex: 'category',
            key: 'category',
            filters: [
                { text: 'graphic', value: 'graphic' },
                { text: 'edition', value: 'edition' },
                { text: 'web', value: 'web' },
                { text: 'mobile', value: 'mobile' },
                { text: 'desktop', value: 'desktop' },
                { text: 'undefined', value: 'undefined' },
            ],
            onFilter: (value, record) => record.category.includes(value),
        },
        {
            title: <FormattedMessage id="status" />,
            width: 30,
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'pending', value: 'pending' },
                { text: 'active', value: 'active' },
                { text: 'trash', value: 'trash' },
            ],
            onFilter: (value, record) => record.status.includes(value),
            render: (text) => renderStatus(text),
        },
        {
            title: <FormattedMessage id="lang" />,
            width: 40,
            dataIndex: ['fr', 'de'],
            key: 'lang',
            render: (text, record) => renderlang(record),
        },
        {
            title: <FormattedMessage id="creationdate" />,
            width: 50,
            dataIndex: 'creationDate',
            key: 'creationDate',
            sorter: (a, b) =>
                new Date(a.creationDate) - new Date(b.creationDate),
            sortDirections: ['ascend', 'descend'],
            defaultSortOrder: 'descend',
            render: (text, record) => moment(record.creationDate).format('LL'),
        },
        {
            title: <FormattedMessage id="action" />,
            key: 'operation',
            fixed: 'right',
            width: 40,
            render: (text, record) => renderAction(text, record),
        },
    ],
}

export default columns


