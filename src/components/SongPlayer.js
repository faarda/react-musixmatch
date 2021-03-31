import React, { useEffect } from "react";
import createState from "../hooks/createState";
import { Play, Pause, SkipBack, SkipForward } from "react-feather";
import { getSrc, formatTime } from "./PlayerFunctions";

function SongPlayer({
  song,
  storePlay,
  storePause,
  songId,
  prev,
  next,
  setAudio,
  setPausedAt,
  updateCurrentTime,
  updateLoading,
}) {
  const [state, setState] = createState({
    duration: 0,
    currentTime: song.pausedAt || 0,
    audio: song.audio,
    isPlaying: song.isPlaying,
  });

  useEffect(() => {
    let audio, duration;

    //retrieve audio from state if it exists else create a new instance
    if (song.audio) {
      audio = song.audio;
      duration = audio.duration;

      setState.duration(duration);
      setState.audio(audio);

      if (song.pausedAt > 0) {
        // setState.currentTime(song.currentTime)
        audio.currentTime = song.pausedAt;
      } else {
        audio.currentTime = 0;
      }

      if (song.isPlaying) {
        audio.play();
      }

      updateLoading();
    } else {
      const src = getSrc(song.title);
      audio = new Audio(`/songs/${src}`);

      audio.addEventListener("loadedmetadata", (e) => {
        duration = e.explicitOriginalTarget.duration;

        setState.duration(duration);
        setState.audio(audio);

        // caching audio in state because of size
        setAudio(songId, audio);

        if (song.isPlaying) {
          audio.play();
        }

        updateLoading();
      });
    }

    audio.addEventListener("timeupdate", (e) => {
      const currentTime = e.explicitOriginalTarget.currentTime;

      setState.currentTime(currentTime);
      updateCurrentTime(currentTime);
    });

    audio.addEventListener("ended", (e) => {
      next();
    });

    audio.addEventListener("pause", (e) => {
      setState.isPlaying(false);
    });

    audio.addEventListener("play", (e) => {
      setState.isPlaying(true);
    });

    return () => {
      audio.removeEventListener("timeupdate", () => {});
      audio.removeEventListener("loadedmetadata", () => {});
      audio.removeEventListener("pause", () => {});
      audio.removeEventListener("play", () => {});
      audio.removeEventListener("ended", () => {});
    };
  }, [song]);

  useEffect(() => {
    // Handles the spacebar key press

    let run = false; // hack to see if playPause has been called
    if (state.audio) {
      document.body.addEventListener("keyup", (e) => {
        //figure out why event is called multiple times and why the state is different at each point
        if (e.keyCode === 32 && state.audio && !run) {
          playPause();
          run = true;
        }
      });
    }

    return () => {
      document.body.removeEventListener("keyup", () => {});
    };
  }, [state]);

  const playPause = () => {
    if (state.isPlaying) {
      storePause(songId);
      state.audio.pause();

      setPausedAt(songId, state.currentTime);
    } else {
      storePlay(songId);
      state.audio.play();
      // setPlayer(state.audio);
    }
  };

  const updateProgress = (e) => {
    const target = e.currentTarget;
    const offset = target.getBoundingClientRect();
    const x = e.pageX - offset.left;

    state.audio.currentTime =
      (parseFloat(x) / parseFloat(target.offsetWidth)) * state.duration;
  };

  // const goPrev = () => {
  //     if(state.isPlaying){
  //         playPause();
  //     }

  //     prev();
  // }

  // const goNext = () => {
  //     if(state.isPlaying){
  //         playPause();
  //     }

  //     next();
  // }

  return (
    <div className="mm-player">
      <div className="mm-player__indicator">
        <div
          className="mm-player__indicator__progress"
          onClick={updateProgress}
        >
          <div
            className="mm-player__indicator__progress__inner"
            style={{ width: `${(state.currentTime / state.duration) * 100}%` }}
          ></div>
        </div>
        <div className="mm-player__indicator__time">
          <span>{formatTime(state.currentTime)}</span>
          <span>{formatTime(state.duration)}</span>
        </div>
      </div>
      <div className="mm-player__controls">
        <button
          className="mm-player__controls__prev-next"
          onClick={() => prev()}
        >
          <SkipBack />
        </button>
        <button
          className="mm-player__controls__play-pause"
          onClick={() => playPause()}
        >
          {state.isPlaying ? <Pause /> : <Play />}
        </button>
        <button
          className="mm-player__controls__prev-next"
          onClick={() => next()}
        >
          <SkipForward />
        </button>
      </div>
    </div>
  );
}

export default SongPlayer;
