import React, { useEffect } from 'react'
import { getSrc, formatTime} from './PlayerFunctions'
import { Pause, Play } from 'react-feather'

function MiniPlayer({state, setState}) {

    const playPause = () => {
        if(state.audio){
            if(state.isPlaying){
                state.audio.pause();
            }else{
                state.audio.play();
            }
        }
    }

    useEffect(() => {
        const src = getSrc(state.song.title);
        const audio = new Audio(`/songs/${src}`);

        audio.addEventListener('loadedmetadata', e => {
            // const duration = e.path[0].duration;
            const duration = audio.duration
            // const currentTime = e.path[0].currentTime;

            // setState.currentTime(currentTime);
            setState.duration(duration);
            setState.audio(audio);
        })

        audio.addEventListener('timeupdate', e => {
            // const currentTime = e.path[0].currentTime;
            const currentTime = audio.currentTime

            setState.currentTime(currentTime);
        })

        audio.addEventListener('pause', e => {
            setState.isPlaying(false);
        })

        audio.addEventListener('play', e => {
            setState.isPlaying(true);
        })

        audio.addEventListener('ended', e => {
            setState.ended(true);
        });

        return () => {
            audio.removeEventListener('timeupdate', () => {});
            audio.removeEventListener('loadedmetadata', () => {});
            audio.removeEventListener('pause', () => {});
            audio.removeEventListener('play', () => {});
            audio.removeEventListener('ended', () => {});
        }
    }, [])


    return (
        <div className="mm-player">
            <div className="mm-player__indicator">
                <div className="mm-player__indicator__progress">
                    <div className="mm-player__indicator__progress__inner" style={{width: `${(state.currentTime/state.duration) * 100}%`}}></div>
                </div>
                <div className="mm-player__indicator__time">
                    <span>{formatTime(state.currentTime)}</span>
                    <span>{formatTime(state.duration)}</span>
                </div>
            </div>
            <div className="mm-player__controls" style={{justifyContent: 'center', marginTop: '1rem'}}>
                <button className="mm-player__controls__play-pause" onClick={() => playPause()}>
                    {state.isPlaying ? <Pause /> : <Play /> }  
                </button>
            </div>
        </div>
    )
}

export default MiniPlayer
