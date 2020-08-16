import React from 'react'
import { connect } from 'react-redux'
import actions from '../store/actionTypes'

function Player(props) {
    return (
        <div>
            {JSON.stringify(props.playlist[0])}
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

export default connect(mapStateToProps, mapDispatchToProps)(Player)
