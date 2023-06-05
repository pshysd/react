## 배열 항목 수정하기

**App.js** users 배열 안에 active 속성 추가, 클릭할 때 마다 색이 변하게 할 onToggle 함수 추가

```js
import React, { useRef, useState } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

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
		setUsers(users.map((user) => (user.id === id ? { ...user, active: !user.active } : user)));  <- users를 순회하며 이벤트가 발생한 user의 id와 같은걸 찾아서 user의 속성을 spread, 그리고 active 속성은 현재 user.active 속성의 반대인 새로운 객체를 생성. 아닐 경우 그냥 내비둠. 이것들 모아서 새로운 배열 생성
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

**UserList.js**

```js
import React from 'react';

const User = ({ user, onRemove, onToggle }) => {
	return (
		<div>
			<b
				style={{
					cursor: 'pointer',
					color: user.active ? 'green' : 'black',
				}}
				onClick={() => onToggle(user.id)}>
				{user.username}
			</b>
			<span>({user.email})</span>
			<button onClick={() => onRemove(user.id)}>삭제</button>
		</div>
	);
};

const UserList = ({ users, onRemove, onToggle }) => {
	return (
		<div>
			{users.map((user, index) => (
				<User user={user} key={index} onRemove={onRemove} onToggle={onToggle} /> <- props로 내려줬다
			))}
		</div>
	);
};

export default UserList;
```
