import React, { useEffect } from 'react'
import createState from '../hooks/createState'
import { Play, Pause, SkipBack, SkipForward } from 'react-feather';
import { getSrc, formatTime} from './PlayerFunctions'

function SongPlayer({song, statePlay, statePause, songId, prev, next, setPlayer}) {
    const [state, setState] = createState({
        duration: 0,
        currentTime: song.pausedAt || 0,
        progress: 0,
        src: "",
        audio: null,
        isPlaying: song.isPlaying
    });

    useEffect(() => {
        const src = getSrc(song.title);
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

            if(song.isPlaying){
                audio.play();
                setPlayer(audio);
            }

        }); 

        audio.addEventListener('timeupdate', e => {
            const currentTime = e.path[0].currentTime;
            const duration = e.path[0].duration;
            const progress = (currentTime/duration)*100;

            setState.currentTime(currentTime);
            setState.progress(progress);
        });

        audio.addEventListener('ended', e  => {
            setState.isPlaying(false);
            goNext();
        });

        return () => {
            audio.removeEventListener('timeupdate', () => {});
            audio.removeEventListener('loadedmetadata', () => {});
        }
    }, [song]);

    useEffect(() => {
        // hack to see if playPause has been called
        let run = false;
        if(state.audio){ //check if theres an audio on the state
            document.body.addEventListener('keyup', (e) => {
                //figure out why event is called multiple times and why the state is different at each point
                if(e.keyCode === 32 && state.audio && !run){
                    playPause()
                    run = true;
                }
            });
        }
        
        return () => {
            document.body.removeEventListener('keyup', () => {});
        }
    }, [state])

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
            setPlayer(state.audio);
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
            playPause();
        }

        prev();
    }

    const goNext = () => {
        if(state.isPlaying){
            playPause();
        }

        next();
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
