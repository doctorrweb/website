import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'

const ModalDisplay = ({ imageToDisplay, modalDisplayVisibility, setModalDisplayVisibility}) => {

    useEffect(() => {
        setModalDisplayVisibility(modalDisplayVisibility)
    }, [])

    useEffect(() => {
        setModalDisplayVisibility(modalDisplayVisibility)
    }, [imageToDisplay, modalDisplayVisibility])


    return (
        <Modal
            title="Vertically centered modal dialog"
            centered
            visible={modalDisplayVisibility}
            onOk={() => setModalDisplayVisibility(false)}
            onCancel={() => setModalDisplayVisibility(false)}
        >
            <img src={imageToDisplay} width={400} />
        </Modal>
    )
}

ModalDisplay.propTypes = {
    imageToDisplay: PropTypes.string,
    modalDisplayVisibility: PropTypes.bool,
    setModalDisplayVisibility: PropTypes.func
}

export default ModalDisplay
