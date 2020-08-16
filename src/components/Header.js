import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'

function Header() {
    let location = useLocation();
    console.log(location.pathname);
    
    return (
        <header className="mm-header">
            <div className="mm-header__left">
                <div className="mm-header__back">
                    <span data-feather="arrow-left"></span>
                </div>
                <div className="mm-header__title">
                    <h4>South of the border</h4>
                    <span>Ed Sheeran</span>
                </div>
            </div>
        </header>
    )
}

export default Header
