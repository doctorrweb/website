import React from 'react'
import { Layout, Row } from 'antd'
import Language from '../component/language'

//import Login from '../component/loginBtn'
//import ModalLogin from '../component/modalLogin'

const { Footer } = Layout

const CustomFooter = () => {
    return (
        <Footer 
            style={{
                position: 'fixed', 
                zIndex: 1, 
                bottom: 1, 
                right: 10,
                backgroundColor: 'transparent'
            }}
        >
            <Row justify="end">
                <Language />
            </Row>
        </Footer>
    )
}

export default CustomFooter