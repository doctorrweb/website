import React, { useState, useEffect } from 'react'
import {
    Form,
    notification,
    Button,
    Upload
} from 'antd'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { InboxOutlined } from '@ant-design/icons'
import { resetResponse, resetError, resetRequestType } from '../../action'
import { addImage } from '../../action/image'

const { Dragger } = Upload

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
    }
}
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 21,
            offset: 3
        }
    }
}

const ImageForm = () => {
    const intl = useIntl()
    const dispatch = useDispatch()

    const [form] = Form.useForm()

    const [CustomFileList, setCustomFileList] = useState([])
    const [uploading, setUploading] = useState(false)
    

    const requestType = useSelector((state) => state.requestType.status)
    const errorStatus = useSelector(state => state.error.status)
    const responseStatus = useSelector(state => state.response.status)

    useEffect(() => {
        requestNotification()
        if (responseStatus || errorStatus) {
            setUploading(false)
        }
    }, [errorStatus, responseStatus])


    const requestNotification = () => {
        if (errorStatus !== null && requestType === 'add-image') {
            notification['error']({
                message: 'An error occured',
                description: 'We couldn\'t create this image'
            })
            dispatch(resetError())
            dispatch(resetRequestType())
        }
        if (responseStatus >= 200 && requestType === 'add-image') {
            notification['success']({
                message: 'Image created Successfully',
                description: 'Click on \'details\' to see the new image'
            })
            dispatch(resetResponse())
            dispatch(resetRequestType())
        }
    }

    const onFinish = values => {
        let imageFormData = new FormData()
        const images = values.images.fileList
        images.map(image => {
            imageFormData.append('images', image.originFileObj)
        })
        dispatch(addImage(imageFormData))
    }

    const onFinishFailed = errorInfo => {
        notification['error']({
            message: `${intl.formatMessage({ id: 'login-fail' })}`,
            description: errorInfo
        })
        setCustomFileList([])
        form.resetFields()
    }

    const beforeUpload = (file, fileList) => {
        setCustomFileList([...CustomFileList, ...fileList])
        return false
    }

    const onRemove = file => {
        const newCustomFileList = CustomFileList.filter((item) => item !== file)
        setCustomFileList(newCustomFileList)
    } 

    const onChange = (info) => {
        const { status } = info.file
        if (status !== 'uploading') {
            //
        }
        if (status === 'done') {
            //
        } else if (status === 'error') {
            //
        }
    }

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="image"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >

            <Form.Item
                name="images"
                label={<FormattedMessage id='image' />}
            >
                <Dragger 
                    fileList={CustomFileList}
                    multiple
                    onRemove={file => onRemove(file)}
                    accept='.jpg, .jpeg, .png, .gif'
                    onChange={e => onChange(e)}
                    beforeUpload={(file, fileList) => beforeUpload(file, fileList)}
                    // beforeUpload={() => false}
                    showUploadList
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
                    </p>
                </Dragger>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button 
                    block 
                    type="primary" 
                    loading={uploading} 
                    htmlType="submit"
                    disabled={CustomFileList.length === 0 }
                    onClick={() => setUploading(true)}
                >
                    <FormattedMessage id='add' />
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ImageForm