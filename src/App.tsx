/* eslint-disable no-lone-blocks */
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
// import {useUsers} from './context/Users'
import AppRoute from './appRoute';
import routes from './config/routes';



function App() {
  return (
    <div className="App">
          <Router>
            <Switch>
              {routes.map((route) => (
                <AppRoute
                  key={route.path}
                  path={route.path}
                  isPrivate={route.isPrivate}
                  component={route.component}
                />
              ))}
            </Switch>
          </Router>
    </div>
  );
}

export default App;