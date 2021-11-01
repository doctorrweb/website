import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { 
    FileFilled,
    ProjectFilled,
    WalletFilled,
    CodeFilled,
    PictureFilled,
    YoutubeFilled,
    ProfileFilled,
    DashboardFilled,
    TranslationOutlined
} from '@ant-design/icons'

const DashboardMenu = () => {
    return (
        <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            style={{
                backgroundColor: 'transparent'
            }}
        >
            <Menu.Item key="1">
                <Link to='/dashboard'>
                    <DashboardFilled />
                    <FormattedMessage id='dashboard' />
                </Link>
                
            </Menu.Item>
            <Menu.Item key="2">
                <Link to='/dashboard/posts'>
                    <FileFilled />
                    <FormattedMessage id='post' />
                </Link>
            </Menu.Item>
            <Menu.Item key="3">
                <Link to='/dashboard/projects'>
                    <ProjectFilled />
                    <FormattedMessage id='project' />
                </Link>
            </Menu.Item>
            <Menu.Item key="4">
                <Link to='/dashboard/clients'>
                    <WalletFilled />
                    <FormattedMessage id='client' />
                </Link>
            </Menu.Item>
            <Menu.Item key="5">
                <Link to='/dashboard/tutorials'>
                    <CodeFilled />
                    <FormattedMessage id='tutorial' />
                </Link>
            </Menu.Item>
            <Menu.Item key="6">
                <Link to='/dashboard/images'>
                    <PictureFilled />
                    <FormattedMessage id='image' />
                </Link>
            </Menu.Item>
            <Menu.Item key="7">
                <Link to='/dashboard/videos'>
                    <YoutubeFilled />
                    <span>Video</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="8">
                <Link to='/dashboard/users'>
                    <ProfileFilled />
                    <FormattedMessage id='user' />
                </Link>
            </Menu.Item>
            <Menu.Item key="9">
                <Link to='/dashboard/translations'>
                    <TranslationOutlined />
                    <FormattedMessage id='translation' />
                </Link>
            </Menu.Item>
        </Menu>
    )
}

export default DashboardMenu