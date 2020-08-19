import React from 'react'
import AddLyrics from './sync/AddLyrics'
import createState from '../hooks/createState'
import SyncLyrics from './sync/SyncLyrics';

function Syncer() {
    const [state, setState] = createState({
        songId: ``,
        rawLyrics: '',
        lyricsArray: [],
        syncedLyrics: null,
        showing: 'add-lyrics'
    });

    const saveLyrics = (e) => {
        e.preventDefault();

        if(state.songId && state.rawLyrics){
            setState.showing('sync-lyrics')
            const lyricsArray = ['...', ...state.rawLyrics.split('\n'), 'The end']
            setState.lyricsArray(lyricsArray);
        }
    }

    return (
        <div style={{height: '100%'}}>
            {
                state.showing === 'add-lyrics' ?
                <AddLyrics syncState={state} setSyncState={setState} formFilled={state.songId && state.rawLyrics} saveLyrics={saveLyrics}/> :
                <SyncLyrics lyricsArray={state.lyricsArray} songId={state.songId} setSyncState={setState} />
            }
        </div>
    )
}

export default Syncer
