import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/Login/LoginForm';
import MainComponent from './Components/Main/MainComponent';
import RequireAuth from './Auth/RequireAuth';
import RegisterForm from './Components/Register/RegisterForm';
import UserProjects from './Components/UserProjects/UserProjects';
import ProfilePage from './Components/Profile/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route element = { <RequireAuth/> }>
            <Route 
              path = "/"
              element = { <MainComponent/> } />
            <Route 
              path="/userProjects"
              element = { <UserProjects/> } />
            <Route
              path="/profile"
              element= { <ProfilePage/> } />
        </Route>
        <Route
          path = "/login"
          element = { <LoginForm /> }/>
        <Route 
          path="/register"
          element = { <RegisterForm />}/>
      </Routes>
    </Router>
  );
}

export default App;
