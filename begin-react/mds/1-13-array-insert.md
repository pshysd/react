## 배열에 항목 추가하기

**CreateUser.js** 생성

```js
import React from 'react';

const CreateUser = ({ username, email, onChange, onCreate }) => {
	return (
		<div>
			<input type="text" name="username" placeholder="계정" onChange={onChange} value={username} />
			<input type="text" name="email" placeholder="이메일" onChange={onChange} value={email} />
			<button onClick={onCreate}>등록</button>
		</div>
	);
};

export default CreateUser;
```

상태관리는 CreateUser 컴포넌트에서 하지 않고 부모 컴포넌트인 App에서 함.

**App.js**

1. spread 연산자를 이용하는 것.

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
		},
		{
			id: 2,
			username: 'tester',
			email: 'tester@example.com',
		},
		{
			id: 3,
			username: 'liz',
			email: 'liz@example.com',
		},
	]);

	const nextId = useRef(4);
	const onCreate = () => {
		const user = {
			id: nextId.current,
			username,
			email,
		};

		setUsers([...users, user]); <- 여기

		setInputs({
			username: '',
			email: '',
		});

		nextId.current += 1;
	};

	return (
		<>
			<CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
			<UserList users={users} />
		</>
	);
};

export default App;

```

2. concat()을 사용하는 것

**App.js**

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
		},
		{
			id: 2,
			username: 'tester',
			email: 'tester@example.com',
		},
		{
			id: 3,
			username: 'liz',
			email: 'liz@example.com',
		},
	]);

	const nextId = useRef(4);
	const onCreate = () => {
		const user = {
			id: nextId.current,
			username,
			email,
		};

		setUsers(users.concat(user)); <- 여기
		setInputs({
			username: '',
			email: '',
		});

		nextId.current += 1;
	};

	return (
		<>
			<CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
			<UserList users={users} />
		</>
	);
};

export default App;
```

둘 다 기존의 배열을 건드리지 않고 새로운 배열을 만든다는 공통점이 있다.

내가 보기엔 concat이 awesome함