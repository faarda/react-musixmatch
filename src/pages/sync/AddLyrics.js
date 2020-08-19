import React from 'react'
import Header from '../../components/Header'
import { PlayCircle, ArrowRight } from 'react-feather'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function AddLyrics({syncState, setSyncState, formFilled, saveLyrics}) {
    const songs = useSelector(state => state.playlist.map(song => song.title));

    return (
        <div>
            <Header>
                <div className="mm-header__left">
                    <div className="mm-header__title">
                        <h4>Add Lyrics</h4>
                    </div> 
                </div>
                <Link to='/' className='mm-header__right'>
                    <PlayCircle />
                </Link>
            </Header>
            <div className='mm-main'>
                <form className='mm-form' onSubmit={saveLyrics}>
                    <p className='mm-info__banner'>
                        <span className='icon'>👌🏽</span>
                        Just copy the lyrics of the song you want to sync from Google
                    </p>
                    <div className='mm-form__group mt-1'>
                        <label className='mm-form__label'>Choose Song</label>
                        <select className='mm-form__input' value={syncState.songId} onChange={(e) => setSyncState.songId(e.target.value)}>
                            <option value=''>--- Select ---</option>
                            {
                                songs.map((song, id)=> <option key={id} value={id}>{song}</option>)
                            }
                        </select>
                    </div>
                    <div className='mm-form__group'>
                        <label className='mm-form__label'>Enter Lyrics</label>
                        <textarea className='mm-form__input' placeholder='Put lyrics here' value={syncState.rawLyrics} onChange={(e) => setSyncState.rawLyrics(e.target.value)}></textarea>
                    </div>
                    <button disabled={!formFilled} className='mm-btn mm-btn--square'>Proceed <ArrowRight className='next' /></button>
                </form>
            </div>
        </div>
    )
}

export default AddLyrics
