import React from 'react'
import { useHistory } from 'react-router-dom'
import { FormattedMessage, useIntl } from 'react-intl'
import { Result, Button, Layout, Typography, Row } from 'antd'

const { Content } = Layout
const { Title, Text } = Typography

const NotFound = () => {

    const intl = useIntl()
    const history = useHistory()


    return (
        <Layout
            style={{ margin: '15% 10% 10%' }}
        >
            <Content
                style={{
                    marginRight: '2%',
                }}
            >
                <Row justify="center" align="middle">
                    <Result
                        status="error"
                        title={<Title level={2}>404: {intl.formatMessage({ id: 'page-not-found' })}</Title>}
                        subTitle={<Text>{intl.formatMessage({ id: '404' })}</Text>}
                        extra={
                            <Button 
                                onClick={() => history.push('/')} 
                                type="danger">
                                <FormattedMessage id="back-home" />
                            </Button>
                        }
                    />
                </Row>
            </Content>
        </Layout>
    )
}

export default NotFound