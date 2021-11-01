import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { List, Card } from 'antd'
import moment from 'moment'


const NO_IMAGE = '/uploads/images-no-image-2020-05-22T18:41:03.460Z.jpg'

const TutorialTable = ({ data }) => {

    const intl = useIntl()
    const history = useHistory()

    const lang = useSelector(state => state.locale.lang)

    return (
        <List
            grid={{
                gutter: 16,
                lg: 4,
                md: 3,
                sm: 2,
                xs: 1,
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
                        cover={
                            <img
                                src={item.image ? item.image.path : NO_IMAGE}
                                width={100}
                                height={150}
                                style={{ objectFit: 'cover' }}
                            />
                        }
                        onClick={() => history.push(`/tutorial/${item._id}`)}
                    >
                        <h3 style={{ color: '#FF9900' }}>{item.translations[lang] ? item.translations[lang].title : item.title}</h3>
                        <div>
                            {`${intl.formatMessage({ id: 'published' })} ${moment(item.creationDate).fromNow()}`}
                        </div>
                    </Card>
                </List.Item>
            )}
        />
    )
}

TutorialTable.propTypes = {
    data: PropTypes.array,
}

export default TutorialTable
