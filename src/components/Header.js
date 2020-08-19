import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import {List, ArrowLeft} from 'react-feather'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../store/actionTypes'

function Header({song = {}, children}) {
    const showing = useSelector(state => state.showing);
    const dispatch = useDispatch();
    let isPlaylist = showing === 'playlist';

    const location = useLocation();
    const isPlayer = location.pathname === '/';

    return (
        <header className="mm-header">
            {
                isPlayer ? 
                <>
                    <div className="mm-header__left">
                        { isPlaylist && (
                            <>
                                <button className="mm-header__back" onClick={() => dispatch({type: actions.SET_SHOWING, payload: 'player' })}>
                                    <ArrowLeft />
                                </button> 
                                <div className="mm-header__title">
                                    <h4>Playlist</h4>
                                </div> 
                            </>
                        )}

                        {!isPlaylist && (
                            <div className="mm-header__title">
                                <h4>{song.title}</h4>
                                <span>{song.artiste}</span>
                            </div>
                            )}
                    </div>
                    <button onClick={() => dispatch({type: actions.SET_SHOWING, payload: 'playlist' })} className="mm-header__right">
                        <List className={isPlaylist ? 'active' : null} /> 
                    </button>
                </>
                : children
            }
        </header>
    )
}

export default Header
