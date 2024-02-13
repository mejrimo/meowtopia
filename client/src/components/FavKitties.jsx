import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Loader from './Loader';
import { useFetchKitties } from '../hooks/useFetchKitties';
import KittyCard from './KittyCard';

const FavKitties = () => {
	const { userInfo } = useSelector((state) => state.auth);
	const { isLoading, isError, kittiesData } = useFetchKitties('kitties');

	const navigate = useNavigate();

	const favoritesElements = kittiesData.filter((kitty) =>
		userInfo?.favKittiesId?.includes(kitty._id)
	);

	return (
		<>
			{isError ? (
				navigate('/error')
			) : isLoading ? (
				<Loader />
			) : (
				<KittyCard data={favoritesElements} />
			)}
		</>
	);
};
export default FavKitties;
