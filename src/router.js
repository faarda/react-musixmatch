import PlayerWrapper from "./pages/PlayerWrapper";
import Syncer from "./pages/Syncer";
import NotFound from "./pages/NotFound";

// import moduleName from 'module'
export default [
    {
        path: '/',
        component: PlayerWrapper,
        name: 'player'
    },
    {
        path: '/sync',
        component: Syncer,
        name: 'sync'
    },
    {
        component: NotFound,
        path: null,
        name: 'not-found'
    }
]