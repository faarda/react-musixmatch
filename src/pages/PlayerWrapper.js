import React from 'react'
import Player from './play/Player'
import Playlist from './play/Playlist'
import { useSelector} from 'react-redux'

function PlayerWrapper() {
    const playlist = useSelector(state => {return {playlist: state.playlist, showing: state.showing}});

    return (
        <>
            <Player showing={playlist.showing === 'player'} />
            <Playlist showing={playlist.showing === 'playlist'} />
        </>
    )
}

export default PlayerWrapper
