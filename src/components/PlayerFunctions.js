export const getSrc = (song) => {
    return `${song.split(" ").map(piece => piece.toLowerCase()).join("-")}.mp3`;
}

export const formatTime = (time) => {
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