import axios from 'axios';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

const api = axios.create({
	baseURL: 'http://localhost:8000/api/',
});

const useKitties = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await api.get('kitties');
				const fetchedData = await res?.data;

				setData(fetchedData);
			} catch (err) {
				toast.error(err?.data?.message || err.error);
				setIsError(true);
			}
			setIsLoading(false);
		};

		fetchData();
	}, []);

	return { isLoading, isError, data };
};

const useKitty = (_id) => {
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await api.get(`kitties/${_id}`);
				const fetchedData = await res?.data;

				setData(fetchedData);
			} catch (err) {
				toast.error(err?.data?.message || err.error);
				setIsError(true);
			}
			setIsLoading(false);
		};

		fetchData();
	}, []);

	return { isLoading, isError, data };
};

export { api, useKitties, useKitty };
