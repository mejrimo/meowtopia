const SubmitButton = ({ children }) => {
	return (
		<button
			type="submit"
			className="px-6 py-2 mx-1 my-3 font-medium rounded shadow bg-violet-700 text-zinc-100 hover:bg-violet-900 active:bg-violet-500"
		>
			{children}
		</button>
	);
};

export default SubmitButton;
