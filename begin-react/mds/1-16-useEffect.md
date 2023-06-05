## useEffect를 사용하여 마운트/언마운트/업데이트 시 할 작업 선택하기

마운트: 처음 나타남
언마운트: 사라짐
업데이트: 특정 props가 바뀜

**UserList.js**

```js
import React, { useEffect } from 'react';

const User = ({ user, onRemove, onToggle }) => {
	useEffect(() => { <- 이 부분임
		console.log('컴포넌트가 화면에 나타남');
		return () => {
			console.log('컴포넌트가 화면에서 사라짐');
		};
	}, []);

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
				<User user={user} key={index} onRemove={onRemove} onToggle={onToggle} />
			))}
		</div>
	);
};

export default UserList;
```

`useEffect`의 첫 번째 파라미터에는 함수, 두 번째 파라미터에는 의존 값이 들어있는 배열(`deps`)를 넣는다. 만약 `deps` 배열을 비우게 된다면, 컴포넌트가 처음 나타날 때에만 `useEffect`에 등록한 함수가 호출됨.

`useEffect`에서는 함수를 반환할 수 있는데 이를 `cleanUp`함수라고 부른다. `cleanUp`함수는 `useEffect`에 대한 뒷정리를 해준다고 이해하면 됨.

`deps`가 비어있을 경우엔 컴포넌트가 언마운트될 때 `cleanUp`함수가 호출된다.

- 마운트 시 하는 작업들

  - props로 받은 값을 컴포넌트의 로컬 상태로 설정
  - 외부 API 요청(axios)
  - 라이브러리 사용(D3, Video.js 등 ...)
  - setInterval을 통한 반복 작업 혹은 setTimeout을 통한 작업 예약

- 언마운트 시 하는 작업들
  - setInterval, setTimeout을 사용하여 등록한 작업들 clear (clearInterval, clearTimeout)
  - 라이브러리 인스턴스 제거

## deps에 특정 값 넣기

`deps`에 특정 값을 넣으면, 컴포넌트가 처음 마운드 될 때에도 호출이 되고, 지정한 값이 바뀔 때에도 호출이 된다.

         특정 값이 있다면 언마운트 시에도 호출이 되고, 값이 바뀌기 직전에도 호출이 된다.

**UserList.js**

```js
import React, { useEffect } from 'react';

const User = ({ user, onRemove, onToggle }) => {
	useEffect(() => {
		console.log('user 값이 설정됨');
		console.log(user);
		return () => {
			console.log('user가 바뀌기 전...');
			console.log(user);
		};
	}, [user]);

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
				<User user={user} key={index} onRemove={onRemove} onToggle={onToggle} />
			))}
		</div>
	);
};

export default UserList;
```

`useEffect`안에서 사용하는 상태나, props가 있다면, `useEffect`의 `deps`에 넣어주어야 한다. 넣지 않으면 `useEffect`에 등록한 함수가 실행될 때 최신 props/state를 가리키지 않게 된다.

## deps 파라미터 생략하기

`deps` 파라미터를 생략한다면, 컴포넌트가 리렌더링 될 때 마다 호출된다.

**UserList.js**

```js
import React, { useEffect } from 'react';

const User = ({ user, onRemove, onToggle }) => {
	useEffect(() => {
		console.log(user); <- 아주 난리가 난다
	});

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
				<User user={user} key={index} onRemove={onRemove} onToggle={onToggle} />
			))}
		</div>
	);
};

export default UserList;
```