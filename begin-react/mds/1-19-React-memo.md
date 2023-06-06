## React-memo를 사용한 컴포넌트 리렌더링 방지

`React.memo`: 컴포넌트의 props가 바뀌지 않았다면, 리렌더링을 방지해줌.

컴포넌트에서 리렌더링이 필요한 상황에서만 리렌더링을 하도록 설정해줄 수 있다.

**CreateUser.js**

`export default React.memo(CreateUser);` 이게 다임

**UserList.js**

```js
import React from 'react';

const User = React.memo(({ user, onRemove, onToggle }) => (
	<div>
		<b
			style={{
				cursor: 'pointer',
				color: user.active ? 'green' : 'black',
			}}
			onClick={() => onToggle(user.id)}>
			{user.username}
		</b>
		&nbsp;
		<span>({user.email})</span>
		<button onClick={() => onRemove(user.id)}>삭제</button>
	</div>
));

const UserList = ({ users, onRemove, onToggle }) => {
	return (
		<div>
			{users.map((user) => (
				<User user={user} key={user.id} onRemove={onRemove} onToggle={onToggle} />
			))}
		</div>
	);
};

export default React.memo(UserList);
```

`User` 중 하나라도 수정하면 모든 `User`들이 리렌더링되고, `CreateUser`도 리렌더링 되는 문제가 있음.

이유는 `users` 배열이 바뀔 때 마다 `onCreate`, `onToggle`, `onRemove`도 새로 만들어지기 때문

`deps`에 `users`가 들어있기 떄문에 배열이 바뀔 때 마다 함수가 새로 만들어지는건 당연함

-> `deps`에서 `users`를 지우고, 함수들에 현재 `useState`로 관리하는 `users`를 참조하지 않게 하면 됨

-> 함수형 업데이트 사용해야 함

**App.js**

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

	const onChange =
		((useCallback = (e) => {
			const { name, value } = e.target;

			setInputs((inputs) => ({ <- 이 부분
				...inputs,
				[name]: value,
			}));
		}),
		[]); <- 이 부분
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
	const onCreate = useCallback(() => {
		const user = {
			id: nextId.current,
			username,
			email,
		};

		setUsers((users) => users.concat(user)); <- 이 부분

		setInputs({
			username: '',
			email: '',
		});

		nextId.current += 1;
	}, [username, email]); <- 이 부분

	const onRemove = useCallback((id) => {
		setUsers((users) => users.filter((user) => user.id !== id)); <- 이 부분
	}, []); <- 이 부분

	const onToggle = useCallback((id) => {
		setUsers((users) => users.map((user) => (user.id === id ? { ...user, active: !user.active } : user))); <- 이 부분
	}, []); <- 이 부분

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

 * 주의! `useCallback`, `useMemo`, `React.memo`는 컴포넌트의 성능을 실제로 개선할 수 있는 상황에서만 해야한다.

 특히 `React.memo`는 불필요한 `props` 비교만 하게 되기 때문에 실제로 렌더링을 방지할 수 있는 상황에만 사용해야 한다.