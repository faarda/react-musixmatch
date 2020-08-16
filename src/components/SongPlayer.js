import React, { useEffect } from 'react'

function SongPlayer() {
    useEffect(() => {
        window.feather.replace();
    }, []);


    return (
        <div className="mm-player">
            <div className="mm-player__indicator">
                <div className="mm-player__indicator__progress">
                    <div className="mm-player__indicator__progress__inner" style={{width: '40%'}}></div>
                </div>
                <div className="mm-player__indicator__time">
                    <span>0:00</span>
                    <span>4:12</span>
                </div>
            </div>
            <div className="mm-player__controls">
                <button className="mm-player__controls__prev-next">
                    <span data-feather="skip-back"></span>
                </button>
                <button className="mm-player__controls__play-pause">
                    <span data-feather="play"></span>
                </button>
                <button className="mm-player__controls__prev-next">
                    <span data-feather="skip-forward"></span>
                </button>
            </div>
        </div>
    )
}

export default SongPlayer
