## useReducer를 사용하여 상태 업데이트 로직 분리하기

- useReducer ?
  - 상태 관리하는 방법에 `useState`말고 또다른 방법
  - 다른 점은 상태 업데이트 로직을 컴포넌트에서 분리시킬 수 있음(컴포넌트 바깥, 외부 파일에서 불러오는 것도 가능)

`useReducer`를 사용하기 전에 먼저 reducer를 정의해준다.

<br>

<h2>Counter.js</h2>

```js
const reducer = (state, action) => {
	// 새로운 상태를 만드는 로직
	// const nextState = ...

	return nextState;
};
```

reducer에서 반환하는 상태는 컴포넌트가 지닐 새로운 상태가 된다.

`action`은 업데이트를 위한 정보를 가지고 있다. 주로 `type` 값을 지닌 객체 형태로 사용한다.

`useReducer`의 사용법

`const [state, dispatch] = useReducer(reducer, initialState)`

여기서 `state`는 사용할 컴포넌트의 `state`를 말하고,

`dispatch`는 `action`을 발생시키는 함수. `action`으로 타입을 보내줌

`useReducer`의 첫 번째 파라미터는 reducer로 사용할 함수이고, 두 번쨰 파라미터는 `state`의 초깃값이다.

<h2>Counter.js</h2>

```js
import React, { useReducer } from 'react';

const reducer = (state, action) => {
	switch (action.type) { <- dispatch로 받아온 action.type
		case 'INCREMENT':
			return state + 1;
		case 'DECREMENT':
			return state - 1;
		default:
			return state;
	}
};

const Counter = () => {
	const [number, dispatch] = useReducer(reducer, 0);

	const onIncrease = () => {
		dispatch({ type: 'INCREMENT' }); <- type은 INCREMENT라고 여기서 디스패치 해줌
	};
	const onDecrease = () => {
		dispatch({ type: 'DECREMENT' }); <- type은 DECREMENT라고 여기서 디스패치 해줌
	};

	return (
		<div>
			<h1>{number}</h1>
			<button onClick={onIncrease}>+1</button>
			<button onClick={onDecrease}>-1</button>
		</div>
	);
};

export default Counter;
```

<br>

## App 컴포넌트를 useReducer로 구현하기

`App` 컴포넌트에 있던 상태 업데이트 로직들을 `useState`가 아닌 `useReducer`를 사용하여 구현해보자

<br>

`App`에서 사용할 초기 상태를 컴포넌트 바깥으로 분리해주고, 내부의 로직들을 모두 제거한다.

<br>

<h2>App.js</h2>

```js
import React, { useRef, useState, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

const countActiveUsers = (users) => {
	console.log('활성 사용자 수를 세는중...');
	return users.filter((user) => user.active).length;
};

const initialState = {
	inputs: {
		username: '',
		email: '',
	},
	users: [
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
	],
};

const App = () => {
	return (
		<>
			<CreateUser />
			<UserList users={[]} />
			<div>활성사용자 수 : 0</div>
		</>
	);
};

export default App;
```

이게 기본 틀

<br>

1. reducer() 만들고 하위 컴포넌트들에 쓰일 값들을 추출해서 전달해줌

<h2>App.js()</h2>

```js
...

const reducer = (state, action) => {
	return state;
};

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { users } = state;
	const { username, email } = state.inputs;

	return (
		<>
			<CreateUser username={username} email={email} />
			<UserList users={users} />
			...
		</>
	);
};
```

<br>

2. onChange(), onCreate(), onToggle(), onRemove() 만든다

```js
const reducer = (state, action) => {
	switch (action.type) {
		case 'CHANGE_INPUT':
			return {
				...state,
				inputs: {
					...state.inputs,
					[action.name]: action.value,
				},
			};

		case 'CREATE_USER':
			return {
				inputs: initialSate.inputs,
				users: state.users.concat(action.user),
			};

		case 'TOGGLE_USER':
			return {
				...state,
				users: state.users.map((user) => (user.id === action.id ? { ...user, active: !user.active } : user)),
			};

		case 'REMOVE_USER':
			return {
				...state,
				users: state.users.filter((user) => user.id !== action.id),
			};

		default:
			return state;
	}
};

const App = () => {

	const onChange = useCallback((e) => {
		const { name, value } = e.target;
		dispatch({
			type: 'CHANGE_INPUT',
			name,
			value,
		});
	}, []);

	const onCreate = useCallback(() => {
		dispatch({
			type: 'CREATE_USER',
			user: {
				id: nextId.current,
				username,
				email,
			},
		});
		nextId.current += 1;
	}, [username, email]);

	const onToggle = useCallback((id) => {
		dispatch({
			type: 'TOGGLE_USER',
			id,
		});
	}, []);

	const onRemove = useCallback((id) => {
		dispatch({
			type: 'REMOVE_USER',
			id,
		});
	}, []);

	const count = useMemo(() => countActiveUsers(users), [users]);

	return (
		<>
			<CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
			<UserList users={users} onToggle={onToggle} onRemove={onRemove} />
			<div>활성 사용자 수: {count}</div>
		</>
	);
};
```

<br>

## 그래서 useState랑 useReducer 중에 뭐 쓰라고

정해진건없는데 복잡해지면 `useReducer`

<hr>

<h1>요약</h1>

액션 디스패치 리듀서가 존재하고



리듀서는 state, action을 파라미터로 받는다.

Dispatch에 Action을 담아 Reducer로 보내면 Reducer에 Action에 따라 정의된 로직에 맞춰 State를 처리해서 Return해줌

이게 전부임