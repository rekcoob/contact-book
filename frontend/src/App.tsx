import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/layout/Navbar';
import { Home } from './components/pages/Home';
import { About } from './components/pages/About';
import { PrivateRoute } from './components/routing/PrivateRoute';

import { ContactState } from './context/contact/contactContext';
import { AuthState } from './context/auth/authContext';
import { Register } from './components/auth/Register';
import { Login } from './components/auth/Login';
import { AlertState } from './context/alert/alertContext';
import { Alerts } from './components/layout/Alerts';
import { setAuthToken } from './utils/setAuthToken';
import { ContactsPage } from './components/pages/ContactsPage';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	return (
		<AuthState>
			<ContactState>
				<AlertState>
					<BrowserRouter>
						<>
							<Navbar />
							<div className="container">
								<Alerts />
								<Switch>
									<Route exact path="/" component={Home} />
									<PrivateRoute
										exact
										path="/contacts"
										component={ContactsPage}
									/>
									<Route exact path="/about" component={About} />
									<Route exact path="/login" component={Login} />
									<Route exact path="/register" component={Register} />
								</Switch>
							</div>
						</>
					</BrowserRouter>
				</AlertState>
			</ContactState>
		</AuthState>
	);
};

export default App;
