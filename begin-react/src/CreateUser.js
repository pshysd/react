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

export default React.memo(CreateUser);
