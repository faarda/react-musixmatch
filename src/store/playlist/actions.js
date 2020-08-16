import axios from 'axios'
import actionTypes from '../actionTypes'

export default {
    setLyrics: (state, {id, lyrics}) => {
        //do something with the lyrics
        const playlist = [...state.playlist];
        playlist[id].lyrics = lyrics;

        return {...state, playlist};
    },
    pause: (state, {id}) => {
        const playlist = [...state.playlist];

        playlist[id].isPlaying = false;

        return {...state, playlist};
    },
    play: (state, {id}) => {
        const playlist = [...state.playlist];

        const newPlaylist = playlist.map((song, index) => {
            if(index === id){
                return {...song, isPlaying: true}
            }else{
                return {...song, isPlaying: false}
            }
        });
        
        return {...state, playlist: newPlaylist, currentlyPlaying: id };
    },
    setId: (state, {id, musicMatchId}) => {
        const playlist = [...state.playlist];
        playlist[id].musicMatchId = musicMatchId;
        
        return {...state, playlist};
    },
    fetchIds: (playlist) => {
        return (dispatch) => {
            playlist.forEach((song, id) => {
                const url = encodeURI(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/matcher.track.get?format=json&q_artist=${song.artiste}&q_track=${song.title}&apikey=${process.env.REACT_APP_MUSIXMATCH_API_KEY}`)
                axios.get(url)
                    .then(res => {
                        const musicMatchId = res.data.message.body.track.track_id;
                        dispatch({
                            type: actionTypes.SET_ID,
                            payload: {id, musicMatchId}
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    })
            });
        }
    }
}