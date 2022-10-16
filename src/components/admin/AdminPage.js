import React, { useEffect, useState } from 'react';
import ShowTask from '../Todo/ShowTask';
import {
	adminGetAllTask,
	adminGetAllUser,
	adminGetOneUserTask,
	adminGetTaskByStatus
} from '../../utils/userAPI/adminAPI';
import { adminUsers, adminTasks } from '../../redux/actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../CustomTags/Button';

const AdminPage = () => {
	const [statusType, setStatusType] = useState('all');
	const [active, setActive] = useState(false);
	const dispatch = useDispatch();
	const allUserData = useSelector(state => state.adminAllUsers.allUser);
	const allTasksData = useSelector(state => state.adminAllTasks.allTask);

	const getTaskOfAUser = id => {
		adminGetOneUserTask(id)
			.then(response => {
				dispatch(adminTasks(response.data.tasks));
			})
			.catch(err => console.log(err));
	};

	useEffect(
		() => {
			if (statusType === 'all') {
				adminGetAllTask()
					.then(response => {
						dispatch(adminTasks(response.data.task));
					})
					.catch(error => console.log(error));
			} else {
				adminGetTaskByStatus(statusType)
					.then(response => {
						dispatch(adminTasks(response.data.task));
					})
					.catch(error => console.log(error));
			}
		},
		[statusType]
	);

	useEffect(() => {
		adminGetAllUser()
			.then(response => {
				dispatch(adminUsers(response.data.users));
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	return (
		<div className="outer_container">
			<div className="sticky" style={{ width: '20rem', height: '30rem' }}>
				<div className="filter sticky">
					<Button value="all" statusType={statusType} Action={setStatusType} />
					<Button
						value="pending"
						statusType={statusType}
						Action={setStatusType}
					/>
					<Button
						value="complete"
						statusType={statusType}
						Action={setStatusType}
					/>
					<Button value="hold" statusType={statusType} Action={setStatusType} />
				</div>

				<div>
					<div className="createTask filter">
						{allUserData &&
							allUserData.map((value, index) => {
								return (
									<Button
										key={value._id}
										value={value.name}
										Action={() => getTaskOfAUser(value._id)}
									/>
								);
							})}
					</div>
				</div>
			</div>
			<div>
				<div className="container">
					{allTasksData &&
						allTasksData.map((value, index) => {
							return <ShowTask key={value._id} task={value} />;
						})}
				</div>
			</div>
		</div>
	);
};

export default AdminPage;
