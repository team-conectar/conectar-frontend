import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp'
import ProfileFeatures from './pages/ProfileFeatures'
import ExperienceAreas from './pages/ExperienceAreas';
import MasteryTools from './pages/MasteryTools';
import CreateProject from './pages/CreateProject';
import ApproveProject from './pages/ApproveProject';
import Projects from './pages/Projects';

import { AuthProvider } from './context/AuthContext';

function Routes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        
      </BrowserRouter>
    </AuthProvider>
  )

}
export default Routes;