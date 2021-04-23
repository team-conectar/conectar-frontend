import React from 'react'
import { Route, BrowserRouter, useLocation, Switch } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import ProfileFeatures from './pages/ProfileFeatures'
import ExperienceAreas from './pages/ExperienceAreas'
import MasteryTools from './pages/MasteryTools'
import CreateProject from './pages/CreateProject'
import ApproveProject from './pages/ApproveProject'
import Projects from './pages/Projects'
import Profiles from './pages/Profiles'
import { GlobalStyle } from './assets/style/global'
import { AuthProvider } from './context/AuthContext'
import Explorer from './pages/Explorer'
import Search from './pages/Search'
import NavBar from './components/UI/NavBar'
import EditProfile from './pages/EditProfile'
import ForgotPassword from './pages/ForgotPassword'

const Routes: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route path="/cadastrar/:parte" component={SignUp} />
        <Route path="/esqueceu-senha" component={ForgotPassword} />
        <Route path="/experiencias-do-usuario" component={ProfileFeatures} />
        <Route path="/areas-de-atuacao" component={ExperienceAreas} />
        <Route path="/habilidades-e-ferramentas" component={MasteryTools} />
        <Route path="/main" component={NavBar} />
        <Route path="/criar-um-projeto" component={CreateProject} />
        <Route path="/projeto-conectado/:id" component={ApproveProject} />
        <Route path="/projeto/:id" component={Projects} />
        <Route path="/editar-perfil/:id" component={EditProfile} />
        <Route path="/perfil/:id" component={Profiles} />
        <Route path="/explorar" component={Explorer} />
        <Route path="/pesquisar/:for?/:attribute?/:key?" component={Search} />
      </BrowserRouter>
      <GlobalStyle />
    </AuthProvider>
  )
}
export default Routes
