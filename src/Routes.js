import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

export default class Routes extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Switch>
              <Route path="/" component={Comp1} exact={true} />
              <Route path="/comp1" component={Comp1} exact={true} />
              <Route path="/comp2/" component={Comp2} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
