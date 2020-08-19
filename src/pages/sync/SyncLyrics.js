import React, { useEffect } from 'react'
import Header from '../../components/Header'
import { Link } from 'react-router-dom'
import { PlayCircle, ChevronDown, ChevronUp, Download, RefreshCcw, Radio } from 'react-feather'
import { useSelector } from 'react-redux'
import createState from '../../hooks/createState'
import MiniPlayer from '../../components/MiniPlayer'

function SyncLyrics({lyricsArray, songId, setSyncState}) {
    const song = useSelector(state => state.playlist[songId]);

    const [state, setState] = createState({
        currentLine: 0,
        syncedLyrics: [],
        startTime: 0,
        duration: 0,
        currentTime: 0,
        audio: null,
        isPlaying: song.isPlaying,
        song,
        at: 'start',
        countdown: 3,
        ended: false,
        downloaded: false
    });

    const nextLine = () => {
        const startTime = state.startTime;
        const endTime = state.currentTime;
        const lyricsText = lyricsArray[state.currentLine];
        setState.currentLine(state.currentLine + 1);
        
        const syncedLyrics = [...state.syncedLyrics, {start: startTime, end: endTime, lyrics: lyricsText}];
        setState.syncedLyrics(syncedLyrics);
        setState.startTime(endTime);
        console.log(syncedLyrics);
    }

    const prevLine = () => {
        if(state.currentLine > 0){
            const lyrics = state.syncedLyrics;
            const lastLyrics = lyrics.pop()
            setState.syncedLyrics(lyrics);
            
            //reverse audio here
            state.audio.currentTime = lastLyrics.start;
            setState.startTime(lastLyrics.start);
    
            setState.currentLine(state.currentLine - 1);
        }
    }

    const startCountDown = () => {
        let time = 3;
        const interval = setInterval(() => {
            time = time - 1;
            setState.countdown(time);

            if(time === 0){
                setState.at('sync');
                clearInterval(interval);
                state.audio.play();
            }
        }, 1000)   
    }

    useEffect(() => {
        if(state.audio){
            startCountDown();

            return () => {
                state.audio.pause();
                // setState.audio(null);
            }
        }

    }, [state.audio]);

    const saveLyrics = () => {
        //do something
        setState.at('end');
        const syncedLyrics = [...state.syncedLyrics, {start: state.startTime, end: state.duration, lyrics: lyricsArray[state.currentLine]}];
        setState.syncedLyrics(syncedLyrics);
    }

    const downloadFile = () => {
        const a = document.createElement("a"),
            fileName = `${song.title.split(" ").map(piece => piece.toLowerCase()).join("-")}.json`,
            json = JSON.stringify(state.syncedLyrics), 
            blob = new Blob([json], {type: "octet/stream"}), 
            url = window.URL.createObjectURL(blob); 
        
        document.body.appendChild(a); 
        a.style = "display: none"; 
        a.href = url; 
        a.download = fileName; 
        a.click(); 
        window.URL.revokeObjectURL(url); 
        setState.downloaded(true);
    }

    const startAgain = () => {
        const audio = state.audio;
        setState.currentLine(0);
        setState.syncedLyrics([]);
        setState.startTime(0);
        setState.currentTime(0);
        setState.isPlaying(false);
        setState.at('start');
        setState.countdown(3);
        setState.ended(false);
        setState.downloaded(false);
        startCountDown();
    }

    const newSong = () => {
        setSyncState.showing('add-lyrics');
    }

    return (
        <>
            <Header>
                <div className="mm-header__left">
                    <div className="mm-header__title">
                        <h4>Sync Lyrics</h4>
                    </div> 
                </div>
                <Link to='/' className='mm-header__right'>
                    <PlayCircle />
                </Link>
            </Header>
            <div className='mm-main'>
                <div className="mm-header__title">
                    <h5>{song.title}</h5>
                    <span>{song.artiste}</span>
                </div> 

                <div className="mm-lyrics mm-lyrics--light">
                    <span className="mm-lyrics__text">
                        {lyricsArray[state.currentLine]}
                    </span>
                </div>
                <div className='mm-form__action'>
                    <button disabled={state.currentLine === 0} className='mm-btn mm-btn--square' onClick={prevLine}>
                        <ChevronUp />
                    </button>
                    {
                        !state.ended ?
                        <button disabled={state.currentLine === lyricsArray.length - 1} className='mm-btn mm-btn--square mm-form__action__main' onClick={nextLine}>
                            <ChevronDown />
                        </button> :
                        <button className='mm-btn mm-btn--square mm-form__action__main' onClick={saveLyrics}>
                            Save
                        </button>
                    }
                </div>
                <MiniPlayer state={state} setState={setState} startCountDown={startCountDown} />
                <div className='mm-main__overlay' style={{display: state.at === 'start' ? 'flex' : 'none'}}>
                    {
                        state.duration < 0 ?
                        <p className='small-text'>
                            Loading Song...
                        </p> :
                        <h1>
                            {state.countdown}
                        </h1>
                    }
                </div>
                <div className='mm-main__overlay' style={{display: state.at === 'end' ? 'flex' : 'none'}}>
                    {
                        <>
                            {
                                !state.downloaded ?
                                <button className='mm-btn mm-btn--square' onClick={downloadFile}>
                                    Download lyrics as JSON <Download />
                                </button> :
                                <button className='mm-btn mm-btn--square' onClick={newSong}>
                                    Sync a new song <Radio />
                                </button> 
                            }
                            <p className='mt-1'>Or</p>
                            <button className='mm-btn mm-btn--square mt-1' onClick={startAgain}>
                                Sync Again <RefreshCcw />
                            </button>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default SyncLyrics
