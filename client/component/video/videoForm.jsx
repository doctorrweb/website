import React, { useState, useEffect } from 'react'
import {
    Form,
    Button,
    Upload,
    Input,
    Radio,
    notification
} from 'antd'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { InboxOutlined } from '@ant-design/icons'
import { resetResponse, resetError, resetRequestType } from '../../action'
import { addVideo } from '../../action/video'


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

const VideoForm = () => {
    const intl = useIntl()
    const dispatch = useDispatch()
    
    const [form] = Form.useForm()

    const [CustomFileList, setCustomFileList] = useState([])
    const [uploading, setUploading] = useState(false)
    const [provider, setProvider] = useState('local')
   

    const requestType = useSelector(state => state.requestType.status)
    const errorStatus = useSelector(state => state.error.status)
    const responseStatus = useSelector(state => state.response.status)

    useEffect(() => {
        requestNotification()
        if (responseStatus || errorStatus) {
            setUploading(false)
        }
    }, [errorStatus, responseStatus])


    const requestNotification = () => {
        if (errorStatus !== null && requestType === 'add-video') {
            notification['error']({
                message: 'An error occured',
                description: 'We couldn\'t create this video'
            })
            dispatch(resetError())
            dispatch(resetRequestType())
        }
        if (responseStatus >= 200 && requestType === 'add-video') {
            notification['success']({
                message: 'Video created Successfully',
                description: 'Click on \'details\' to see the new video'
            })
            dispatch(resetResponse())
            dispatch(resetRequestType())
        }
    }

    const onFinish = values => {

        if (provider === 'local') {
            let videoFormData = new FormData()
            const videos = values.videos.fileList
            videos.map(video => {
                videoFormData.append('videos', video.originFileObj)
            })
            dispatch(addVideo(videoFormData))
        }

        if (provider === 'youtube') {
            dispatch(addVideo({...values}))
            form.resetFields(['name', 'path'])
        }

    }

    const onFinishFailed = errorInfo => {
        notification['error']({
            message: `${intl.formatMessage({ id: 'login-fail' })}`,
            description: errorInfo
        })
        form.resetFields()
    }

    const beforeUpload = (file, fileList) => {
        setCustomFileList([...CustomFileList, ...fileList])
        return false
    }

    const onRemove = file => {
        const newCustomFileList = CustomFileList.filter(item => item !== file)
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

    const handleProviderChange = (e) => {
        setProvider(e.target.value)
    }

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="videos"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Provider"
                name="provider"
                rules={[
                    {
                        required: true
                    }
                ]}
            >
                <Radio.Group
                    defaultValue='local'
                    buttonStyle="solid"
                    onChange={e => handleProviderChange(e)}
                >
                    <Radio.Button value="local">Local</Radio.Button>
                    <Radio.Button value="youtube">
                        Youtube
                    </Radio.Button>
                </Radio.Group>
            </Form.Item>


            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.provider !== currentValues.provider}
            >
                {({ getFieldValue }) =>
                    getFieldValue('provider') === 'youtube' ? (
                        <Form.Item
                            name="name"
                            label='Name'
                        >
                            <Input />
                        </Form.Item>
                    ) : null
                }
            </Form.Item>

            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.relation !== currentValues.relation}
            >
                {({ getFieldValue }) =>
                    getFieldValue('provider') === 'youtube' ? (
                        <Form.Item
                            name="path"
                            label='Link'
                        >
                            <Input />
                        </Form.Item>
                    ) : 
                        <Form.Item
                            name="videos"
                            label='Video'
                        >
                            <Dragger
                                fileList={CustomFileList}
                                multiple
                                onRemove={file => onRemove(file)}
                                accept='.mp4'
                                onChange={e => onChange(e)}
                                beforeUpload={(file, fileList) => beforeUpload(file, fileList)}
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
                }
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button
                    block
                    type="primary"
                    loading={uploading}
                    htmlType="submit"
                    // disabled={CustomFileList.length === 0 }
                    onClick={() => setUploading(true)}
                >
                    <FormattedMessage id='add' />
                </Button>
            </Form.Item>
        </Form>
    )
}

export default VideoForm


