import React, { useCallback, useMemo, useReducer, useRef, useState } from 'react';
import './App.css';
import Hello from './Hello';
import Wrapper from './Wrapper';
import Counter from './Counter';
import InputSample from './InputSample';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './hooks/useInputs';
// function App() {
//   const name = 'react';
//   const style = {
//     // css는 객체 형식
//     backgroundColor: 'black',
//     color: 'aqua',
//     fontSize: 24,
//     padding: '1rem',
//   };
//   return (
//     <>
//       {/* JSX의 주석은 이렇게 쓰는거란다 */}
//       /* 이렇게 쓰면 보인단다 알겠니? */
//       <Hello
//         // 여기다가는 이렇게 쓸 수도 있단다
//       />
//       <div style={style}>{name}</div>
//       <div className='gray-box'></div>
//     </>
//   );
// }

const countActiveUsers = (users) => {
	console.log('활성 사용자 수를 세는중 ...');
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
				inputs: initialState.inputs,
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

export const UserDispatch = React.createContext(null);

const App = () => {
	/* 
	const { username, email } = inputs; // inputs.username, inputs.email

	const onChange = useCallback((e) => {
		const { name, value } = e.target; // 이벤트 걸려있는 html 태그의 name, value 속성 가져옴
		setInputs((inputs) => ({
			...inputs, // spread 문법 알아봐야 할듯
			[name]: value, // 뭔소리람
		}));
	}, []);

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
		// useCallback -> 함수의 재사용, useMemo -> 결과값의 재사용
		const user = {
			id: nextId.current,
			username,
			email,
		};
		// setUsers([...users, user]); // <- 기존 users와 새로운 user를 추가한 새로운 배열을 만드는 방식인듯?

		// 또다른 방식 -> concat 이용 (원본 배열을 오염시키지 않고 새로운 배열을 생성)
		setUsers((users) => users.concat(user));

		setInputs({
			username: '',
			email: '',
		});

		nextId.current += 1;
	}, [username, email]);

	const onRemove = useCallback((id) => {
		// user.id가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듦
		// == user.id가 id인 것을 제거함
		setUsers((users) => users.filter((user) => user.id !== id));
	}, []);

	const onToggle = useCallback((id) => {
		setUsers((users) => users.map((user) => (user.id === id ? { ...user, active: !user.active } : user)));
	}, []);

	const count = useMemo(() => countActiveUsers(users), [users]); // useMemo == useMemorized,
	// [deps]의 내용물이 바뀌면 callback(1st param) 호출해서 값 연산, 안바뀌면 내비둠
	return (
		<>
			<Wrapper>
				<Hello name="react" color="red" isSpecial /> // 이렇게만 적으면 isSpecial={true}와 동일한 의미이다.  
				<Hello color="pink" />
			</Wrapper>
			<br />
			<Counter />
			<InputSample />
			<CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
			<UserList users={users} onRemove={onRemove} onToggle={onToggle} />
			<div>활성사용자 수: {count}</div>
			// 얘를 그냥 내비두면 인풋에 뭐 쓸때마다(리렌더링 될 때 마다) 콘솔에 활성사용자세는중... 이거 계속 뜸 => useMemo 써야됨 
		</>
	);
	*/
	const [{ username, email }, onChange, reset] = useInputs({
		username: '',
		email: '',
	});

	const [state, dispatch] = useReducer(reducer, initialState);
	const nextId = useRef(4);

	const { users } = state;
	// const { username, email } = state.inputs;
	/* 
	const onChange = useCallback((e) => {
		const { name, value } = e.target;
		dispatch({
			type: 'CHANGE_INPUT',
			name,
			value,
		});
	}, []);
 */
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
	/* 
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
 */
	const count = useMemo(() => countActiveUsers(users), [users]);
	return (
		<UserDispatch.Provider value={dispatch}>
			<CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
			<UserList users={users} /* onToggle={onToggle} onRemove={onRemove} */ />
			<div>활성 사용자 수: {count}</div>
		</UserDispatch.Provider>
	);
};

export default App;
