import React from 'react'
import { connect } from 'react-redux'
import actions from '../store/actionTypes'
import Header from '../components/Header'
import SongPlayer from '../components/SongPlayer'
import Lyrics from '../components/Lyrics'
import createState from '../hooks/createState'


function Player({playlist, currentlyPlaying, play, pause, showing}) {
    let playingNow = currentlyPlaying || 0;
    const [state, setState] = createState({
        playingNow,
        song: playlist[playingNow]
    });

    const next = () => {
        const nextSongId = state.playingNow < playlist.length - 1 ? state.playingNow + 1 : 0;

        setState.playingNow(nextSongId);
        play(nextSongId);

         // brute force isPlaying true
        setState.song({...playlist[nextSongId], isPlaying: true});
    }

    const prev = () => {
        const prevSongId = state.playingNow === 0  ? playlist.length - 1 : state.playingNow - 1;

        setState.playingNow(prevSongId);
        play(prevSongId);

        // brute force isPlaying true
        setState.song({...playlist[prevSongId], isPlaying: true});

        // return playlist[prevSongId];
    }

    return (
        <div style={{display: showing ? 'block' : 'none'}}>
            <Header song={state.song} />
            <main className="mm-main">
                <Lyrics />
                <SongPlayer song={state.song} statePlay={play} statePause={pause} songId={state.playingNow} prev={prev} next={next} />
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
        pause: (id) => dispatch({ type: actions.PAUSE, payload: {id}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
