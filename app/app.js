import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

// reducers (redux)
import ReactApp from './reducers';

// Custom modules
import NoMatch from './modules/NoMatch';

//  redux modules come from /modules/containers/...
import Home from './modules/containers/Handstand/Home';

// Style
import './global';

let store = createStore(
	ReactApp,
	applyMiddleware(thunkMiddleware)
	);

let App = React.createClass({
  render() {
    return (
      <div>
	     <div className='app'>
	        {this.props.children}
	     </div>
      </div>
    );
  }
});

ReactDOM.render(
	<Provider store={store}>
	  <Router onUpdate={() => {window.scrollTo(0,1); window.scrollTo(0, 0);}} history={browserHistory}>
	    <Route path='/' component={App}>
	      <IndexRoute component={Home}/>
	      <Route path="*" component={NoMatch}/>
	    </Route>
	  </Router>
	</Provider>,
  document.getElementById('app-wrapper')
);
