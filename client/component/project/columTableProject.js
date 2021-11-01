import React, { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Dropdown, Button, Menu, Modal, Tag, Divider } from 'antd'
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { deleteProject } from '../../action/project'
import { ModalProjectFormProvider } from '../../helper/modalFormProvider'

const { confirm } = Modal

const renderAction = (text, record) => {

    const intl = useIntl()
    const dispatch = useDispatch()

    const modalForm = useContext(ModalProjectFormProvider)

    const showConfirm = () => {
        confirm({
            title: `${intl.formatMessage({ id: 'delete-conf' })}`,
            content: `${intl.formatMessage({ id: 'irreversible' })}`,
            icon: <ExclamationCircleOutlined />,
            okText: `${intl.formatMessage({ id: 'yes' })}`,
            cancelText: `${intl.formatMessage({ id: 'no' })}`,
            onOk() {
                return dispatch(deleteProject(record.key))
            }
        })
    }

    const setFormCb = () => {
        modalForm.setVisibility(true)
        modalForm.setItemToUpdate(record.key)
    }

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

const renderStatus = (text) => {
    switch (text) {
    case 'trash':
        return (
            <Tag color="red"><FormattedMessage id={text} /></Tag>
        )
    case 'active':
        return (
            <Tag color="green"><FormattedMessage id={text} /></Tag>
        )
    case 'waiting':
        return (
            <Tag color="blue"><FormattedMessage id={text} /></Tag>
        )
    case 'inprogress':
        return (
            <Tag color="cyan"><FormattedMessage id={text} /></Tag>
        )
    case 'completed':
        return (
            <Tag color="green"><FormattedMessage id={text} /></Tag>
        )
    case 'rejected':
        return (
            <Tag color="red"><FormattedMessage id={text} /></Tag>
        )            
    default:
        return (
            <Tag color="orange"><FormattedMessage id={text} /></Tag>
        )
    }
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

const renderDate = (value) => {
    if (value !== null) {
        return moment(value).format('LL')
    }

    if (value === null) {
        return <Tag color="magenta"><FormattedMessage id="to-determine" /></Tag>
    }
}

const columns = {
    projectTable: [
        {
            title: <FormattedMessage id="title" />,
            width: 150,
            dataIndex: 'title',
            key: 'title',
            fixed: 'left',
        },
        {
            title: <FormattedMessage id="client" />,
            width: 100,
            dataIndex: 'client',
            key: 'client',
        },
        {
            title: <FormattedMessage id="status" />,
            width: 50,
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'waiting', value: 'waiting' },
                { text: 'in progress', value: 'inprogress' },
                { text: 'completed', value: 'completed' },
                { text: 'rejected', value: 'rejected' },
            ],
            onFilter: (value, record) => record.status.includes(value),
            render: (text) => renderStatus(text),
        },
        {
            title: <FormattedMessage id="startdate" />,
            width: 50,
            dataIndex: 'startDate',
            sortDirections: ['ascend', 'descend'],
            sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
            key: 'startDate',
            render: (text, record) => renderDate(record.startDate),
        },
        {
            title: <FormattedMessage id="enddate" />,
            width: 50,
            dataIndex: 'endDate',
            sortDirections: ['ascend', 'descend'],
            sorter: (a, b) => new Date(a.endDate) - new Date(b.endDate),
            key: 'endDate',
            render: (text, record) => renderDate(record.endDate),
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
            width: 60,
            render: (text, record) => renderAction(text, record),
        },
    ],
}

export default columns


