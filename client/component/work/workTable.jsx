import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import {
    List,
    Card
} from 'antd'
import moment from 'moment'


const NO_IMAGE = '/uploads/images-no-image-2020-05-22T18:41:03.460Z.jpg'

const WorkTable = ({ data }) => {

    const history = useHistory()
    const lang = useSelector(state => state.locale.lang)

    return (
        <List
            grid={{
                gutter: 16, 
                lg: 4,
                md: 3,
                sm: 2,
                xs: 1
            }}
            dataSource={data}
            size="small"
            pagination={{
                onChange: (page) => {
                    console.log(page)
                },
                pageSize: 30,
            }}
            renderItem={(item) => (
                <List.Item>
                    <Card
                        hoverable
                        cover={<img src={item.image ? item.image.path : NO_IMAGE} width={100} height={150} style={{ objectFit: 'cover' }} />}
                        onClick={() => history.push(`/work/${item._id}`)}
                    >
                        <h3 style={{ color: '#FF9900' }}>{item.translations[lang] ? item.translations[lang].title : item.title }</h3>
                        <div><b>Client:</b> {(item.translations[lang] && item.translations[lang].client) ? item.translations[lang].client.name : item.client.name}</div>
                        <div><b>Start date:</b> {moment(item.startDate).format('LL')}</div>
                        <div><b>End date:</b> {item.endDate ? moment(item.endDate).format('LL') : <FormattedMessage id="to-determine" />}</div>
                    </Card>
                </List.Item>
            )}
        />
    )
}

WorkTable.propTypes = {
    data: PropTypes.array
}

export default WorkTable