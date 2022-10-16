import axios from 'axios';
let baseUrl = process.env.REACT_APP_API_URL;

// name email , password
export const getAllTask = async () => {
	const url = `${baseUrl}/getalltask`;
	const response = await axios.get(url, {
		withCredentials: true
	});
	return response;
};

export const createTask = async task => {
	const url = `${baseUrl}/createtask`;
	const response = await axios.post(url, task, {
		withCredentials: true
	});
	return response;
};

export const getOneTask = async id => {
	const url = `${baseUrl}//getonetask/${id}`;
	const response = await axios.get(url, {
		withCredentials: true
	});
	return response;
};

export const updateTask = async (id, status) => {
	const url = `${baseUrl}/updatetask/${id}`;
	const response = axios.put(
		url,
		{ status: status },
		{
			withCredentials: true
		}
	);

	return response;
};

export const deleteTask = id => {
	const url = `${baseUrl}/deletetask/${id}`;
	const response = axios.delete(url, { withCredentials: true });
	return response;
};

export const getTaskByStatus = status => {
	const url = `${baseUrl}/gettaskbystatus/${status}`;
	const response = axios.get(url, { withCredentials: true });
	return response;
};
