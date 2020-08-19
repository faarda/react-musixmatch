export default {
    setLyrics: (state, {id, lyrics}) => {
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
        })
        // console.log(id);
        
        return {...state, playlist: newPlaylist, currentlyPlaying: id};
    },
    setShowing: (state, payload) => {
        return {...state, showing: payload};
    },
    setAudio: (state, {id, audio}) => {
        const playlist = state.playlist;

        playlist[id].audio = audio;

        return {...state, playlist};
    },
    setPausedAt: (state, {id, time}) => {
        const playlist = state.playlist;

        playlist[id].pausedAt = time;

        return {...state, playlist};
    }
}