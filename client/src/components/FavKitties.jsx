import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Loader from './Loader';
import { useFetchKitties } from '../hooks/useFetchKitties';
import KittyCard from './KittyCard';

const FavKitties = () => {
	const { userInfo } = useSelector((state) => state.auth);
	const { isLoading, isError, kittiesData } = useFetchKitties('kitties');

	const navigate = useNavigate();

	if (isError) {
		navigate('/error');
	}

	if (isLoading) {
		return <Loader />;
	}

	const favoritesElements = kittiesData.filter((kitty) =>
		userInfo?.favKittiesId?.includes(kitty._id)
	);

	return (
		<div className="container mx-auto">
			<div className="grid grid-cols-2 my-10 md:grid-cols-3 lg:grid-cols-4 bg-zinc-100 justify-items-center">
				<KittyCard data={favoritesElements} />
			</div>
		</div>
	);
};
export default FavKitties;
