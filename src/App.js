import React, { useEffect } from 'react';
import "./styles/styles.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from './router'
import { useSelector, useDispatch } from 'react-redux'
import actions from './store/playlist/actions'


function App(props) {
  const playlist = useSelector(state => state.playlist);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchIds(playlist));
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          {routes.map(route => route.path ? 
          <Route path={route.path} exact={true} key={route.name} component={route.component} /> 
          : <Route key={route.name} component={route.component} />)}
        </Switch>
      </div>
    </Router>
  );
}


export default App;
