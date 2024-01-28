import { Link } from 'react-router-dom';
import { FaMars, FaVenus } from 'react-icons/fa';

const KittyCard = ({ data }) => {
	const kittyElements = data?.map((kitty) => {
		const { _id, image, name, gender, age } = kitty;

		return (
			<div
				key={_id}
				className="w-40 my-6 transition-all duration-200 transform shadow-md cursor-pointer shadow-slate-300 md:w-48 lg:w-56 rounded-3xl hover:shadow-lg hover:-translate-y-1"
			>
				<Link to={`/kitty/${_id}`}>
					<div className="flex items-center justify-center">
						<img
							className="object-contain w-full h-24 rounded-lg lg:h-40 md:h-32"
							src={image}
							alt={`${name} picture`}
						/>
					</div>
					<div className="flex items-center mx-4 mt-2">
						<div className="text-sm font-semibold me-3 text-zinc-700 md:text-base lg:text-lg">
							{name}
						</div>
						<div className="text-violet-500">
							{gender === 'M' ? <FaMars /> : <FaVenus />}
						</div>
					</div>
					<div className="mx-4 mb-2 text-xs font-medium md:text-sm lg:text-base text-zinc-400">
						{age}
					</div>
				</Link>
			</div>
		);
	});

	return <>{kittyElements}</>;
};

export default KittyCard;
