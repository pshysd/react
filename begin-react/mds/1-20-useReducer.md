## useReducer를 사용하여 상태 업데이트 로직 분리하기

- useReducer ?
  - 상태 관리하는 방법에 `useState`말고 또다른 방법
  - 다른 점은 상태 업데이트 로직을 컴포넌트에서 분리시킬 수 있음(컴포넌트 바깥, 외부 파일에서 불러오는 것도 가능)

`useReducer`를 사용하기 전에 먼저 reducer를 정의해준다.

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

**Counter.js**

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
