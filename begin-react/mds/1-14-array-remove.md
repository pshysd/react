## 배열에 항목 제거하기

UserList 컴포넌트에 삭제 버튼 렌더링

**UserList.js**

```js
import React from 'react';

const User = ({ user, onRemove }) => {
	return (
		<div>
			<b>{user.username}</b>
			<span>({user.email})</span>
			<button onClick={() => onRemove(user.id)}>삭제</button>
		</div>
	);
};

const UserList = ({ users, onRemove }) => {
	return (
		<div>
			{users.map((user, index) => (
				<User user={user} key={index} onRemove={onRemove} /> <- props로 User 컴포넌트에 내려주는 과정
			))}
		</div>
	);
};

export default UserList;
```
