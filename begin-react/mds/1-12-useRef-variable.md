## useRef로 컴포넌트 안의 변수 만들기

useRef는 DOM을 선택하는 용도 외에도 `컴포넌트 안에서 조회 및 수정할 수 있는 변수를 관리`하는 기능이 있다.

useRef로 관리하는 변수는 값이 바뀐다고 해서 컴포넌트가 리렌더링 되지 않음.

- `setTimeout`, `setInterval`을 통해서 만들어진 id
- 외부 라이브러리를 사용하여 생성된 인스턴스
- scroll 위치

등을 관리할 수 있다.

**App.js**

```js
import React from 'react';

import UserList from './UserList';

function App() {
	const users = [
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
	];
	return <UserList users={users} />;
}

export default App;
```

<br><br>

**UserList.js**

```js
import React from 'react';

function User({ user }) {
	return (
		<div>
			<b>{user.username}</b> <span>({user.email})</span>
		</div>
	);
}

function UserList({ users }) {
	return (
		<div>
			{users.map((user) => (
				<User user={user} key={user.id} />
			))}
		</div>
	);
}

export default UserList;
```

<br><br>

이제 **App.js**에서 `useRef()`를 사용하여 nextId라는 변수를 생성

**App.js**

```js
import React, { useRef } from 'react';
import UserList from './UserList';

function App() {
	const users = [
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
	];

	const nextId = useRef(4);
	const onCreate = () => {
		// 나중에 구현 할 배열에 항목 추가하는 로직
		// ...

		nextId.current += 1;
	};
	return <UserList users={users} />;
}

export default App;
```

`useRef()`를 사용할 때 파라미터를 넣어주면 이 값이 `.current`의 기본 값이 된다.

`.current`의 값은 수정하거나 조회할 수 있음.