import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Typography, notification } from 'antd'
import { FormattedMessage, useIntl } from 'react-intl'
import { useSelector, useDispatch } from 'react-redux'
import { PlusOutlined } from '@ant-design/icons'
import { useCustomModal } from '../../helper/utils'
import ProjectTable from './projectTable'
import ProjectForm from './projectForm'
import ProjectFormUpdate from './projectFormUpdate'
import { readAllProjects } from '../../action/project'
import { resetRequestType, resetError, resetResponse } from '../../action'
import { ModalProjectFormProvider } from '../../helper/modalFormProvider'

const { Title } = Typography


const DashboardProject = () => {

    const intl = useIntl()
    const dispatch = useDispatch()


    const responseStatus = useSelector(state => state.response.status)
    const errorStatus = useSelector(state => state.error.status)
    const requestType = useSelector(state => state.requestType.status)
    const projects = useSelector(state => state.projects.projects)

    const [modalVisibilityUpdate, setModalVisibilityUpdate] = useState(false)
    const [modalVisibilityCreate, setModalVisibilityCreate] = useState(false)
    const [itemToUpdate, setItemToUpdate] = useState('')
    const [initialValues, setInitialValues] = useState({})

    useEffect(() => {
        dispatch(readAllProjects())
    }, [])
    
    useEffect(() => {
        if (itemToUpdate !== '') {
            let initialData = projects.find(project => project._id === itemToUpdate)
            setInitialValues({ ...initialData })
        }
    }, [itemToUpdate])

    useEffect(() => {
        renderModalUpdate()
    }, [modalVisibilityUpdate])

    useEffect(() => {
        if (requestType === 'create-project') {
            setModalVisibilityCreate(false)
            //dispatch(readAllPosts())
        }
        if (requestType === 'update-project') {
            setModalVisibilityUpdate(false)
        }
        dispatch(readAllProjects())
    }, [requestType])

    useEffect(() => {
        requestNotification()
    }, [errorStatus, responseStatus, requestType])

    const requestNotification = () => {
        if (errorStatus !== null && requestType === 'delete-project') {
            notification['error']({
                message: 'An error occured',
                description: 'We couldn\'t delete this project'
            })
            dispatch(resetError())
            dispatch(resetRequestType())
        }
        if (responseStatus >= 200 && requestType === 'delete-project') {
            notification['success']({
                message: 'Project deleted Successfully',
                description: 'Click on \'details\' to see the updated project'
            })
            dispatch(resetResponse())
            dispatch(resetRequestType())
        }
    }

    const title = <Title level={4}>Project Form</Title>
    const componentUpdate = <ProjectFormUpdate itemToUpdate={itemToUpdate} initialValues={initialValues} />
    const componentCreate = <ProjectForm />

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
        <ModalProjectFormProvider.Provider value={{
            setVisibility: setModalVisibilityUpdate,
            setItemToUpdate: setItemToUpdate
        }}>
            <Row>
                <Row >
                    <Col lg={18} md={18} sm={18} xs={24}>
                        <Title level={2}><FormattedMessage id='project' /></Title>
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={24}>
                        <Button type="primary" onClick={() => handleOnClick()} icon={<PlusOutlined />} size='middle'>
                            {` ${intl.formatMessage({ id: 'createproject' })}`}
                        </Button>
                    </Col>
                    {renderModalCreate()}
                    {renderModalUpdate()}
                </Row>
                <Row>
                    <Col lg={24} md={24} sm={24} xs={24}>
                        <ProjectTable />
                    </Col>
                </Row>
            </Row>
        </ModalProjectFormProvider.Provider>
    )
}

export default DashboardProject
