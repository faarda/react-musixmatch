import React from 'react'
import { connect } from 'react-redux'
import actions from '../store/actionTypes'

import Header from '../components/Header'

function Playlist(props) {
    const {playlist, currentlyPlaying} = props

    return (
        <div>
            <Header />
            <main className="mm-main">
                {playlist.map(song => <h1>{song.title}</h1>)}
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
        play: (id) => dispatch({ type: actions.PLAY, payload: {id}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)
