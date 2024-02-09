import { Link } from 'react-router-dom';
import { FaMars, FaVenus } from 'react-icons/fa';
import Heart from './Heart';

const KittyCard = ({ data }) => {
	const kittyElements = data?.map((kitty) => {
		const { _id, image, name, gender, age } = kitty;

		return (
			<div
				key={_id}
				className="relative w-40 h-40 my-6 transition-all duration-200 transform shadow-md cursor-pointer shadow-slate-300 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-3xl hover:shadow-lg hover:-translate-y-1"
			>
				<div className="absolute cursor-pointer top-3 right-3">
					<Heart size={18} id={_id} />
				</div>
				<Link to={`/kitty/${_id}`}>
					<img
						className="object-cover object-center w-full h-28 rounded-t-3xl lg:h-40 md:h-36"
						src={image}
						alt={`${name} picture`}
					/>

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
