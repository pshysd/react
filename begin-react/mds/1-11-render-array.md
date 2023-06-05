## 배열 렌더링

아래와 같은 배열이 있다고 가정

```js
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
```

map()을 사용하여 배열을 동적으로 렌더링 할 수 있다.

**UserList.js**

```js
import React from 'react';

const User = ({ user }) => {
	return (
		<div>
			<b>{user.username}</b>
			<span>({user.email})</span>
		</div>
	);
};

const UserList = () => {
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

	return (
		<div>
			{users.map((user) => (
				<User user={user} />
			))}
		</div>
	);
};

export default UserList;
```

하지만 이렇게만 작성하면

```
react-jsx-dev-runtime.development.js:87 Warning: Each child in a list should have a unique "key" prop.

Check the render method of `UserList`. See https://reactjs.org/link/warning-keys for more information.
    at User (http://localhost:3000/static/js/bundle.js:93:5)
    at UserList
    at App
```

라는 식의 오류를 볼 수 있음

-> 리액트에서 배열을 렌더링할 때에는 `key`라는 props를 설정해줘야한다.