import React from 'react'
import { useSelector } from 'react-redux'
import { IntlProvider } from 'react-intl'
import { Layout } from 'antd'
import { Switch, Route, Router, useHistory } from 'react-router-dom'
import NavBar from './navBar'
import About from './about'
import Work from '../component/work/work'
import Blog from '../component/blog/blog'
import Tutorial from '../component/tutos_front/tutorial'
import Contact from './contact'
import Dashboard from './dashboard'
import CustomFooter from './customFooter'
import MainMenu from '../component/mainMenu'
import NotFound from './notFound'
import Home from './home'
import en from '../translation/en.json'
import fr from '../translation/fr.json'
import de from '../translation/de.json'
import '../main.css'

const { Header } = Layout

const App = () => {
    
    const history = useHistory()
    const lang = useSelector(state => state.locale.lang)

    return (
        <IntlProvider locale={lang} messages={
            lang === 'fr' ? fr
                : lang === 'de' ? de
                    : en
        }>
            <Layout>
                <Header
                    style={{
                        position: 'fixed',
                        zIndex: 1,
                        minHeight: '100px',
                        padding: '18px 50px',
                        width: '100%',
                        background: '#000000',
                    }}
                >
                    <NavBar />
                </Header>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/work">
                            <Work />
                        </Route>
                        <Route path="/blog">
                            <Blog />
                        </Route>
                        <Route path="/tutorial">
                            <Tutorial />
                        </Route>
                        <Route path="/contact">
                            <Contact />
                        </Route>
                        <Route path="/dashboard">
                            <Dashboard />
                        </Route>
                        <Route>
                            <NotFound />
                        </Route>
                    </Switch>
                </Router>
                <MainMenu />
                <CustomFooter />
            </Layout>
        </IntlProvider>
    )
}

export default App