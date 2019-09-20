import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Main from './Main/Main'
import Stream from './Stream/Stream'
import Topic from './Topic/Topic'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/stream" component={Stream} />
          <Route path="/topic/:name" component={Topic} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
