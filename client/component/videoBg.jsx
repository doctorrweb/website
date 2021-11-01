import React from 'react'
//import Classes from '../helper/utils'



const VideoBg = () => {
    const videoSource = 'video/videobg_code.mp4'

    return (
        <video autoPlay="autoplay" loop="loop" muted className='videobg'>
            <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
        </video>
    )
}

export default VideoBg