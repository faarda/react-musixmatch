import React, { useEffect } from 'react'
import axios from 'axios'

function Lyrics(props) {
    useEffect(() => {
        axios.get('https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.richsync.get?track_id=114837357&format=json&apikey=f2019d85920b9a9aeda3681a1b089f53')
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    });

    return (
        <div className="mm-lyrics">
            <span className="mm-lyrics__text">
                She got the, mm, brown eyes, caramel thighs
            </span>
        </div>
    )
}

export default Lyrics
