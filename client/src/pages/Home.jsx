import Kitties from '../components/Kitties';

const Home = () => {
	return (
		<div className="container mx-auto">
			<div className="grid grid-cols-2 gap-5 mx-auto my-10 md:grid-cols-3 lg:grid-cols-4">
				<Kitties />
			</div>
		</div>
	);
};
export default Home;
