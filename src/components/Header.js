import React, { useEffect } from 'react'
// import { useLocation, useHistory, Link } from 'react-router-dom'
import {List, ArrowLeft} from 'react-feather'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../store/actionTypes'

function Header({song = {}}) {
    const showing = useSelector(state => state.showing);
    const dispatch = useDispatch();
    let isPlaylist = showing == 'playlist';

    // const history = useHistory();

    return (
        <header className="mm-header">
            <div className="mm-header__left">
                { isPlaylist && (
                    <>
                        <button className="mm-header__back" onClick={() => dispatch({type: actions.SET_SHOWING, payload: 'player' })}>
                            {/* <span data-feather="arrow-left"></span> */}
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
                {/* <span data-feather="list" ></span> */}
                <List className={isPlaylist ? 'active' : null} /> 
            </button>
        </header>
    )
}

export default Header
