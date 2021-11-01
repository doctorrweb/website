import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Typography } from 'antd'
import { FormattedMessage, useIntl } from 'react-intl'
import { useSelector, useDispatch } from 'react-redux'
import { PlusOutlined } from '@ant-design/icons'
import { useCustomModal } from '../../helper/utils'
import ClientTable from './clientTable'
import ClientFormUpdate from './clientFormUpdate'
import ClientForm from './clientForm'
import { readAllClients } from '../../action/client'
import { ModalClientFormProvider } from '../../helper/modalFormProvider'

const { Title } = Typography

const DashboardClient = () => {

    const intl = useIntl()
    const dispatch = useDispatch()

    const responseStatus = useSelector(state => state.response.status)
    const clients = useSelector(state => state.clients.clients)

    const [modalVisibilityUpdate, setModalVisibilityUpdate] = useState(false)
    const [modalVisibilityCreate, setModalVisibilityCreate] = useState(false)
    const [itemToUpdate, setItemToUpdate] = useState('')
    const [initialValues, setInitialValues] = useState({})

    useEffect(() => {
        dispatch(readAllClients())
    }, [])

    useEffect(() => {
        if (itemToUpdate !== '') {
            let initialData = clients.filter(client => client._id === itemToUpdate)
            setInitialValues({ ...initialData[0] })
        }
    }, [itemToUpdate])

    useEffect(() => {
        renderModalUpdate()
    }, [modalVisibilityUpdate])

    useEffect(() => {
        if (responseStatus >= 200) {
            setModalVisibilityUpdate(false)
            setModalVisibilityCreate(false)
            dispatch(readAllClients())
        }
    }, [responseStatus])


    const title = <Title level={4}>Client Form</Title>
    const componentCreate = <ClientForm />
    const componentUpdate = <ClientFormUpdate itemToUpdate={itemToUpdate} initialValues={initialValues} />

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
        <ModalClientFormProvider.Provider value={{
            setVisibility: setModalVisibilityUpdate,
            setItemToUpdate: setItemToUpdate
        }}>
            <Row>
                <Row >
                    <Col lg={18} md={18} sm={18} xs={24}>
                        <Title level={2}><FormattedMessage id='client' /></Title>
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={24}>
                        <Button type="primary" onClick={() => handleOnClick()} icon={<PlusOutlined />} size='middle'>
                            {` ${intl.formatMessage({ id: 'createclient' })}`}
                        </Button>
                    </Col>
                    {renderModalCreate()}
                    {renderModalUpdate()}
                </Row>
                <Row>
                    <Col lg={24} md={24} sm={24} xs={24}>
                        <ClientTable />
                    </Col>
                </Row>
            </Row>
        </ModalClientFormProvider.Provider>
    )
}

export default DashboardClient
