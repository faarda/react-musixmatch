import React, { useEffect } from 'react'
import { useLocation, useHistory, Link } from 'react-router-dom'

function Header() {
    let location = useLocation();
    const path = location.pathname;
    let isPlaylist = path == '/playlist';
    const history = useHistory();

    useEffect(() => {
        window.feather.replace();
    }, []);

    return (
        <header className="mm-header">
            <div className="mm-header__left">
                { isPlaylist && (
                    <>
                        <button className="mm-header__back" onClick={() => history.goBack()}>
                            <span data-feather="arrow-left"></span>
                        </button> 
                        <div className="mm-header__title">
                            <h4>Playlist</h4>
                        </div> 
                    </>
                )}

                {!isPlaylist && (
                    <div className="mm-header__title">
                        <h4>South of the border</h4>
                        <span>Ed Sheeran</span>
                    </div>
                    )}
            </div>
            <Link to='/playlist' className="mm-header__right">
                <span data-feather="list" className={isPlaylist ? 'active' : null}></span> 
            </Link>
        </header>
    )
}

export default Header
