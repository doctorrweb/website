import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { useSelector } from 'react-redux'
import { useIntl } from 'react-intl'
import moment from 'moment'
import columns from './columTableProject'

const ProjectTable = () => {

    const intl = useIntl()

    const [data, setData] = useState([])

    const lang = useSelector(state => state.locale.lang)
    const projects = useSelector(state => state.projects.projects)

    useEffect(() => {
        renderData(projects)
        moment.locale(lang)
    }, [projects, lang])

    const renderData = (fetchedData) => {
        let tmpData = []
        if (fetchedData !== undefined) {
            fetchedData.map((project) =>
                tmpData.push({
                    title: project.title,
                    client: project.client && project.client.name,
                    category: project.category,
                    status: project.status,
                    startDate: project.startDate,
                    endDate: project.endDate,
                    fr: project.translations && project.translations.fr,
                    de: project.translations && project.translations.de,
                    key: project._id,
                })
            )
        }
        setData(tmpData)
    }

    return <Table
        bordered
        locale={lang}
        columns={columns.projectTable}
        dataSource={data}
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

export default ProjectTable