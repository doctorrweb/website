import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { useSelector } from 'react-redux'
import { useIntl } from 'react-intl'
import moment from 'moment'
import columns from './columnTableVideo'

const VideoTable = ({ videos }) => {

    const intl = useIntl()

    const [data, setData] = useState([])
    const [loading, setloading] = useState(true)

    const lang = useSelector(state => state.locale.lang)

    useEffect(() => {
        setloading(!loading)
    }, [])

    useEffect(() => {
        renderData(videos)
        moment.locale(lang)
    }, [videos, lang])

    const renderData = (fetchedData) => {
        let tmpData = []
        if (fetchedData !== undefined) {
            fetchedData.map(video => tmpData.push({
                name: video.name,
                path: video.path,
                creationDate: video.creationDate,
                provider: video.provider,
                key: video._id
            }))
        }
        setData(tmpData)
    }

    return <Table
        bordered
        locale={lang}
        columns={columns}
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

VideoTable.propTypes = {
    videos: PropTypes.array
}

export default VideoTable