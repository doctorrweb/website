import React from 'react'
import { Link } from 'react-router-dom'
import { ReactSVG } from 'react-svg'

const Logo = () => {
    return (
        <Link to="/">
            <ReactSVG
                src="img/logo-drwb.svg"
                beforeInjection={svg => {
                    svg.classList.add('svg-logoDrwb')
                    svg.setAttribute('style', 'width: 200px')
                    
                }}
            />
        </Link>
    )
}

export default Logo