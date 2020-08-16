import Playlist from './pages/Playlist'
import Player from './pages/Player'
import NotFound from './pages/NotFound'

const routes = [
    {
        name: 'playlist',
        component: Playlist,
        path: '/playlist'
    },
    {
        name: 'player',
        component: Player,
        path: '/'
    },
    {
        name: 'not-found',
        component: NotFound,
    }
]

export default routes