import { PuffLoader } from 'react-spinners';

const Loader = () => {
	return (
		<div className="block m-auto">
			<PuffLoader
				height="80"
				width="80"
				radius={1}
				color="#4c1d95"
				aria-label="puff-loading"
			/>
		</div>
	);
};

export default Loader;
