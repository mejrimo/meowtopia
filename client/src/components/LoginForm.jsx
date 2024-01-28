import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useLoginMutation } from '../slices/usersApiSlice.js';
import { setCredentials } from '../slices/authSlice.js';

import Loader from './Loader.jsx';
import SubmitButton from './SubmitButton.jsx';

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [login, { isLoading }] = useLoginMutation();

	const { userInfo } = useSelector((state) => state.auth);

	useEffect(() => {
		if (userInfo) {
			navigate('/');
		}
	}, [navigate, userInfo]);

	const submitHandler = async (e) => {
		e.preventDefault();

		try {
			const res = await login({ email, password }).unwrap();

			dispatch(setCredentials({ ...res }));
			navigate('/');
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};

	return (
		<div className="flex flex-col justify-center my-7">
			<form
				onSubmit={submitHandler}
				className="max-w-md px-6 mx-auto border rounded-lg md:w-full border-zinc-300"
			>
				<h1 className="my-3 text-3xl font-bold text-center text-zinc-700">
					Sign In
				</h1>
				<div className="flex flex-col py-3 text-zinc-700">
					<label htmlFor="email" className="px-1">
						Email Address
					</label>
					<input
						type="email"
						placeholder="Enter Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="p-2 mt-1 border rounded-lg border-zinc-300 focus:outline-none focus:border-violet-300"
					/>
				</div>
				<div className="flex flex-col py-3 text-zinc-700">
					<label htmlFor="password" className="px-1">
						Password
					</label>
					<input
						type="password"
						placeholder="Enter Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="p-2 mt-1 border rounded-lg border-zinc-300 focus:outline-none focus:border-violet-300"
					/>
				</div>

				{isLoading && <Loader />}

				<SubmitButton>Sign in</SubmitButton>

				<p className="mx-1 my-3 text-zinc-700">
					New user? Please{' '}
					<Link
						to="/register"
						className="cursor-pointer text-violet-700 hover:text-violet-900 active:text-violet-500"
					>
						register
					</Link>
				</p>
			</form>
		</div>
	);
};

export default LoginForm;
