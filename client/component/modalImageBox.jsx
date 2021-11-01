import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input, InputNumber } from 'antd'

// reset form fields when modal is form, closed
const useResetFormOnCloseModal = ({ form, visibleMediaBox }) => {
    const prevVisibleRef = useRef()
    useEffect(() => {
        prevVisibleRef.current = visibleMediaBox
    }, [visibleMediaBox])
    const prevVisible = prevVisibleRef.current
    useEffect(() => {
        if (!visibleMediaBox && prevVisible) {
            form.resetFields()
        }
    }, [visibleMediaBox])
}

const ModalImageBox = ({ visibleMediaBox, onCancel }) => {
    const [form] = Form.useForm()
    useResetFormOnCloseModal({
        form,
        visibleMediaBox,
    })

    const onOk = () => {
        form.submit()
    }

    return (
        <Modal
            title="Basic Drawer"
            visible={visibleMediaBox}
            onOk={onOk}
            onCancel={onCancel}
        >
            <Form form={form} layout="vertical" name="userForm">
                <Form.Item
                    name="name"
                    label="User Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="age"
                    label="User Age"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>
            </Form>
        </Modal>
    )
}

ModalImageBox.propTypes = {
    visibleMediaBox: PropTypes.any,
    onCancel: PropTypes.func
}

export default ModalImageBox
