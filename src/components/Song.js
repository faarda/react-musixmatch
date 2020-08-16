import React from 'react'

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
                    <span data-feather="bar-chart-2"></span> :
                    <span data-feather="play-circle"></span>
                }
            </button>
        </li>
    )
}

export default Song
