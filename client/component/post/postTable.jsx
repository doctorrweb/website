import React, { useState, useEffect }  from 'react'
import { Table } from 'antd'
import { useSelector } from 'react-redux'
import { useIntl } from 'react-intl'
import moment from 'moment'
import columns from './columnTablePost'

const PostTable = () => {

    const intl = useIntl()
    

    const [data, setData] = useState([])
    const [loading, setloading] = useState(true)

    const lang = useSelector(state => state.locale.lang)
    const posts = useSelector(state => state.posts.posts)
    
    //const responseStatus = useSelector(state => state.response.status)

    useEffect(() => { 
        setloading(!loading)
    }, [])

    useEffect(() => {
        renderData(posts)
        moment.locale(lang)
    }, [posts, lang])

    const renderData = (fetchedData) => {
        let tmpData = []
        if (fetchedData !== undefined) {
            fetchedData.map(post => tmpData.push({
                title: post.title,
                category: post.category,
                status: post.status,
                creationDate: post.creationDate,
                fr: post.translations && post.translations.fr,
                de: post.translations && post.translations.de,
                key: post._id
            }))
        }
        setData(tmpData)
    }

    return <Table
        bordered
        locale={lang}
        columns={columns.postTable}
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

export default PostTable