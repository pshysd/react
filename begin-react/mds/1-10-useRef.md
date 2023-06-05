## useRef로 특정 DOM 선택하기

`getElementById`, `querySelector`같은 역할

**InputSample.js**

```js
import React, { useState, useRef } from 'react';

const InputSample = () => {
	const [inputs, setInputs] = useState({
		name: '',
		nickname: '',
	});

	const nameInput = useRef();

	const { name, nickname } = inputs;

	const onChange = (e) => {
		const { value, name } = e.target;
		setInputs({
			...inputs,
			[name]: value,
		});
	};

	const onReset = () => {
		setInputs({
			name: '',
			nickname: '',
		});
		nameInput.current.focus(); <- onReset() 호출될 시 nameInput으로 포커스 잡힘
	};

	return (
		<div>
			<input type="text" name="name" placeholder="이름" onChange={onChange} value={name} ref={nameInput} />
			<input type="text" name="nickname" placeholder="닉네임" onChange={onChange} value={nickname} />
			<button onClick={onReset}>초기화</button>
			<div>
				<b>값:</b>
				{name} ({nickname})
			</div>
		</div>
	);
};

export default InputSample;
```
