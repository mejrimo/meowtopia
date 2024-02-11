const Button = ({ children, className, clickFunc }) => {
	return (
		<button
			onClick={clickFunc}
			className={`cursor-pointer px-6 py-2 font-medium rounded-md shadow bg-violet-700 text-zinc-100 hover:bg-violet-900 active:bg-violet-500 + ${className}`}
		>
			{children}
		</button>
	);
};
export default Button;
