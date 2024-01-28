import { useNavigate } from 'react-router-dom';

import Loader from './Loader';
import { useKitties } from '../hooks/useKitties';
import KittyCard from './KittyCard';

const Kitties = () => {
	const { isLoading, isError, data } = useKitties();

	const navigate = useNavigate();

	if (isError) {
		navigate('/error');
	}

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className="container mx-auto">
			<div className="grid grid-cols-2 my-10 md:grid-cols-3 lg:grid-cols-4 bg-zinc-100 justify-items-center">
				<KittyCard data={data} />
			</div>
		</div>
	);
};
export default Kitties;
