import React, { useEffect } from 'react'
import axios from 'axios'
import createState from '../hooks/createState';
import {useDispatch } from 'react-redux'
import actions from '../store/actionTypes'
import { ExternalLink } from 'react-feather'
import { Link } from 'react-router-dom'

function Lyrics({song, currentTime, songId}) {
    const dispatch = useDispatch();
    let lyrics = song.lyrics;

    const [state, setState] = createState({
        lyrics: lyrics,
        currentLine: 0,
        loading: true,
        error: false
    })

    useEffect(() => {
        if(lyrics.length < 1){
            const url = `/lyrics/${song.title.split(" ").map(piece => piece.toLowerCase()).join("-")}.json`
            axios.get(url)
                .then(res => {
                    lyrics = res.data;
                    setState.lyrics(lyrics);
                    dispatch({type: actions.SET_LYRICS, payload: {id: songId, lyrics}})
                })
                .catch(err => {
                    setState.error(true)
                })
                .finally(() => {
                    setState.loading(false);
                })
        }else{
            setState.lyrics(lyrics);
        }

        setState.currentLine(0);
    }, [song]);

    useEffect(() => {
        if(state.lyrics.length > 0){
            let currentLine = state.lyrics.findIndex(lyrics => currentTime >= lyrics.start && currentTime < lyrics.end);
            //fix last second error
            if(currentLine === -1){
                currentLine = state.lyrics.length - 1;
            }

            setState.currentLine(currentLine);
            // console.log(currentLine, currentTime)
        }
    }, [currentTime])

    return (
        <div className="mm-lyrics">
            <p className='mm-lyrics__banner'>
                <Link to='/sync' className='link link--light ml-1'>Sync Lyrics</Link>
                <a href='https://github.com/faarda/react-musixmatch' className='link link--light ml-1' target='_blank'>Github <ExternalLink size={12} /></a>
            </p>
            {
                state.loading ? 
                <p>Loading...</p> : (
                    state.error ?
                    <p>Something went wrong</p> :
                    <span className="mm-lyrics__text">
                        {state.lyrics[state.currentLine].lyrics}
                    </span>
                )
            }
        </div>
    )
}

export default Lyrics
