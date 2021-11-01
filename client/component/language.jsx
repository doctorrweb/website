import React from 'react'
import { message, Tooltip, Divider, Button, Col } from 'antd'
import { useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import { setLocale } from '../action'
import moment from 'moment'

message.config({
    top: 120
})

const Language = () => {

    const dispatch = useDispatch()
    const intl = useIntl()

    const ChangeLanguage = lang => {
        switch (lang) {
        case 'en':
            moment.locale('en')
            return (
                message.success('Your Current Language is English', 2.5)
                    .then(dispatch(setLocale('en')))
            )
                
        case 'fr':
            moment.locale('fr')
            return (
                message.success('Votre Langue actuelle est le Français', 2.5)
                    .then(dispatch(setLocale('fr')))
            )

        case 'de':
            moment.locale('de')
            return (
                message.success('Ihre aktuelle Sprache ist Deutsch', 2.5)
                    .then(dispatch(setLocale('de')))
            )

        default:
            return 'unknown language'
        }
    }

    return (
        <Col style={{ marginBottom: '1em' }} >
            <Tooltip placement="bottom" title={intl.formatMessage({id: 'lang-en'})}>
                <Button onClick={() => ChangeLanguage('en')} size="small"><img src="/img/lang-en.png" width="20" /></Button>
            </Tooltip>
            <Divider type="vertical" />
            <Tooltip placement="bottom" title={intl.formatMessage({id: 'lang-fr'})}>
                <Button onClick={() => ChangeLanguage('fr')} size="small"><img src="/img/lang-fr.png" width="20" /></Button>
            </Tooltip>
            {/* <Divider type="vertical" />
            <Tooltip placement="bottom" title={intl.formatMessage({id: 'lang-de'})}>
                <Button onClick={() => ChangeLanguage('de')} size="small"><img src="/img/lang-de.png" width="20" /></Button>
            </Tooltip> */}
        </Col>
    )
}

export default Language