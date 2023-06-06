## useCallback을 사용하여 함수 재사용하기

`useCallback`은 `useMemo`와 비슷한 기능

`useMemo`는 특정 결과 값을 재사용할 때 사용

`useCallback`은 특정 함수를 새로 만들지 않고 재사용하고 싶을 때 사용

이전에 만들었던`onCreate`, `onRemove`, `onToggle`이 세 함수들은 컴포넌트가 리렌더링될 때 마다 새로 만들어진다.

함수를 선언하는 것 자체는 리소스를 많이 차지하는 작업은 아니기 때문에 새로 선언한다고 해서 큰 부하가 생길 일은 없지만,

컴포넌트에서 `props`가 바뀌지 않았으면 Virtual DOM에 새로 렌더링조차 하지않고 컴포넌트의 결과물을 재사용하는 최적화 작업을 하는데 `useCallback`이 필요하다.

`App.js`

```js
import React, { useRef, useState, useMemo, useCallback } from 'react';
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
	const onCreate = useCallback(() => { <- 이부분
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
	}, [users, username, email]); <- 이부분 deps

	const onRemove = useCallback( <- 이부분
		(id) => {
			setUsers(users.filter((user) => user.id !== id));
		},
		[users] <- 이부분 deps
	);

	const onToggle = useCallback( <- 이부분
		(id) => {
			setUsers(users.map((user) => (user.id === id ? { ...user, active: !user.active } : user)));
		},
		[users] <- 이부분 deps
	);

	const count = useMemo(() => countActiveUsers(users), [users]);

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

- 주의! 함수 안에서 사용하는 상태 혹은 props가 있다면 꼭 `deps`에 넣어주어야 함

사실 `useCallback`은 `useMemo`를 기반으로 한 것이라 이렇게도 쓸 수 있음

```js
const onToggle = useMemo(
	() => () => {
		/*... */
	},
	[users]
);
```

`useCallback`을 사용함으로써 바로 눈에 띄는 최적화가 일어나지는 않는다. 컴포넌트 렌더링 최적화 작업을 해주어야만 성능이 최적화됨.