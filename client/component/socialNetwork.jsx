import React, { Fragment } from 'react'
import { Button } from 'antd'
import {
    GithubOutlined,
    TwitterOutlined,
    LinkedinOutlined,
    InstagramOutlined
} from '@ant-design/icons'


const SocialNetwork = () => {
    return (
        <Fragment>
            <div style={{
                marginTop: '2em'
            }}>
                <a href='https://github.com/doctorrweb' target='_blank' rel="noopener noreferrer">
                    <Button type='link' ghost icon={<GithubOutlined />} size='small'>
                    doctorrweb
                    </Button>
                </a>

                <a href='https://www.linkedin.com/in/herbain-bognon/' target='_blank' rel="noopener noreferrer">
                    <Button type='link' ghost icon={<LinkedinOutlined />} size='small'>
                    doctorrWeb
                    </Button>
                </a>

            </div>
            <div style={{
                marginTop: '1em'
            }}>
                <a href='https://www.instagram.com/doctorrweb/' target='_blank' rel="noopener noreferrer">
                    <Button type='link' ghost icon={<InstagramOutlined />} size='small'>
                    doctorrweb
                    </Button>
                </a>

                <a href='https://twitter.com/herbain_bognon'>
                    <Button type='link' ghost icon={<TwitterOutlined />} size='small' target='_blank' rel="noopener noreferrer">
                    @herbain_bognon
                    </Button>
                </a>

            </div>
        </Fragment>
    )
}


export default SocialNetwork