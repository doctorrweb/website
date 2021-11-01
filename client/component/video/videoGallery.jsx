import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useIntl } from 'react-intl'
import {
    Input,
    Row,
    Col,
    Divider,
    List,
    Popconfirm
} from 'antd'
import ReactPlayer from 'react-player'
import { useState } from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import { deleteVideo } from '../../action/video'
import { YoutubeFilled } from '@ant-design/icons'


const { Search } = Input

const VideoGallery = ({ videos }) => {

    const intl = useIntl()
    const dispatch = useDispatch()

    const [imagesList, setImageList] = useState([])
    const [imageToSearch, setImageToSearch] = useState('')
    const [listLoading, setListLoading] = useState(true)


    useEffect(() => {
        setImageList(videos)
        setListLoading(!listLoading)
    }, [])

    useEffect(() => {
        setImageList(videos)
    }, [videos])

    const handleSearch = () => {
        let array = videos.filter(image => image.name.match(imageToSearch))

        setImageList(array)
    }

    const handleChangeSearch = (e) => {
        setImageToSearch(e.target.value)
        // handleSearch(imageToSearch)
    }


    return (
        <Row justify='center'>
            <Row >
                <Col>
                    <Search
                        placeholder="input search text"
                        enterButton
                        size='middle'
                        style={{ width: 800 }}
                        onSearch={(value, e) => handleSearch(value, e)}
                        value={imageToSearch}
                        onChange={e => handleChangeSearch(e)}
                    />
                </Col>
            </Row>
            <Divider />
            <Row>
                <Col>
                    <List
                        grid={{
                            gutter: 40,
                            lg: 4,
                            md: 4,
                            sm: 3,
                            xs: 2
                        }}
                        dataSource={imagesList}
                        size='small'
                        loading={listLoading}
                        pagination={{
                            onChange: page => {
                                console.log(page)
                            },
                            pageSize: 30,
                        }}
                        renderItem={video => (
                            <List.Item>
                                <Col key={video._id}>
                                    <ReactPlayer
                                        style={{ marginRight: 400 }}
                                        url={video.path}
                                        width={320}
                                        height={200}
                                        playing={false}
                                        playIcon={<YoutubeFilled />}
                                        controls
                                    />
                                    <Popconfirm
                                        key="delete"
                                        trigger="click"
                                        title={`${intl.formatMessage({ id: 'delete-conf' })}`}
                                        content={`${intl.formatMessage({ id: 'irreversible' })}`}
                                        onConfirm={() => dispatch(deleteVideo(video._id))}
                                    >
                                        Delete this item <DeleteOutlined />
                                    </Popconfirm>
                                </Col>
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
        </Row>
    )
}

VideoGallery.propTypes = {
    videos: PropTypes.array
}

export default VideoGallery