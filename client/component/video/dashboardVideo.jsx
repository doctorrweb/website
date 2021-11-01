import React, { useState, useEffect } from 'react'
import {
    Row, 
    Col, 
    Button, 
    Typography,
    Radio,
    notification
} from 'antd'
import { FormattedMessage, useIntl } from 'react-intl'
import { useSelector, useDispatch } from 'react-redux'
import { PlusOutlined, TableOutlined, AppstoreOutlined } from '@ant-design/icons'
import { useCustomModal } from '../../helper/utils'
import { readAllVideos } from '../../action/video'
import VideoForm from './videoForm'
import VideoGallery from './videoGallery'
import VideoTable from './videoTable'
import ModalDisplay from './modalDisplay'
import { resetRequestType, resetError, resetResponse } from '../../action'
import { ModalVideoFormProvider } from '../../helper/modalFormProvider'

const { Title } = Typography

const DashboardVideo = () => {

    const intl = useIntl()
    const dispatch = useDispatch()

    const responseStatus = useSelector(state => state.response.status)
    const videos = useSelector(state => state.videos.videos)
    const requestType = useSelector(state => state.requestType.status)
    const errorStatus = useSelector(state => state.error.status)

    const [displayType, setDisplayType] = useState('table')
    const [modalVisibility, setModalVisibility] = useState(false)
    const [modalDisplayVisibility, setModalDisplayVisibility] = useState(false)
    const [videoToDisplay, setVideoToDisplay] = useState('')

    useEffect(() => {
        dispatch(readAllVideos())
    }, [])

    useEffect(() => {
        renderModal()
    }, [modalVisibility])

    useEffect(() => {
        requestNotification()
    }, [errorStatus, responseStatus, requestType])

    useEffect(() => {
        if (responseStatus >= 200) {
            dispatch(readAllVideos())
        }
    }, [responseStatus])

    useEffect(() => {
        if (requestType === 'add-video') {
            setModalVisibility(false)
            //dispatch(readAllPosts())
        }
    }, [requestType])

    const requestNotification = () => {
        if (errorStatus !== null && requestType === 'delete-video') {
            notification['error']({
                message: 'An error occured',
                description: 'We couldn\'t delete this video'
            })
            dispatch(resetError())
            dispatch(resetRequestType())
        }
        if (responseStatus >= 200 && requestType === 'delete-video') {
            notification['success']({
                message: 'Video deleted Successfully',
                description: 'Click on \'details\' to see the updated video'
            })
            dispatch(resetResponse())
            dispatch(resetRequestType())

        }
    }

    const title = <Title level={4}>Video Form</Title>
    const component = <VideoForm />

    const renderModal = () => {
        return useCustomModal(title, component, modalVisibility, setModalVisibility)
    }

    const renderDisplay = () => {
        if (displayType === 'gallery') {
            return <VideoGallery
                videos={videos}
                setVideoToDisplay={setVideoToDisplay}
                setModalDisplayVisibility={setModalDisplayVisibility}
                modalDisplayVisibility={modalDisplayVisibility}
            />
        }

        if (displayType === 'table') {
            return (
                <Row>
                    <Col lg={24} md={24} sm={24} xs={24}>
                        <VideoTable videos={videos} />
                    </Col>
                </Row>
            )
        }

    }

    const handleChangeDisplay = (e) => {
        setDisplayType(e.target.value)
    }

    return (
        <ModalVideoFormProvider.Provider value={{
            setVideoToDisplay,
            setModalDisplayVisibility,
            modalDisplayVisibility
        }}>
            <Row>
                <Row gutter={[48, 8]}>
                    <Col>
                        <Title level={2}>
                            <FormattedMessage id="video" />
                        </Title>
                    </Col>
                    <Col>
                        <Button
                            type="primary"
                            onClick={() => setModalVisibility(!modalVisibility)}
                            icon={<PlusOutlined />}
                            size="middle"
                        >
                            {` ${intl.formatMessage({ id: 'addvideo' })}`}
                        </Button>
                    </Col>
                    <Col>
                        <Radio.Group defaultValue={displayType} buttonStyle="solid">
                            <Radio.Button value="table" onClick={e => handleChangeDisplay(e)} ><TableOutlined /></Radio.Button>
                            <Radio.Button value="gallery" onClick={e => handleChangeDisplay(e)}><AppstoreOutlined /></Radio.Button>
                        </Radio.Group>
                    </Col>
                    {renderModal()}
                </Row>
                {renderDisplay()}
                <ModalDisplay
                    videoToDisplay={videoToDisplay}
                    setModalDisplayVisibility={setModalDisplayVisibility}
                    modalDisplayVisibility={modalDisplayVisibility}
                />
            </Row>
        </ModalVideoFormProvider.Provider>
    )
}

export default DashboardVideo
