import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp'
import ProfileFeatures from './pages/ProfileFeatures'
import ExperienceAreas from './pages/ExperienceAreas';
import MasteryTools from './pages/MasteryTools';
import CreateProject from './pages/CreateProject';
import ApproveProject from './pages/ApproveProject';

import { AuthProvider } from './context/AuthContext';

function Routes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route path="/cadastrar/:step" component={SignUp} />
        <Route path="/experiencias" component={ProfileFeatures} />
        <Route path="/areas" component={ ExperienceAreas} />
        <Route path="/habilidades-ou-ferramentas" component={ MasteryTools} />
        <Route path="/criar-um-projeto" component={ CreateProject} />
        <Route path="/projeto-conectado" component={ ApproveProject} />
      </BrowserRouter>
    </AuthProvider>
  )

}
export default Routes;