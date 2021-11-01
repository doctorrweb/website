import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useIntl } from 'react-intl'
import {
    Card, 
    Input,
    Row,
    Col,
    Divider,
    List,
    Popconfirm
} from 'antd'
import { useState } from 'react'
import { FullscreenOutlined, DeleteOutlined } from '@ant-design/icons'
import { deleteImage } from '../../action/image'


const { Search } = Input
const { Meta } = Card

const ImageGallery = ({ images, setImageToDisplay, modalDisplayVisibility, setModalDisplayVisibility}) => {

    const intl = useIntl()
    const dispatch = useDispatch()

    const [imagesList, setImageList] = useState([])
    const [imageToSearch, setImageToSearch] = useState('')
    const [listLoading, setListLoading] = useState(true)


    useEffect(() => {
        setImageList(images)
        setListLoading(!listLoading)
    }, [])

    useEffect(() => {
        setImageList(images)
    }, [images])

    const handleSearch = () => {
        let array = images.filter(image => image.name.match(imageToSearch))
        
        setImageList(array)
    }

    const handleChangeSearch = (e) => {
        setImageToSearch(e.target.value)
        // handleSearch(imageToSearch)
    }

    const handleModal = (img) => {
        setImageToDisplay(img)
        setModalDisplayVisibility(!modalDisplayVisibility)
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
                            gutter: 8, 
                            lg: 6,
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
                        renderItem={img => (
                            <List.Item key={img._id}>
                                <Card
                                    hoverable
                                    cover={<img src={img.path} width={100} height={150} style={{ objectFit: 'cover' }} />}
                                    actions={[
                                        <FullscreenOutlined key="zoom" onClick={() => handleModal(img.path)} />,
                                        <Popconfirm
                                            key="delete" 
                                            trigger="click"
                                            title={`${intl.formatMessage({ id: 'delete-conf' })}`} 
                                            content={`${intl.formatMessage({ id: 'irreversible' })}`}
                                            onConfirm={() => dispatch(deleteImage(img._id))} 
                                        >
                                            <DeleteOutlined />
                                        </Popconfirm>
                                    ]}
                                >
                                    <Meta title={img.name} />
                                </Card>
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
        </Row>
    )
}

ImageGallery.propTypes = {
    images: PropTypes.array,
    setImageToDisplay: PropTypes.func,
    setModalDisplayVisibility: PropTypes.func,
    modalDisplayVisibility: PropTypes.bool
}

export default ImageGallery