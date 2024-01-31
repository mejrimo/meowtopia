import axios from 'axios';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

const api = axios.create({
	baseURL: 'https://meowtopia-server.onrender.com/api',
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

// const useKitty = (_id) => {
// 	const [isLoading, setIsLoading] = useState(true);
// 	const [isError, setIsError] = useState(false);
// 	const [data, setData] = useState([]);

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			try {
// 				const res = await api.get(`kitties/${_id}`);
// 				const fetchedData = await res?.data;

// 				setData(fetchedData);
// 			} catch (err) {
// 				toast.error(err?.data?.message || err.error);
// 				setIsError(true);
// 			}
// 			setIsLoading(false);
// 		};

// 		fetchData();
// 	}, []);

// 	return { isLoading, isError, data };
// };

export { api, useFetchKitties };
