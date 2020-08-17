import React, { useEffect } from 'react';
import "./styles/styles.scss";
import { useSelector, useDispatch } from 'react-redux'
import actions from './store/playlist/actions'
import Player from './pages/Player'
import Playlist from './pages/Playlist'


function App(props) {
  const playlist = useSelector(state => {return {playlist: state.playlist, showing: state.showing}});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchIds(playlist.playlist));
  }, []);

  return (
      <div className="App">
        <Player showing={playlist.showing === 'player'} />
        <Playlist showing={playlist.showing === 'playlist'} />
      </div>
  );
}


export default App;
