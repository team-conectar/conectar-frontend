import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp'


function Routes() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={SignUp} />
    </BrowserRouter>
  )

}
export default Routes;