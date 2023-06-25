import { useEffect, useState, useReducer } from 'react';
import axios from 'axios';

const reducer = (state, action) => {
	switch (action.type) {
		case 'LOADING':
			return {
				loading: true,
				data: null,
				error: null,
			};
		case 'SUCCESS':
			return {
				loading: false,
				daga: action.data,
				error: null,
			};
		case 'ERROR':
			return {
				loading: false,
				data: null,
				error: action.error,
			};
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};

const Users = () => {
	const [state, dispatch] = useReducer(reducer, {
		loading: false,
		data: null,
		error: null,
	});

	const fetchUsers = async () => {
		try {
			// 요청이 시작될 때는 error와 users를 초기화
			setError(null);
			setUsers(null);

			// loading 상태를 true로 바꾼다
			setLoading(true);

			const response = await axios.get('https://jsonplaceholder.typicode.com/users');
			setUsers(response.data);
		} catch (error) {
			setError(error);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	const { loading, data: users, error } = state; // state.data를 users 키워드로 조회

	if (loading) return <div>유저 명단을 받아오는 중</div>;
	if (error) return <div>에러가 발생했습니다.</div>;
	if (!users) return null;

	return (
		<>
			<ul>
				{users.map((user) => (
					<li key={user.id}>
						{user.username} ({user.name})
					</li>
				))}
			</ul>
			<button onClick={fetchUsers}>다시 불러오기</button>
		</>
	);
};

export default Users;
