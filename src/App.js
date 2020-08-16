import React, { useEffect } from 'react';
import "./styles/styles.scss";
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from './router'


function App(props) {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            {routes.map(route => route.path ? 
            <Route path={route.path} exact={true} key={route.name} component={route.component} /> 
            : <Route key={route.name} component={route.component} />)}
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}


export default App;
