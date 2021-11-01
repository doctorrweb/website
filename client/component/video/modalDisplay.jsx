import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'
import ReactPlayer from 'react-player'
import { YoutubeFilled } from '@ant-design/icons'


const ModalDisplay = ({ videoToDisplay, modalDisplayVisibility, setModalDisplayVisibility }) => {

    useEffect(() => {
        setModalDisplayVisibility(modalDisplayVisibility)
    }, [])

    useEffect(() => {
        setModalDisplayVisibility(modalDisplayVisibility)
    }, [videoToDisplay, modalDisplayVisibility])


    return (
        <Modal
            title="Vertically centered modal dialog"
            centered
            width={700}
            visible={modalDisplayVisibility}
            onOk={() => setModalDisplayVisibility(false)}
            onCancel={() => setModalDisplayVisibility(false)}
        >
            {/* <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' width={640} playing={false} /> */}
            <ReactPlayer 
                url={videoToDisplay} 
                width={640} 
                playing
                playIcon={<YoutubeFilled />}
                controls
            />
        </Modal>
    )
}

ModalDisplay.propTypes = {
    videoToDisplay: PropTypes.string,
    modalDisplayVisibility: PropTypes.bool,
    setModalDisplayVisibility: PropTypes.func
}

export default ModalDisplay
