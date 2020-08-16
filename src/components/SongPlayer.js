import React, { useEffect } from 'react'
import createState from '../hooks/createState'

const getSrc = (song) => {
    return `${song.split(" ").map(piece => piece.toLowerCase()).join("-")}.mp3`;
}

const formatTime = (time) => {
    let hours = 0,
    minutes = 0,
    seconds = 0,
    formattedSecs, formattedMins, formattedHrs;

    seconds = time;

    if (seconds >= 60) {
        minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        if (minutes >= 60) {
            hours = Math.floor(minutes / 60);
            minutes = Math.floor(minutes % 60);
        }
    }else{
        seconds = Math.floor(seconds);
    }

    formattedSecs = seconds < 10 ? '0' + seconds : seconds;
    formattedMins = minutes < 10 ? '0' + minutes : minutes;
    formattedHrs = hours < 10 ? '0' + hours : hours;

    if (hours > 0) {
        return `${formattedHrs}:${formattedMins}:${formattedSecs}`;
    } else {
        return `${formattedMins}:${formattedSecs}`;
    }
}

function SongPlayer({song}) {
    const [state, setState] = createState({
        duration: 0,
        currentTime: song.pausedAt || 0,
        progress: 0,
        src: "",
        audio: null
    });

    useEffect(() => {
        window.feather.replace();
    }, []);

    useEffect(() => {
        const src = getSrc(song.title);
        const audio = new Audio(`/songs/${src}`);

        audio.addEventListener('loadedmetadata', e => {
            const duration = e.path[0].duration;

            console.log(duration)
        }); 

        console.log(audio.duration);

        console.log(audio);


    }, [song]);

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
