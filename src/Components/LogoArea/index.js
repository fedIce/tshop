import React from 'react'
import { Link } from 'react-router-dom'

const LogoArea = () => {
    return (
        <Link to="/home">
            <div className='w-12 h-12'>
                <img src="https://uploads.turbologo.com/uploads/design/hq_preview_image/326988/draw_svg20210825-20053-13we3m9.svg.png" className='w-full h-full rounded-full aspect-square' />
            </div>
        </Link>
    )
}

export default LogoArea