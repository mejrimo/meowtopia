import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
	return (
		<>
			<div className="flex flex-col min-h-screen bg-zinc-100">
				<Navbar />
				<ToastContainer />
				<Outlet />
			</div>
			<div className="mt-auto bg-zinc-100">
				<Footer />
			</div>
		</>
	);
};

export default Layout;
