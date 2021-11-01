import React, { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Dropdown, Button, Menu, Modal, Typography } from 'antd'
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { deleteVideo } from '../../action/video'
import { ModalVideoFormProvider } from '../../helper/modalFormProvider'

const { confirm } = Modal
const { Paragraph } = Typography


const renderAction = (text, record) => {
    const intl = useIntl()
    const dispatch = useDispatch()

    const modalForm = useContext(ModalVideoFormProvider)

    const showConfirm = () => {
        confirm({
            title: `${intl.formatMessage({ id: 'delete-conf' })}`,
            content: `${intl.formatMessage({ id: 'irreversible' })}`,
            icon: <ExclamationCircleOutlined />,
            okText: `${intl.formatMessage({ id: 'yes' })}`,
            cancelText: `${intl.formatMessage({ id: 'no' })}`,
            onOk() {
                return dispatch(deleteVideo(record.key))
            }
        })
    }

    const handlePreview = (video) => {
        modalForm.setVideoToDisplay(video)
        modalForm.setModalDisplayVisibility(true)
    }

    return (
        <Dropdown overlay={
            <Menu>
                <Menu.Item
                    key="1"
                    onClick={() => handlePreview(record.path)}
                >
                    Preview
                </Menu.Item>
                <Menu.Item
                    key="2"
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

const columns = [
    {
        title: <FormattedMessage id='name' />,
        width: 150,
        dataIndex: 'name',
        key: 'name',
        fixed: 'left'
    },
    {
        title: <FormattedMessage id='path' />,
        width: 150,
        dataIndex: 'path',
        key: 'path',
        render(text, record) {
            return (
                <Paragraph copyable>{record.path}</Paragraph>
            )
        }
    },
    {
        title: <FormattedMessage id='creationdate' />,
        width: 60,
        dataIndex: 'creationDate',
        key: 'creationDate',
        sorter: (a, b) => new Date(a.creationDate) - new Date(b.creationDate),
        sortDirections: ['ascend', 'descend'],
        defaultSortOrder: 'descend',
        render: (text, record) => moment(record.creationDate).format('LL')
    },
    {
        title: 'Provider',
        width: 50,
        dataIndex: 'provider',
        key: 'provider',
        filters: [
            { text: 'local', value: 'local' },
            { text: 'youtube', value: 'youtube' }
        ],
        onFilter: (value, record) => record.provider.includes(value),
    },
    {
        title: <FormattedMessage id='action' />,
        key: 'operation',
        fixed: 'right',
        width: 50,
        render: (text, record) => renderAction(text, record)
    },
]



export default columns