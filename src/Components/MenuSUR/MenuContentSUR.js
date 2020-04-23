import React from "react";
// Components
import { Container } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";

// - Props:
/* 
  contentConfig: configuration on the routes to the content
    endpoint: endpoint that will toggle the route
    exact?: if the endpoint name has to be exact (boolean)
*/

export default function MenuContentSUR(props) {
  return (
    <Container>
      <Switch>
        {props.contentConfig.map(itemConfig => (
          <Route
            key={itemConfig.endpoint}
            path={itemConfig.endpoint}
            component={itemConfig.component}
            exact={itemConfig.exact}
          />
        ))}
      </Switch>
    </Container>
  );
}
