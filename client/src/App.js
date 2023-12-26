import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Registration from './containers/Registration';

function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (data) => {
    // Store the token and user info
    localStorage.setItem('token', data.token);
    // Set user info in state
    setUser({ email: data.email, username: data.username });
    // Redirect or perform other actions on successful login
  };
  return (
    <Router>
      <Switch>
        <Route path="/register" component={Registration} />
        <Login onLoginSuccess={handleLoginSuccess} />
      </Switch>
    </Router>
  );
}

export default App;