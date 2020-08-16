import { createStore, applyMiddleware} from 'redux'
import playlistReducer from './playlist/reducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

// console.log(playlistReducer)

const store = createStore(playlistReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;