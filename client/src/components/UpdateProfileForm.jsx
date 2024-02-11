import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
	useDeleteUserMutation,
	useUpdateUserMutation,
} from '../slices/usersApiSlice.js';
import { removeCredentials, setCredentials } from '../slices/authSlice.js';
import Loader from './Loader.jsx';
import SubmitButton from './SubmitButton.jsx';

const UpdateProfileForm = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { userInfo } = useSelector((state) => state.auth);
	const [updateUser, { isLoading }] = useUpdateUserMutation();
	const [deleteUser] = useDeleteUserMutation();

	useEffect(() => {
		setName(userInfo.name);
		setEmail(userInfo.email);
	}, [userInfo.name, userInfo.email]);

	const submitHandler = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error('Passwords do not match');
		} else {
			try {
				const res = await updateUser({
					_id: userInfo._id,
					name,
					email,
					password,
				}).unwrap();

				dispatch(setCredentials({ ...res }));
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		}
	};

	const deleteUserFunction = async () => {
		try {
			navigate('/');
			await deleteUser();
			dispatch(removeCredentials());
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
					Modifica Profilo
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

				<SubmitButton>Modifica</SubmitButton>
			</form>
			<button
				onClick={deleteUserFunction}
				className="w-full px-6 py-2 mx-auto my-2 font-medium bg-red-600 rounded-lg shadow cursor pointer text-zinc-100 max-w-72 md:max-w-md hover:bg-red-700 active:bg-red-500"
			>
				Elimina account
			</button>
		</div>
	);
};

export default UpdateProfileForm;
