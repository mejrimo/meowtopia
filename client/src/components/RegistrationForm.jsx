import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../slices/usersApiSlice.js';
import { setCredentials } from '../slices/authSlice.js';

import Loader from './Loader.jsx';
import SubmitButton from './SubmitButton.jsx';

const RegistrationForm = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { userInfo } = useSelector((state) => state.auth);

	const [register, { isLoading }] = useRegisterMutation();

	useEffect(() => {
		if (userInfo) {
			navigate('/');
		}
	}, [navigate, userInfo]);

	const submitHandler = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error('Passwords do not match');
		} else {
			try {
				const res = await register({ name, email, password }).unwrap();

				dispatch(setCredentials({ ...res }));
				navigate('/');
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		}
	};

	return (
		<div className="flex flex-col justify-center my-7">
			<form
				onSubmit={submitHandler}
				className="max-w-md px-6 mx-auto border rounded-lg md:w-full border-zinc-300"
			>
				<h1 className="my-3 text-3xl font-bold text-center text-zinc-700">
					Registrati
				</h1>

				<div className="flex flex-col py-3 text-zinc-700">
					<label htmlFor="name" className="px-1">
						Nome
					</label>
					<input
						name="name"
						type="text"
						placeholder="Inserisci Nome"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="p-2 mt-1 border rounded-lg border-zinc-300 focus:outline-none focus:border-violet-300"
					/>
				</div>

				<div className="flex flex-col py-3 text-zinc-700">
					<label htmlFor="email" className="px-1">
						Email
					</label>
					<input
						name="email"
						type="email"
						placeholder="Inserisci Email"
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
						name="password"
						type="password"
						placeholder="Inserisci Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="p-2 mt-1 border rounded-lg border-zinc-300 focus:outline-none focus:border-violet-300"
					/>
				</div>

				<div className="flex flex-col py-3 text-zinc-700">
					<label htmlFor="confirmPassword" className="px-1">
						Conferma Password
					</label>
					<input
						name="confirmPassword"
						type="password"
						placeholder="Conferma Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						className="p-2 mt-1 border rounded-lg border-zinc-300 focus:outline-none focus:border-violet-300"
					/>
				</div>

				{isLoading && <Loader />}

				<SubmitButton>Registrati</SubmitButton>

				<p className="mx-1 my-3 text-zinc-700">
					Sei già un utente?{' '}
					<Link
						to="/login"
						className="cursor-pointer text-violet-700 hover:text-violet-900 active:text-violet-500"
					>
						Accedi
					</Link>
				</p>
			</form>
		</div>
	);
};

export default RegistrationForm;
