import React from 'react'
import { connect } from 'react-redux'
import actions from '../store/actionTypes'
import Header from '../components/Header'
import SongPlayer from '../components/SongPlayer'
import Lyrics from '../components/Lyrics'
import createState from '../hooks/createState'



function Player({playlist, currentlyPlaying}) {
    let playingNow = currentlyPlaying || 0;
    const [state, setState] = createState({
        playingNow,
        song: playlist[playingNow]
    });

    console.log(state)
    return (
        <div>
            <Header song={state.song} />
            <main className="mm-main">
                <Lyrics />
                <SongPlayer song={state.song} />
                {/* {JSON.stringify(props.playlist[0])} */}
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
