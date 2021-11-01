import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import { showMainMenu } from '../action'


const MenuIcon = () => {
    const menuVisibility = useSelector(state => state.mainMenu.menuVisibility)
    const toggle = useSelector(state => state.mainMenu.toggleIcon)

    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(showMainMenu(!menuVisibility))
        dispatch(showMainMenu(!toggle))
    }

    return <Button style={{ fontSize: '2.5em', height: '2em' }} type='link' onClick={() => handleClick()} icon={<MenuOutlined />} size='large' />
}

export default MenuIcon