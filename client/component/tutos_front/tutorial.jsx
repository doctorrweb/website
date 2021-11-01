import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'
import TutoList from './tutoList'
import TutoItem from './tutoItem'
import TutoPost from './tutoPost'

const Tutorial = () => {
    return (
        <Layout
            style={{
                margin: '15% 10% 10%',
            }}
        >
            <Switch>
                <Route path="/tutorial/:id/:postId">
                    <TutoPost />
                </Route>
                <Route path="/tutorial/:id">
                    <TutoItem />
                </Route>
                <Route path="/tutorial">
                    <TutoList />
                </Route>
            </Switch>
        </Layout>
    )
}

export default Tutorial
