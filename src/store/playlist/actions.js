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
    }
}