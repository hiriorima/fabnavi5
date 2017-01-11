import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Debug from 'debug';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import ProjectList from './ProjectList';
import ProjectManager from './ProjectManager';
import Player from './Player';
import CreateProject from './CreateProject';
import EditProject from './EditProject';
import ProjectDetail from './ProjectDetail';

import reducer from '../reducers/index';
import adjustor from '../middleware/adjustor';
import { handleKeyDown } from '../actions/KeyActionCreator';
import WebAPIUtils from '../utils/WebAPIUtils';
const debug = Debug('fabnavi:jsx:FabnaviApp');

const onEnterFrame = frame => (nextState, replace, callback) => {
  store.dispatch({
    type: 'CHANGE_FRAME',
    frame
  });
  callback();
};

window.api = WebAPIUtils;
window.addEventListener('DOMContentLoaded', () => {
  debug('======> Mount App');
  const url = window.location.href;
  const store = createStore(reducer, applyMiddleware(adjustor) );

  window.store = store;
  if(isAuthWindow(url)) {
    window.opener.postMessage(JSON.stringify(parseAuthInfo(url)), window.location.origin);
    window.close();
    return;
  }
  api.init(store);
  ReactDOM.render(
    <Provider store={store}>
    <Router history={browserHistory}>
        <Route components={ProjectManager} path="/" onEnter={onEnterFrame('manager')} >
          <IndexRoute component={ProjectList} />
          <Route component={ProjectList} path="myprojects" />
          <Route component={CreateProject} path="create"/>
          <Route component={EditProject} path="edit/:projectId" />
          <Route component={ProjectDetail} path="detail/:projectId" />
        </Route>
        <Route components={Player} path="/play/:projectId" onEnter={onEnterFrame('player')}/>
    </Router>
    </Provider>, document.querySelector('#mount-point'));
  window.addEventListener('keydown', handleKeyDown(store));
});

function isAuthWindow(url) {
  return url.includes('uid') && url.includes('client_id') && url.includes('auth_token');
}

function parseAuthInfo(url) {
  return {
    'Access-Token': url.match(/auth_token=([a-zA-Z0-9\-\_]*)/)[1],
    'Uid': url.match(/uid=([a-zA-Z0-9\-\_]*)/)[1],
    'Client': url.match(/client_id=([a-zA-Z0-9\-\_]*)/)[1]
  };
}
