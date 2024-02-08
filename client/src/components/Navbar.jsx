import catLogo from '/cat_with_yarn.svg';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { removeCredentials } from '../slices/authSlice';
import DropdownMenu from './DropdownMenu';
import Button from './Button';

const Navbar = () => {
	const { userInfo } = useSelector((state) => state.auth);

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const location = useLocation();

	const active = 'text-lg font-bold p-2 bg-zinc-100 text-violet-900 rounded';
	const inactive =
		'text-lg font-medium p-2 text-zinc-700 hover:text-violet-700';

	const openMenu = () => {
		setIsMenuOpen(true);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	const dispatch = useDispatch();

	const logoutHandler = async () => {
		try {
			dispatch(removeCredentials());
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};

	return (
		<>
			<header className="sticky top-0 z-50  shadow-[0_2px_21px_0_rgba(0,0,0,0.25)] bg-zinc-100">
				<nav className="flex items-center justify-between p-4 md:px-6 lg:px-8">
					<Link
						to="/"
						className="flex items-center gap-1 text-lg font-bold text-violet-700"
					>
						<img
							src={catLogo}
							alt="Cat with yarn"
							className="w-6 h-6 md:w-9 md:h-9 lg:w-12 lg:h-12"
						/>
						Meowtopia
					</Link>

					<div className="flex md:hidden">
						<button
							className="inline-flex items-center -m-2.5 justify-center rounded-md p-2.5 text-zinc-700 hover:text-violet-700 transition duration-100"
							onClick={openMenu}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
								/>
							</svg>
						</button>
					</div>

					<div className="items-center hidden md:flex">
						<ul className="flex space-x-8">
							<li>
								<Link
									to="/"
									className={location.pathname === '/' ? active : inactive}
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									to="/contact"
									className={
										location.pathname === '/contact' ? active : inactive
									}
								>
									Contact
								</Link>
							</li>
						</ul>
						{userInfo ? (
							<DropdownMenu userName={userInfo.name} />
						) : (
							<Link to="/login" className="ms-8">
								<Button>Sign in</Button>
							</Link>
						)}
					</div>
				</nav>

				{/* MOBILE LAYOUT */}

				<Dialog
					as="div"
					className="md:hidden"
					open={isMenuOpen}
					onClose={setIsMenuOpen}
				>
					<div className="fixed inset-0 z-50 bg-zinc-100 bg-opacity-80" />
					<Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-screen p-4 overflow-y-auto bg-zinc-100 sm:max-w-sm sm:ring-1 sm:ring-zinc-700/10">
						<div className="flex items-center justify-between">
							<Link
								to="/"
								className="flex items-center gap-1 text-lg font-bold text-violet-700"
							>
								<img src={catLogo} alt="Cat with yarn" className="w-6 h-6" />
								Meowtopia
							</Link>

							<div className="flex">
								<button
									className="inline-flex items-center -m-2.5 justify-center rounded-md p-2.5 text-zinc-700 hover:text-violet-700 transition duration-100"
									onClick={closeMenu}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="currentColor"
										className="w-6 h-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M6 18 18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>
						</div>

						<div className="flow-root mt-6">
							<div
								className="-my-2 divide-y divide-zinc-700/50"
								onClick={closeMenu}
							>
								<ul className="py-2 space-y-4">
									<li className="block">
										<Link
											to="/"
											className={location.pathname === '/' ? active : inactive}
										>
											Home
										</Link>
									</li>
									<li className="block">
										<Link
											to="/contact"
											className={
												location.pathname === '/contact' ? active : inactive
											}
										>
											Contact
										</Link>
									</li>
								</ul>

								{userInfo ? (
									<div className="py-4 divide-y divide-zinc-700/50">
										<ul className="py-2 space-y-4">
											<li className="block">
												<Link
													to="/profile"
													className={
														location.pathname === '/profile' ? active : inactive
													}
												>
													Profile
												</Link>
											</li>
											<li className="block">
												<Link
													to="/profile/favorites"
													className={
														location.pathname === '/profile/favorites'
															? active
															: inactive
													}
												>
													Favorites
												</Link>
											</li>
										</ul>
										<div className="py-4">
											<Link
												to="/"
												onClick={logoutHandler}
												className="block p-2 text-lg font-medium text-zinc-700 hover:text-violet-700 active:font-bold active:text-violet-900"
											>
												Logout
											</Link>
										</div>
									</div>
								) : (
									<div className="py-4">
										<Link to="/login">
											<Button className="w-full">Sign in</Button>
										</Link>
									</div>
								)}
							</div>
						</div>
					</Dialog.Panel>
				</Dialog>
			</header>
		</>
	);
};
export default Navbar;
