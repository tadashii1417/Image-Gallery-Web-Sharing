import React from 'react';
import './style/materialize.min.css';
import './style/materialize-social.css';
import './style/App.css';
import './style/indexMedia.css';
import { Route, Switch } from 'react-router-dom';
import Homepage from './containers/Homepage/Homepage';

function App() {
  return (
    <Switch>
      <Route path="/" component={Homepage} exact />
    </Switch>
  );
}

export default App;
