## useMemo를 사용하여 연산한 값 재사용하기
성능 최적화에 사용됨


`App.js`에 active 값이 true인 사용자의 수를 세는 `countActiveUsers`함수를 만들어주고,

`count`라는 변수에 담아 렌더링

**App.js**

```js
import React, { useRef, useState } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

const countActiveUsers = (users) => {
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
		setUsers(users.filter((user) => user.id !== id));
	};

	const onToggle = (id) => {
		setUsers(users.map((user) => (user.id === id ? { ...user, active: !user.active } : user)));
	};

	const count = countActiveUsers(users);

	return (
		<>
			<CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
			<UserList users={users} onRemove={onRemove} onToggle={onToggle} />
			<div>활성 사용자 수: {count}</div>
		</>
	);
};

export default App;

```

근데 이렇게 작성하면 input에 값을 변경할 때에도 count가 호출됨 <- 메모리 낭비

이러한 상황에 `useMemo` 사용 <- 이전에 계산한 값을 재사용

`const count = useMemo(() => countActiveUsers(users), [users]);`

첫 번째 파라미터에는 어떻게 연산할지 정의하는 함수를 넣어준다.

두 번째 파라미터에는 `deps` 배열을 넣어준다.