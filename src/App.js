import React from 'react';
import "./styles/styles.scss";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import routes from "./router";
import AppInfo from './pages/AppInfo';


function App(props) {
  const shownInfo = localStorage.getItem('shown-info') !== null;
  return (
    <Router>
      <div className="App">
        <Switch>
          { routes.map(route => route.path ? 
          <Route path={route.path} component={route.component} key={route.name} exact /> : 
          <Route component={route.component} key={route.name} />)}
        </Switch>
        {
          !shownInfo ? <AppInfo /> : null
        }
      </div>
    </Router>
    // <h1>Hello</h1>
  );
}


export default App;
