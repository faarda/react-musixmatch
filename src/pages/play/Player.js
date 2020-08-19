import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import actions from '../../store/actionTypes'
import Header from '../../components/Header'
import SongPlayer from '../../components/SongPlayer'
import Lyrics from '../../components/Lyrics'
import createState from '../../hooks/createState'


function Player({playlist, currentlyPlaying, play, pause, showing, setPlayer}) {
    let playingNow = currentlyPlaying || 0;
    
    const [state, setState] = createState({
        playingNow,
        song: playlist[playingNow]
    });

    useEffect(() => {
        if(currentlyPlaying){
            setState.playingNow(currentlyPlaying);
            setState.song(playlist[currentlyPlaying]);
        }
    }, [currentlyPlaying])

    const next = () => {
        const nextSongId = state.playingNow < playlist.length - 1 ? state.playingNow + 1 : 0;
        play(nextSongId);
    }

    const prev = () => {
        const prevSongId = state.playingNow === 0  ? playlist.length - 1 : state.playingNow - 1;
        play(prevSongId);
    }

    return (
        <div style={{display: showing ? 'block' : 'none'}}>
            <Header song={state.song} />
            <main className="mm-main">
                <Lyrics />
                <SongPlayer song={state.song} statePlay={play} statePause={pause} songId={state.playingNow} setPlayer={setPlayer} prev={prev} next={next} />
            </main>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        playlist: state.playlist,
        currentlyPlaying: state.currentlyPlaying
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        play: (id) => dispatch({ type: actions.PLAY, payload: {id}}),
        pause: (id) => dispatch({ type: actions.PAUSE, payload: {id}}),
        setPlayer: (player) => dispatch({ type: actions.SET_PLAYER, payload: {player}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
