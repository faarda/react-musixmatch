import React from 'react'
import { connect } from 'react-redux'
import actions from '../store/actionTypes'

import Header from '../components/Header'
import Song from '../components/Song'

function Playlist(props) {
    const {playlist, currentlyPlaying, showing} = props

    return (
        <div style={{display: showing ? 'block' : 'none'}}>
            <Header />
            <main className="mm-main">
                <ul className="mm-playlist">
                    {playlist.map(song => <Song song={song} key={song.title} />)}
                </ul>
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
