import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import ChangePassword from './components/ChangePassword';
import Logout from './components/Logout';
import AuthProvider, { AuthContext } from './components/AuthContext';
import './App.css';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/profile" component={PrivateRoute(Profile)} />
                    <Route path="/change-password" component={PrivateRoute(ChangePassword)} />
                    <Route path="/logout" component={PrivateRoute(Logout)} />
                    <Redirect from="/" to="/login" />
                </Switch>
            </Router>
        </AuthProvider>
    );
};

const PrivateRoute = (Component) => {
    return (props) => {
        const { auth } = React.useContext(AuthContext);
        return auth.accessToken ? <Component {...props} /> : <Redirect to="/login" />;
    };
};

export default App;
