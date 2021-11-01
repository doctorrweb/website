import React from 'react'

const ModalPostFormProvider = React.createContext(false)
const ModalProjectFormProvider = React.createContext(false)
const ModalClientFormProvider = React.createContext(false)
const ModalTutorialFormProvider = React.createContext(false)
const ModalUserFormProvider = React.createContext(false)
const ModalTranslationFormProvider = React.createContext(false)
const ModalImageFormProvider = React.createContext(false)
const ModalVideoFormProvider = React.createContext(false)

// You can also import and use it like that

export { 
    ModalPostFormProvider,
    ModalProjectFormProvider,
    ModalClientFormProvider,
    ModalTutorialFormProvider,
    ModalTranslationFormProvider,
    ModalUserFormProvider,
    ModalImageFormProvider,
    ModalVideoFormProvider
}