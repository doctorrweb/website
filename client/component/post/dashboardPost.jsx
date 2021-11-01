import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Typography, notification } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { FormattedMessage, useIntl } from 'react-intl'
import { PlusOutlined } from '@ant-design/icons'
import { useCustomModal } from '../../helper/utils'
import PostTable from './postTable'
import PostFormUpdate from './postFormUpdate'
import PostForm from './postForm'
import { readAllPosts } from '../../action/post'
import { resetRequestType, resetError, resetResponse } from '../../action'
import { ModalPostFormProvider } from '../../helper/modalFormProvider'

const { Title } = Typography

const DashboardPost = () => {
    
    const intl = useIntl()
    const dispatch = useDispatch()

    const errorStatus = useSelector(state => state.error.status)
    const responseStatus = useSelector(state => state.response.status)
    const requestType = useSelector(state => state.requestType.status)
    const posts = useSelector(state => state.posts.posts)

    const [modalVisibilityUpdate, setModalVisibilityUpdate] = useState(false)
    const [modalVisibilityCreate, setModalVisibilityCreate] = useState(false)
    const [itemToUpdate, setItemToUpdate] = useState('')
    const [initialValues, setInitialValues] = useState({})
    
    useEffect(() => {
        dispatch(readAllPosts())
    }, [])

    useEffect(() => {
        dispatch(readAllPosts())
    }, [requestType])

    useEffect(() => {
        if (itemToUpdate !== '') {
            let initialData = posts.filter(post => post._id === itemToUpdate)
            setInitialValues({ ...initialData[0] })
        }
    }, [itemToUpdate])

    useEffect(() => {
        renderModalUpdate()
    }, [modalVisibilityUpdate])    
    
    useEffect(() => {
        if (requestType === 'create-post') {
            setModalVisibilityCreate(false)
            //dispatch(readAllPosts())
        }
        if (requestType === 'update-post') {
            setModalVisibilityUpdate(false)
        }
        dispatch(readAllPosts())
    }, [requestType])

    useEffect(() => {
        requestNotification()
    }, [errorStatus, responseStatus, requestType])

    const requestNotification = () => {
        if (errorStatus !== null && requestType === 'delete-post') {
            notification['error']({
                message: 'An error occured',
                description: 'We couldn\'t delete this post'
            })
            dispatch(resetError())
            dispatch(resetRequestType())
        }
        if (responseStatus >= 200 && requestType === 'delete-post') {
            notification['success']({
                message: 'Post deleted Successfully',
                description: 'Click on \'details\' to see the updated post'
            })
            dispatch(resetResponse())
            dispatch(resetRequestType())
        }
    }

    const title = <Title level={4}>Post Form</Title>
    const componentUpdate = <PostFormUpdate itemToUpdate={itemToUpdate} initialValues={initialValues} />
    const componentCreate = <PostForm />

    const renderModalUpdate = () => {
        return useCustomModal(title, componentUpdate, modalVisibilityUpdate, setModalVisibilityUpdate)
    }

    const renderModalCreate = () => {
        return useCustomModal(title, componentCreate, modalVisibilityCreate, setModalVisibilityCreate)
    }

    const handleOnClick = () => {
        setModalVisibilityCreate(!modalVisibilityUpdate)
    }

    return (
        <ModalPostFormProvider.Provider value={{
            setVisibility: setModalVisibilityUpdate,
            setItemToUpdate: setItemToUpdate
        }}>
            <Row>
                <Row >
                    <Col lg={18} md={18} sm={18} xs={24}>
                        <Title level={2}><FormattedMessage id='post' /></Title>
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={24}>
                        <Button type="primary" onClick={() => handleOnClick()} icon={<PlusOutlined />} size='middle'>
                            {` ${intl.formatMessage({ id: 'createpost' })}`}
                        </Button>
                    </Col>
                    {renderModalCreate()}
                    {renderModalUpdate()}
                </Row>
                <Row>
                    <Col lg={24} md={24} sm={24} xs={24}>
                        <PostTable />
                    </Col>
                </Row>
            </Row>
        </ModalPostFormProvider.Provider>
    )
}

export default DashboardPost