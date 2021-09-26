import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/home';

import './assets/css/bootstrap.min.css';
import './assets/css/flaticon.css';
import './assets/css/slicknav.css';
import './assets/css/animate.min.css';
import './assets/css/themify-icons.css';
import './assets/css/slick.css';
import './assets/css/nice-select.css';
import './assets/css/style.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;