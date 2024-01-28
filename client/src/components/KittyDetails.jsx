import { useNavigate, useParams } from 'react-router-dom';
import { FaMars, FaVenus } from 'react-icons/fa';
import { FaRegCircleCheck, FaRegCircleXmark } from 'react-icons/fa6';

import Loader from './Loader';
import { useKitty } from '../hooks/useKitties';

const KittyDetails = () => {
	const navigate = useNavigate();
	const params = useParams();

	const { isLoading, isError, data } = useKitty(params.id);

	if (isError) {
		navigate('/error');
	}

	if (isLoading) {
		return <Loader />;
	}

	const {
		_id,
		image,
		name,
		gender,
		age,
		isPeopleFriendly,
		isAnimalFriendly,
		isSpecialNeeds,
		description,
	} = data;

	return (
		<div className="container mx-auto">
			<div className="flex flex-col items-center justify-center mb-10 lg:hidden">
				<img
					src={image}
					alt={`${name} photo`}
					className="mb-6 h-96 shadow-[0_2px_21px_0_rgba(0,0,0,0.25)] w-full object-contain "
				></img>

				<div className="flex items-center justify-between w-full mb-5 px-7">
					<p className="text-2xl font-bold text-zinc-700">{name}</p>

					<div className="flex items-center justify-between w-24 p-2">
						<p className="text-lg font-medium text-zinc-400">{age}</p>
						<div className="text-violet-500">
							{gender === 'M' ? <FaMars /> : <FaVenus />}
						</div>
					</div>
				</div>

				<div className="h-px mb-5 w-80 bg-violet-400" />

				<div className="flex items-center justify-between w-full mb-4 px-7">
					<p className="font-semibold text-zinc-400">Amichevole con persone</p>

					<div className="p-2 text-violet-500">
						{isPeopleFriendly === true ? (
							<FaRegCircleCheck />
						) : (
							<FaRegCircleXmark />
						)}
					</div>
				</div>

				<div className="flex items-center justify-between w-full mb-4 px-7">
					<p className="font-semibold text-zinc-400">Amichevole con animali</p>

					<div className="p-2 text-violet-500">
						{isAnimalFriendly === true ? (
							<FaRegCircleCheck />
						) : (
							<FaRegCircleXmark />
						)}
					</div>
				</div>

				<div className="flex items-center justify-between w-full mb-5 px-7">
					<p className="font-semibold text-zinc-400">Bisognoso di cure</p>

					<div className="p-2 text-violet-500">
						{isSpecialNeeds === true ? (
							<FaRegCircleCheck />
						) : (
							<FaRegCircleXmark />
						)}
					</div>
				</div>

				<div className="h-px mb-5 w-80 bg-violet-400" />

				<div className="flex flex-col justify-center w-full mb-5 px-7">
					<p className="mb-3 text-lg font-semibold text-zinc-700">Bio</p>
					<p className="text-zinc-400">{description}</p>
				</div>

				<p></p>
			</div>

			{/* DESKTOP LAYOUT */}

			<div className="flex-col hidden px-10 mb-10 lg:flex">
				<div className="flex items-center justify-between mt-6 mb-1">
					<p className="text-2xl font-bold text-zinc-700">{name}</p>
					<div className="text-violet-500">
						{gender === 'M' ? <FaMars size={30} /> : <FaVenus size={30} />}
					</div>
				</div>
				<div className="flex items-center">
					<p className="mb-3 text-lg font-medium text-zinc-400">{age}</p>
				</div>

				<div className="h-px mb-10 bg-violet-400" />

				<div className="flex justify-between">
					<img
						src={image}
						alt={`${name} photo`}
						className="shadow-[0_2px_21px_0_rgba(0,0,0,0.25)] max-w-xl object-contain rounded-3xl"
					></img>

					<div className="flex flex-col items-center w-full ps-44">
						<div className="flex items-center justify-between w-full mb-5">
							<p className="text-lg font-semibold text-zinc-400">
								Amichevole con persone
							</p>

							<div className="p-2 text-violet-500">
								{isPeopleFriendly === true ? (
									<FaRegCircleCheck />
								) : (
									<FaRegCircleXmark />
								)}
							</div>
						</div>

						<div className="flex items-center justify-between w-full mb-5">
							<p className="text-lg font-semibold text-zinc-400">
								Amichevole con animali
							</p>

							<div className="p-2 text-violet-500">
								{isAnimalFriendly === true ? (
									<FaRegCircleCheck />
								) : (
									<FaRegCircleXmark />
								)}
							</div>
						</div>

						<div className="flex items-center justify-between w-full mb-6">
							<p className="text-lg font-semibold text-zinc-400">
								Bisognoso di cure
							</p>

							<div className="p-2 text-violet-500">
								{isSpecialNeeds === true ? (
									<FaRegCircleCheck />
								) : (
									<FaRegCircleXmark />
								)}
							</div>
						</div>

						<div className="w-full h-px mb-6 bg-violet-400" />

						<div className="flex flex-col justify-center w-full">
							<p className="mb-2 text-2xl font-semibold text-zinc-700">Bio</p>
							<p className="text-lg text-zinc-400">{description}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default KittyDetails;
