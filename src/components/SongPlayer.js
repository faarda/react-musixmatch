import React, { useEffect } from 'react'
import createState from '../hooks/createState'
import { Play, Pause, SkipBack, SkipForward } from 'react-feather';

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

function SongPlayer({song, statePlay, statePause, songId, prev, next}) {
    const [state, setState] = createState({
        duration: 0,
        currentTime: song.pausedAt || 0,
        progress: 0,
        src: "",
        audio: null,
        isPlaying: song.isPlaying
    });

    useEffect(() => {
        // console.log(state)
        // console.log('ran')
        // console.log(songId)
        // console.log(song)
        if(!state.isPlaying){
            const src = getSrc(song.title);
            // console.log(src)
            const audio = new Audio(`/songs/${src}`);
    
            audio.addEventListener('loadedmetadata', e => {
                const duration = e.path[0].duration;
                const currentTime = e.path[0].currentTime;
                const progress = (currentTime/duration)*100;
    
                setState.currentTime(currentTime);
                setState.duration(duration);
                setState.progress(progress);
                setState.audio(audio);
                setState.src(src);
                setState.isPlaying(song.isPlaying);
    
                // console.log(song);
    
                if(song.isPlaying){
                    audio.play();
                }
            }); 
    
            audio.addEventListener('timeupdate', e => {
                const currentTime = e.path[0].currentTime;
                const duration = e.path[0].duration;
                const progress = (currentTime/duration)*100;
    
                setState.currentTime(currentTime);
                setState.progress(progress);
            });
    
            return () => {
                audio.removeEventListener('timeupdate', () => {});
                audio.removeEventListener('loadedmetadata', () => {});
            }
        }
    }, [songId]);

    const playPause = (id = songId) => {
        // console.log(id);
        if(state.isPlaying){
            state.audio.pause()
            setState.isPlaying(false)
            statePause(id)

            // todo: update pausedAt on state
        }else{
            state.audio.play()
            setState.isPlaying(true)
            statePlay(id)
        }
    }

    const updateProgress = (e) => {
        const target = e.currentTarget;
        const offset = target.getBoundingClientRect();
        const x = e.pageX - offset.left;

        state.audio.currentTime = ( parseFloat( x ) / parseFloat( target.offsetWidth) ) * state.duration;
    }

    const goPrev = () => {
        if(state.isPlaying){
            playPause(songId);
        }

        prev();
        // song = newSong;
    }

    const goNext = () => {
        if(state.isPlaying){
            playPause(songId);
            // console.log('ran x')
        }

        next();
        console.log('next ran')
        // song = newSong;
    }

    return (
        <div className="mm-player">
            <div className="mm-player__indicator">
                <div className="mm-player__indicator__progress" onClick={updateProgress}>
                    <div className="mm-player__indicator__progress__inner" style={{width: `${state.progress}%`}}></div>
                </div>
                <div className="mm-player__indicator__time">
                    <span>{formatTime(state.currentTime)}</span>
                    <span>{formatTime(state.duration)}</span>
                </div>
            </div>
            <div className="mm-player__controls">
                <button className="mm-player__controls__prev-next" onClick={() => goPrev()}>
                    <SkipBack />
                </button>
                <button className="mm-player__controls__play-pause" onClick={() => playPause()}>
                    {state.isPlaying ? <Pause /> : <Play /> }  
                </button>
                <button className="mm-player__controls__prev-next" onClick={() => goNext()}>
                    <SkipForward />
                </button>
            </div>
        </div>
    )
}

export default SongPlayer
