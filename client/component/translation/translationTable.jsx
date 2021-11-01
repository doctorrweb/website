import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { useSelector } from 'react-redux'
import { useIntl } from 'react-intl'
import moment from 'moment'
import columns from './columnTableTranslation'

const TranslationTable = () => {
    const intl = useIntl()

    const [data, setData] = useState([])
    const [loading, setloading] = useState(true)

    const lang = useSelector((state) => state.locale.lang)
    const translations = useSelector((state) => state.translations.translations)

    //const responseStatus = useSelector(state => state.response.status)

    useEffect(() => {
        setloading(!loading)
    }, [])

    useEffect(() => {
        moment.locale(lang)
    }, [lang])

    useEffect(() => {
        renderData(translations)
    }, [translations])

    const renderData = (fetchedData) => {
        let tmpData = []
        if (fetchedData !== undefined) {
            fetchedData.map((trans) =>
                tmpData.push({
                    title: trans.title,
                    name: trans.name,
                    relation: trans.relation,
                    description: trans.description,
                    completed: trans.completed,
                    post: trans.post && trans.post.title,
                    project: trans.project && trans.project.title,
                    formation: trans.formation && trans.formation.title,
                    client: trans.client && trans.client.name,
                    lang: trans.lang,
                    key: trans._id,
                })
            )
        }
        setData(tmpData)
    }

    return (
        <Table
            bordered
            locale={lang}
            columns={columns.translationTable}
            dataSource={data}
            loading={loading}
            scroll={{ x: 1300, y: 500 }}
            size="small"
            pagination={{
                showSizeChanger: true,
                showTotal: (total, range) =>
                    `${range[0]}-${range[1]} ${intl.formatMessage({
                        id: 'of',
                    })} ${total} ${intl.formatMessage({ id: 'items' })}`,
                showQuickJumper: true,
                pageSize: 10,
                pageSizeOptions: ['10', '30', '60', '80', '100'],
            }}
        />
    )
}

export default TranslationTable
