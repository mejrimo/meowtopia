import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCircleLeft } from 'react-icons/fa6';

const BackArrow = ({ size }) => {
	const [color, setColor] = useState('rgba(0, 0, 0, 0.5)');
	const navigate = useNavigate();

	const clickHandler = () => {
		navigate(-1);
	};

	const mouseOver = () => {
		setColor('#6d28d9');
	};

	const mouseOut = () => {
		setColor('rgba(0, 0, 0, 0.5)');
	};

	return (
		<FaCircleLeft
			className="hover:text-violet-700"
			size={size}
			color={color}
			onClick={clickHandler}
			onMouseOver={mouseOver}
			onMouseOut={mouseOut}
		/>
	);
};
export default BackArrow;
