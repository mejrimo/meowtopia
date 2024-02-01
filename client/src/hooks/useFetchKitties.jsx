import axios from 'axios';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

const api = axios.create({
	baseURL: 'http://localhost:8000/api/',
});

const useFetchKitties = (endpoint) => {
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [kittiesData, setKittiesData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await api.get(endpoint);
				const fetchedData = await res?.data;

				setKittiesData(fetchedData);
			} catch (err) {
				toast.error(err?.data?.message || err.error);
				setIsError(true);
			}
			setIsLoading(false);
		};

		fetchData();
	}, []);

	return { isLoading, isError, kittiesData };
};

export { api, useFetchKitties };
