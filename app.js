
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory, match } from 'react-router';

import Root from './Root';

// const asyncComponent = bundle => (nextState, callback) => {
// 	bundle.then(component => callback(null, component.default ? component.default : component));
// };

const loadRoute = cb => {
    return (module) => cb(null, module.default);
}

const routes = {
    path: '/',
    component: Root,
    indexRoute: {
    getComponent(location, cb){
            System.import(/* webpackChunkName: "Home", webpackMode: "lazy" */ './Home.js')
            .then(loadRoute(cb))
            .catch(errorLoading);
        }
    },
    childRoutes: [
        {
            path: '/page-a',
            getComponent(location, cb){
                System.import(/* webpackChunkName: "PageA", webpackMode: "lazy" */ './PageA.js')
                .then(loadRoute(cb))
                .catch(errorLoading);
            }
        },
        {
            path: '/page-b',
            getComponent(location, cb){
                System.import(/* webpackChunkName: "PageB", webpackMode: "lazy" */ './PageB.js')
                .then(loadRoute(cb))
                .catch(errorLoading);
            }
        }
    ]
}

match({ history: browserHistory, routes }, (error, redirectLocation, renderProps) => { //eslint-disable-line
	render(
        <Router {...renderProps} history={browserHistory}>{routes}</Router>,
        document.getElementById('container')
	);
});
