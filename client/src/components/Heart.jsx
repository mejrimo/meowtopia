import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaHeart } from 'react-icons/fa6';

import { useUpdateFavoritesMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const Heart = ({ id, size }) => {
	const { userInfo } = useSelector((state) => state.auth);

	const [color, setColor] = useState('rgba(0, 0, 0, 0.5)');

	const dispatch = useDispatch();

	const [updateFavorites] = useUpdateFavoritesMutation();

	const handleClick = async () => {
		if (userInfo) {
			try {
				setColor((prev) =>
					prev === '#6d28d9' ? 'rgba(0, 0, 0, 0.5)' : '#6d28d9'
				);
				const res = await updateFavorites(id).unwrap();

				dispatch(setCredentials({ ...res }));
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		} else {
			toast.error('Must be logged in to add favorites');
		}
	};

	useEffect(() => {
		if (userInfo) {
			setColor(
				userInfo?.favKittiesId?.includes(id) ? '#6d28d9' : 'rgba(0, 0, 0, 0.5)'
			);
		} else {
			setColor('rgba(0, 0, 0, 0.5)');
		}
	}, [userInfo, dispatch]);

	return <FaHeart size={size} color={color} onClick={handleClick} />;
};
export default Heart;
