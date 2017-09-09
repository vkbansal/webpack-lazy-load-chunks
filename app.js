import React from "react";
import { render } from "react-dom";
import { Router, browserHistory, match } from "react-router";

import Root from "./Root";

const asyncComponent = bundle => (nextState, callback) => {
  bundle().then(component => {
    callback(null, component.default ? component.default : component);
  });
};

const routes = {
  path: "/",
  component: Root,
  indexRoute: {
    getComponent: asyncComponent(() =>
      import(/* webpackChunkName: "Home", webpackMode: "lazy" */ "./Home.js")
    )
  },
  childRoutes: [
    {
      path: "/page-a",
      getComponent: asyncComponent(() =>
        import(/* webpackChunkName: "PageA", webpackMode: "lazy" */ "./PageA.js")
      )
    },
    {
      path: "/page-b",
      getComponent: asyncComponent(() =>
        import(/* webpackChunkName: "PageB", webpackMode: "lazy" */ "./PageB.js")
      )
    }
  ]
};

match({ history: browserHistory, routes }, (error, redirectLocation, renderProps) => {
  //eslint-disable-line
  render(
    <Router {...renderProps} history={browserHistory}>
      {routes}
    </Router>,
    document.getElementById("container")
  );
});
