## useMemo를 사용하여 연산한 값 재사용하기

`App.js`에 active 값이 true인 사용자의 수를 세는 `countActiveUsers`함수를 만든다

**App.js**

```js
import React, { useRef, useState } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

const countActiveUsers = (users) => { <- 이부분 추가됐음
	console.log('active 상태인 사용자의 수를 세는 중..');
	return users.filter((user) => user.active).length;
};

const App = () => {
	const [inputs, setInputs] = useState({
		username: '',
		email: '',
	});

	const { username, email } = inputs;

	const onChange = (e) => {
		const { name, value } = e.target;

		setInputs({
			...inputs,
			[name]: value,
		});
	};
	const [users, setUsers] = useState([
		{
			id: 1,
			username: 'velopert',
			email: 'public.velopert@gmail.com',
			active: true,
		},
		{
			id: 2,
			username: 'tester',
			email: 'tester@example.com',
			active: false,
		},
		{
			id: 3,
			username: 'liz',
			email: 'liz@example.com',
			active: false,
		},
	]);

	const nextId = useRef(4);
	const onCreate = () => {
		const user = {
			id: nextId.current,
			username,
			email,
		};

		setUsers(users.concat(user));
		setInputs({
			username: '',
			email: '',
		});

		nextId.current += 1;
	};

	const onRemove = (id) => {
		// user.id가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듦
		// == user.id가 id인 것을 제거함.
		setUsers(users.filter((user) => user.id !== id));
	};

	const onToggle = (id) => {
		setUsers(users.map((user) => (user.id === id ? { ...user, active: !user.active } : user)));
	};

	return (
		<>
			<CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
			<UserList users={users} onRemove={onRemove} onToggle={onToggle} />
		</>
	);
};

export default App;
```
