import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Typography, notification } from 'antd'
import { FormattedMessage, useIntl } from 'react-intl'
import { useSelector, useDispatch } from 'react-redux'
import { PlusOutlined } from '@ant-design/icons'
import { useCustomModal } from '../../helper/utils'
import TranslationTable from './translationTable'
import TranslationFormUpdate from './translationFormUpdate'
import TranslationForm from './translationForm'
import { readAllTranslations } from '../../action/translation'
import { ModalTranslationFormProvider } from '../../helper/modalFormProvider'
import { resetRequestType, resetError, resetResponse } from '../../action'

const { Title } = Typography

const DashboardTranslation = () => {
    const intl = useIntl()
    const dispatch = useDispatch()

    const responseStatus = useSelector((state) => state.response.status)
    const translations = useSelector((state) => state.translations.translations)
    const requestType = useSelector(state => state.requestType.status)
    const errorStatus = useSelector(state => state.error.status)

    const [modalVisibilityUpdate, setModalVisibilityUpdate] = useState(false)
    const [modalVisibilityCreate, setModalVisibilityCreate] = useState(false)
    const [itemToUpdate, setItemToUpdate] = useState('')
    const [initialValues, setInitialValues] = useState({})
    
    useEffect(() => {
        dispatch(readAllTranslations())
    }, [])

    useEffect(() => {
        dispatch(readAllTranslations())
    }, [requestType])

    useEffect(() => {
        if (itemToUpdate !== '') {
            let initialData = translations.filter(
                (trans) => trans._id === itemToUpdate
            )
            setInitialValues({ ...initialData[0] })
        }
    }, [itemToUpdate])

    useEffect(() => {
        renderModalUpdate()
    }, [modalVisibilityUpdate])

    useEffect(() => {
        if (requestType === 'create-translation') {
            setModalVisibilityCreate(false)
            //dispatch(readAllPosts())
        }
        if (requestType === 'update-translation') {
            setModalVisibilityUpdate(false)
        }
        dispatch(readAllTranslations())
    }, [requestType])

    useEffect(() => {
        requestNotification()
    }, [errorStatus, responseStatus, requestType])

    const requestNotification = () => {
        if (errorStatus !== null && requestType === 'delete-translation') {
            notification['error']({
                message: 'An error occured',
                description: 'We couldn\'t delete this translation',
            })
            dispatch(resetError())
            dispatch(resetRequestType())
        }
        if (responseStatus >= 200 && requestType === 'delete-translation') {
            notification['success']({
                message: 'Translation deleted Successfully',
                description: 'Click on \'details\' to see the updated translation',
            })
            dispatch(resetResponse())
            dispatch(resetRequestType())
        }
    }

    const title = <Title level={4}>Translation Form</Title>
    const componentCreate = <TranslationForm />
    const componentUpdate = (
        <TranslationFormUpdate
            itemToUpdate={itemToUpdate}
            initialValues={initialValues}
        />
    )

    const renderModalUpdate = () => {
        return useCustomModal(
            title,
            componentUpdate,
            modalVisibilityUpdate,
            setModalVisibilityUpdate
        )
    }

    const renderModalCreate = () => {
        return useCustomModal(
            title,
            componentCreate,
            modalVisibilityCreate,
            setModalVisibilityCreate
        )
    }

    const handleOnClick = () => {
        setModalVisibilityCreate(!modalVisibilityUpdate)
    }

    return (
        <ModalTranslationFormProvider.Provider
            value={{
                setVisibility: setModalVisibilityUpdate,
                setItemToUpdate: setItemToUpdate,
            }}
        >
            <Row>
                <Row>
                    <Col lg={18} md={18} sm={18} xs={24}>
                        <Title level={2}>
                            <FormattedMessage id="translation" />
                        </Title>
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={24}>
                        <Button
                            type="primary"
                            onClick={() => handleOnClick()}
                            icon={<PlusOutlined />}
                            size="middle"
                        >
                            {` ${intl.formatMessage({ id: 'createtranslation' })}`}
                        </Button>
                    </Col>
                    {renderModalCreate()}
                    {renderModalUpdate()}
                </Row>
                <Row>
                    <Col lg={24} md={24} sm={24} xs={24}>
                        <TranslationTable />
                    </Col>
                </Row>
            </Row>
        </ModalTranslationFormProvider.Provider>
    )
}

export default DashboardTranslation
