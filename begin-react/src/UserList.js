import React, { useContext, useEffect } from 'react';
import { UserDispatch } from './App';
/* 
const User = ({ user, onRemove, onToggle }) => {
	// 컴포넌트가 처음 나타났을 때(마운트) / 사라질 때(언마운트) / 특정 props가 바뀔 때(업데이트)
	useEffect(() => { // 1st param -> 함수, 2nd param -> 의존 값이 들어있는 배열(deps) 넣음, 만약 deps 비우면 컴포넌트가 처음 나타날 때만 useEffect 호출
		// console.log(`컴포넌트가 화면에 나타남`); // 마운트
		console.log('user 값이 설정됨', user);
		return () => {
			// console.log(`컴포넌트가 화면에서 사라짐`); // 언마운트
			console.log('user가 바뀌기 전', user)
		};
	}, [user] ); // 만약 생략한다면 컴포넌트가 리렌더링 될 때마다 호출 -> 아주 뭐 하나 누를때마다 해댐
	
		* 마운트 시 주로 하는 작업들
		1. props로 받은 값을 컴포넌트의 로컬 상태로 설정
		2. 외부 API 요청
		3. 라이브러리 사용(D3, Video.js 등)
		4. setInterval을 통한 반복작업 or setTimeout을 통한 작업 예약

		* 언마운트 시 주로 하는 작업
		1. setInterval, setTimeout을 사용하여 등록한 작업들 clear(clearInterval, clearTimeout)
		2. 라이브러리 인스턴스 제거
	 
 */

const User = React.memo(function User({ user }) {
	const dispatch = useContext(UserDispatch);
	return (
		<div>
			<b
				style={{
					// 중괄호 두개 들어가는 이유: jsx안에 객체 사용해서
					cursor: 'pointer',
					color: user.active ? 'green' : 'black',
				}}
				onClick={() => {
					dispatch({ type: 'TOGGLE_USER', id: user.id });
				}}>
				{user.username}
			</b>
			&nbsp;
			<span>({user.email})</span>
			<button
				onClick={() => {
					dispatch({ type: 'REMOVE_USER', id: user.id });
				}}>
				삭제
			</button>
		</div>
	);
});

const UserList = ({ users /* onRemove, onToggle */ }) => {
	return (
		<div>
			{users.map((user) => (
				<User
					user={user}
					key={user.id}
					/* 
					onRemove={onRemove}
					onToggle={onToggle}
					 */
				/> /* 만약 key가 없다면 index를 활용하는 것도 가능하다. */
			))}
		</div>
	);
};

export default React.memo(UserList);
