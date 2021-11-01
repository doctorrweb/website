import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { useSelector } from 'react-redux'
import { useIntl } from 'react-intl'
import moment from 'moment'
import columns from './columnTableClient'

const ClientTable = () => {

    const intl = useIntl()


    const [data, setData] = useState([])
    const [loading, setloading] = useState(true)

    const lang = useSelector(state => state.locale.lang)
    const clients = useSelector(state => state.clients.clients)

    //const responseStatus = useSelector(state => state.response.status)

    useEffect(() => {
        setloading(!loading)
    }, [])

    useEffect(() => {
        
    }, [lang])

    useEffect(() => {
        renderData(clients)
        moment.locale(lang)
    }, [clients, lang])

    const renderData = (fetchedData) => {
        let tmpData = []
        if (fetchedData !== undefined) {
            fetchedData.map((client) =>
                tmpData.push({
                    name: client.name,
                    description: client.description,
                    category: client.category,
                    fr: client.translations && client.translations.fr,
                    de: client.translations && client.translations.de,
                    key: client._id,
                })
            )
        }
        setData(tmpData)
    }

    return <Table
        bordered
        locale={lang}
        columns={columns.clientTable}
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

export default ClientTable