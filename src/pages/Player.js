import React from 'react'
import { connect } from 'react-redux'
import actions from '../store/actionTypes'
import Header from '../components/Header'
import SongPlayer from '../components/SongPlayer'


function Player(props) {
    return (
        <div>
            <Header />
            <main className="mm-main">
                <div className="mm-lyrics">
                    <span className="mm-lyrics__text">
                        She got the, mm, brown eyes, caramel thighs
                    </span>
                </div>
                <SongPlayer />
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
        play: (id) => dispatch({ type: actions.PLAY, payload: {id}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
