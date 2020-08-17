import React from 'react'
import { PlayCircle, BarChart2} from 'react-feather'

function Song({song}) {
    return (
        <li className="mm-playlist__song">
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

export default Song
