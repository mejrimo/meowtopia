import { useNavigate } from 'react-router-dom';

import Loader from './Loader';
import { useFetchKitties } from '../hooks/useFetchKitties';
import KittyCard from './KittyCard';

const Kitties = () => {
	const { isLoading, isError, kittiesData } = useFetchKitties('kitties');

	const navigate = useNavigate();

	return (
		<>
			{isError ? (
				navigate('/error')
			) : isLoading ? (
				<Loader />
			) : (
				<KittyCard data={kittiesData} />
			)}
		</>
	);
};
export default Kitties;
