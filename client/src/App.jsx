import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Error from './pages/Error';
import Kitty from './pages/Kitty';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
import Contact from './pages/Contact';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/error" element={<Error />} />
					<Route path="/kitty/:id" element={<Kitty />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="" element={<PrivateRoute />}>
						<Route path="/profile" element={<Profile />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
