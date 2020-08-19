import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import actions from '../../store/actionTypes'
import Header from '../../components/Header'
import SongPlayer from '../../components/SongPlayer'
import Lyrics from '../../components/Lyrics'
import createState from '../../hooks/createState'


function Player({playlist, currentlyPlaying, play, pause, showing, setAudio, setPausedAt}) {  
    const [state, setState] = createState({
        playingNow: currentlyPlaying,
        song: playlist[currentlyPlaying],
        currentTime: 0
    });

    useEffect(() => {
        setState.playingNow(currentlyPlaying);
        setState.song(playlist[currentlyPlaying]);

        // pause every other song when currentlyPlaying is changed
        playlist.forEach((song, id) => {
            if(song.audio && currentlyPlaying !== id){
                song.audio.pause();
            }
        })

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
        <div style={{display: showing ? 'block' : 'none', height: '100%'}}>
            <Header song={state.song} />
            <main className="mm-main">
                <Lyrics currentTime={state.currentTime} song={state.song} songId={state.playingNow} />
                <SongPlayer song={state.song} storePlay={play} storePause={pause} songId={state.playingNow} setAudio={setAudio} setPausedAt={setPausedAt} prev={prev} next={next} updateCurrentTime={(time) => setState.currentTime(time)} />
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
        setAudio: (id, audio) => dispatch({ type: actions.SET_AUDIO, payload: {id, audio}}),
        setPausedAt: (id, time) => dispatch({type: actions.SET_PAUSED_AT, payload: {id, time}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
