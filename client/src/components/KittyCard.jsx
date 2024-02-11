import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMars, FaVenus } from 'react-icons/fa';
import Heart from './Heart';
import Button from './Button';

const KittyCard = ({ data }) => {
	const initialDisplay = 8;
	const [incrementDisplay, setIncrementDisplay] = useState(initialDisplay);
	const kittyElements = data?.slice(0, incrementDisplay)?.map((kitty) => {
		const { _id, image, name, gender, age } = kitty;

		return (
			<div
				key={_id}
				className="relative h-48 my-6 transition-all duration-200 transform shadow-md cursor-pointer w-44 shadow-slate-300 md:w-52 md:h-56 lg:w-60 lg:h-64 rounded-3xl hover:shadow-lg hover:-translate-y-1"
			>
				<div className="absolute cursor-pointer top-3 right-3">
					<Heart size={18} id={_id} />
				</div>
				<Link to={`/kitty/${_id}`}>
					<img
						className="object-cover object-center w-full h-36 rounded-t-3xl md:h-40 lg:h-48"
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

	const loadMore = () => {
		console.log('load more kitties plz');
		setIncrementDisplay(initialDisplay + incrementDisplay);
	};

	return (
		<>
			<div className="container mx-auto">
				<div className="grid grid-cols-2 my-10 md:grid-cols-3 lg:grid-cols-4 bg-zinc-100 justify-items-center">
					{kittyElements}
				</div>
				<div className="flex items-center justify-center mt-auto mb-10">
					{incrementDisplay < data.length ? (
						<Button clickFunc={loadMore}>Cairca Altri</Button>
					) : (
						<Button>Sei arrivato alla fine del lista</Button>
					)}
				</div>
			</div>
		</>
	);
};

export default KittyCard;
