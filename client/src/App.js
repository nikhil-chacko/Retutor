import React from 'react';
import './App.css';
import HomePage from './components/HomePage';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TeacherPage from './components/TeacherPage';
import TeacherState from './context/teacher/TeacherState';
import TeacherProfile from './components/TeacherProfile';
import AddTeacher from './components/AddTeacher';

const App = () => {
	return (
		<div className='App'>
			<CssBaseline />
			<Router>
				<Switch>
					<Route exact path='/' component={HomePage} />
					<TeacherState>
						<Route exact path='/teachers' component={TeacherPage} />
						<Switch>
							<Route
								exact
								path='/teachers/:tName'
								component={TeacherProfile}
							/>
						</Switch>
						<Route
							exact
							path='/teachers/addTeacher'
							component={AddTeacher}
						/>
					</TeacherState>
				</Switch>
			</Router>
		</div>
	);
};

export default App;
