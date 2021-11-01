import React, { useState, useEffect } from 'react'
import {
    Row, 
    Col, 
    Button, 
    Radio,
    Typography,
    notification
} from 'antd'
import { FormattedMessage, useIntl } from 'react-intl'
import { useSelector, useDispatch } from 'react-redux'
import { PlusOutlined, TableOutlined, AppstoreOutlined } from '@ant-design/icons'
import { useCustomModal } from '../../helper/utils'
import { readAllImages } from '../../action/image'
import ImageForm from './imageForm'
import ImageGallery from './imageGallery'
import ImageTable from './imageTable'
import ModalDisplay from './modalDisplay'
import { resetRequestType, resetError, resetResponse } from '../../action'
import { ModalImageFormProvider } from '../../helper/modalFormProvider'

const { Title } = Typography


const DashboardImage = () => {

    const intl = useIntl()
    const dispatch = useDispatch()

    const responseStatus = useSelector(state => state.response.status)
    const images = useSelector(state => state.images.images)
    const requestType = useSelector((state) => state.requestType.status)
    const errorStatus = useSelector((state) => state.error.status)
    
    const [displayType, setDisplayType] = useState('table')
    const [modalDisplayVisibility, setModalDisplayVisibility] = useState(false)
    const [imageToDisplay, setImageToDisplay] = useState('')

    const [modalVisibility, setModalVisibility] = useState(false)

    useEffect(() => {
        dispatch(readAllImages())
    }, [])


    useEffect(() => {
        renderModal()
    }, [modalVisibility])

    useEffect(() => {
        requestNotification()
    }, [errorStatus, responseStatus, requestType])

    useEffect(() => {
        if (responseStatus >= 200) {
            setModalVisibility(false)
        }
    }, [responseStatus])

    useEffect(() => {
        if (requestType === 'add-image') {
            setModalVisibility(false)
            //dispatch(readAllPosts())
        }
    }, [requestType])

    const requestNotification = () => {
        if (errorStatus !== null && requestType === 'delete-image') {
            notification['error']({
                message: 'An error occured',
                description: 'We couldn\'t delete this image'
            })
            dispatch(resetError())
            dispatch(resetRequestType())
        }
        if (responseStatus >= 200 && requestType === 'delete-image') {
            notification['success']({
                message: 'Image deleted Successfully',
                description: 'Click on \'details\' to see the updated image'
            })
            dispatch(resetResponse())
            dispatch(resetRequestType())

        }
    }

    const title = <Title level={4}>Image Form</Title>
    const component = <ImageForm />

    const renderModal = () => {
        return useCustomModal(title, component, modalVisibility, setModalVisibility)
    }

    const renderDisplay = () => {
        if (displayType === 'gallery') {
            return (
                <ImageGallery
                    images={images}
                    setImageToDisplay={setImageToDisplay}
                    setModalDisplayVisibility={setModalDisplayVisibility}
                    modalDisplayVisibility={modalDisplayVisibility}
                />
            )
        } 

        if (displayType === 'table') {
            return (
                <Row>
                    <Col lg={24} md={24} sm={24} xs={24}>
                        <ImageTable images={images}/>
                    </Col>
                </Row>
            )
        }
    }

    const handleChangeDisplay = (e) => {
        setDisplayType(e.target.value)
    }

    return (
        <ModalImageFormProvider.Provider value={{
            setImageToDisplay,
            setModalDisplayVisibility,
            modalDisplayVisibility
        }}>
            <Row>
                <Row gutter={[48, 8]}>
                    <Col
                    // lg={8} md={8} sm={8} xs={24}
                    >
                        <Title level={2}>
                            <FormattedMessage id="image" />
                        </Title>
                    </Col>
                    <Col
                    // lg={6} md={6} sm={6} xs={24}
                    >
                        <Button
                            type="primary"
                            onClick={() => setModalVisibility(!modalVisibility)}
                            icon={<PlusOutlined />}
                            size="middle"
                        >
                            {` ${intl.formatMessage({ id: 'addimage' })}`}
                        </Button>
                    </Col>
                    <Col
                    // lg={6} md={6} sm={6} xs={24}
                    >
                        <Radio.Group defaultValue={displayType} buttonStyle="solid">
                            <Radio.Button value="table" onClick={e => handleChangeDisplay(e)} ><TableOutlined /></Radio.Button>
                            <Radio.Button value="gallery" onClick={e => handleChangeDisplay(e)}><AppstoreOutlined /></Radio.Button>
                        </Radio.Group>
                    </Col>
                    {renderModal()}
                </Row>
                {renderDisplay()}
                <ModalDisplay
                    imageToDisplay={imageToDisplay}
                    setModalDisplayVisibility={setModalDisplayVisibility}
                    modalDisplayVisibility={modalDisplayVisibility}
                />
            </Row>
        </ModalImageFormProvider.Provider>
    )
}

export default DashboardImage
