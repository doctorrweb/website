import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { useSelector } from 'react-redux'
import { useIntl } from 'react-intl'
import moment from 'moment'
import columns from './columnTableUser'

const UserTable = () => {

    const intl = useIntl()


    const [data, setData] = useState([])
    const [loading, setloading] = useState(true)

    const lang = useSelector(state => state.locale.lang)
    const users = useSelector(state => state.users.users)

    //const responseStatus = useSelector(state => state.response.status)

    useEffect(() => {
        setloading(!loading)
    }, [])

    useEffect(() => {
        moment.locale(lang)
    }, [lang])

    useEffect(() => {
        renderData(users)
    }, [users])

    const renderData = (fetchedData) => {
        let tmpData = []
        if (fetchedData !== undefined) {
            fetchedData.map(user => tmpData.push({
                surname: user.surname,
                firstname: user.firstname,
                connexiontype: user.method,
                email: user.local.email,
                role: user.role,
                key: user._id
            }))
        }
        setData(tmpData)
    }

    return <Table
        bordered
        locale={lang}
        columns={columns.userTable}
        dataSource={data}
        loading={loading}
        scroll={{ x: 1300, y: 500 }}
        size='small'
        pagination={{
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} ${intl.formatMessage({ id: 'of' })} ${total} ${intl.formatMessage({ id: 'items' })}`,
            showQuickJumper: true,
            pageSize: 10,
            pageSizeOptions: ['10', '30', '60', '80', '100']
        }}
    />
}

export default UserTable