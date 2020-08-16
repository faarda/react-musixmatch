import { createStore } from 'redux'
import playlistReducer from './playlist/reducer'

console.log(playlistReducer)

const store = createStore(playlistReducer);

export default store;