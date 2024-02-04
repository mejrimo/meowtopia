import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

import { useLogoutMutation } from '../slices/usersApiSlice.js';
import { removeCredentials } from '../slices/authSlice.js';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

const DropdownMenu = ({ userName }) => {
	const dispatch = useDispatch();

	const [logoutApiCall] = useLogoutMutation();

	const logoutHandler = async () => {
		try {
			await logoutApiCall().unwrap();
			dispatch(removeCredentials());
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};

	return (
		<Menu as="div" className="relative inline-block text-left ms-8">
			<div>
				<Menu.Button className="inline-flex justify-center w-full gap-x-1.5 px-6 py-2 font-medium text-zinc-700 rounded-md shadow ring-1 ring-inset ring-violet-300 hover:bg-violet-200 hover:text-zinc-700">
					{userName}
					<ChevronDownIcon
						className="w-5 h-5 -mr-1 text-zinc-700"
						aria-hidden="true"
					/>
				</Menu.Button>
			</div>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right divide-y rounded-md shadow-lg divide-zinc-700 bg-zinc-100 ring-1 ring-violet-300 ring-opacity-5 focus:outline-none">
					<div className="py-1">
						<Menu.Item>
							{({ active }) => (
								<Link
									to="/profile"
									className={classNames(
										active ? 'bg-violet-200' : '',
										'block px-4 py-2 text-zinc-700'
									)}
								>
									Profile
								</Link>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<Link
									to="/profile/favorites"
									className={classNames(
										active ? 'bg-violet-200' : '',
										'block px-4 py-2 text-zinc-700'
									)}
								>
									Favorites
								</Link>
							)}
						</Menu.Item>
					</div>
					<div className="py-1">
						<Menu.Item>
							{({ active }) => (
								<Link
									to="/"
									onClick={logoutHandler}
									className={classNames(
										active ? 'bg-violet-200' : '',
										'block px-4 py-2 text-zinc-700'
									)}
								>
									Logout
								</Link>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};

export default DropdownMenu;
