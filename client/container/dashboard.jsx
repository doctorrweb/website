import React from 'react'
import { Layout } from 'antd'
import { Switch, Router, Route, useHistory } from 'react-router-dom'
import DashboardMenu from '../component/dashboard/dashboardMenu'
import DashboardPost from '../component/post/dashboardPost'
import DashboardProject from '../component/project/dashboardProject'
import DashboardClient from '../component/client/dashboardClient'
import DashboardTutorial from '../component/tutorial/dashboardTutorial'
import DashboardImage from '../component/image/dashboardImage'
import DashboardVideo from '../component/video/dashboardVideo'
import DashboardTranslation from '../component/translation/dashboardTranslations'
import DashboardUser from '../component/user/dashboardUser'

const { Sider, Content } = Layout

const Dashboard = () => {
    const history = useHistory()

    return (
        <Layout style={{
            margin: '10em 5em 5em'
        }}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                style={{
                    padding: '1em',
                    backgroundColor: 'transparent',
                    borderRight: '1px solid #fff'
                }}
            >
                <DashboardMenu />
            </Sider>
            <Content style={{ margin: '24px 16px 0' }}>
                <Router history={history}>
                    <Switch>
                        <Route exact path='/dashboard/posts'>
                            <DashboardPost />
                        </Route>
                        <Route exact path='/dashboard/projects'>
                            <DashboardProject />
                        </Route>
                        <Route exact path='/dashboard/clients'>
                            <DashboardClient />
                        </Route>
                        <Route exact path='/dashboard/tutorials'>
                            <DashboardTutorial />
                        </Route>
                        <Route exact path='/dashboard/images'>
                            <DashboardImage />
                        </Route>
                        <Route exact path='/dashboard/videos'>
                            <DashboardVideo />
                        </Route>
                        <Route exact path='/dashboard/users'>
                            <DashboardUser />
                        </Route>
                        <Route exact path='/dashboard/translations'>
                            <DashboardTranslation />
                        </Route>
                    </Switch>
                </Router>
            </Content>
        </Layout>
    )
}

export default Dashboard