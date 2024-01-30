import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaHeart } from 'react-icons/fa6';

import {
	useGetFavKittiesIdQuery,
	useUpdateFavoritesMutation,
} from '../slices/usersApiSlice';

const Heart = ({ id, size }) => {
	const { userInfo } = useSelector((state) => state.auth);
	const [color, setColor] = useState('rgba(0, 0, 0, 0.5)');

	const { data } = useGetFavKittiesIdQuery();

	const [updateFavorites] = useUpdateFavoritesMutation();

	useEffect(() => {
		setColor(() => (data?.includes(id) ? '#6d28d9' : 'rgba(0, 0, 0, 0.5)'));
		console.log(data);
	}, [data]);

	const handleClick = async (e) => {
		e.stopPropagation();
		if (userInfo) {
			try {
				const res = await updateFavorites(id).unwrap();

				console.log(res);

				setColor((prev) =>
					prev === '#6d28d9' ? 'rgba(0, 0, 0, 0.5)' : '#6d28d9'
				);
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		} else {
			toast.error('Must be logged in to add favorites');
		}
	};

	return <FaHeart size={size} color={color} onClick={handleClick} />;
};
export default Heart;