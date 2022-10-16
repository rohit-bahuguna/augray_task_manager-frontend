import React, { useState } from 'react';
import { createTask } from '../../utils/taskAPI/taskAPI';
import { useDispatch, useSelector } from 'react-redux';
import { createATask } from '../../redux/actions/taskActions';
import { toast, ToastContainer } from 'react-toastify';

const CreateTask = () => {
	const dispatch = useDispatch();
	let initialValues = {
		heading: '',
		description: ''
	};
	const [newTask, setNewTask] = useState(initialValues);

	const createNewTask = () => {
		createTask(newTask)
			.then(response => {
				dispatch(createATask(response.data.task));
				console.log(response);
				toast.success('Task Created Successfully');
				setNewTask(initialValues);
			})
			.catch(error => console.log(error));
	};

	return (
		<div className="card   sticky" style={{ width: '18rem', height: '30rem' }}>
			<ToastContainer />
			<div className="card-body createTask">
				<textarea
					placeholder="Enter Heading Here"
					value={newTask.heading}
					onChange={e => setNewTask({ ...newTask, heading: e.target.value })}
					required
					rows="3"
					cols="3"
				/>
				<textarea
					placeholder="Enter Description Here"
					value={newTask.description}
					onChange={e =>
						setNewTask({ ...newTask, description: e.target.value })}
					required
					rows="8"
					cols="8"
				/>

				<input
					type="button"
					className="btn btn-primary"
					value="Add Task"
					on
					onClick={createNewTask}
				/>
			</div>
		</div>
	);
};

export default CreateTask;
