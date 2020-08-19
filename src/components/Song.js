import React from 'react'
import { PlayCircle, BarChart2} from 'react-feather'
import { useDispatch } from 'react-redux'
import actions from '../store/actionTypes'

function Song({song, songId}) {
    const dispatch = useDispatch();

    const showPlayer = () => {
        dispatch({type: actions.SET_SHOWING, payload: 'player'})
    }

    const playSong = () => {
        dispatch({type: actions.PLAY, payload: { id: songId } });
        showPlayer();
    }

    return (
        <li className="mm-playlist__song" onClick={song.isPlaying ? showPlayer : playSong}>
            <div className="mm-playlist__song__info">
                <h4>{song.title}</h4>
                <span>{song.artiste}</span>
            </div>
            <button className="mm-playlist__song__action">
                {
                    song.isPlaying ?
                    <BarChart2 className="feather" /> :
                    <PlayCircle className="feather" />
                }
            </button>
        </li>
    )
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         showPlayer: () => dispatch({type: actions.SET_SHOWING, payload: 'player'}),
//         playSong: (id) => dispatch({type: actions.PLAY, payload: { id } })
//     }
// }

export default Song
