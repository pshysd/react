import axios from 'axios';
import useAsync from './useAsync';

const getUsers = async () => {
	const response = await axios.get('https://jsonplaceholder.typicoe.com/users');

	return response.data;
};

const Users = () => {
	const [state, refetch] = useAsync(getUsers, [], true);

	const { loading, data: users, error } = state; // state.data를 users 키워드로 조회

	if (loading) <div>로딩중...</div>;
	if (error) <div>에러가 발생했습니다.</div>;
	if (!users) null;

	return (
		<>
			<ul>
				{users.map((user) => (
					<li key={user.id}>
						{user.username} ({user.name})
					</li>
				))}
			</ul>
			<button onClick={refetch}>다시 불러오기</button>
		</>
	);
};

export default Users;
